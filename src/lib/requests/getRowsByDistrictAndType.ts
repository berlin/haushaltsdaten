import { DistrictLabel } from '@data/districts'
import { supabase } from '@lib/requests/createSupabaseClient'

export interface HaushaltsdatenRowType {
  id: string
  hauptKey?: string
  oberKey?: string
  funktionKey?: string
  titel_bezeichnung: string
  titel_art?: 'Einnahmetitel' | 'Ausgabetitel'
  bereichs_bezeichnung: string
  betrag: string
}

export interface GetRowsByDistrictAndTypeParamsType {
  district?: DistrictLabel
  expenseType: 'Einnahmetitel' | 'Ausgabetitel'
  year: number
  modus: string
}

export interface MapColumsFunktionType {
  id: string
  hauptKey: string
  oberKey: string
  funktionKey: string
  titel_bezeichnung: string
  bereichs_bezeichnung: string
  hauptfunktions_bezeichnung: string
  oberfunktions_bezeichnung: string
  funktions_bezeichnung: string
}

export interface MapColumsEinzelplanType {
  id: string
  hauptKey: string
  oberKey: string
  funktionKey: string
  titel_bezeichnung: string
  bereichs_bezeichnung: string
  einzelplan_bezeichnung: string
  kapitel_bezeichnung: string
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
  if (district) {
    if (modus == 'Funktionen') {
      const { data, error } = await supabase
        .from('haushaltsdaten_current')
        .select(
          'id, betrag, bereichs_bezeichnung, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
        )
        .eq('jahr', year)
        .eq('titel_art', expenseType)
        .eq('bereichs_bezeichnung', district)

      if (error) throw error

      data.map((el: MapColumsFunktionType) => {
        el.hauptKey = el.hauptfunktions_bezeichnung
        el.oberKey = el.oberfunktions_bezeichnung
        el.funktionKey = el.funktions_bezeichnung
      })

      return data as HaushaltsdatenRowType[]
    } else {
      const { data, error } = await supabase
        .from('haushaltsdaten_current')
        .select(
          'id, betrag, bereichs_bezeichnung, titel_bezeichnung, einzelplan_bezeichnung, kapitel_bezeichnung'
        )
        .eq('jahr', year)
        .eq('titel_art', expenseType)
        .eq('bereichs_bezeichnung', district)

      if (error) throw error

      data.map((el: MapColumsEinzelplanType) => {
        el.hauptKey = el.bereichs_bezeichnung
        el.oberKey = el.einzelplan_bezeichnung
        el.funktionKey = el.kapitel_bezeichnung
      })
      console.log(data)

      return data as HaushaltsdatenRowType[]
    }
  } else {
    if (modus == 'Funktionen') {
      const { data, error } = await supabase
        .from('haushaltsdaten_current')
        .select(
          'id, betrag, bereichs_bezeichnung, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
        )
        .eq('jahr', year)
        .eq('titel_art', expenseType)

      if (error) throw error
      data.map((el: MapColumsFunktionType) => {
        el.hauptKey = el.hauptfunktions_bezeichnung
        el.oberKey = el.oberfunktions_bezeichnung
        el.funktionKey = el.funktions_bezeichnung
      })

      return data as HaushaltsdatenRowType[]
    } else {
      const { data, error } = await supabase
        .from('haushaltsdaten_current')
        .select(
          'id, betrag, bereichs_bezeichnung, titel_bezeichnung, einzelplan_bezeichnung, kapitel_bezeichnung'
        )
        .eq('jahr', year)
        .eq('titel_art', expenseType)

      if (error) throw error
      data.map((el: MapColumsEinzelplanType) => {
        el.hauptKey = el.bereichs_bezeichnung
        el.oberKey = el.einzelplan_bezeichnung
        el.funktionKey = el.kapitel_bezeichnung
      })

      return data as HaushaltsdatenRowType[]
    }
  }
}
