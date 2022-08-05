import { TopicColumnName } from '@lib/requests/getRowsByTopic'

/**
 * The TopicDepth describes the depth of the current level within the treemap.
 * 1 = most shallow level. 3 = deepest level.
 */
export type TopicDepth = 1 | 2 | 3

export const mapTopicDepthToColumn = (
  depth: number,
  modus: string
): TopicColumnName | undefined => {
  console.log(modus)
  if (modus=='Funktionen') {
    switch (true) {
      case depth === 1:
        return 'hauptfunktions_bezeichnung'
      case depth === 2:
        return 'oberfunktions_bezeichnung'
      case depth === 3:
        return 'funktions_bezeichnung'
      default:
        return undefined
    }
  } else {
    switch (true) {
      case depth === 1:
        return 'bereichs_bezeichnung'
      case depth === 2:
        return 'einzelplan_bezeichnung'
      case depth === 3:
        return 'kapitel_bezeichnung'
      default:
        return undefined
    }
  }
}
