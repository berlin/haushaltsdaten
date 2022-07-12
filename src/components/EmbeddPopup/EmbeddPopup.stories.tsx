import { Story, Meta } from '@storybook/react'

import { EmbeddPopup } from '.'

export default {
  title: 'UI Elements/EmbeddPopup',
  component: EmbeddPopup,
} as Meta

const Template: Story = () => (
  <div className="flex justify-end">
    <EmbeddPopup />
  </div>
)

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/',
  },
}
Default.args = {}
