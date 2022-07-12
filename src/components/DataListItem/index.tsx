import { Headline } from '@components/Headline'
import { Paragraph } from '@components/Paragraph'
import classNames from 'classnames'
import { FC, ReactNode } from 'react'

export interface DataListItemPropType {
  title: ReactNode
  subtitle: ReactNode
  value: ReactNode
}

export const DataListItem: FC<DataListItemPropType> = ({
  title,
  subtitle,
  value,
}) => (
  <li
    className={classNames(
      'grid grid-cols-[1fr,auto] px-8 pt-4 pb-1',
      'border-b border-gray-200'
    )}
  >
    <Headline h2>{title}</Headline>
    <span className="text-2xl">{value}</span>
    <Paragraph className="col-span-2 m-0">{subtitle}</Paragraph>
  </li>
)
