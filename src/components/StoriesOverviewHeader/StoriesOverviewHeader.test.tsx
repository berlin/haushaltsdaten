import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { StoriesOverviewHeader } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('StoriesOverviewHeader', () => {
  test('should render the right tags', () => {
    render(<StoriesOverviewHeader />)

    const title = screen.getByText('Stories')

    expect(title).toBeInTheDocument()
  })
})
