import { Button } from '@components/Button'
import { ListItem } from '@components/ListItem'
import { TreeMap } from '@components/TreeMap'
import {
  DUMMY_DATA,
  DUMMY_LIST,
  TreemapHierarchyType,
} from '@components/TreeMap/dummyData'
import { mapRawQueryToState, ParsedPageQueryType } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import useDimensions from 'react-cool-dimensions'

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
}> = ({ hierarchy }) => {
  const { push, reload, query, pathname } = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mainTopic, midTopic, deepTopic, ...queryRest } =
    mapRawQueryToState(query)
  const { observe, width, height } = useDimensions()

  const onChangePath = useCallback(
    (newPath: string[]) =>
      push(
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
      ),
    [pathname, push, queryRest]
  )

  return (
    <>
      <div className="aspect-video overflow-hidden" ref={observe}>
        {width && height && (
          <TreeMap
            width={width}
            height={height}
            breadcrumbsToDesiredLevel={
              [mainTopic, midTopic, deepTopic].filter(Boolean) as string[]
            }
            hierarchy={hierarchy}
            onChange={onChangePath}
            onZoomout={(newPath: string[]) => {
              void onChangePath(newPath).then(reload)
            }}
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
    </>
  )
}

export default Home
