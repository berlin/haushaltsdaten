import { DistrictLabel } from '@data/districts'
import { supabase } from '@lib/requests/createSupabaseClient'

export interface HaushaltsdatenRowType {
  id: string
  hauptfunktions_bezeichnung: string
  oberfunktions_bezeichnung: string
  funktions_bezeichnung: string
  einzelplan_bezeichnung: string
  bereichs_bezeichnung: string
  betrag: string
}

export interface GetMainTopicDataParamsType {
  bereich?: DistrictLabel
  titelart: 'Einnahmetitel' | 'Ausgabetitel'
}

export const getMainTopicData = async ({
  bereich,
  titelart,
}: GetMainTopicDataParamsType): Promise<
  HaushaltsdatenRowType[] | undefined
> => {
  if (bereich) {
    const { data, error } = await supabase
      .from('haushaltsdaten_2022')
      .select(
        'id, betrag, bereichs_bezeichnung, einzelplan_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
      )
      .eq('jahr', '2022')
      .eq('titel_art', titelart)
      .eq('bereichs_bezeichnung', bereich)

    if (error) throw error

    return data as HaushaltsdatenRowType[]
  } else {
    const { data, error } = await supabase
      .from('haushaltsdaten_2022')
      .select(
        'id, betrag, bereichs_bezeichnung, einzelplan_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
      )
      .eq('jahr', '2022')
      .eq('titel_art', titelart)

    if (error) throw error

    return data as HaushaltsdatenRowType[]
  }
}
