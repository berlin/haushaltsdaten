import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { Headline } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('Headline', () => {
  test('should render the right tags', () => {
    render(
      <>
        <Headline h1>I am an H1</Headline>
        <Headline h2>I am an H2</Headline>
        <Headline h3>I am an H3</Headline>
      </>
    )

    const h1s = document.querySelectorAll('h1')
    const h2s = document.querySelectorAll('h2')
    const h3s = document.querySelectorAll('h3')

    expect(h1s).toHaveLength(1)
    expect(h2s).toHaveLength(1)
    expect(h3s).toHaveLength(1)
  })
})
