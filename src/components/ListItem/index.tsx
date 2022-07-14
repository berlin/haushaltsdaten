import { formatCurrency } from '@lib/utils/numberUtil'
import { FC } from 'react'

export interface ListItemPropType {
  id: string
  title: string
  group: string
  groupColorClass: string
  price: number
}

export const ListItem: FC<ListItemPropType> = ({
  title,
  group,
  price,
  groupColorClass,
}) => (
  <li className="w-full grid grid-cols-[3fr,2fr,auto] gap-6">
    <h4 className="whitespace-nowrap text-ellipsis overflow-hidden">{title}</h4>
    <span
      className="inline-flex gap-2 items-center overflow-hidden whitespace-nowrap text-ellipsis"
      title={group}
    >
      <span
        className={`w-3 h-3 rounded-full inline-block ${groupColorClass}`}
      />
      <span className="text-ellipsis overflow-hidden w-full">{group}</span>
    </span>
    <span className="inline-flex float-right gap-2">
      <span className="text-gray-600">€</span>
      {formatCurrency(price)}
    </span>
  </li>
)
