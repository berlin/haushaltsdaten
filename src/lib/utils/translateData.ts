import i18n from 'src/i18n'

export function translateData(germanKey: string): string {
  const lang = i18n.language || 'de'
  if (lang === 'de') return germanKey
  const bundle = i18n.getResourceBundle(lang, 'data') as
    | Record<string, string>
    | undefined
  return bundle?.[germanKey] || germanKey
}
