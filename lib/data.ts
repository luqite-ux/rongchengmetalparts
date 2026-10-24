import { cache } from 'react'
import { en, type SiteContent } from '@/lib/content/en'
import { defaultLocale, type Locale } from '@/lib/i18n'
import type { Article, FamilySlug, Product } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'

/**
 * Data access boundary.
 * Every function is async and takes a locale so the static content below can be
 * swapped for Supabase queries (products, articles, site settings) without
 * touching pages or components.
 */
const contentByLocale: Record<Locale, SiteContent> = { en }

const getContent = (locale: Locale): SiteContent =>
  contentByLocale[locale] ?? contentByLocale[defaultLocale]

function database() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  return url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null
}

const tenantId = () => process.env.NEXT_PUBLIC_TENANT_ID?.trim() ?? ''
const localized = (value: unknown, locale: Locale, fallback = '') => {
  if (!value || typeof value !== 'object') return fallback
  const map = value as Record<string, unknown>
  const chosen = map[locale] ?? map[defaultLocale] ?? Object.values(map).find((item) => typeof item === 'string' && item.trim())
  return typeof chosen === 'string' ? chosen : fallback
}

export const getSiteSettings = cache(async (locale: Locale = defaultLocale) => {
  const content = getContent(locale)
  const db = database()
  const tenant = tenantId()
  let companyMedia: string[] = []
  let logoUrl = '/images/logo-full.png'
  if (db && tenant) {
    const { data } = await db.from('tenants').select('logo_url,extra_settings').eq('id', tenant).maybeSingle()
    if (data) {
      logoUrl = data.logo_url || logoUrl
      companyMedia = Array.isArray(data.extra_settings?.site_assets?.company_media)
        ? data.extra_settings.site_assets.company_media.filter((value: unknown): value is string => typeof value === 'string' && value.startsWith('https://'))
        : []
    }
  }
  return {
    ...content.site,
    certificationStatements: content.certificationStatements,
    companyMedia,
    logoUrl,
  }
})

export const getNavigation = cache(async (locale: Locale = defaultLocale) => {
  const content = getContent(locale)
  return { primary: content.navigation, footer: content.footerLinks }
})

export const getProductFamilies = cache(async (locale: Locale = defaultLocale) => {
  const fallback = getContent(locale).families
  const db = database()
  const tenant = tenantId()
  if (!db || !tenant) return fallback
  const { data } = await db.from('product_categories').select('slug,name,name_en,name_i18n,description,description_en,description_i18n').eq('tenant_id', tenant).eq('is_active', true).is('parent_id', null).order('sort_order')
  if (!data?.length) return fallback
  return data.map((row) => {
    const original = fallback.find((item) => item.slug === row.slug)
    const name = localized(row.name_i18n, locale, row.name_en || row.name || original?.name || row.slug)
    const summary = localized(row.description_i18n, locale, row.description_en || row.description || original?.summary || '')
    return { slug: row.slug as FamilySlug, name, descriptor: original?.descriptor || name, summary, scope: original?.scope || [] }
  })
})

export async function getProductFamilyBySlug(
  slug: string | undefined,
  locale: Locale = defaultLocale,
) {
  const families = await getProductFamilies(locale)
  return families.find((family) => family.slug === slug) ?? null
}

export const getProducts = cache(
  async (
    locale: Locale = defaultLocale,
    filter?: { familySlug?: FamilySlug },
  ): Promise<Product[]> => {
    let { products } = getContent(locale)
    const db = database()
    const tenant = tenantId()
    if (db && tenant) {
      const { data } = await db.from('products').select('slug,name,name_en,name_i18n,description,description_en,description_i18n,overview,overview_en,overview_i18n,image_url,category_slug,features,features_i18n,specs,extra_data,updated_at').eq('tenant_id', tenant).eq('is_active', true).order('sort_order')
      if (data?.length) products = data.map((row) => {
        const fallback = getContent(locale).products.find((item) => item.slug === row.slug)
        const name = localized(row.name_i18n, locale, row.name_en || row.name || fallback?.name || row.slug)
        const summary = localized(row.description_i18n, locale, row.description_en || row.description || fallback?.summary || '')
        const overview = localized(row.overview_i18n, locale, row.overview_en || row.overview || summary)
        const rawImages = Array.isArray(row.extra_data?.images) ? row.extra_data.images : []
        const images = [row.image_url, ...rawImages].filter((value, index, all): value is string => typeof value === 'string' && Boolean(value) && all.indexOf(value) === index).map((src, index) => ({ src, alt: `${name}${index ? ` — view ${index + 1}` : ''}` }))
        const features = Array.isArray(row.features_i18n?.[locale]) ? row.features_i18n[locale] : Array.isArray(row.features) ? row.features : []
        const facts = row.specs && typeof row.specs === 'object' ? Object.entries(row.specs).map(([label, value]) => ({ label, value: String(value) })) : []
        return { slug: row.slug, name, familySlug: row.category_slug as FamilySlug, materialSlug: fallback?.materialSlug ?? null, materialLabel: fallback?.materialLabel ?? '', summary, description: [overview], highlights: features.map(String), facts, images, seo: { title: `${name} | RunCing Tech`, description: summary } }
      })
    }
    return filter?.familySlug
      ? products.filter((product) => product.familySlug === filter.familySlug)
      : products
  },
)

export async function getProductBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<Product | null> {
  const products = await getProducts(locale)
  return products.find((product) => product.slug === slug) ?? null
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts(defaultLocale)
  return products.map((product) => product.slug)
}

export async function getRelatedProducts(
  product: Product,
  locale: Locale = defaultLocale,
  limit = 3,
) {
  const products = await getProducts(locale)
  const sameFamily = products.filter(
    (item) => item.familySlug === product.familySlug && item.slug !== product.slug,
  )
  const others = products.filter(
    (item) => item.familySlug !== product.familySlug,
  )
  return [...sameFamily, ...others].slice(0, limit)
}

export const getHeroSlides = cache(async (locale: Locale = defaultLocale) =>
  getContent(locale).heroSlides,
)

export const getHomeContent = cache(async (locale: Locale = defaultLocale) => {
  const content = getContent(locale)
  return {
    sections: content.homeSections,
    materials: content.materialOptions,
    applications: content.applicationAreas,
    manufacturing: content.manufacturingContent,
    quality: content.qualityContent,
    customization: content.customizationContent,
    process: content.processSteps,
    faq: content.faqItems,
  }
})

export const getApplicationAreas = cache(async (locale: Locale = defaultLocale) =>
  getContent(locale).applicationAreas,
)

export const getMaterialOptions = cache(async (locale: Locale = defaultLocale) =>
  getContent(locale).materialOptions,
)

export const getManufacturingContent = cache(
  async (locale: Locale = defaultLocale) => getContent(locale).manufacturingContent,
)

export const getAboutContent = cache(async (locale: Locale = defaultLocale) =>
  getContent(locale).aboutContent,
)

export const getPageMeta = cache(async (locale: Locale = defaultLocale) =>
  getContent(locale).pageMeta,
)

export const getFaqItems = cache(async (locale: Locale = defaultLocale) =>
  getContent(locale).faqItems,
)

export async function getArticles(
  locale: Locale = defaultLocale,
): Promise<Article[]> {
  const db = database()
  const tenant = tenantId()
  if (!db || !tenant) return []
  const { data } = await db.from('articles').select('slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,featured_image,published_at,created_at,seo_title,seo_description').eq('tenant_id', tenant).eq('is_published', true).order('published_at', { ascending: false })
  return (data ?? []).map((row) => {
    const title = localized(row.title_i18n, locale, row.title || row.slug)
    const excerpt = localized(row.excerpt_i18n, locale, row.excerpt || '')
    const content = localized(row.content_i18n, locale, row.content || '')
    return { slug: row.slug, title, excerpt, publishedAt: row.published_at || row.created_at, coverImage: row.featured_image ? { src: row.featured_image, alt: title } : undefined, body: content.split(/\n{2,}/).filter(Boolean), seo: { title: row.seo_title || title, description: row.seo_description || excerpt } }
  })
}

export async function getArticleBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<Article | null> {
  const articles = await getArticles(locale)
  return articles.find((article) => article.slug === slug) ?? null
}
