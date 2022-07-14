import { TreemapHierarchyType } from '@lib/utils/createTreemapStructure'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { TreeMap } from '.'

interface TreeMapWithDataPropType {
  hierarchy: TreemapHierarchyType
  width: number
  height: number
}

export const TreeMapWithData: FC<TreeMapWithDataPropType> = ({
  hierarchy,
  width,
  height,
}) => {
  const { push, reload, query, pathname } = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mainTopic, midTopic, deepTopic, ...queryRest } =
    mapRawQueryToState(query)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryRest]
  )
  return (
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
  )
}
