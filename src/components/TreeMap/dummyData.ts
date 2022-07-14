export interface TreemapHierarchyType {
  id?: string
  name: string
  children?: TreemapHierarchyType[]
  value?: number
}

export const DUMMY_DATA: TreemapHierarchyType = {
  id: 'Übersicht',
  name: 'Übersicht',
  children: [
    {
      id: 'allgemeine_dienste',
      name: 'Allgemeine Dienste HAUPT',
      children: [
        {
          id: 'politische_fuehrung',
          name: 'Politische Führung OBER',
          children: [
            {
              id: 'gehalt_abc',
              name: 'Gehalt ABC FUNKTION',
              children: [
                {
                  name: 'Gehalt ABC FUNKTION',
                  value: 300,
                },
              ],
            },
            {
              id: 'gehaltXyzFunktion',
              name: 'Gehalt XYZ FUNKTION',
              children: [
                {
                  name: 'Gehalt XYZ FUNKTION',
                  value: 400,
                },
              ],
            },
          ],
        },
        { id: 'gfhghfhOber', name: 'gfhghfh OBER', value: 452 },
      ],
    },
    {
      id: 'gesundheitHaupt',
      name: 'Gesundheit HAUPT',
      children: [
        {
          id: 'asdafd-parent',
          name: 'asdafd',
          children: [{ name: 'asdafd', value: 459 }],
        },
        {
          id: 'gfhghfh',
          name: 'gfhghfh',
          children: [
            {
              id: 'jkdkfhksdfsd',
              name: 'jkdkfhksdfsd',
              children: [
                {
                  name: 'jkdkfhksdfsd',
                  value: 453,
                },
              ],
            },
            {
              id: 'mnbmmbmb',
              name: 'mnbmmbmb',
              children: [
                {
                  name: 'mnbmmbmb',
                  value: 38,
                },
              ],
            },
            {
              id: 'wertrzrt',
              name: 'wertrzrt',
              children: [
                {
                  name: 'wertrzrt',
                  value: 100,
                },
              ],
            },
          ],
        },
        {
          id: 'bnmbnmb',
          name: 'bnmbnmb',
          children: [{ name: 'bnmbnmb', value: 125 }],
        },
        {
          id: 'jhkztj',
          name: 'jhkztj',
          children: [{ name: 'jhkztj', value: 70 }],
        },
      ],
    },
    {
      id: 'iououio',
      name: 'iououio',
      children: [
        { id: 'asds', name: 'asds', children: [{ name: 'asds', value: 433 }] },
        {
          id: 'asdasda',
          name: 'asdasda',
          children: [{ name: 'asdasda', value: 25 }],
        },
        {
          id: 'hgjhjkuh',
          name: 'hgjhjkuh',
          children: [{ name: 'hgjhjkuh', value: 853 }],
        },
        {
          id: 'dfgdggd',
          name: 'dfgdggd',
          children: [{ name: 'dfgdggd', value: 123 }],
        },
        {
          id: 'hgjhjkuh',
          name: 'hgjhjkuh',
          children: [{ name: 'hgjhjkuh', value: 200 }],
        },
        {
          id: 'dfgdggd',
          name: 'dfgdggd',
          children: [{ name: 'dfgdggd', value: 67 }],
        },
      ],
    },
  ],
}

const list = [
  {
    id: 'test',
    title:
      'Ausbildungsentgelte (Praktikantinnen/Praktikanten, Volontärinnen/Volontäre)',
    group: 'Allgemeine Dienste',
    groupColorClass: 'bg-lightblue',
    price: 1341512,
  },
  {
    id: 'test1',
    title:
      'Ausbildungsentgelte (Praktikantinnen/Praktikanten, Volontärinnen/Volontäre)',
    group: 'Allgemeine Dienste',
    groupColorClass: 'bg-lightblue',
    price: 1341512,
  },
  {
    id: 'test2',
    title:
      'Ausbildungsentgelte (Praktikantinnen/Praktikanten, Volontärinnen/Volontäre)',
    group: 'Allgemeine Dienste',
    groupColorClass: 'bg-lightblue',
    price: 1341512,
  },
  {
    id: 'test3',
    title:
      'Ausbildungsentgelte (Praktikantinnen/Praktikanten, Volontärinnen/Volontäre)',
    group: 'Allgemeine Dienste',
    groupColorClass: 'bg-lightblue',
    price: 1341512,
  },
  {
    id: 'test4',
    title:
      'Ausbildungsentgelte (Praktikantinnen/Praktikanten, Volontärinnen/Volontäre)',
    group: 'Allgemeine Dienste',
    groupColorClass: 'bg-lightblue',
    price: 1341512,
  },
]

export const DUMMY_LIST = [...list, ...list, ...list]
