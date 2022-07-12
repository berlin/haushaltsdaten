import { Story, Meta } from '@storybook/react'
import { FiveHundred } from '../../../pages/500'

export default {
  title: 'Pages/FiveHundred',
  component: FiveHundred,
} as Meta

const Template: Story = () => <FiveHundred />

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/500',
  },
}
Default.args = {}
