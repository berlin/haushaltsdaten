import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { ParsedUrlQuery } from 'querystring'
import { StrictMode, FC } from 'react'
import { Head } from '@components/Head'
import '../src/style/global.css'
import { useMatomo } from '@lib/hooks/useMatomo'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'

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
  const parsedQuery = pageProps.query ? mapRawQueryToState(pageProps.query) : {}

  return (
    <StrictMode>
      <Head pageTitle={pageProps.title || ''} />
      <Header {...parsedQuery} />
      <div className="min-h-screen px-8 pt-28 pb-12">
        <div className="container mx-auto">
          <Component {...pageProps} query={parsedQuery} />
        </div>
      </div>
      <Footer />
    </StrictMode>
  )
}

export default App
