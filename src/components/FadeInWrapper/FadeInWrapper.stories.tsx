import { Story, Meta } from '@storybook/react'

import { FadeInWrapper } from '.'

export default {
  title: 'UI Elements/FadeInWrapper',
  component: FadeInWrapper,
} as Meta

const Template: Story = () => (
  <FadeInWrapper>
    <p>I am a faded-in React child</p>
  </FadeInWrapper>
)

export const Default = Template.bind({})
Default.args = {}
