import { useMemo } from 'react'
import {
  HaushaltsdatenRowType,
  TopicColumnName,
} from '@lib/types/haushaltsdaten'
import { filterByTopic } from '@lib/data/loadData'

interface UseListDataParamsType {
  data: HaushaltsdatenRowType[] | null
  modus: string
  topicColumn?: TopicColumnName
  topicValue?: string
}

interface UseListDataReturnType {
  isLoading: boolean
  data: HaushaltsdatenRowType[] | null
  error: Error | null
}

export const useListData = ({
  data,
  modus,
  topicColumn,
  topicValue,
}: UseListDataParamsType): UseListDataReturnType => {
  const filtered = useMemo(() => {
    if (!data) return null
    return filterByTopic(data, modus, topicColumn, topicValue)
  }, [data, modus, topicColumn, topicValue])

  return {
    isLoading: !data,
    data: filtered,
    error: null,
  }
}
