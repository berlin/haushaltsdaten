import { StrictMode, FC, useEffect } from 'react'
import { Head } from '@components/Head'
import '../src/style/global.css'
import '../src/i18n'
import { useMatomo } from '@lib/hooks/useMatomo'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { useRouter } from 'next/router'
import { useHashIdScroll } from '@lib/hooks/useHashIdScroll'
import i18n from 'i18next'

interface PagePropType extends Record<string, unknown> {
  title?: string
}

const App: FC<{
  Component: FC<PagePropType>
  pageProps: PagePropType
}> = ({ Component, pageProps }) => {
  useMatomo()
  const { pathname, query } = useRouter()
  useHashIdScroll()

  useEffect(() => {
    if (query.lang && typeof query.lang === 'string') {
      void i18n.changeLanguage(query.lang)
    }
  }, [query.lang])

  return (
    <StrictMode>
      <Head pageTitle={pageProps.title || ''} />
      {!pathname.startsWith('/share') && <Header />}
      <Component {...pageProps} />
      {!pathname.startsWith('/share') && <Footer />}
    </StrictMode>
  )
}

export default App
