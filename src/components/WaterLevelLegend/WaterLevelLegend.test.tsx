import { render, screen } from '@testing-library/react'
import { WaterLevelLegend } from '.'

describe('WaterLevelLegend component', () => {
  it('renders title, scale, labels and collapse button by default', () => {
    render(<WaterLevelLegend collapsable />)
    const title = screen.getByText(/Wasserstand/i)
    expect(title).toBeInTheDocument()

    const min = screen.getByText(/Trocken/i)
    expect(min).toBeInTheDocument()

    const max = screen.getByText(/Versorgt/i)
    expect(max).toBeInTheDocument()

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
