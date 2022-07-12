import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const Affiliate: FC<IconPropType> = ({
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
        <path
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          d="M5.931,6.936 L7.206,11.185 M12.813,16.794 L17.064,18.069"
        />
        <line
          x1="11.683"
          x2="17.442"
          y1="12.317"
          y2="6.558"
          stroke={col3 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="5.5"
          cy="5.5"
          r="1.5"
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="18.5"
          cy="5.5"
          r="1.5"
          stroke={col3 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="18.5"
          cy="18.5"
          r="1.5"
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="8.5"
          cy="15.5"
          r="4.5"
          stroke={col1 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          fill={col1 || 'none'}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}
