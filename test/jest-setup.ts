/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import deTranslation from '../src/i18n/locales/de.json'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n.use(initReactI18next).init({
  resources: {
    de: {
      translation: deTranslation,
    },
  },
  lng: 'de',
  fallbackLng: 'de',
  interpolation: {
    escapeValue: false,
  },
})

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
