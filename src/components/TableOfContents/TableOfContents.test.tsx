import { fireEvent, render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { TableOfContents } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('TableOfContents', () => {
  test('should render the chapters with # links', () => {
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
    ]
    const onChapterClick = jest.fn()
    render(
      <TableOfContents chapters={chapters} onChapterClick={onChapterClick} />
    )

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(chapters.length)

    fireEvent.click(links[0])

    expect(onChapterClick).toHaveBeenCalledWith(chapters[0])
  })
  test('should render the chapters with internal links', () => {
    const chapters = [
      {
        path: '/chapter-1',
        title: 'This is chapter 1',
      },
      {
        path: '/chapter-2',
        title: 'This is another chapter, the second one',
      },
      {
        path: '/chapter-3',
        title: 'Last but not least',
      },
    ]
    render(<TableOfContents chapters={chapters} />)

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(chapters.length)
  })
})
