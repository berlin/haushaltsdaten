import { DistrictLabel } from '@data/districts'
import { supabase } from '@lib/requests/createSupabaseClient'

export interface HaushaltsdatenRowType {
  id: string
  hauptfunktions_bezeichnung: string
  oberfunktions_bezeichnung: string
  funktions_bezeichnung: string
  titel_bezeichnung: string
  bereichs_bezeichnung: string
  betrag: string
}

export interface GetRowsByDistrictAndTypeParamsType {
  district?: DistrictLabel
  expenseType: 'Einnahmetitel' | 'Ausgabetitel'
}

/**
 * Retrieves rows from the Haushaltdaten based on the provided `district` and `expenseType`. There is no further filtering as to which topic group the rows belong to.
 */
export const getRowsByDistrictAndType = async ({
  district,
  expenseType,
}: GetRowsByDistrictAndTypeParamsType): Promise<
  HaushaltsdatenRowType[] | undefined
> => {
  if (district) {
    const { data, error } = await supabase
      .from('haushaltsdaten_2022')
      .select(
        'id, betrag, bereichs_bezeichnung, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
      )
      .eq('jahr', '2022')
      .eq('titel_art', expenseType)
      .eq('bereichs_bezeichnung', district)

    if (error) throw error

    return data as HaushaltsdatenRowType[]
  } else {
    const { data, error } = await supabase
      .from('haushaltsdaten_2022')
      .select(
        'id, betrag, bereichs_bezeichnung, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
      )
      .eq('jahr', '2022')
      .eq('titel_art', expenseType)

    if (error) throw error

    return data as HaushaltsdatenRowType[]
  }
}
