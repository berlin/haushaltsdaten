import { InternalLink } from '@components/InternalLink'
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
              className={
                pathname === navItem.path ? 'font-bold' : 'font-normal'
              }
            >
              <InternalLink href={navItem.path}>{navItem.label}</InternalLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}