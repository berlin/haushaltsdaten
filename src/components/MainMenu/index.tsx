import { Home, Map, News } from '@components/Icons'
import { IconPropType } from '@components/Icons/IconPropType'
import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface LinkType {
  path: string
  name: string
  Icon: FC<IconPropType>
}

const links: LinkType[] = [
  {
    path: '/',
    name: 'Start',
    Icon: Home,
  },
  {
    path: '/map',
    name: 'Karte',
    Icon: Map,
  },
  {
    path: '/stories',
    name: 'Stories',
    Icon: News,
  },
]

export const MainMenu: FC = () => {
  const { pathname } = useRouter()

  return (
    <div
      className={classNames(
        'fixed bottom-0 left-0 right-0 h-16',
        'w-screen bg-gray-300 border-t border-gray-300',
        'flex gap-[1px] drop-shadow-lg'
      )}
    >
      {links.map((link) => (
        <InternalLink
          key={link.path}
          href={link.path}
          className={classNames(
            'bg-white w-full',
            'group cursor-default',
            pathname === link.path ? 'text-gray-900' : 'text-gray-400',
            pathname !== link.path &&
              'hover:text-gray-600 hover:bg-gray-200 cursor-pointer',
            'transition-colors focus:outline-none',
            'focus:ring-2 focus:ring-gray-800',
            'flex place-items-center justify-center'
          )}
        >
          <link.Icon width={32} height={32} />
        </InternalLink>
      ))}
    </div>
  )
}
