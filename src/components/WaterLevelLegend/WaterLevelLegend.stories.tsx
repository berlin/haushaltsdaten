import { Story, Meta } from '@storybook/react'

import { WaterLevelLegend, WaterLevelLegendType } from '.'

export default {
  title: 'Map/WaterLevelLegend',
  component: WaterLevelLegend,
} as Meta

const Template: Story<WaterLevelLegendType> = (args) => (
  <div className="absolute bottom-2 left-2 w-[200px]">
    <WaterLevelLegend {...args} />
  </div>
)

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Default.args = {}

export const Collapsed = Template.bind({})
Collapsed.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Collapsed.args = {
  collapsable: true,
  initiallyCollapsed: true,
}
