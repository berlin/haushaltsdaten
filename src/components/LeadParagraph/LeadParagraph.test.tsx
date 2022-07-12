import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { LeadParagraph } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('LeadParagraph', () => {
  test('should render the right tags', () => {
    render(
      <>
        <LeadParagraph>I am a LeadParagraph</LeadParagraph>
      </>
    )

    const p = screen.getByText('I am a LeadParagraph')

    expect(p).toBeInTheDocument()
  })
})
