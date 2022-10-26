import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { ParsedUrlQuery } from 'querystring'
import { StrictMode, FC } from 'react'
import { Banner } from '@components/Banner'
import { Head } from '@components/Head'
import '../src/style/global.css'
import { useMatomo } from '@lib/hooks/useMatomo'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { useRouter } from 'next/router'
import { useHashIdScroll } from '@lib/hooks/useHashIdScroll'

interface PagePropType extends Record<string, unknown> {
  title?: string
  query: ParsedUrlQuery
}

interface ComponentPropType {
  title?: string
  query?: ReturnType<typeof mapRawQueryToState>
}

const App: FC<{
  Component: FC<ComponentPropType>
  pageProps: PagePropType
}> = ({ Component, pageProps }) => {
  useMatomo()
  const { pathname } = useRouter()
  const parsedQuery = pageProps.query ? mapRawQueryToState(pageProps.query) : {}
  useHashIdScroll()

  return (
    <StrictMode>
      {pathname !== '/share' && <Banner />}
      <Head pageTitle={pageProps.title || ''} />
      {pathname !== '/share' && <Header {...pageProps.query} />}
      <Component {...pageProps} query={parsedQuery} />
      {pathname !== '/share' && <Footer />}
    </StrictMode>
  )
}

export default App
