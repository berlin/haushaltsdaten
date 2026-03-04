#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Export SQLite data to static JSON files for client-side consumption.
 *
 * Produces:
 *   public/data/version.json
 *   public/data/<hash>/<year>/<type>/<districtKey>.json  (56 data files)
 *   public/data/<hash>/search-index.json     (MiniSearch inverted index)
 *   public/data/<hash>/search-documents.json (columnar display data)
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const Database = require('better-sqlite3')
const MiniSearch = require('minisearch')

const DB_PATH =
  process.env.SQLITE_PATH ||
  path.join(process.cwd(), 'data', 'haushaltsdaten.db')

const OUT_DIR = path.join(process.cwd(), 'public', 'data')

// District keys map to bereichs_bezeichnung values.
// Key '01' = all districts (no filter).
const DISTRICTS = {
  '01': null, // all districts
  '02': 'Hauptverwaltung',
  '03': 'Mitte',
  '04': 'Friedrichshain-Kreuzberg',
  '05': 'Pankow',
  '06': 'Charlottenburg-Wilmersdorf',
  '07': 'Spandau',
  '08': 'Steglitz-Zehlendorf',
  '09': 'Tempelhof-Schöneberg',
  '10': 'Neukölln',
  '11': 'Treptow-Köpenick',
  '12': 'Marzahn-Hellersdorf',
  '13': 'Lichtenberg',
  '14': 'Reinickendorf',
}

const YEARS = [2026, 2027]
const TYPES = ['Ausgabetitel', 'Einnahmetitel']

// Columns included in each data file (both modus modes work from these)
const DATA_COLUMNS = [
  'id',
  'betrag',
  'bereichs_bezeichnung',
  'titel_bezeichnung',
  'hauptfunktions_bezeichnung',
  'oberfunktions_bezeichnung',
  'funktions_bezeichnung',
  'einzelplan_bezeichnung',
  'kapitel_bezeichnung',
]

// Fields indexed by MiniSearch (searchable).
// Only index the fields users actually search by. The gruppen fields
// (hauptgruppen, obergruppen, gruppen) are still stored for display
// but not indexed — they share vocabulary with the funktions fields
// and add ~30% to the index without meaningful search benefit.
const SEARCH_INDEXED_FIELDS = [
  'titel_bezeichnung',
  'bereichs_bezeichnung',
  'einzelplan_bezeichnung',
  'kapitel_bezeichnung',
  'hauptfunktions_bezeichnung',
  'oberfunktions_bezeichnung',
  'funktions_bezeichnung',
]

// Fields stored in the index for display (returned with search results)
const SEARCH_STORE_FIELDS = [
  'id',
  'titel_bezeichnung',
  'titel_art',
  'bereichs_bezeichnung',
  'betrag',
  'jahr',
  'titel',
  'hauptfunktions_bezeichnung',
  'oberfunktions_bezeichnung',
  'funktions_bezeichnung',
  'hauptgruppen_bezeichnung',
  'obergruppen_bezeichnung',
  'gruppen_bezeichnung',
  'einzelplan_bezeichnung',
  'kapitel_bezeichnung',
]

// All columns needed from the DB for indexing + storage
const SEARCH_ALL_COLUMNS = [
  ...new Set([...SEARCH_INDEXED_FIELDS, ...SEARCH_STORE_FIELDS]),
]

// ---------------------------------------------------------------------------

function getHash() {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  } catch (e) {
    // Fallback: content hash not needed if git is unavailable, use timestamp
    return Date.now().toString(36)
  }
}

function atomicWriteJSON(filePath, data) {
  const dir = path.dirname(filePath)
  fs.mkdirSync(dir, { recursive: true })
  const tmp = filePath + '.tmp'
  fs.writeFileSync(tmp, JSON.stringify(data))
  fs.renameSync(tmp, filePath)
}

function validateSchema(db) {
  const cols = db
    .prepare('PRAGMA table_info(haushaltsdaten)')
    .all()
    .map((c) => c.name)

  const required = [...new Set([...DATA_COLUMNS, ...SEARCH_ALL_COLUMNS])]
  const missing = required.filter((c) => !cols.includes(c))
  if (missing.length > 0) {
    throw new Error(
      `Database schema validation failed. Missing columns: ${missing.join(', ')}`
    )
  }
}

function exportDataFiles(db, hash) {
  const colList = DATA_COLUMNS.join(', ')
  let fileCount = 0

  for (const year of YEARS) {
    for (const type of TYPES) {
      for (const [districtKey, districtName] of Object.entries(DISTRICTS)) {
        let sql = `SELECT ${colList} FROM haushaltsdaten WHERE jahr = ? AND titel_art = ?`
        const params = [year, type]

        if (districtName !== null) {
          sql += ' AND bereichs_bezeichnung = ?'
          params.push(districtName)
        }

        sql += ' ORDER BY id ASC'
        const rows = db.prepare(sql).all(...params)

        const filePath = path.join(
          OUT_DIR,
          hash,
          String(year),
          type,
          `${districtKey}.json`
        )

        let data
        if (districtKey === '01') {
          // Columnar format for "all districts" (large files)
          data = {
            cols: DATA_COLUMNS,
            rows: rows.map((row) => DATA_COLUMNS.map((col) => row[col])),
          }
        } else {
          // Standard object array for per-district files
          data = rows
        }

        atomicWriteJSON(filePath, data)
        fileCount++

        const sizeKB = (
          fs.statSync(filePath).size / 1024
        ).toFixed(1)
        console.log(
          `  ${filePath.replace(process.cwd() + '/', '')} (${rows.length} rows, ${sizeKB} KB)`
        )
      }
    }
  }

  return fileCount
}

function exportSearchIndex(db, hash) {
  const colList = SEARCH_ALL_COLUMNS.join(', ')
  const rows = db
    .prepare(`SELECT ${colList} FROM haushaltsdaten ORDER BY id ASC`)
    .all()

  console.log(`\n  Building search index for ${rows.length} documents...`)

  // Build MiniSearch index — display data stored separately in columnar
  // format to avoid bloating the index with duplicate field values.
  const miniSearch = new MiniSearch({
    fields: SEARCH_INDEXED_FIELDS,
    storeFields: [],
    idField: 'id',
    tokenize: (text) =>
      text
        .toLowerCase()
        .split(/[\s\-/,;:.()]+/)
        .filter((t) => t.length > 0),
    searchOptions: {
      tokenize: (text) =>
        text
          .toLowerCase()
          .split(/[\s\-/,;:.()]+/)
          .filter((t) => t.length > 0),
    },
  })

  miniSearch.addAll(rows)

  const indexPath = path.join(OUT_DIR, hash, 'search-index.json')
  atomicWriteJSON(indexPath, miniSearch.toJSON())
  const indexSize = fs.statSync(indexPath).size
  console.log(
    `  ${indexPath.replace(process.cwd() + '/', '')} (${(indexSize / 1024).toFixed(1)} KB / ${(indexSize / (1024 * 1024)).toFixed(1)} MB)`
  )

  // Write search documents in columnar format to minimize size.
  // 47K rows × 15 columns as JSON objects = 35 MB (repeated key strings).
  // Columnar format: { cols: [...], rows: [[...], ...] } = much smaller.
  const docsPath = path.join(OUT_DIR, hash, 'search-documents.json')
  const columnarDocs = {
    cols: SEARCH_STORE_FIELDS,
    rows: rows.map((row) => SEARCH_STORE_FIELDS.map((col) => row[col])),
  }
  atomicWriteJSON(docsPath, columnarDocs)
  const docsSize = fs.statSync(docsPath).size
  console.log(
    `  ${docsPath.replace(process.cwd() + '/', '')} (${(docsSize / 1024).toFixed(1)} KB / ${(docsSize / (1024 * 1024)).toFixed(1)} MB)`
  )

  console.log(
    `  Total search data: ${((indexSize + docsSize) / (1024 * 1024)).toFixed(1)} MB`
  )
}

// ---------------------------------------------------------------------------

function main() {
  console.log('Exporting SQLite data to static JSON files...\n')

  if (!fs.existsSync(DB_PATH)) {
    throw new Error(`Database not found at ${DB_PATH}`)
  }

  const db = new Database(DB_PATH, { readonly: true })
  db.pragma('journal_mode = WAL')

  validateSchema(db)

  const hash = getHash()
  console.log(`Build hash: ${hash}\n`)

  // Clean previous data
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true })
  }

  // Write version.json
  const versionPath = path.join(OUT_DIR, 'version.json')
  atomicWriteJSON(versionPath, { hash })
  console.log(`  ${versionPath.replace(process.cwd() + '/', '')}\n`)

  // Export data files
  console.log('Exporting data files:')
  const fileCount = exportDataFiles(db, hash)
  console.log(`\n  ${fileCount} data files exported.`)

  // Export search index + documents
  console.log('\nExporting search data:')
  exportSearchIndex(db, hash)

  db.close()

  // Generate manifest.webmanifest with basePath-aware icon paths
  generateManifest()

  console.log('\nDone!')
}

function generateManifest() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const manifest = {
    name: 'Berliner Haushaltsdaten',
    short_name: 'BerlinerHaushaltsdaten',
    icons: [
      {
        src: `${basePath}/favicons/favicon-192.png`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `${basePath}/favicons/favicon-512.png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#c41b31',
    background_color: '#ffffff',
    display: 'standalone',
  }
  const manifestPath = path.join(process.cwd(), 'public', 'manifest.webmanifest')
  atomicWriteJSON(manifestPath, manifest)
  console.log(
    `\n  ${manifestPath.replace(process.cwd() + '/', '')} (basePath: "${basePath}")`
  )
}

main()
