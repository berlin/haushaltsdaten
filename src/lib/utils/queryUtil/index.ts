import { districts } from '@data/districts'
import { VALID_YEARS } from '../yearValidator'

export interface RawPageQueryType {
  hashId: string | null
  mainTopic: string | null
  midTopic: string | null
  deepTopic: string | null
  showExpenses: boolean | null
  district: string | null
}

export interface ParsedPageQueryType {
  hashId: string | null
  mainTopic: string | null
  midTopic: string | null
  deepTopic: string | null
  showExpenses: boolean
  district: keyof typeof districts
  year: number
  modus: string
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

const parseYear = (year: number): number | undefined => {
  return VALID_YEARS.includes(year) ? year : undefined
}

const parseString = (val: string | string[] | undefined): string | null =>
  (val && typeof val === 'string' && val.length > 0 && val) || null

const removeNull = (
  obj: Record<string, unknown | null>
): Partial<ParsedPageQueryType> => {
  Object.keys(obj).forEach(
    (k) => (obj[k] === null || typeof obj[k] === 'undefined') && delete obj[k]
  )
  return obj
}

const parseBoolean = (val: string | string[] | undefined): boolean | null =>
  val && typeof val === 'string' && val.length > 0
    ? Boolean(val === 'true')
    : null

const parseTopicPath = (
  rawQuery: Record<string, string | string[] | undefined>
): string[] | null => {
  const parsedMainTopic = parseString(rawQuery.mainTopic)
  const parsedMidTopic = parseString(rawQuery.midTopic)
  const parsedDeepTopic = parseString(rawQuery.deepTopic)

  if (parsedDeepTopic && parsedMidTopic && parsedMainTopic)
    return [parsedMainTopic, parsedMidTopic, parsedDeepTopic]
  if (!parsedDeepTopic && parsedMidTopic && parsedMainTopic)
    return [parsedMainTopic, parsedMidTopic]
  if (!parsedDeepTopic && !parsedMidTopic && parsedMainTopic)
    return [parsedMainTopic]

  return null
}

export const mapRawQueryToState = (
  rawQuery: Record<string, string | string[] | undefined>
): Partial<ParsedPageQueryType> => {
  const [mainTopic, midTopic, deepTopic] = parseTopicPath(rawQuery) || []
  return removeNull({
    hashId: typeof rawQuery.hashId === 'string' ? rawQuery.hashId : undefined,
    mainTopic,
    midTopic,
    deepTopic,
    showExpenses: parseBoolean(rawQuery.showExpenses),
    district: parseString(rawQuery.district),
    year:
      parseSingleNumber(rawQuery.year) ??
      parseYear(parseSingleNumber(rawQuery.year) as number),
    modus: parseString(rawQuery.modus),
  })
}
