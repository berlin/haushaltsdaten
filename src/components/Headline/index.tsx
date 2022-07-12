import classNames from 'classnames'
import { FC, ReactNode } from 'react'

export interface HeadlinePropType {
  href?: string
  className?: string
  h1?: boolean
  h2?: boolean
  h3?: boolean
  children: ReactNode
}

const getStyles = ({ className, h1, h2, h3 }: HeadlinePropType): string =>
  classNames(
    className,
    'font-semibold',
    'block',
    h1 && 'text-3xl',
    h2 && !h1 && 'text-2xl',
    h3 && !h2 && !h1 && 'text-xl'
  )

const getTagByProps = ({
  h1,
  h2,
  h3,
}: HeadlinePropType): 'h1' | 'h2' | 'h3' => {
  if (h3 && !h2 && !h1) return 'h3'
  if (h2 && !h1) return 'h2'
  return 'h1'
}

const renderChildren = ({ children }: HeadlinePropType): ReactNode => children

export const Headline: FC<HeadlinePropType> = ({ h1, h2, h3, ...props }) => {
  const allProps = { h1, h2, h3, ...props }
  const Tag = getTagByProps(allProps)
  return (
    <Tag {...props} className={getStyles(allProps)}>
      {renderChildren(allProps)}
    </Tag>
  )
}
