import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { DataListItem } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

const items = [
  {
    title: 'Wasserstand',
    subtitle: 'Durschnitt 30, 60, 90',
    value: 'Versorgt',
  },
  {
    title: 'Regen',
    subtitle: 'Letzte 14 Tage',
    value: '25l',
  },
  {
    title: 'Baumscheibe',
    subtitle: 'Durschnitt 2qm',
    value: '2,2qm',
  },
  {
    title: 'Verschattung',
    subtitle: 'Anteil an Schattenzeit',
    value: '76%',
  },
  {
    title: 'Gießwassermenge',
    subtitle: 'Letzte 14 Tage',
    value: '150l',
  },
  {
    title: 'Stammdurchmesser',
    subtitle: 'An der weiteste Stelle',
    value: '33cm',
  },
]

describe('DataListItem', () => {
  test('should render the chapters with # links', () => {
    items.forEach((item) => {
      const { unmount } = render(<DataListItem {...item} />)
      const title = screen.getByText(item.title)
      const subtitle = screen.getByText(item.subtitle)
      const value = screen.getByText(item.value)

      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      unmount()
    })
  })
})
