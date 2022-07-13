import { districts } from '@data/districts'

export interface RawPageQueryType {
  activeTopic: string | null
  showExpenses: boolean | null
  district: string | null
}

export interface ParsedPageQueryType {
  activeTopic: string
  showExpenses: boolean
  district: keyof typeof districts
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

export const mapRawQueryToState = (
  rawQuery: Record<string, string | string[] | undefined>
): Partial<ParsedPageQueryType> =>
  removeNull({
    activeTopic: parseString(rawQuery.activeTopic),
    showExpenses: parseBoolean(rawQuery.showExpenses),
    district: parseString(rawQuery.district),
  })
