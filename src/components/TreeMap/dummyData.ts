export interface TreemapHierarchyType {
  id?: string
  name: string
  children?: TreemapHierarchyType[]
  value?: number
}

export const DUMMY_DATA: TreemapHierarchyType = {
  name: 'Übersicht',
  children: [
    {
      id: 'allgemeine_dienste',
      name: 'Allgemeine Dienste HAUPT',
      children: [
        {
          name: 'Politische Führung OBER',
          children: [
            {
              id: 'isdsadasda',
              name: 'Gehalt ABC FUNKTION',
              children: [
                {
                  name: 'Gehalt ABC FUNKTION',
                  value: 300,
                },
              ],
            },
            {
              name: 'Gehalt XYZ FUNKTION',
              value: 400,
            },
          ],
        },
        { name: 'gfhghfh OBER', value: 452 },
      ],
    },
    {
      name: 'Gesundheit HAUPT',
      children: [
        { name: 'asdafd', value: 459 },
        {
          name: 'gfhghfh',
          children: [
            {
              name: 'jkdkfhksdfsd',
              value: 453,
            },
            {
              name: 'mnbmmbmb',
              value: 38,
            },
            {
              name: 'wertrzrt',
              value: 100,
            },
          ],
        },
        { name: 'bnmbnmb', value: 125 },
        { name: 'jhkztj', value: 70 },
      ],
    },
    {
      name: 'iououio',
      children: [
        { name: 'asds', value: 433 },
        { name: 'asdasda', value: 25 },
        { name: 'hgjhjkuh', value: 853 },
        { name: 'dfgdggd', value: 123 },
        { name: 'hgjhjkuh', value: 200 },
        { name: 'dfgdggd', value: 67 },
      ],
    },
  ],
}
