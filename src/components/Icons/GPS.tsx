import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const GPS: FC<IconPropType> = ({
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
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <polygon
          fill={col1 || 'none'}
          stroke={col1 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          points="12 17 11 13 7 12 16 8"
        />
      </g>
    </svg>
  )
}
