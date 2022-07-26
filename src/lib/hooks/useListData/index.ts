import { DistrictLabel } from '@data/districts'
import {
  GetRowsByDistrictAndTypeParamsType,
  HaushaltsdatenRowType,
} from '@lib/requests/getRowsByDistrictAndType'
import { getRowsByTopic, TopicColumnName } from '@lib/requests/getRowsByTopic'
import useSWR from 'swr'

interface useListDataParamsType {
  district?: DistrictLabel
  type: GetRowsByDistrictAndTypeParamsType['expenseType']
  year: number
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
  year,
  topicColumn,
  topicValue,
  initialData,
}: useListDataParamsType): useListDataReturnType => {
  const params = [
    `${year} - ${district || 'Alle Bereiche'} - ${type} - ${
      topicColumn || 'Alle Spalten'
    } - ${topicValue || 'Alle Werte'}`,
  ]
  const { data, error } = useSWR<HaushaltsdatenRowType[] | undefined, Error>(
    params,
    () =>
      getRowsByTopic({
        district: district,
        expenseType: type,
        year: year,
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
