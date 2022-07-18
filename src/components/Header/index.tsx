import { Nav } from '@components/Nav'
import classNames from 'classnames'
import { FC } from 'react'

export const Header: FC = () => {
  return (
    <header
      className={classNames(
        'px-8 py-4',
        'w-screen inset-0 bottom-auto bg-gray-50',
        'border-b border-gray-100',
        'z-10'
      )}
    >
      <div className="container max-w-8xl mx-auto flex flex-wrap gap-y-2 md:justify-between items-center">
        <h1 className={classNames('w-full md:w-auto', 'font-bold text-xl')}>
          Berliner Haushaltsdaten <span className="font-normal">2022</span>
        </h1>
        <Nav />
      </div>
    </header>
  )
}
