import { Story, Meta } from '@storybook/react'

import { DataListItem, DataListItemPropType } from '.'

export default {
  title: 'UI Elements/DataListItem',
  component: DataListItem,
} as Meta

const Template: Story<{
  items: DataListItemPropType[]
}> = ({ items }) => (
  <ul>
    {items.map((item) => (
      <DataListItem {...item} key={item.title?.toString()} />
    ))}
  </ul>
)

const items = [
  {
    title: 'Wasserstand',
    subtitle: 'Durschnitt 30, 60, 90',
    value: 'Versorgt',
  },
  {
    title: 'Regen',
    subtitle: 'Letzte 14 Tage',
    value: '25l',
  },
  {
    title: 'Baumscheibe',
    subtitle: 'Durschnitt 2qm',
    value: '2,2qm',
  },
  {
    title: 'Verschattung',
    subtitle: 'Anteil an Schattenzeit',
    value: '76%',
  },
  {
    title: 'Gießwassermenge',
    subtitle: 'Letzte 14 Tage',
    value: '150l',
  },
  {
    title: 'Stammdurchmesser',
    subtitle: 'An der weiteste Stelle',
    value: '33cm',
  },
]

export const Default = Template.bind({})
Default.parameters = {
  layout: 'fullscreen',
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Default.args = {
  items,
}
