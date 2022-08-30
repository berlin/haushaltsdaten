import { render, screen } from '@testing-library/react'
import { Footer } from '.'

describe('Footer component', () => {
  it('should render the Contact link', () => {
    render(<Footer />)
    const imprintText = screen.getByText(/Kontakt/g)
    expect(imprintText).toBeInTheDocument()
  })
  it('should render the Source Code link', () => {
    render(<Footer />)
    const imprintText = screen.getByText(/Quellcode/g)
    expect(imprintText).toBeInTheDocument()
  })
  it('should render the impressum link', () => {
    render(<Footer />)
    const imprintText = screen.getByText(/Impressum/g)
    expect(imprintText).toBeInTheDocument()
  })
  it('should render the Datenschutzerklärung link', () => {
    render(<Footer />)
    const dataprivacyText = screen.getByText(/Datenschutzerklärung/g)
    expect(dataprivacyText).toBeInTheDocument()
  })
})
