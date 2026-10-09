import i18n from 'src/i18n'

const localeMap: Record<string, string> = {
  de: 'de-DE',
  en: 'en-GB',
  tr: 'tr-TR',
}

export const formatCurrency = (num: number): string => {
  const locale = localeMap[i18n.language] || 'de-DE'
  return new Intl.NumberFormat(locale, { currency: 'EUR' }).format(num)
}
