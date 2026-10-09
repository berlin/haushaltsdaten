import { Nav } from '@components/Nav'
import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const Header: FC = () => {
  const { t } = useTranslation()

  return (
    <header
      className={classNames(
        'px-4 xl:px-8 py-5 xl:py-4',
        'w-screen inset-0 bottom-auto bg-gray-50',
        'border-b border-gray-100',
        'z-10'
      )}
    >
      <div
        className={classNames(
          'container mx-auto max-w-8xl',
          'flex flex-wrap gap-y-2 md:justify-between items-center'
        )}
      >
        <h1 className={classNames('w-full md:w-auto', 'font-bold text-xl')}>
          {t('header.siteTitle')}
        </h1>
        <Nav />
      </div>
    </header>
  )
}
