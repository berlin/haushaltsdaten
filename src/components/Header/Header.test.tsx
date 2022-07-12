import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { Header } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('Header', () => {
  test('should render the title', () => {
    render(<Header />)

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(2)
  })
})
