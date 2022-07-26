import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import snakeCase from 'just-snake-case'
import { useRouter } from 'next/router'
import { FC } from 'react'

const NAV_ITEMS = [
  {
    label: 'Startseite',
    path: '/',
  },
  {
    label: 'Visualisierung',
    path: '/visualisierung',
  },
  {
    label: 'Textsuche',
    path: '/search',
  },
  {
    label: 'FAQ',
    path: '/faq',
  },
]

export const Nav: FC = () => {
  const { pathname } = useRouter()

  return (
    <nav>
      <ul className="flex gap-6">
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
      </ul>
    </nav>
  )
}
