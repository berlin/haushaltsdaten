import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { ParsedUrlQuery } from 'querystring'
import { StrictMode, FC } from 'react'
import { Head } from '@components/Head'
import '../src/style/global.css'
import { useMatomo } from '@lib/hooks/useMatomo'
import { MainMenu } from '@components/MainMenu'

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
      <main className="fixed inset-0 bottom-16 overflow-x-hidden overflow-y-auto">
        <Component {...pageProps} query={parsedQuery} />
      </main>
      <MainMenu />
    </StrictMode>
  )
}

export default App
