import { HaushaltsdatenRowType } from '@lib/requests/getRowsByDistrictAndType'
import snakeCase from 'just-snake-case'

type FunktionAccType = Record<string, number>
type OberAccType = Record<string, FunktionAccType>
type HauptAccType = Record<string, OberAccType>

export interface TreemapHierarchyType {
  id: string
  name: string
  children?: TreemapHierarchyType[]
  value?: number
}

export const createBaseTree = (
  rowsList: HaushaltsdatenRowType[]
): HauptAccType => {
  return rowsList.reduce((acc, current) => {
    const hauptKey = current['hauptKey']
    const oberKey = current['oberKey']
    const funktionKey = current['funktionKey']

    const hauptAcc = acc[hauptKey] || {}
    const oberAcc = hauptAcc[oberKey] || {}
    const funktionAcc = oberAcc[funktionKey] || 0

    return {
      ...acc,
      [hauptKey]: {
        ...hauptAcc,
        [oberKey]: {
          ...oberAcc,
          [funktionKey]: funktionAcc + parseInt(current.betrag, 10),
        },
      },
    }
  }, {} as HauptAccType)
}

export const createTreeStructure = (
  baseTree: HauptAccType | OberAccType | FunktionAccType
): TreemapHierarchyType[] => {
  return Object.keys(baseTree).map((key) => {
    const value = baseTree[key]

    const baseInfo = {
      id: snakeCase(key),
      name: key,
    }

    if (!isNaN(Number(value))) {
      return {
        ...baseInfo,
        children: [
          {
            ...baseInfo,
            value: value,
          },
        ],
      }
    }

    return {
      ...baseInfo,
      children: createTreeStructure(value as FunktionAccType),
    }
  }) as TreemapHierarchyType[]
}
