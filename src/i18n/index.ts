import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import deTranslation from './locales/de.json'
import enTranslation from './locales/en.json'
import trTranslation from './locales/tr.json'
import deData from './data-translations/de.json'
import enData from './data-translations/en.json'
import trData from './data-translations/tr.json'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: {
        translation: deTranslation,
        data: deData,
      },
      en: {
        translation: enTranslation,
        data: enData,
      },
      tr: {
        translation: trTranslation,
        data: trData,
      },
    },
    fallbackLng: 'de',
    supportedLngs: ['de', 'en', 'tr'],
    ns: ['translation', 'data'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
  })

export default i18n
