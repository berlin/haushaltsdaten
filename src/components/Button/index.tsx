import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import { FC, ReactNode } from 'react'

export interface ButtonPropType {
  href?: string
  onClick?: () => void
  primary?: boolean
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
}

const getStyles = ({ primary, disabled, className }: ButtonPropType): string =>
  classNames(
    className,
    'relative',
    'rounded',
    'focus:ring-brand focus:ring-2',
    'focus:ring-offset-white focus:ring-offset-2',
    'px-4 py-2 font-semibold',
    'text-center inline-block',
    'transition-colors focus:outline-none',
    'inline-flex items-center gap-2',
    !className?.includes('justify') && 'justify-center',
    !disabled &&
      primary && [
        'bg-gray-900 text-white',
        'focus:ring-brand',
        'hover:bg-gray-700',
        'active:bg-gray-900',
      ],
    !disabled &&
      !primary && [
        'bg-white text-gray-900',
        'focus:ring-brand',
        'border border-gray-300',
        'hover:bg-gray-200',
        'active:bg-gray-300',
        'focus:border-brand',
      ],
    disabled && [
      'bg-gray-100 text-gray-400 border border-gray-200',
      'cursor-default pointer-events-none',
    ]
  )

const renderChildren = ({ children }: ButtonPropType): ReactNode => (
  <>{typeof children === 'string' ? <span>{children}</span> : children}</>
)

export const Button: FC<ButtonPropType> = (props) => {
  if (!props.href) {
    return (
      <span tabIndex={0} {...props} className={getStyles(props)} role="button">
        {renderChildren(props)}
      </span>
    )
  }
  if (props.href?.startsWith('/')) {
    return (
      <InternalLink
        {...props}
        href={props.href || '/'}
        className={getStyles(props)}
      >
        {renderChildren(props)}
      </InternalLink>
    )
  }
  return (
    <a
      className={getStyles(props)}
      rel="noreferrer noopener"
      target="_blank"
      {...props}
    >
      {renderChildren(props)}
    </a>
  )
}
