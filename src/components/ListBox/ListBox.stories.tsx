import { Story, Meta } from '@storybook/react'

import { ListBox, ListBoxPropType } from '.'

export default {
  title: 'UI Elements/ListBox',
  component: ListBox,
} as Meta

const Template: Story<ListBoxPropType> = (props) => <ListBox {...props} />

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Default.args = {
  options: [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
  ],
}
