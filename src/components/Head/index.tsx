import { FC } from 'react'
import NextHead from 'next/head'
import colors from '../../style/colors'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const siteUrl =
  process.env.URL ||
  (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) ||
  'http://localhost:3000'

const faviconPath = '/favicon.ico'
const faviconSvgPath = '/favicons/favicon.svg'

interface HeadPropType {
  currentPagePath: string
  description: string
  siteTitle: string
  pageTitle: string
  fbAppId: string
  keywords: string[]
  themeColor: string
  locales: string[]
  locale: string
  twitterUsername: string
  socialThumbnail: string
}

export const Head: FC<Partial<HeadPropType>> = ({
  description,
  siteTitle,
  pageTitle,
  fbAppId = '',
  keywords,
  themeColor = colors.brand,
  locales = ['de', 'en', 'tr'],
  locale,
  twitterUsername = 'citylabberlin',
  socialThumbnail = '',
}) => {
  const { t, i18n } = useTranslation()
  const { pathname } = useRouter()

  const resolvedDescription = description || t('head.defaultDescription')
  const resolvedSiteTitle = siteTitle || t('head.defaultSiteTitle')
  const resolvedPageTitle = pageTitle || t('head.defaultPageTitle')
  const resolvedKeywords: string[] =
    keywords ||
    (Array.isArray(t('head.keywords', { returnObjects: true }))
      ? t('head.keywords', { returnObjects: true })
      : [])
  const resolvedLocale = locale || i18n.language || 'de'

  const longTitle = [resolvedPageTitle, resolvedSiteTitle].join(' – ')
  const formatedSocialImage = `${siteUrl}/social-image.jpg`

  return (
    <NextHead>
      <title>{longTitle}</title>

      {resolvedDescription && (
        <meta name="description" content={resolvedDescription} />
      )}

      <meta property="og:type" content="article" />

      <meta name="theme-color" content={themeColor} />

      {resolvedKeywords.length > 0 && (
        <meta name="keywords" content={resolvedKeywords.join(', ')} />
      )}

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />

      <meta itemProp="name" content={longTitle} />
      <meta itemProp="description" content={resolvedDescription} />

      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:site" content={`@${twitterUsername}`} />
      )}
      <meta name="twitter:title" content={resolvedPageTitle} />
      <meta name="twitter:description" content={resolvedDescription} />

      <meta property="og:title" content={resolvedPageTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={resolvedLocale} />
      <meta property="og:locale:alternate" content={`[${locales.join(',')}]`} />
      <meta property="og:url" content={`${siteUrl}${pathname}`} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:site_name" content={resolvedSiteTitle} />
      {fbAppId && <meta property="fb:app_id" content={fbAppId} />}

      <meta itemProp="image" content={formatedSocialImage} />
      <meta name="twitter:image" content={formatedSocialImage} />
      <meta property="og:image" content={formatedSocialImage} />
      {socialThumbnail && (
        <meta property="og:image:alt" content={socialThumbnail} />
      )}

      <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />

      <link href={faviconPath} type="image/x-icon" rel="shortcut icon" />
      <link href={faviconSvgPath} type="image/svg+xml" rel="icon" />

      <link rel="manifest" href="/manifest.webmanifest" />

      <link rel="author" href="https://odis-berlin.de" />
    </NextHead>
  )
}
