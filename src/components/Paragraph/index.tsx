import classNames from 'classnames'
import { FC, ReactNode } from 'react'

export interface ParagraphPropType {
  className?: string
  children: ReactNode
  dropCap?: boolean
  Tag?: 'p' | 'span' | 'div'
}

export const Paragraph: FC<ParagraphPropType> = ({
  Tag = 'p',
  dropCap = false,
  className,
  children,
  ...props
}) => {
  return (
    <Tag
      {...props}
      className={classNames(
        className,
        'mb-4',
        dropCap && [
          'first-letter:float-left',
          'first-letter:mr-4',
          'first-letter:text-7xl',
          'first-letter:text-blue-900',
        ]
      )}
    >
      {children}
    </Tag>
  )
}
