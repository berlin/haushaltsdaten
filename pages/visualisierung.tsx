import { ListItem } from '@components/ListItem'
import snakeCase from 'just-snake-case'
import { GetRowsByDistrictAndTypeParamsType } from '@lib/types/haushaltsdaten'
import {
  createBaseTree,
  createTreeStructure,
  TreemapHierarchyType,
} from '@lib/utils/createTreemapStructure'
import { TreeMapWithData } from '@components/TreeMap/withData'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { GetStaticProps } from 'next'
import { FC, useState, useEffect, useMemo } from 'react'
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
import { useHaushaltsdaten } from '@lib/hooks/useHaushaltsdaten'

const ALL_DISTRICTS_ID: keyof typeof districts = '01' // -> Alle Bereiche
const MAX_ROWS = 100

const isValidTopicDepth = (depthToCheck: number): boolean => {
  const VALID_DEPTHS: TopicDepth[] = [1, 2, 3]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return VALID_DEPTHS.includes(depthToCheck)
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => ({
  props: {
    title: 'Visualisierung',
  },
})

export interface TopicType {
  topicDepth?: TopicDepth
  topicLabel?: string
}

export const Visualization: FC = () => {
  const { observe, width, height } = useDimensions()
  const { push, pathname, query } = useRouter()

  const parsedQuery = query ? mapRawQueryToState(query) : {}

  const queriedDistrictId =
    parsedQuery && parsedQuery.district && !Array.isArray(parsedQuery.district)
      ? parsedQuery.district
      : null

  const queriedType: GetRowsByDistrictAndTypeParamsType['expenseType'] =
    typeof parsedQuery.showExpenses === 'undefined' || parsedQuery.showExpenses
      ? 'Ausgabetitel'
      : 'Einnahmetitel'

  const queriedYear =
    parsedQuery.year && isValidYear(parsedQuery.year)
      ? parsedQuery.year
      : DEFAULT_YEAR

  const queriedModus =
    parsedQuery.modus && isValidModus(parsedQuery.modus)
      ? parsedQuery.modus
      : DEFAULT_MODUS

  const { data: haushaltsdaten, isLoading: dataLoading } = useHaushaltsdaten({
    year: queriedYear,
    expenseType: queriedType,
    districtKey:
      queriedDistrictId && queriedDistrictId !== ALL_DISTRICTS_ID
        ? queriedDistrictId
        : ALL_DISTRICTS_ID,
    modus: queriedModus,
  })

  const hierarchyData: TreemapHierarchyType | null = useMemo(() => {
    if (!haushaltsdaten) return null
    return {
      id: 'overview',
      name: `Gesamt${
        queriedType === 'Ausgabetitel' ? 'ausgaben' : 'einnahmen'
      }`,
      children: createTreeStructure(createBaseTree(haushaltsdaten)),
    }
  }, [haushaltsdaten, queriedType])

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

  const topicColumn =
    topic?.topicDepth && isValidTopicDepth(topic.topicDepth)
      ? mapTopicDepthToColumn(topic.topicDepth, queriedModus)
      : undefined

  const topicValue =
    topic.topicLabel &&
    topic?.topicDepth &&
    isValidTopicDepth(topic?.topicDepth)
      ? topic.topicLabel
      : undefined

  const {
    error,
    isLoading,
    data: listData,
  } = useListData({
    data: haushaltsdaten,
    modus: queriedModus,
    topicColumn,
    topicValue,
  })

  useEffect(() => {
    const listDataLength = (listData || []).length
    // show all rows if dataLength is less or equal MAX_ROWS - otherwise show MAX_ROWS
    setVisibleRows(listDataLength <= MAX_ROWS ? listDataLength : MAX_ROWS)
  }, [listData])

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin fill-gray-600"
            viewBox="0 0 100 101"
            fill="none"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

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
                district={queriedDistrictId || undefined}
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
