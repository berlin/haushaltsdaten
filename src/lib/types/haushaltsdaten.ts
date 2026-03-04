import { DistrictLabel } from '@data/districts'

export interface HaushaltsdatenRowType {
  id: string
  hauptKey: string
  oberKey: string
  funktionKey: string
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

export type TopicColumnName =
  | 'hauptfunktions_bezeichnung'
  | 'oberfunktions_bezeichnung'
  | 'funktions_bezeichnung'
  | 'bereichs_bezeichnung'
  | 'einzelplan_bezeichnung'
  | 'kapitel_bezeichnung'

export const VALID_TOPIC_COLUMNS: string[] = [
  'hauptfunktions_bezeichnung',
  'oberfunktions_bezeichnung',
  'funktions_bezeichnung',
  'bereichs_bezeichnung',
  'einzelplan_bezeichnung',
  'kapitel_bezeichnung',
]

export interface FilteredSearchResultsType {
  id: string
  titel_bezeichnung: string
  titel_art?: 'Einnahmetitel' | 'Ausgabetitel'
  bereichs_bezeichnung: string
  betrag: string
  jahr: string
  titel: string
  oberfunktions_bezeichnung: string
  hauptfunktions_bezeichnung: string
  funktions_bezeichnung: string
  obergruppen_bezeichnung: string
  hauptgruppen_bezeichnung: string
  gruppen_bezeichnung: string
  einzelplan_bezeichnung: string
  kapitel_bezeichnung: string
}
