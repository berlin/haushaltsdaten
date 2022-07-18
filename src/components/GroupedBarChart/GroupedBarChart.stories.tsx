import { TOTAL_EXPENSES } from '@data/totalExpenses'
import { Story, Meta } from '@storybook/react'

import { GroupedBarChart } from '.'

export default {
  title: 'UI Elements/GroupedBarChart',
  component: GroupedBarChart,
} as Meta

const Template: Story = () => <GroupedBarChart data={TOTAL_EXPENSES} />

export const Default = Template.bind({})
Default.args = {}
