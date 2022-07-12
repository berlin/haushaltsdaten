import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const Map: FC<IconPropType> = ({
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
        <line
          x1="18"
          x2="18"
          y1="6"
          y2="6.01"
          stroke={col3 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth * (size / 24)}
          vectorEffect="non-scaling-stroke"
        />
        <path
          stroke={col1 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          d="M18,13 L14.5,8 C13.5691113,6.31751904 13.9670613,4.21075329 15.4475254,2.98375617 C16.9279895,1.75675905 19.0720105,1.75675905 20.5524746,2.98375617 C22.0329387,4.21075329 22.4308887,6.31751904 21.5,8 L18,13"
        />
        <polyline
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15"
        />
        <line
          x1="9"
          x2="9"
          y1="4"
          y2="17"
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="15"
          x2="15"
          y1="15"
          y2="20"
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}
