import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageMeta, getProductFamilies, getProducts } from '@/lib/data'
import type { FamilySlug } from '@/lib/types'
import { cn } from '@/lib/utils'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { ProductCard } from '@/components/products/product-card'

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
  const [products, allProducts] = await Promise.all([
    getProducts(undefined, activeFamily ? { familySlug: activeFamily.slug as FamilySlug } : undefined),
    getProducts(),
  ])
  const familyName = (slug: string) => families.find((item) => item.slug === slug)?.name ?? ''

  const filters = [
    { label: 'All products', href: '/products', active: !activeFamily, count: allProducts.length },
    ...families.map((item) => ({
      label: item.name,
      href: `/products?family=${item.slug}`,
      active: activeFamily?.slug === item.slug,
      count: allProducts.filter((product) => product.familySlug === item.slug).length,
    })),
  ]

  return (
    <>
      <PageHero
        eyebrow="Product catalog"
        title={activeFamily ? activeFamily.name : 'Valves and connector assemblies'}
        description={
          activeFamily
            ? activeFamily.summary
            : 'Six products across three families, in brass, stainless steel and aluminum. Prices and stock levels are not listed; request a quotation for your requirement.'
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
                  <span className="font-mono text-xs opacity-80">{filter.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
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
      </Section>
    </>
  )
}
