import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const Check: FC<IconPropType> = ({
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        points="0 5 5 10 15 0"
        vectorEffect="non-scaling-stroke"
        transform="translate(5 7)"
      />
    </g>
  </svg>
)
