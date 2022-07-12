import { Story, Meta } from '@storybook/react'

import { StoriesOverviewHeader } from '.'

export default {
  title: 'UI Elements/StoriesOverviewHeader',
  component: StoriesOverviewHeader,
} as Meta

const Template: Story = () => (
  <main className="fixed inset-0 overflow-x-hidden overflow-y-auto">
    <StoriesOverviewHeader />
    <div style={{ height: '200vh' }} />
  </main>
)

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/stories',
  },
  layout: 'fullscreen',
}
Default.args = {}
