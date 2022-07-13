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

export const districts: Record<DistrictKey, string> = {
  '01': 'Mitte',
  '02': 'Friedrichshain-Kreuzberg',
  '03': 'Pankow',
  '04': 'Charlottenburg-Wilmersdorf',
  '05': 'Spandau',
  '06': 'Steglitz-Zehlendorf',
  '07': 'Tempelhof-Schöneberg',
  '08': 'Neukölln',
  '09': 'Treptow-Köpenick',
  '10': 'Marzahn-Hellersdorf',
  '11': 'Lichtenberg Hohenschönhausen',
  '12': 'Reinickendorf',
}
