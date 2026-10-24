export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function resolveLocale(input?: string | null): Locale {
  return locales.find((locale) => locale === input) ?? defaultLocale
}
