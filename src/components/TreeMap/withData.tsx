import { DistrictLabel } from '@data/districts'
import { GetMainTopicDataParamsType } from '@lib/requests/getMainTopicData'
import { TreemapHierarchyType } from '@lib/utils/createTreemapStructure'
import { FC } from 'react'
import { TreeMap } from '.'

interface TreeMapWithDataPropType {
  district: DistrictLabel
  type: GetMainTopicDataParamsType['titelart']
  hierarchy: TreemapHierarchyType
  width: number
  height: number
}

export const TreeMapWithData: FC<TreeMapWithDataPropType> = ({
  district,
  type,
  hierarchy,
  width,
  height,
}) => {
  return (
    <TreeMap
      width={width}
      height={height}
      district={district}
      type={type}
      hierarchy={hierarchy}
      onChangeLevel={(path) => console.log(path)}
    />
  )
}
