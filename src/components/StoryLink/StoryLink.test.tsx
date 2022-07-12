import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { stories } from '../../../pages/stories'
import { StoryLink } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('StoryLink', () => {
  test('should render the right tags', () => {
    const storiesArr = Object.values(stories)
    render(
      <>
        {storiesArr.map((story) => (
          <StoryLink key={story.path} {...story} />
        ))}
      </>
    )

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(storiesArr.length)
  })
})
