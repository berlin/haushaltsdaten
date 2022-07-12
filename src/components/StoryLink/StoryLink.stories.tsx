import { Story, Meta } from '@storybook/react'
import { stories } from '../../../pages/stories'

import { StoryLink } from '.'

export default {
  title: 'UI Elements/StoryLink',
  component: StoryLink,
} as Meta

const Template: Story<{
  parentClassName?: string
}> = ({ parentClassName = '' }) => (
  <div className={parentClassName}>
    {Object.values(stories).map((story) => (
      <StoryLink key={story.path} {...story} />
    ))}
  </div>
)

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/stories',
  },
  layout: 'fullscreen',
}
Default.args = {}
