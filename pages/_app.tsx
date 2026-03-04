import { StrictMode, FC } from 'react'
import { Head } from '@components/Head'
import '../src/style/global.css'
import { useMatomo } from '@lib/hooks/useMatomo'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { useRouter } from 'next/router'
import { useHashIdScroll } from '@lib/hooks/useHashIdScroll'

interface PagePropType extends Record<string, unknown> {
  title?: string
}

const App: FC<{
  Component: FC<PagePropType>
  pageProps: PagePropType
}> = ({ Component, pageProps }) => {
  useMatomo()
  const { pathname } = useRouter()
  useHashIdScroll()

  return (
    <StrictMode>
      <Head pageTitle={pageProps.title || ''} />
      {pathname !== '/share' && <Header />}
      <Component {...pageProps} />
      {pathname !== '/share' && <Footer />}
    </StrictMode>
  )
}

export default App
