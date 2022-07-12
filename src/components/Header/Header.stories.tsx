import { Story, Meta } from '@storybook/react'

import { Header } from '.'

export default {
  title: 'UI Elements/Header',
  component: Header,
} as Meta

const Template: Story = () => <Header />

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
  layout: 'fullscreen',
}
Default.args = {}
