import { Button } from '@components/Button'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { ListItem } from '@components/ListItem'
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
import { DUMMY_LIST } from '@components/TreeMap/dummyData'

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
    },
  }
}

export const Home: FC<{
  query: Partial<ParsedPageQueryType>
  hierarchy: TreemapHierarchyType
}> = ({ query, hierarchy }) => {
  const { observe, width, height } = useDimensions()

  return (
    <>
      <Header {...query} />
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
            {DUMMY_LIST.map((item, idx) => (
              <ListItem key={`${item.id}-${idx}`} {...item} />
            ))}
          </ul>
          <div className="flex justify-center mt-6">
            <Button>Mehr Reihen anzeigen</Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home
