import {
  getMainTopicData,
  GetMainTopicDataParamsType,
  HaushaltsdatenRowType,
} from '@lib/requests/getMainTopicData'
import {
  createBaseTree,
  createTreeStructure,
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

  const data = await getMainTopicData({
    bereich:
      !!queriedDistrictId && queriedDistrictId !== ALL_DISTRICTS_ID
        ? districts[queriedDistrictId as keyof typeof districts]
        : undefined,
    titelart: queriedType,
  })

  if (!data) {
    throw new Error('No data found for this request')
  }

  // const filteredData = data.filter((row) => {
  //   if (TEST_PATH.length === 1) {
  //     return snakeCase(row.hauptfunktions_bezeichnung) === TEST_PATH[0]
  //   }
  //   if (TEST_PATH.length === 2) {
  //     return (
  //       snakeCase(row.hauptfunktions_bezeichnung) === TEST_PATH[0] &&
  //       snakeCase(row.oberfunktions_bezeichnung) === TEST_PATH[1]
  //     )
  //   }
  //   if (TEST_PATH.length === 3) {
  //     return (
  //       snakeCase(row.hauptfunktions_bezeichnung) === TEST_PATH[0] &&
  //       snakeCase(row.oberfunktions_bezeichnung) === TEST_PATH[1] &&
  //       snakeCase(row.funktions_bezeichnung) === TEST_PATH[2]
  //     )
  //   }
  // })

  return {
    props: {
      title: 'Visualisierung',
      query,
      queriedDistrictId: queriedDistrictId,
      queriedType: queriedType,
      rawData: data,
    },
  }
}

export const SharePage: FC<{
  query: Partial<ParsedPageQueryType>
  queriedDistrictId: keyof typeof districts
  queriedType: GetMainTopicDataParamsType['titelart']
  rawData: HaushaltsdatenRowType[]
}> = ({ rawData, queriedDistrictId, queriedType }) => {
  const { observe, width, height } = useDimensions()

  return (
    <>
      <div className="w-full h-screen overflow-hidden" ref={observe}>
        {rawData && width && height && (
          <TreeMapWithData
            district={districts[queriedDistrictId]}
            type={queriedType}
            hierarchy={{
              id: 'overview',
              name: 'Alle Bereiche',
              children: createTreeStructure(createBaseTree(rawData)),
            }}
            width={width}
            height={height}
          />
        )}
      </div>
    </>
  )
}

export default SharePage
