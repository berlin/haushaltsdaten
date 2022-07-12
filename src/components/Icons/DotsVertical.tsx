import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const DotsVertical: FC<IconPropType> = ({
  color1,
  color2,
  color3,
  strokeWidth = 2,
  size = 24,
  ...props
}) => {
  const col1 = color1
  const col2 = color2 || color1
  const col3 = color3 || color2 || color1
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <circle
          cx="12"
          cy="12"
          r="1"
          stroke={col2 || 'currentColor'}
          fill={col2 || 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="12"
          cy="19"
          r="1"
          stroke={col3 || 'currentColor'}
          fill={col3 || 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="12"
          cy="5"
          r="1"
          stroke={col1 || 'currentColor'}
          fill={col1 || 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}
