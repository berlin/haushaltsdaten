import ErrorPage from '@components/ErrorPage'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const FiveHundred: FC = () => {
  const { t } = useTranslation()
  return <ErrorPage statusCode={500} message={t('error.serverError')} />
}

export default FiveHundred
