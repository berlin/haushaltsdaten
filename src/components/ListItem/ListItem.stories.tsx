import { Story, Meta } from '@storybook/react'

import { ListItem, ListItemPropType } from '.'

export default {
  title: 'UI Elements/ListItem',
  component: ListItem,
} as Meta

const Template: Story<ListItemPropType> = (props) => <ListItem {...props} />

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Default.args = {
  id: 'test',
  title:
    'Ausbildungsentgelte (Praktikantinnen/Praktikanten, Volontärinnen/Volontäre)',
  group: 'Allgemeine Dienste',
  groupColorClass: 'bg-lightblue',
  price: 1341512,
}
