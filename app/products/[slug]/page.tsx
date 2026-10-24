import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import {
  getProductBySlug,
  getProductFamilies,
  getProductSlugs,
  getRelatedProducts,
  getSiteSettings,
} from '@/lib/data'
import { PageHero } from '@/components/site/page-hero'
import { CtaLink, Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { ProductGallery } from '@/components/products/product-gallery'
import { ProductCard } from '@/components/products/product-card'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { images: [{ url: product.images[0].src, alt: product.images[0].alt }] },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const [families, related, site] = await Promise.all([
    getProductFamilies(),
    getRelatedProducts(product),
    getSiteSettings(),
  ])
  const family = families.find((item) => item.slug === product.familySlug)
  const familyName = (familySlug: string) =>
    families.find((item) => item.slug === familySlug)?.name ?? ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.summary,
    image: product.images[0].src.startsWith('http') ? product.images[0].src : `${site.url}${product.images[0].src}`,
    category: family?.name,
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@type': 'Organization', name: site.legalNameEn },
    url: `${site.url}/products/${product.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <PageHero
        eyebrow={family?.name ?? 'Product'}
        title={product.name}
        crumbs={[
          { label: 'Products', href: '/products' },
          ...(family
            ? [{ label: family.name, href: `/products?family=${family.slug}` }]
            : []),
          { label: product.name },
        ]}
      />
      <Section labelledBy="product-overview-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <div>
            <h2 id="product-overview-title" className="text-2xl font-semibold tracking-tight">
              Product overview
            </h2>
            <p className="mt-2 text-sm font-medium text-primary">{product.materialLabel}</p>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              {product.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-6 space-y-3">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                  {highlight}
                </li>
              ))}
            </ul>
            <dl className="mt-8 border-t">
              {product.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 border-b py-3 text-sm"
                >
                  <dt className="font-semibold">{fact.label}</dt>
                  <dd className="text-muted-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={`/contact?product=${product.slug}#rfq`}>Request a quote</CtaLink>
              <CtaLink href="/products" variant="outline" arrow={false}>
                Back to catalog
              </CtaLink>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Prices, stock levels and performance figures are not published. Specifications are
              confirmed during RFQ.
            </p>
          </div>
        </div>
      </Section>
      <Section labelledBy="related-title" tone="stage">
        <Reveal>
          <SectionHeading
            id="related-title"
            eyebrow="Related products"
            title="Other products in the range"
          />
        </Reveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Reveal className="h-full">
                <ProductCard product={item} familyName={familyName(item.familySlug)} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
