import { districts } from '@data/districts'

export interface RawPageQueryType {
  mainTopic: string | null
  midTopic: string | null
  deepTopic: string | null
  showExpenses: boolean | null
  district: string | null
}

export interface ParsedPageQueryType {
  topicPath: string[]
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
): Partial<ParsedPageQueryType> =>
  removeNull({
    topicPath: parseTopicPath(rawQuery),
    showExpenses: parseBoolean(rawQuery.showExpenses),
    district: parseString(rawQuery.district),
  })
