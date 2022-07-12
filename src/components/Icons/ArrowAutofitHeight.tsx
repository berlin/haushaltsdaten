import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const ArrowAutofitHeight: FC<IconPropType> = ({
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
        <path
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M12,20 L6,20 C4.8954305,20 4,19.1045695 4,18 L4,6 C4,4.8954305 4.8954305,4 6,4 L12,4"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="18"
          x2="18"
          y1="14"
          y2="21"
          stroke={col1 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="18"
          x2="18"
          y1="3"
          y2="10"
          stroke={col1 || 'currentColor'}
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
          points="15 18 18 21 21 18"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          stroke={col1 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          points="15 6 18 3 21 6"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}
