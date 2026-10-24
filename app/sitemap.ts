import type { MetadataRoute } from 'next'
import { getArticles, getProductSlugs, getSiteSettings } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, slugs, articles] = await Promise.all([
    getSiteSettings(),
    getProductSlugs(),
    getArticles(),
  ])
  const staticPaths = [
    '',
    '/products',
    '/applications',
    '/manufacturing',
    '/about',
    '/contact',
    '/news',
  ]
  return [
    ...staticPaths.map((path) => ({ url: `${site.url}${path}` })),
    ...slugs.map((slug) => ({ url: `${site.url}/products/${slug}` })),
    ...articles.map((article) => ({
      url: `${site.url}/news/${article.slug}`,
      lastModified: article.publishedAt,
    })),
  ]
}
