import { DistrictLabel } from '@data/districts'
import {
  GetMainTopicDataParamsType,
  HaushaltsdatenRowType,
} from '@lib/requests/getMainTopicData'
import { getRowsByTopic, TopicColumnName } from '@lib/requests/getRowsByTopic'
import useSWR from 'swr'

interface useListDataParamsType {
  district?: DistrictLabel
  type: GetMainTopicDataParamsType['titelart']
  topicColumn?: TopicColumnName
  topicValue?: string
  initialData?: HaushaltsdatenRowType[]
}

interface useListDataReturnType {
  isLoading: boolean
  data: HaushaltsdatenRowType[] | null
  error: Error | null
}

export const useListData = ({
  district,
  type,
  topicColumn,
  topicValue,
  initialData,
}: useListDataParamsType): useListDataReturnType => {
  const params = [
    `${district || 'Alle Bereiche'} - ${type} - ${
      topicColumn || 'Alle Spalten'
    } - ${topicValue || 'Alle Werte'}`,
  ]
  const { data, error } = useSWR<HaushaltsdatenRowType[] | undefined, Error>(
    params,
    () =>
      getRowsByTopic({
        bereich: district,
        titelart: type,
        topicColumn: topicColumn || undefined,
        topicValue: topicValue,
      }),
    { fallbackData: initialData }
  )

  return {
    isLoading: !data && !error,
    data: data || null,
    error: error || null,
  }
}
