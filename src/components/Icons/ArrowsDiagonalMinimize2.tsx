import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const ArrowsDiagonalMinimize2: FC<IconPropType> = ({
  color1,
  color2,
  color3,
  strokeWidth = 2,
  size = 24,
  ...props
}) => {
  const col1 = color1
  const col2 = color3 || color2 || color1
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <line
          x1="20"
          x2="14"
          y1="4"
          y2="10"
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="10"
          x2="4"
          y1="14"
          y2="20"
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          stroke={col1 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          points="18 10 14 10 14 6"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          stroke={col1 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          points="6 14 10 14 10 18"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}
