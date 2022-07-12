import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const ChevronDown: FC<IconPropType> = ({
  color1,
  strokeWidth = 2,
  size = 24,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <polyline
        stroke={color1 || 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        points="6 9 12 15 18 9"
      />
    </g>
  </svg>
)
