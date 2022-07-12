import { NumberHourType } from '@lib/hooks/useCurrentTime'

export interface PageQueryType {
  latitude: number | null
  longitude: number | null
  zoom: number | null
  places: number[] | null
  showShadows: boolean | null
  showTemperature: boolean | null
  showWind: boolean | null
  visibleHour: NumberHourType | null
  searchTerm: string | null
}

const isNumber = (val: unknown): boolean =>
  !Number.isNaN(val) && Number.isInteger(parseFloat(String(val)))

const parseSingleNumber = (
  val: string | string[] | undefined
): number | null => {
  if (!val) return null
  if (typeof val === 'string') return parseFloat(val) || null
  if (isNumber(val)) return Number(val)
  return null
}

const parseString = (val: string | string[] | undefined): string | null =>
  (val && typeof val === 'string' && val.length > 0 && val) || null

const removeNull = (
  obj: Record<string, unknown | null>
): Partial<PageQueryType> => {
  Object.keys(obj).forEach(
    (k) => (obj[k] === null || typeof obj[k] === 'undefined') && delete obj[k]
  )
  return obj
}

export const mapRawQueryToState = (
  rawQuery: Record<string, string | string[] | undefined>
): Partial<PageQueryType> =>
  removeNull({
    latitude: parseSingleNumber(rawQuery.latitude),
    longitude: parseSingleNumber(rawQuery.longitude),
    zoom: parseSingleNumber(rawQuery.zoom),
    searchTerm: parseString(rawQuery.searchTerm),
  })
