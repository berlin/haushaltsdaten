import { ListItem } from '@components/ListItem'
import snakeCase from 'just-snake-case'
import {
  getMainTopicData,
  GetMainTopicDataParamsType,
  HaushaltsdatenRowType,
} from '@lib/requests/getMainTopicData'
import {
  createBaseTree,
  createTreeStructure,
  TreemapHierarchyType,
} from '@lib/utils/createTreemapStructure'
import { TreeMapWithData } from '@components/TreeMap/withData'
import { mapRawQueryToState, ParsedPageQueryType } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import { FC, useState } from 'react'
import useDimensions from 'react-cool-dimensions'
import { TreeMapControls } from '@components/TreeMapControls'
import classNames from 'classnames'
import { districts } from '@data/districts'
import { useListData } from '@lib/hooks/useListData'
import {
  mapTopicDepthToColumn,
  TopicDepth,
} from '@lib/utils/mapTreemapDepthToColumn'
import { getColorByMainTopic } from '@components/TreeMap/colors'
import { useRouter } from 'next/router'

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

  const hierarchyData = {
    id: 'overview',
    name: `Alle ${queriedType === 'Ausgabetitel' ? 'Ausgaben' : 'Einnahmen'}`,
    children: createTreeStructure(createBaseTree(data)),
  }

  const initialListData = data
    .sort((a, b) => parseInt(b.betrag, 10) - parseInt(a.betrag, 10))
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

export interface TopicType {
  topicDepth?: TopicDepth
  topicLabel?: string
}

export const Visualization: FC<{
  query: Partial<ParsedPageQueryType>
  queriedDistrictId: keyof typeof districts
  queriedType: GetMainTopicDataParamsType['titelart']
  hierarchyData: TreemapHierarchyType
  initialListData: HaushaltsdatenRowType[]
}> = ({ queriedDistrictId, queriedType, hierarchyData, initialListData }) => {
  const { observe, width, height } = useDimensions()
  const { push, pathname } = useRouter()

  const [topic, setTopic] = useState<TopicType>({})

  const {
    error,
    isLoading,
    data: listData,
  } = useListData({
    district:
      queriedDistrictId && queriedDistrictId !== ALL_DISTRICTS_ID
        ? districts[queriedDistrictId]
        : undefined,
    type: queriedType,
    topicColumn: topic?.topicDepth
      ? mapTopicDepthToColumn(topic.topicDepth)
      : undefined,
    topicValue: topic.topicLabel || undefined,
    initialData: initialListData,
  })

  return (
    <>
      <div className="min-h-screen px-4 xl:px-8 pb-12">
        <div
          className={classNames(
            'container mx-auto',
            'sticky top-0',
            'py-4',
            'bg-white',
            'border-b border-gray-200'
          )}
        >
          <TreeMapControls
            district={queriedDistrictId}
            onChange={(newQuery) => {
              // When resetting type or district, we want to clear the topic
              // as well, so that the list view displays items from every
              // topic again:
              setTopic({})

              void push({ pathname, query: newQuery }, undefined, {
                shallow: false,
              })
            }}
          />
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
                onChangeLevel={(level) => {
                  setTopic(level)
                }}
              />
            )}
          </div>
          <h2 className="font-bold text-2xl mb-6 mt-12">
            {queriedType === 'Ausgabetitel'
              ? 'Höchste Ausgaben'
              : 'Höchste Einnahmen'}
          </h2>
          <ul className="flex flex-col gap-4">
            {!error &&
              !isLoading &&
              (listData || [])
                .map((item) => ({
                  id: item.id,
                  title: item.titel_bezeichnung,
                  amount: parseInt(item.betrag, 10),
                  group: item.hauptfunktions_bezeichnung,
                  groupId: snakeCase(item.hauptfunktions_bezeichnung),
                  district: item.bereichs_bezeichnung,
                }))
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 100)
                .map((item) => (
                  <ListItem
                    key={item.id}
                    title={item.title}
                    id={item.id}
                    group={item.group}
                    groupColor={getColorByMainTopic(item.group)}
                    district={item.district}
                    price={item.amount}
                  />
                ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Visualization
