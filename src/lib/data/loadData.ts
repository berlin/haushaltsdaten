import {
  HaushaltsdatenRowType,
  TopicColumnName,
  VALID_TOPIC_COLUMNS,
} from '@lib/types/haushaltsdaten'

export interface RawDataRow {
  [key: string]: string | number
}

interface ColumnarData {
  cols: string[]
  rows: (string | number)[][]
}

export function getDataUrl(
  basePath: string,
  hash: string,
  year: number,
  expenseType: string,
  districtKey: string
): string {
  return `${basePath}/data/${hash}/${year}/${expenseType}/${districtKey}.json`
}

export function parseDataSlice(
  raw: ColumnarData | RawDataRow[],
  districtKey: string
): RawDataRow[] {
  if (districtKey === '01' && !Array.isArray(raw)) {
    // Columnar format: { cols, rows }
    const { cols, rows } = raw
    return rows.map((row) => {
      const obj: RawDataRow = {}
      cols.forEach((col, i) => {
        obj[col] = row[i]
      })
      return obj
    })
  }
  return raw as RawDataRow[]
}

export function mapModusKeys(
  data: RawDataRow[],
  modus: string
): HaushaltsdatenRowType[] {
  const isFunktionen = modus === 'Funktionen'

  return data.map((el) => {
    const row: HaushaltsdatenRowType = {
      id: String(el.id),
      betrag: String(el.betrag),
      bereichs_bezeichnung: String(el.bereichs_bezeichnung),
      titel_bezeichnung: String(el.titel_bezeichnung),
      hauptKey: isFunktionen
        ? String(el.hauptfunktions_bezeichnung)
        : String(el.bereichs_bezeichnung),
      oberKey: isFunktionen
        ? String(el.oberfunktions_bezeichnung)
        : String(el.einzelplan_bezeichnung),
      funktionKey: isFunktionen
        ? String(el.funktions_bezeichnung)
        : String(el.kapitel_bezeichnung),
    }
    return row
  })
}

export function filterByTopic(
  data: HaushaltsdatenRowType[],
  modus: string,
  topicColumn?: TopicColumnName,
  topicValue?: string
): HaushaltsdatenRowType[] {
  if (!topicColumn || !topicValue) return data
  if (!VALID_TOPIC_COLUMNS.includes(topicColumn)) return data

  // Map TopicColumnName to the normalized key, scoped by active modus.
  // This prevents filtering by a Funktionen column when in Bereiche mode
  // (or vice versa), which would match against wrong values.
  const keyMaps: Record<string, Record<string, keyof HaushaltsdatenRowType>> = {
    Funktionen: {
      hauptfunktions_bezeichnung: 'hauptKey',
      oberfunktions_bezeichnung: 'oberKey',
      funktions_bezeichnung: 'funktionKey',
    },
    Bereiche: {
      bereichs_bezeichnung: 'hauptKey',
      einzelplan_bezeichnung: 'oberKey',
      kapitel_bezeichnung: 'funktionKey',
    },
  }

  const keyMap = keyMaps[modus]
  if (!keyMap) return data

  const rowKey = keyMap[topicColumn]
  if (!rowKey) return data

  return data.filter((row) => row[rowKey] === topicValue)
}
