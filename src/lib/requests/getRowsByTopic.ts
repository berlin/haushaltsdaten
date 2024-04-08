import { DistrictLabel } from '@data/districts'
import { supabase } from '@lib/requests/createSupabaseClient'
import {
  HaushaltsdatenRowType,
  MapColumsFunktionType,
  MapColumsEinzelplanType,
} from './getRowsByDistrictAndType'

export type TopicColumnName =
  | 'hauptfunktions_bezeichnung'
  | 'oberfunktions_bezeichnung'
  | 'funktions_bezeichnung'
  | 'bereichs_bezeichnung'
  | 'einzelplan_bezeichnung'
  | 'kapitel_bezeichnung'

export interface GetRowsByTopicParamsType {
  district?: DistrictLabel
  expenseType: 'Einnahmetitel' | 'Ausgabetitel'
  year: number
  modus: string
  topicColumn?: TopicColumnName
  topicValue?: string
}

/**
 * Retrieves rows from the Haushaltdaten based on the provided topicKey and topicValue. `topicKey` may be one of `hauptfunktions_bezeichnung`, `oberfunktions_bezeichnung`, and `funktions_bezeichnung`.
 */
export const getRowsByTopic = async ({
  district,
  expenseType,
  year,
  modus,
  topicColumn,
  topicValue,
}: GetRowsByTopicParamsType): Promise<HaushaltsdatenRowType[] | undefined> => {
  if (!!district && !!topicColumn && !!topicValue) {
    if (modus == 'Funktionen') {
      const { data, error } = await supabase
        .from('haushaltsdaten_current')
        .select(
          'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
        )
        .eq('jahr', year)
        .eq('titel_art', expenseType)
        .eq('bereichs_bezeichnung', district)
        .eq(topicColumn, topicValue)
        .order('id', { ascending: false })

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
          'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, einzelplan_bezeichnung, kapitel_bezeichnung'
        )
        .eq('jahr', year)
        .eq('titel_art', expenseType)
        .eq('bereichs_bezeichnung', district)
        .eq(topicColumn, topicValue)
        .order('id', { ascending: false })

      if (error) throw error
      data.map((el: MapColumsEinzelplanType) => {
        el.hauptKey = el.bereichs_bezeichnung
        el.oberKey = el.einzelplan_bezeichnung
        el.funktionKey = el.kapitel_bezeichnung
      })

      return data as HaushaltsdatenRowType[]
    }
  } else if (!!topicColumn && !!topicValue) {
    if (modus == 'Funktionen') {
      const { data, error } = await supabase
        .from('haushaltsdaten_current')
        .select(
          'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
        )
        .eq('jahr', year)
        .eq('titel_art', expenseType)
        .eq(topicColumn, topicValue)
        .order('id', { ascending: false })

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
          'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, einzelplan_bezeichnung, kapitel_bezeichnung'
        )
        .eq('jahr', year)
        .eq('titel_art', expenseType)
        .eq(topicColumn, topicValue)
        .order('id', { ascending: false })

      if (error) throw error
      data.map((el: MapColumsEinzelplanType) => {
        el.hauptKey = el.bereichs_bezeichnung
        el.oberKey = el.einzelplan_bezeichnung
        el.funktionKey = el.kapitel_bezeichnung
      })

      return data as HaushaltsdatenRowType[]
    }
  } else if (district && !topicColumn && !topicValue) {
    if (modus == 'Funktionen') {
      const { data, error } = await supabase
        .from('haushaltsdaten_current')
        .select(
          'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
        )
        .eq('jahr', year)
        .eq('titel_art', expenseType)
        .eq('bereichs_bezeichnung', district)
        .order('id', { ascending: false })

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
          'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, einzelplan_bezeichnung, kapitel_bezeichnung'
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

      return data as HaushaltsdatenRowType[]
    }
  } else {
    if (modus == 'Funktionen') {
      const { data, error } = await supabase
        .from('haushaltsdaten_current')
        .select(
          'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
        )
        .eq('jahr', year)
        .eq('titel_art', expenseType)
        .order('id', { ascending: false })

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
          'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, einzelplan_bezeichnung, kapitel_bezeichnung'
        )
        .eq('jahr', year)
        .eq('titel_art', expenseType)
        .order('id', { ascending: false })

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
