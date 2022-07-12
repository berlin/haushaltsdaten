import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const Minus: FC<IconPropType> = ({
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
      <line
        x1="5"
        x2="19"
        y1="12"
        y2="12"
        stroke={color1 || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
)
