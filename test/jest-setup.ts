/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'

jest.mock('maplibre-gl/dist/maplibre-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  AttributionControl: jest.fn(),
}))

fetchMock.enableMocks()

window.URL.createObjectURL = jest.fn().mockReturnValue('')
performance.mark = jest.fn()

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fetch.resetMocks()
})

afterEach(() => {
  jest.restoreAllMocks()
})
