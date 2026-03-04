import { useMemo } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { HaushaltsdatenRowType } from '@lib/types/haushaltsdaten'
import {
  RawDataRow,
  getDataUrl,
  parseDataSlice,
  mapModusKeys,
} from '@lib/data/loadData'

interface VersionData {
  hash: string
}

interface UseHaushaltsdatenParams {
  year: number
  expenseType: 'Einnahmetitel' | 'Ausgabetitel'
  districtKey: string
  modus: string
}

interface UseHaushaltsdatenReturn {
  data: HaushaltsdatenRowType[] | null
  rawData: RawDataRow[] | null
  isLoading: boolean
  error: Error | null
}

const jsonFetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.json() as Promise<T>
}

export const useHaushaltsdaten = ({
  year,
  expenseType,
  districtKey,
  modus,
}: UseHaushaltsdatenParams): UseHaushaltsdatenReturn => {
  const { basePath } = useRouter()

  // Fetch version.json to get the build hash (cached across session)
  const { data: version } = useSWR<VersionData>(
    `${basePath}/data/version.json`,
    jsonFetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  )

  // Build the data URL once we have the hash
  const dataUrl = version
    ? getDataUrl(basePath, version.hash, year, expenseType, districtKey)
    : null

  // Fetch the data file
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: rawData, error } = useSWR<RawDataRow[]>(
    dataUrl,
    async (url: string) => {
      const raw = (await jsonFetcher<unknown>(url)) as Parameters<
        typeof parseDataSlice
      >[0]
      return parseDataSlice(raw, districtKey)
    },
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  )

  // Apply modus mapping (pure function, no re-fetch on modus change)
  const data = useMemo(() => {
    if (!rawData) return null
    return mapModusKeys(rawData, modus)
  }, [rawData, modus])

  return {
    data,
    rawData: rawData || null,
    isLoading: !data && !error,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    error: (error as Error) || null,
  }
}
