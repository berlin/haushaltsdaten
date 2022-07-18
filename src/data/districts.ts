type DistrictKey =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'

export const districts: Record<DistrictKey, string> = {
  '01': 'Alle Bereiche',
  '02': 'Hauptverwaltung',
  '03': 'Mitte',
  '04': 'Friedrichshain-Kreuzberg',
  '05': 'Pankow',
  '06': 'Charlottenburg-Wilmersdorf',
  '07': 'Spandau',
  '08': 'Steglitz-Zehlendorf',
  '09': 'Tempelhof-Schöneberg',
  '10': 'Neukölln',
  '11': 'Treptow-Köpenick',
  '12': 'Marzahn-Hellersdorf',
  '13': 'Lichtenberg Hohenschönhausen',
  '14': 'Reinickendorf',
}
