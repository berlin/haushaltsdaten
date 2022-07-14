import { Button } from '@components/Button'
import { ListItem } from '@components/ListItem'
import { getMainTopicData } from '@lib/requests/getMainTopicData'
import {
  createBaseTree,
  createTreeStructure,
} from '@lib/utils/createTreemapStructure'
import { TreemapHierarchyType } from '@lib/utils/createTreemapStructure/index_OLD'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

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

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = await getMainTopicData({
    bereich: 'Hauptverwaltung',
    titelart: 'Ausgabetitel',
    hauptfunktion: 'Allgemeine Dienste',
  })

  if (!data) {
    throw new Error('No data found for this request')
  }

  const hierarchyData = createTreeStructure(createBaseTree(data))

  return {
    props: {
      title: 'Willkommen',
      query,
      hierarchy: hierarchyData,
    },
  }
}

export interface HomePropsType {
  title: string
  query: unknown
  hierarchy: TreemapHierarchyType
}

export const Home: FC<HomePropsType> = ({ hierarchy }) => {
  console.log(hierarchy)

  return (
    <>
      <h1 className="font-bold text-3xl mb-6">Übersicht</h1>
      <div className="w-full aspect-video bg-gray-300"></div>
      <h2 className="font-bold text-2xl mb-6 mt-12">Liste</h2>
      <ul className="flex flex-col gap-4">
        {[...list, ...list, ...list, ...list].map((item, idx) => (
          <ListItem key={`${item.id}-${idx}`} {...item} />
        ))}
      </ul>
      <div className="flex justify-center mt-6">
        <Button>Mehr Reihen anzeigen</Button>
      </div>
    </>
  )
}

export default Home
