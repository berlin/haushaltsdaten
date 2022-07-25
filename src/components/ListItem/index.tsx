import { formatCurrency } from '@lib/utils/numberUtil'
import { FC } from 'react'
import { Building } from '@components/Icons'

export interface ListItemPropType {
  id: string
  title: string
  group: string
  groupColor: string
  district: string
  price: number
}

export const ListItem: FC<ListItemPropType> = ({
  title,
  group,
  price,
  groupColor,
  district,
}) => (
  <li className="pt-4 border-t border-gray-100 w-full grid grid-cols-[1fr] md:grid-cols-[3fr,2fr,2fr,150px] md:gap-x-6">
    <h4
      className="md:whitespace-nowrap md:text-ellipsis md:overflow-hidden font-bold md:font-normal"
      title={title}
    >
      {title}
    </h4>
    <span
      className="inline-flex gap-2 items-center overflow-hidden whitespace-nowrap text-ellipsis"
      title={group}
    >
      <span
        className={`w-4 h-4 rounded-full inline-block`}
        style={{ backgroundColor: groupColor }}
      />
      <span className="text-ellipsis overflow-hidden w-full">{group}</span>
    </span>
    <span className="whitespace-nowrap text-ellipsis overflow-hidden inline-flex gap-1">
      <Building className="fill-gray-400 flex-shrink-0" />
      <span className="text-ellipsis overflow-hidden">{district}</span>
    </span>
    <span className="mt-4 md:mt-0 inline-flex float-right gap-2 justify-end font-mono font-semibold text-md md:text-sm">
      {formatCurrency(price)}
      <span className="text-gray-600">€</span>
    </span>
  </li>
)
