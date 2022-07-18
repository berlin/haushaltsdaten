import { Button } from '@components/Button'
import { ListItem } from '@components/ListItem'
import snakeCase from 'just-snake-case'
import { getMainTopicData } from '@lib/requests/getMainTopicData'
import {
  createBaseTree,
  createTreeStructure,
  TreemapHierarchyType,
} from '@lib/utils/createTreemapStructure'
import { TreeMapWithData } from '@components/TreeMap/withData'
import { ParsedPageQueryType } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import useDimensions from 'react-cool-dimensions'

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

  const hierarchyData = {
    id: 'overview',
    name: 'Übersicht',
    children: createTreeStructure(createBaseTree(data)),
  }

  return {
    props: {
      title: 'Willkommen',
      query,
      hierarchy: hierarchyData,
      data: data
        .map((item) => ({
          id: item.id,
          title: item.einzelplan_bezeichnung,
          amount: parseInt(item.betrag, 10),
          group: item.hauptfunktions_bezeichnung,
          groupId: snakeCase(item.hauptfunktions_bezeichnung),
        }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 100),
    },
  }
}

export const Home: FC<{
  query: Partial<ParsedPageQueryType>
  hierarchy: TreemapHierarchyType
  data: {
    id: string
    title: string
    amount: number
    group: string
    groupId: string
  }[]
}> = ({ hierarchy, data }) => {
  const { observe, width, height } = useDimensions()

  return (
    <>
      <div className="min-h-screen px-8 pt-28 pb-12">
        <div className="container mx-auto">
          <div className="w-full h-[80vh] overflow-hidden" ref={observe}>
            {width && height && (
              <TreeMapWithData
                hierarchy={hierarchy}
                width={width}
                height={height}
              />
            )}
          </div>
          <h2 className="font-bold text-2xl mb-6 mt-12">Liste</h2>
          <ul className="flex flex-col gap-4">
            {(data || []).map((item) => (
              <ListItem
                key={item.id}
                title={item.title}
                id={item.id}
                group={item.group}
                groupColorClass="bg-lightblue"
                price={item.amount}
              />
            ))}
          </ul>
          <div className="flex justify-center mt-6">
            <Button>Mehr Reihen anzeigen</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
