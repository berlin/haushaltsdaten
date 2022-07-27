import { DistrictLabel } from '@data/districts'
import {
  getRowsByDistrictAndType,
  GetRowsByDistrictAndTypeParamsType,
  HaushaltsdatenRowType,
} from '@lib/requests/getRowsByDistrictAndType'
import useSWR from 'swr'

interface useDataParamsType {
  district?: DistrictLabel
  type: GetRowsByDistrictAndTypeParamsType['expenseType']
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
      getRowsByDistrictAndType({
        district: district,
        expenseType: type,
      }),
    { fallbackData: initialData }
  )

  return {
    isLoading: !data && !error,
    data: data || null,
    error: error || null,
  }
}
