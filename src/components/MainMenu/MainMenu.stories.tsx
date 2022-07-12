import { Story, Meta } from '@storybook/react'

import { MainMenu } from '.'

export default {
  title: 'UI Elements/MainMenu',
  component: MainMenu,
} as Meta

const Template: Story = () => <MainMenu />

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/',
  },
}
Default.args = {}

export const OtherPage = Template.bind({})
OtherPage.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
OtherPage.args = {}
