import { TreeMap } from '@components/TreeMap'
import { DUMMY_DATA, TreemapHierarchyType } from '@components/TreeMap/dummyData'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

interface HomePageProps {
  title: string
  treemapHierarchy: TreemapHierarchyType
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      title: 'Willkommen',
      treemapHierarchy: DUMMY_DATA,
    },
  }
}

export const Home: FC<HomePageProps> = ({ treemapHierarchy }) => {
  return (
    <TreeMap
      hierarchy={treemapHierarchy}
      initialLevelId="allgemeine_dienste"
      onLastLevelReached={(funktionsbezeichnung) => {
        console.log('Find all Einzeltitel for:')
        console.log(funktionsbezeichnung)
      }}
    />
  )
}

export default Home
