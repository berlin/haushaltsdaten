import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { Paragraph } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('Paragraph', () => {
  test('should render the right tags', () => {
    render(
      <>
        <Paragraph>I am a Paragraph</Paragraph>
      </>
    )

    const p = screen.getByText('I am a Paragraph')

    expect(p).toBeInTheDocument()
  })
})
