import { DistrictLabel } from '@data/districts'
import {
  getMainTopicData,
  GetMainTopicDataParamsType,
  HaushaltsdatenRowType,
} from '@lib/requests/getMainTopicData'
import useSWR from 'swr'

interface useDataParamsType {
  district?: DistrictLabel
  type: GetMainTopicDataParamsType['titelart']
  initialData?: HaushaltsdatenRowType[]
}

interface useDataReturnType {
  isLoading: boolean
  data: HaushaltsdatenRowType[] | null
  error: Error | null
}

export const useData = ({
  district,
  type,
  initialData,
}: useDataParamsType): useDataReturnType => {
  const params = [`${district || 'Alle Bereiche'} - ${type}`]
  const { data, error } = useSWR<HaushaltsdatenRowType[] | undefined, Error>(
    params,
    () =>
      getMainTopicData({
        bereich: district,
        titelart: type,
      }),
    { fallbackData: initialData }
  )

  return {
    isLoading: !data && !error,
    data: data || null,
    error: error || null,
  }
}
