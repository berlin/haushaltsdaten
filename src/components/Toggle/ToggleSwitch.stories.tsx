import { Story, Meta } from '@storybook/react'

import { ToggleSwitch, ToggleSwitchPropType } from '.'

export default {
  title: 'UI Elements/ToggleSwitch',
  component: ToggleSwitch,
} as Meta

const Template: Story<ToggleSwitchPropType> = (props) => (
  <ToggleSwitch {...props} />
)

export const WithoutLabels = Template.bind({})
WithoutLabels.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
WithoutLabels.args = {}

export const WithLabels = Template.bind({})
WithLabels.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
WithLabels.args = {
  optionA: 'Left',
  optionB: 'Right',
}
