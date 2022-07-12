import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const ArrowsDiagonal: FC<IconPropType> = ({
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
          x1="14"
          x2="20"
          y1="10"
          y2="4"
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="4"
          x2="10"
          y1="20"
          y2="14"
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
          points="16 4 20 4 20 8"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          stroke={col1 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          points="8 20 4 20 4 16"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}
