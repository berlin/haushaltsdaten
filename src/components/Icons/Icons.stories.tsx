import { Story, Meta } from '@storybook/react'
import colors from '../../style/colors'

import * as icons from '.'
import { IconPropType } from './IconPropType'

export default {
  title: 'UI Elements/Icons',
} as Meta

const pickRandomColor = (): string => {
  const colorClasses = [
    'text-lightblue',
    'text-green',
    'text-pink',
    'text-violet',
    'text-darkblue',
  ]
  return colorClasses[Math.floor(Math.random() * colorClasses.length)]
}

const Template: Story<
  IconPropType & {
    coloured?: boolean
  }
> = ({ coloured = false, ...props }) => (
  <div className="container mx-auto flex items-center justify-center h-screen">
    <div className="container mx-auto flex flex-wrap gap-8 items-center justify-center">
      {Object.values(icons).map((Icon, idx) => (
        <span
          key={Object.keys(icons)[idx]}
          className={(coloured && pickRandomColor()) || ''}
        >
          <Icon {...props} />
        </span>
      ))}
    </div>
  </div>
)

export const AllIcons = Template.bind({})
AllIcons.args = {}

export const ColouredIcons = Template.bind({})
ColouredIcons.args = {
  coloured: true,
}

export const Size32 = Template.bind({})
Size32.args = {
  size: 32,
}

export const Size40 = Template.bind({})
Size40.args = {
  size: 40,
}

export const CustomStrokeWidth = Template.bind({})
CustomStrokeWidth.args = {
  strokeWidth: 1,
  size: 40,
}

export const DuoToneIcons = Template.bind({})
DuoToneIcons.args = {
  color1: colors.lightblue,
  color2: colors.middlegreen,
  color3: colors.yellow,
  size: 80,
  strokeWidth: 4,
}
