import { Story, Meta } from '@storybook/react'

import { TableOfContents, TableOfContentsPropType } from '.'

export default {
  title: 'UI Elements/TableOfContents',
  component: TableOfContents,
} as Meta

const Template: Story<TableOfContentsPropType> = (props) => (
  <TableOfContents {...props} />
)

const chapters = [
  {
    path: '#chapter-1',
    title: 'This is chapter 1',
  },
  {
    path: '#chapter-2',
    title: 'This is another chapter, the second one',
  },
  {
    path: '#chapter-3',
    title: 'Last but not least',
  },
  {
    path: '#chapter-4',
    title: 'This is chapter 1',
  },
  {
    path: '#chapter-5',
    title: 'This is another chapter, the second one',
  },
  {
    path: '#chapter-6',
    title: 'Last but not least',
  },
  {
    path: '#chapter-7',
    title: 'Last but not least',
  },
  {
    path: '#chapter-8',
    title: 'This is chapter 1',
  },
  {
    path: '#chapter-9',
    title: 'This is another chapter, the second one',
  },
  {
    path: '#chapter-10',
    title: 'Last but not least',
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
  chapters,
}

export const WithActiveItem = Template.bind({})
WithActiveItem.parameters = {
  layout: 'fullscreen',
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
WithActiveItem.args = {
  activeChapterPath: chapters[3].path,
  chapters,
}
