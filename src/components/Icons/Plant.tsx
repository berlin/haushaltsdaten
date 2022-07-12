import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const Plant: FC<IconPropType> = ({
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
          d="M12,11 C12,7.6862915 14.6862915,5 18,5 L21,5 L21,6 C21,9.3137085 18.3137085,12 15,12 L12,12"
          id="Path"
          stroke={col3 || 'currentColor'}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12,9 C12,5.6862915 9.3137085,3 6,3 L3,3 L3,5 C3,8.3137085 5.6862915,11 9,11 L12,11"
          id="Path"
          stroke={col2 || 'currentColor'}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="12"
          y1="15"
          x2="12"
          y2="9"
          id="Path"
          stroke={col2 || 'currentColor'}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7,15 L17,15 L17,19 C17,20.1045695 16.1045695,21 15,21 L9,21 C7.8954305,21 7,20.1045695 7,19 L7,15 Z"
          id="Path"
          stroke={col1 || 'currentColor'}
          fill={col1 || 'none'}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
