import ErrorPage from '@components/ErrorPage'
import { FC } from 'react'

export const FiveHundred: FC = () => (
  <ErrorPage statusCode={500} message="Interner Server-Fehler" />
)

export default FiveHundred
