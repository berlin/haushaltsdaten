import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const Home: FC<IconPropType> = ({
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
          stroke={col1 || 'currentColor'}
          fill={col1 || 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M9,21 L9,15 C9,13.8954305 9.8954305,13 11,13 L13,13 C14.1045695,13 15,13.8954305 15,15 L15,21"
          vectorEffect="non-scaling-stroke"
        />
        <path
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M5,12 L5,19 C5,20.1045695 5.8954305,21 7,21 L17,21 C18.1045695,21 19,20.1045695 19,19 L19,12"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          stroke={col2 || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          points="5 12 3 12 12 3 21 12 19 12"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}
