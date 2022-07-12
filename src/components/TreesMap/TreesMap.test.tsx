import { render } from '@testing-library/react'
import { TreesMap } from '.'
import * as nextRouter from 'next/router'

const useRouter = jest.fn()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = useRouter.mockReturnValue({
  query: {},
  replace: jest.fn().mockResolvedValue(true),
  pathname: '/map',
})

const mapProps = {
  mapId: 'map',
  initialViewportProps: {
    latitude: 15.123,
    longitude: 16.456,
    zoom: 10,
  },
}

describe('Map component', () => {
  it('renders a map container', () => {
    render(<TreesMap {...mapProps} />)
    const mapContainer = document.querySelector('#map')
    expect(mapContainer).toBeInTheDocument()
  })
})
