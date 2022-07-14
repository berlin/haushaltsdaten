import { DUMMY_DATA, TreemapHierarchyType } from '@components/TreeMap/dummyData'
import { TreeMapWithData } from '@components/TreeMap/withData'
import { ParsedPageQueryType } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import useDimensions from 'react-cool-dimensions'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const hierarchy = DUMMY_DATA
  return {
    props: {
      title: 'Das Graphic Teilen',
      query,
      hierarchy,
    },
  }
}

export const Home: FC<{
  query: ParsedPageQueryType
  hierarchy: TreemapHierarchyType
}> = ({ hierarchy }) => {
  const { observe, width, height } = useDimensions()

  return (
    <div className="w-screen h-screen" ref={observe}>
      {width && height && (
        <TreeMapWithData hierarchy={hierarchy} width={width} height={height} />
      )}
    </div>
  )
}

export default Home
