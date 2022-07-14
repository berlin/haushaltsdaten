import { Button } from '@components/Button'
import { ListItem } from '@components/ListItem'
import { TreeMap } from '@components/TreeMap'
import { DUMMY_DATA, TreemapHierarchyType } from '@components/TreeMap/dummyData'
import { mapRawQueryToState, ParsedPageQueryType } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import useDimensions from 'react-cool-dimensions'

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
  const hierarchy = DUMMY_DATA
  return {
    props: {
      title: 'Willkommen',
      query,
      hierarchy,
    },
  }
}

export const Home: FC<{
  query: ParsedPageQueryType
  hierarchy: TreemapHierarchyType
}> = ({ query, hierarchy }) => {
  const { push, reload, pathname } = useRouter()
  const { topicPath, ...queryRest } = query
  const { observe, width, height } = useDimensions()
  return (
    <>
      <div className="aspect-video overflow-hidden" ref={observe}>
        {width && height && (
          <TreeMap
            width={width}
            height={height}
            breadcrumbsToDesiredLevel={topicPath}
            hierarchy={hierarchy}
            onChange={(newPath: string[]) => {
              void push(
                {
                  pathname,
                  query: {
                    ...queryRest,
                    mainTopic: newPath[0],
                    midTopic: newPath[1],
                    deepTopic: newPath[2],
                  },
                },
                undefined,
                { shallow: true }
              )
            }}
            onZoomout={(newPath: string[]) => {
              void push(
                {
                  pathname,
                  query: {
                    ...queryRest,
                    mainTopic: newPath[0],
                    midTopic: newPath[1],
                    deepTopic: newPath[2],
                  },
                },
                undefined,
                { shallow: true }
              ).then(reload)
            }}
          />
        )}
      </div>
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
