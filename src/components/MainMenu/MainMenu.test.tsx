import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { MainMenu } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('MainMenu', () => {
  test('should render the title', () => {
    render(<MainMenu />)

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(3)
  })
})
