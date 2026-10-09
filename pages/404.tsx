import ErrorPage from '@components/ErrorPage'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const FourOFour: FC = () => {
  const { t } = useTranslation()
  return <ErrorPage statusCode={400} message={t('error.notFound')} />
}

export default FourOFour
