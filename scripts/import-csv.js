#!/usr/bin/env node
/**
 * Imports a semicolon-delimited CSV of Berlin budget data into a SQLite database.
 *
 * Usage:
 *   node scripts/import-csv.js <csv-file> [output-db]
 *
 * Example:
 *   node scripts/import-csv.js doppelhaushalt_2026_2027.csv data/haushaltsdaten.db
 */

const Database = require('better-sqlite3')
const fs = require('fs')
const path = require('path')

const csvFile = process.argv[2]
const dbFile = process.argv[3] || 'data/haushaltsdaten.db'

if (!csvFile) {
  console.error('Usage: node scripts/import-csv.js <csv-file> [output-db]')
  process.exit(1)
}

if (!fs.existsSync(csvFile)) {
  console.error(`CSV file not found: ${csvFile}`)
  process.exit(1)
}

// Ensure output directory exists
const dbDir = path.dirname(dbFile)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// CSV column headers -> snake_case DB column names
const COLUMN_MAP = {
  ID: 'id',
  Typ: 'typ',
  Bezeichnung: 'bezeichnung',
  Bereich: 'bereich',
  Bereichsbezeichnung: 'bereichs_bezeichnung',
  Einzelplan: 'einzelplan',
  Einzelplanbezeichnung: 'einzelplan_bezeichnung',
  Kapitel: 'kapitel',
  Kapitelbezeichnung: 'kapitel_bezeichnung',
  Hauptgruppe: 'hauptgruppe',
  Hauptgruppenbezeichnung: 'hauptgruppen_bezeichnung',
  Obergruppe: 'obergruppe',
  Obergruppenbezeichnung: 'obergruppen_bezeichnung',
  Gruppe: 'gruppe',
  Gruppenbezeichnung: 'gruppen_bezeichnung',
  Hauptfunktion: 'hauptfunktion',
  Hauptfunktionsbezeichnung: 'hauptfunktions_bezeichnung',
  Oberfunktion: 'oberfunktion',
  Oberfunktionsbezeichnung: 'oberfunktions_bezeichnung',
  Funktion: 'funktion',
  Funktionsbezeichnung: 'funktions_bezeichnung',
  Titelart: 'titel_art',
  Titel: 'titel',
  Titelbezeichnung: 'titel_bezeichnung',
  Jahr: 'jahr',
  BetragTyp: 'betrag_typ',
  Betrag: 'betrag',
}

/**
 * Parse a semicolon-delimited CSV line, handling quoted fields.
 */
function parseCsvLine(line) {
  const fields = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"'
          i++ // skip escaped quote
        } else {
          inQuotes = false
        }
      } else {
        current += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ';') {
        fields.push(current)
        current = ''
      } else {
        current += ch
      }
    }
  }
  fields.push(current)
  return fields
}

console.log(`Reading ${csvFile}...`)
const content = fs.readFileSync(csvFile, 'utf-8')
const lines = content.split('\n').filter((l) => l.trim() !== '')

const headers = parseCsvLine(lines[0])
const dbColumns = headers.map((h) => COLUMN_MAP[h.trim()] || h.trim())

console.log(`Found ${lines.length - 1} data rows, ${dbColumns.length} columns`)

// Delete existing DB file if present
if (fs.existsSync(dbFile)) {
  fs.unlinkSync(dbFile)
}

const db = new Database(dbFile)
db.pragma('journal_mode = WAL')

// Create main table
const columnDefs = dbColumns
  .map((col) => {
    if (col === 'id') return 'id INTEGER PRIMARY KEY'
    if (col === 'jahr' || col === 'betrag') return `${col} INTEGER`
    return `${col} TEXT`
  })
  .join(', ')

db.exec(`CREATE TABLE haushaltsdaten (${columnDefs})`)

// Create indexes for common query patterns
db.exec(`
  CREATE INDEX idx_jahr_titel_art ON haushaltsdaten (jahr, titel_art);
  CREATE INDEX idx_jahr_titel_art_bereich ON haushaltsdaten (jahr, titel_art, bereichs_bezeichnung);
  CREATE INDEX idx_hauptfunktion ON haushaltsdaten (hauptfunktions_bezeichnung);
  CREATE INDEX idx_oberfunktion ON haushaltsdaten (oberfunktions_bezeichnung);
  CREATE INDEX idx_funktion ON haushaltsdaten (funktions_bezeichnung);
  CREATE INDEX idx_einzelplan ON haushaltsdaten (einzelplan_bezeichnung);
  CREATE INDEX idx_kapitel ON haushaltsdaten (kapitel_bezeichnung);
`)

// Create FTS5 virtual table for full-text search
db.exec(`
  CREATE VIRTUAL TABLE haushaltsdaten_fts USING fts5(
    titel_bezeichnung,
    titel_art,
    bereichs_bezeichnung,
    einzelplan_bezeichnung,
    kapitel_bezeichnung,
    hauptfunktions_bezeichnung,
    oberfunktions_bezeichnung,
    funktions_bezeichnung,
    hauptgruppen_bezeichnung,
    obergruppen_bezeichnung,
    gruppen_bezeichnung,
    content=haushaltsdaten,
    content_rowid=id
  )
`)

// Insert data in a transaction
const placeholders = dbColumns.map(() => '?').join(', ')
const insert = db.prepare(
  `INSERT INTO haushaltsdaten (${dbColumns.join(', ')}) VALUES (${placeholders})`
)

const insertMany = db.transaction((rows) => {
  for (const row of rows) {
    insert.run(...row)
  }
})

const rows = []
for (let i = 1; i < lines.length; i++) {
  const fields = parseCsvLine(lines[i])
  if (fields.length !== dbColumns.length) {
    console.warn(`Skipping line ${i + 1}: expected ${dbColumns.length} fields, got ${fields.length}`)
    continue
  }

  const values = fields.map((val, idx) => {
    const col = dbColumns[idx]
    if (col === 'id' || col === 'jahr' || col === 'betrag') {
      const num = parseInt(val, 10)
      return isNaN(num) ? null : num
    }
    return val.trim()
  })

  rows.push(values)
}

console.log(`Inserting ${rows.length} rows...`)
insertMany(rows)

// Populate FTS index
db.exec(`
  INSERT INTO haushaltsdaten_fts (rowid,
    titel_bezeichnung, titel_art, bereichs_bezeichnung,
    einzelplan_bezeichnung, kapitel_bezeichnung,
    hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung,
    hauptgruppen_bezeichnung, obergruppen_bezeichnung, gruppen_bezeichnung
  )
  SELECT id,
    titel_bezeichnung, titel_art, bereichs_bezeichnung,
    einzelplan_bezeichnung, kapitel_bezeichnung,
    hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung,
    hauptgruppen_bezeichnung, obergruppen_bezeichnung, gruppen_bezeichnung
  FROM haushaltsdaten
`)

db.close()

const stats = fs.statSync(dbFile)
console.log(`Done! Created ${dbFile} (${(stats.size / 1024 / 1024).toFixed(1)} MB)`)
