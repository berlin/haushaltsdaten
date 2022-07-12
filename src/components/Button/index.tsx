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
    'focus:ring px-5 py-3 font-semibold',
    'text-center inline-block',
    'transition-colors focus:outline-none',
    'inline-flex items-center gap-2',
    !className?.includes('justify') && 'justify-center',
    !disabled &&
      primary && [
        'bg-gray-900 text-white',
        'focus:ring-scale-3',
        'hover:bg-gray-700',
        'active:bg-gray-900',
        'pb-4',
      ],
    !disabled &&
      !primary && [
        'bg-white text-gray-900',
        'focus:ring-scale-3',
        'border border-gray-300',
        'hover:bg-gray-200',
        'active:bg-gray-300',
        'focus:border-scale-3',
      ],
    disabled && [
      'bg-gray-100 text-gray-400 border border-gray-200',
      'cursor-default pointer-events-none',
    ]
  )

const Scale: FC = () => (
  <div className="flex h-1 absolute bottom-0 left-0 right-0">
    <span className="w-full h-1 bg-scale-1 rounded-bl" />
    <span className="w-full h-1 bg-scale-2" />
    <span className="w-full h-1 bg-scale-3" />
    <span className="w-full h-1 bg-scale-4" />
    <span className="w-full h-1 bg-scale-5" />
    <span className="w-full h-1 bg-scale-6" />
    <span className="w-full h-1 bg-scale-7" />
    <span className="w-full h-1 bg-scale-8 rounded-br" />
  </div>
)

const renderChildren = ({ children, primary }: ButtonPropType): ReactNode => (
  <>
    {typeof children === 'string' ? <span>{children}</span> : children}
    {primary && <Scale />}
  </>
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
