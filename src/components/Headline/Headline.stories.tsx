import { Story, Meta } from '@storybook/react'

import { Headline } from '.'

export default {
  title: 'UI Elements/Headline',
  component: Headline,
} as Meta

const Template: Story<{
  parentClassName?: string
}> = ({ parentClassName = '' }) => (
  <div className={parentClassName}>
    <Headline h1>I am an H1</Headline>
    <Headline h2>I am an H2</Headline>
    <Headline h3>I am an H3</Headline>
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

export const Coloured = Template.bind({})
Coloured.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Coloured.args = {
  parentClassName: 'text-brand',
}
