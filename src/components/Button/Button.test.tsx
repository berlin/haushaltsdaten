import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { Button } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('Button', () => {
  test('should render the children', () => {
    render(<Button>Click me</Button>)

    const childs = screen.getByText('Click me')

    expect(childs).toBeInTheDocument()
  })
})
