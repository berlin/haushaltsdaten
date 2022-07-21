import { Button } from '@components/Button'
import { ListItem } from '@components/ListItem'
import snakeCase from 'just-snake-case'
import {
  getMainTopicData,
  GetMainTopicDataParamsType,
} from '@lib/requests/getMainTopicData'
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
import { TreeMapControls } from '@components/TreeMapControls'
import classNames from 'classnames'
import { districts } from '@data/districts'

const ALL_DISTRICTS_ID: keyof typeof districts = '01' // -> Alle Bereiche

interface ListDataType {
  id: string
  title: string
  amount: number
  group: string
  groupId: string
}

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

  const hierarchyData = {
    id: 'overview',
    name: 'Alle Bereiche',
    children: createTreeStructure(createBaseTree(data)),
  }

  const initialListData = data
    .map((item) => ({
      id: item.id,
      title: item.titel_bezeichnung,
      amount: parseInt(item.betrag, 10),
      group: item.hauptfunktions_bezeichnung,
      groupId: snakeCase(item.hauptfunktions_bezeichnung),
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 100)

  return {
    props: {
      title: 'Visualisierung',
      query,
      queriedDistrictId: queriedDistrictId,
      queriedType: queriedType,
      hierarchyData: hierarchyData,
      initialListData: initialListData,
    },
  }
}

export const Visualization: FC<{
  query: Partial<ParsedPageQueryType>
  queriedDistrictId: keyof typeof districts
  queriedType: GetMainTopicDataParamsType['titelart']
  hierarchyData: TreemapHierarchyType
  initialListData: ListDataType[]
}> = ({ queriedDistrictId, queriedType, hierarchyData, initialListData }) => {
  const { observe, width, height } = useDimensions()

  return (
    <>
      <div className="min-h-screen px-8 pb-12">
        <div
          className={classNames(
            'container mx-auto',
            'sticky top-0',
            'py-4',
            'bg-white',
            'border-b border-gray-200'
          )}
        >
          <TreeMapControls district={queriedDistrictId} />
        </div>
        <div className="container mx-auto mt-6">
          <div className="w-full h-[80vh] overflow-hidden" ref={observe}>
            {hierarchyData && width && height && (
              <TreeMapWithData
                hierarchy={hierarchyData}
                district={districts[queriedDistrictId]}
                type={queriedType}
                width={width}
                height={height}
                onChangeLevel={() => undefined}
              />
            )}
          </div>
          <h2 className="font-bold text-2xl mb-6 mt-12">Liste</h2>
          <ul className="flex flex-col gap-4">
            {(initialListData || []).map((item) => (
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

export default Visualization
