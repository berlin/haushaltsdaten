import { SVGProps } from 'react'

export interface IconPropType extends SVGProps<SVGSVGElement> {
  color1?: string
  color2?: string
  color3?: string
  strokeWidth?: number
  size?: number
}
