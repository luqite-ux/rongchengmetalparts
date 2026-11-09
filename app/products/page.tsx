import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageMeta, getProductFamilies, getProducts } from '@/lib/data'
import type { FamilySlug } from '@/lib/types'
import { cn } from '@/lib/utils'
import { PageHero } from '@/components/site/page-hero'
import { CtaLink, Section } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { ProductCard } from '@/components/products/product-card'
import { catalogIntroduction, catalogParentName } from '@/lib/customer-revision'

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta()
  return {
    title: meta.products.title,
    description: meta.products.description,
    alternates: { canonical: '/products' },
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ family?: string | string[] }>
}) {
  const { family } = await searchParams
  const familyParam = Array.isArray(family) ? family[0] : family
  const families = await getProductFamilies()
  const activeFamily = families.find((item) => item.slug === familyParam) ?? null
  const products = await getProducts(
    undefined,
    activeFamily ? { familySlug: activeFamily.slug as FamilySlug } : undefined,
  )
  const familyName = (slug: string) => families.find((item) => item.slug === slug)?.name ?? ''

  const filters = [
    { label: 'Representative Products', href: '/products', active: !activeFamily },
    ...families.map((item) => ({
      label: item.name,
      href: `/products?family=${item.slug}`,
      active: activeFamily?.slug === item.slug,
    })),
  ]

  return (
    <>
      <PageHero
        eyebrow="Product catalog"
        title={activeFamily ? activeFamily.name : catalogParentName}
        description={
          activeFamily
            ? activeFamily.summary
            : catalogIntroduction
        }
        crumbs={
          activeFamily
            ? [{ label: 'Products', href: '/products' }, { label: activeFamily.name }]
            : [{ label: 'Products' }]
        }
      />
      <Section labelledBy="catalog-title">
        <h2 id="catalog-title" className="sr-only">
          {activeFamily ? `${activeFamily.name} products` : 'All products'}
        </h2>
        <nav aria-label="Filter by product family">
          <ul className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <li key={filter.href}>
                <Link
                  href={filter.href}
                  aria-current={filter.active ? 'page' : undefined}
                  className={cn(
                    'inline-flex min-h-11 items-center gap-2 rounded-md border-2 px-4 text-sm font-semibold transition-colors duration-200 motion-reduce:transition-none',
                    filter.active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background hover:border-primary hover:text-primary',
                  )}
                >
                  {filter.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {products.length ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, productIndex) => (
              <li key={product.slug}>
                <Reveal className="h-full">
                  <ProductCard
                    product={product}
                    familyName={familyName(product.familySlug)}
                    index={productIndex}
                    priority={productIndex < 3}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-10 border bg-stage p-6 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">Drawing-Based Product Review</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
              Additional product types are not listed until their scope is confirmed. Send the drawing, sample, material, dimensions, interfaces and expected quantity for technical review.
            </p>
            <div className="mt-6">
              <CtaLink href="/contact#rfq">Send Your Requirement</CtaLink>
            </div>
          </Reveal>
        )}
      </Section>
    </>
  )
}
