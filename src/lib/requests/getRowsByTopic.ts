import { DistrictLabel } from '@data/districts'
import { supabase } from '@lib/requests/createSupabaseClient'
import { HaushaltsdatenRowType } from './getMainTopicData'

export type TopicColumnName =
  | 'hauptfunktions_bezeichnung'
  | 'oberfunktions_bezeichnung'
  | 'funktions_bezeichnung'

export interface GetRowsByTopicParamsType {
  bereich?: DistrictLabel
  titelart: 'Einnahmetitel' | 'Ausgabetitel'
  topicColumn?: TopicColumnName
  topicValue?: string
}

/**
 * Retrieves rows from the Haushaltdaten based on the provided topicKey and topicValue.
 * topicKey may be one of hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung.
 */
export const getRowsByTopic = async ({
  bereich,
  titelart,
  topicColumn,
  topicValue,
}: GetRowsByTopicParamsType): Promise<HaushaltsdatenRowType[] | undefined> => {
  if (!!bereich && !!topicColumn && !!topicValue) {
    const { data, error } = await supabase
      .from('haushaltsdaten_2022')
      .select(
        'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
      )
      .eq('jahr', '2022')
      .eq('titel_art', titelart)
      .eq('bereichs_bezeichnung', bereich)
      .eq(topicColumn, topicValue)

    if (error) throw error

    return data as HaushaltsdatenRowType[]
  } else if (!!topicColumn && !!topicValue) {
    const { data, error } = await supabase
      .from('haushaltsdaten_2022')
      .select(
        'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
      )
      .eq('jahr', '2022')
      .eq('titel_art', titelart)
      .eq(topicColumn, topicValue)

    if (error) throw error

    return data as HaushaltsdatenRowType[]
  } else if (bereich && !topicColumn && !topicValue) {
    const { data, error } = await supabase
      .from('haushaltsdaten_2022')
      .select(
        'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
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
        'id, betrag, bereichs_bezeichnung, titel_art, titel_bezeichnung, hauptfunktions_bezeichnung, oberfunktions_bezeichnung, funktions_bezeichnung'
      )
      .eq('jahr', '2022')
      .eq('titel_art', titelart)

    if (error) throw error

    return data as HaushaltsdatenRowType[]
  }
}
