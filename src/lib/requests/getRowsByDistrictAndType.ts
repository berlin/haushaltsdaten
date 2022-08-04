import { DistrictLabel } from '@data/districts'
import { supabase } from '@lib/requests/createSupabaseClient'

export interface HaushaltsdatenRowType {
  id: string
  hauptfunktions_bezeichnung: string
  oberfunktions_bezeichnung: string
  funktions_bezeichnung: string
  titel_bezeichnung: string
  titel_art?: 'Einnahmetitel' | 'Ausgabetitel'
  bereichs_bezeichnung: string
  betrag: string
}

export interface GetRowsByDistrictAndTypeParamsType {
  district?: DistrictLabel
  expenseType: 'Einnahmetitel' | 'Ausgabetitel'
  year: number
  modus: number
}

/**
 * Retrieves rows from the Haushaltdaten based on the provided `district` and `expenseType`. There is no further filtering as to which topic group the rows belong to.
 */
export const getRowsByDistrictAndType = async ({
  district,
  expenseType,
  year,
  modus,
}: GetRowsByDistrictAndTypeParamsType): Promise<
  HaushaltsdatenRowType[] | undefined
> => {
  if (district && modus==1) {
    const { data, error } = await supabase
      .from('haushaltsdaten_current')
      .select(
        'id, betrag, bereichs_bezeichnung, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
      )
      .eq('jahr', year)
      .eq('titel_art', expenseType)
      .eq('bereichs_bezeichnung', district)

    if (error) throw error

    console.log(data)

    return data as HaushaltsdatenRowType[]
  }   else if (district && modus==2) {
    const { data, error } = await supabase
      .from('haushaltsdaten_current')
      .select(
        'id, betrag, bereichs_bezeichnung, titel_bezeichnung, bezeichnung, einzelplan_bezeichnung, kapitel_bezeichnung'
      )
      .eq('jahr', year)
      .eq('titel_art', expenseType)
      .eq('bereichs_bezeichnung', district)

    if (error) throw error

    data.map((el)=>{
      el.hauptfunktions_bezeichnung = el.bereichs_bezeichnung
      el.oberfunktions_bezeichnung = el.einzelplan_bezeichnung
      el.funktions_bezeichnung = el.kapitel_bezeichnung
      delete el.text
      })
    console.log(data)
    return data as HaushaltsdatenRowType[]
  } else {
    const { data, error } = await supabase
      .from('haushaltsdaten_current')
      .select(
        'id, betrag, bereichs_bezeichnung, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
      )
      .eq('jahr', year)
      .eq('titel_art', expenseType)

    if (error) throw error

    console.log(modus)
    return data as HaushaltsdatenRowType[]
  }
}
