import { InternalLink } from '@components/InternalLink'
import { LanguageSwitcher } from '@components/LanguageSwitcher'
import classNames from 'classnames'
import snakeCase from 'just-snake-case'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const Nav: FC = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation()

  const NAV_ITEMS = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.visualization'), path: '/visualisierung' },
    { label: t('nav.search'), path: '/search' },
    { label: t('nav.info'), path: '/faq' },
  ]

  return (
    <nav>
      <ul className="flex gap-6 items-center">
        {NAV_ITEMS.map((navItem) => {
          return (
            <li
              key={snakeCase(navItem.label)}
              className={classNames(
                'transition-colors hover:text-brand',
                pathname === navItem.path ? 'font-bold' : 'font-normal'
              )}
            >
              <InternalLink href={navItem.path}>{navItem.label}</InternalLink>
            </li>
          )
        })}
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  )
}
