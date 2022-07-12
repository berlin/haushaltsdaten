import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { Home } from '../../pages/index'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('Home page', () => {
  it('renders without crashing', () => {
    render(<Home />)
  })
})
