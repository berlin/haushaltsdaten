import { FC } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
] as const

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation()
  const currentLang = (i18n.language || 'de').split('-')[0]

  return (
    <div className="flex items-center gap-1 ml-4">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => {
            void i18n.changeLanguage(code)
          }}
          className={classNames(
            'px-1.5 py-0.5 text-xs font-bold rounded transition-colors',
            currentLang === code
              ? 'text-brand'
              : 'text-gray-500 hover:text-gray-800'
          )}
          aria-label={`Sprache: ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
