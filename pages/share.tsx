import {
  getRowsByDistrictAndType,
  GetRowsByDistrictAndTypeParamsType,
} from '@lib/requests/getRowsByDistrictAndType'
import {
  createBaseTree,
  createTreeStructure,
  TreemapHierarchyType,
} from '@lib/utils/createTreemapStructure'
import { TreeMapWithData } from '@components/TreeMap/withData'
import { mapRawQueryToState, ParsedPageQueryType } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import useDimensions from 'react-cool-dimensions'
import { districts } from '@data/districts'

const ALL_DISTRICTS_ID: keyof typeof districts = '01' // -> Alle Bereiche

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const parsedQuery = query ? mapRawQueryToState(query) : {}

  const queriedDistrictId =
    parsedQuery && parsedQuery.district && !Array.isArray(parsedQuery.district)
      ? parsedQuery.district
      : null

  const queriedType =
    typeof parsedQuery.showExpenses === 'undefined' || parsedQuery.showExpenses
      ? 'Ausgabetitel'
      : 'Einnahmetitel'

  const data = await getRowsByDistrictAndType({
    district:
      !!queriedDistrictId && queriedDistrictId !== ALL_DISTRICTS_ID
        ? districts[queriedDistrictId as keyof typeof districts]
        : undefined,
    expenseType: queriedType,
  })

  if (!data) {
    throw new Error('No data found for this request')
  }

  const hierarchyData = {
    id: 'overview',
    name: `Alle ${queriedType === 'Ausgabetitel' ? 'Ausgaben' : 'Einnahmen'}`,
    children: createTreeStructure(createBaseTree(data)),
  }

  return {
    props: {
      title: 'Visualisierung',
      query,
      queriedDistrictId: queriedDistrictId,
      queriedType: queriedType,
      hierarchyData: hierarchyData,
    },
  }
}

export const SharePage: FC<{
  query: Partial<ParsedPageQueryType>
  queriedDistrictId: keyof typeof districts
  queriedType: GetRowsByDistrictAndTypeParamsType['expenseType']
  hierarchyData: TreemapHierarchyType
}> = ({ hierarchyData }) => {
  const { observe, width, height } = useDimensions()

  return (
    <>
      <div className="w-full h-screen overflow-hidden" ref={observe}>
        {hierarchyData && width && height && (
          <TreeMapWithData
            hierarchy={hierarchyData}
            width={width}
            height={height}
          />
        )}
      </div>
    </>
  )
}

export default SharePage
