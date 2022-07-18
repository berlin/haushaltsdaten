import { Story, Meta } from '@storybook/react'

import { Nav } from '.'

export default {
  title: 'UI Elements/Nav',
  component: Nav,
} as Meta

const Template: Story = (props) => <Nav {...props} />

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/',
  },
}
