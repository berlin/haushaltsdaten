import { ListItem } from '@components/ListItem'
import snakeCase from 'just-snake-case'
import {
  getRowsByDistrictAndType,
  GetRowsByDistrictAndTypeParamsType,
  HaushaltsdatenRowType,
} from '@lib/requests/getRowsByDistrictAndType'
import {
  createBaseTree,
  createTreeStructure,
  TreemapHierarchyType,
} from '@lib/utils/createTreemapStructure'
import { TreeMapWithData } from '@components/TreeMap/withData'
import { mapRawQueryToState, ParsedPageQueryType } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import { FC, useState, useEffect } from 'react'
import useDimensions from 'react-cool-dimensions'
import { TreeMapControls } from '@components/TreeMapControls'
import classNames from 'classnames'
import { districts } from '@data/districts'
import { useListData } from '@lib/hooks/useListData'
import {
  mapTopicDepthToColumn,
  TopicDepth,
} from '@lib/utils/mapTopicDepthToColumn'
import { getColorByMainTopic } from '@components/TreeMap/colors'
import { useRouter } from 'next/router'
import { EmbeddPopup } from '@components/EmbeddPopup'
import { DEFAULT_YEAR, isValidYear } from '@lib/utils/yearValidator'
import { DEFAULT_MODUS, isValidModus } from '@lib/utils/modusValidator'
import { Button } from '@components/Button'

const ALL_DISTRICTS_ID: keyof typeof districts = '01' // -> Alle Bereiche
const MAX_ROWS = 100

const isValidTopicDepth = (depthToCheck: number): boolean => {
  const VALID_DEPTHS: TopicDepth[] = [1, 2, 3]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return VALID_DEPTHS.includes(depthToCheck)
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

  const queriedYear = parsedQuery.year
  const queriedModus = parsedQuery.modus

  const data = await getRowsByDistrictAndType({
    district:
      !!queriedDistrictId && queriedDistrictId !== ALL_DISTRICTS_ID
        ? districts[queriedDistrictId as keyof typeof districts]
        : undefined,
    expenseType: queriedType,
    year: queriedYear && isValidYear(queriedYear) ? queriedYear : DEFAULT_YEAR,
    modus:
      queriedModus && isValidModus(queriedModus) ? queriedModus : DEFAULT_MODUS,
  })

  if (!data) {
    throw new Error('No data found for this request')
  }

  const hierarchyData = {
    id: 'overview',
    name: `Gesamt${queriedType === 'Ausgabetitel' ? 'ausgaben' : 'einnahmen'}`,
    children: createTreeStructure(createBaseTree(data)),
  }

  const initialListData = data
    .sort((a, b) => parseInt(b.betrag, 10) - parseInt(a.betrag, 10))
    .slice(0, MAX_ROWS)

  return {
    props: {
      title: 'Visualisierung',
      query,
      queriedYear: queriedYear || DEFAULT_YEAR,
      queriedModus: queriedModus || DEFAULT_MODUS,
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
  queriedYear: number
  queriedModus: string
  queriedDistrictId: keyof typeof districts
  queriedType: GetRowsByDistrictAndTypeParamsType['expenseType']
  hierarchyData: TreemapHierarchyType
  initialListData: HaushaltsdatenRowType[]
}> = ({
  queriedYear,
  queriedModus,
  queriedDistrictId,
  queriedType,
  hierarchyData,
  initialListData,
}) => {
  const { observe, width, height } = useDimensions()
  const { push, pathname } = useRouter()

  const [topic, setTopic] = useState<TopicType>({})
  const [visibleRows, setVisibleRows] = useState<number>(MAX_ROWS)
  const loadMoreRows = (): void => {
    const listDataLength = (listData || []).length
    const rowsToAdd = 10
    setVisibleRows(
      visibleRows + rowsToAdd >= listDataLength
        ? listDataLength
        : visibleRows + rowsToAdd
    )
  }

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
    year: queriedYear,
    modus: queriedModus,
    topicColumn:
      topic?.topicDepth && isValidTopicDepth(topic.topicDepth)
        ? mapTopicDepthToColumn(topic.topicDepth, queriedModus)
        : undefined,
    topicValue:
      topic.topicLabel &&
      topic?.topicDepth &&
      isValidTopicDepth(topic?.topicDepth)
        ? topic.topicLabel
        : undefined,
    initialData: initialListData,
  })

  useEffect(() => {
    const listDataLength = (listData || []).length
    // show all rows if dataLength is less or equal MAX_ROWS - otherwise show MAX_ROWS
    setVisibleRows(listDataLength <= MAX_ROWS ? listDataLength : MAX_ROWS)
  }, [listData])

  return (
    <>
      <div className="min-h-screen pb-12">
        <div
          className={classNames(
            'w-full',
            'sticky top-0',
            'px-4 py-5 sm:py-4',
            'bg-white',
            'border-b border-gray-200 shadow-sm',
            'z-10'
          )}
        >
          <div
            className={classNames(
              'container mx-auto',
              'flex justify-between items-center'
            )}
          >
            <div className="w-full z-10">
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
            <div className="hidden lg:inline-flex">
              <EmbeddPopup />
            </div>
          </div>
        </div>
        <div className="px-4 mt-6">
          <div
            className="container mx-auto w-full h-[80vh] overflow-hidden"
            ref={observe}
          >
            {hierarchyData && width && height && (
              <TreeMapWithData
                hierarchy={hierarchyData}
                width={width}
                height={height}
                onChangeLevel={(level) => {
                  setTopic(level)
                }}
              />
            )}
          </div>
          <div className="container mx-auto mt-4 flex justify-end lg:hidden">
            <EmbeddPopup />
          </div>
          <div className="container mx-auto">
            <h2 className="mb-6 mt-12 px-4 font-bold text-2xl">
              {queriedType === 'Ausgabetitel'
                ? 'Höchste Ausgabetitel'
                : 'Höchste Einnahmetitel'}
            </h2>
            <ul className="flex flex-col gap-4">
              {!error &&
                !isLoading &&
                (listData || [])
                  .map((item) => ({
                    id: item.id,
                    title: item.titel_bezeichnung,
                    amount: parseInt(item.betrag, 10),
                    group: item.hauptKey,
                    groupId: snakeCase(item.hauptKey),
                    district: item.bereichs_bezeichnung,
                  }))
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, visibleRows)
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

            <div className="justify-center flex mt-8">
              <Button
                onClick={loadMoreRows}
                disabled={visibleRows >= (listData || []).length}
              >
                <span className="block">
                  Weitere Ausgabetitel anzeigen
                  <span className="font-normal text-xs block">
                    ({visibleRows}/{(listData || []).length})
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Visualization
