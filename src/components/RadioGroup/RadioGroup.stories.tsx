import { Story, Meta } from '@storybook/react'

import { RadioGroup, RadioGroupPropType } from '.'

export default {
  title: 'UI Elements/RadioGroup',
  component: RadioGroup,
} as Meta

const Template: Story<RadioGroupPropType> = (props) => <RadioGroup {...props} />

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/',
  },
}
Default.args = {
  options: [
    {
      name: 'Startup',
      title: '6 CPUs',
      subtitle: '160 GB SSD disk',
    },
    {
      name: 'Business',
      title: '8 CPUs',
      subtitle: '512 GB SSD disk',
    },
    {
      name: 'Enterprise',
      title: '12 CPUs',
      subtitle: '1024 GB SSD disk',
    },
  ],
}
