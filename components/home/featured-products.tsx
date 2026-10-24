import type { Product, ProductFamily } from '@/lib/types'
import { CtaLink, Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { ProductCard } from '@/components/products/product-card'

export function FeaturedProducts({
  copy,
  products,
  families,
}: {
  copy: { eyebrow: string; title: string; description: string }
  products: Product[]
  families: ProductFamily[]
}) {
  const familyName = (slug: string) =>
    families.find((family) => family.slug === slug)?.name ?? ''

  return (
    <Section id="featured-products" labelledBy="featured-products-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <SectionHeading id="featured-products-title" {...copy} />
        </Reveal>
        <CtaLink href="/products" variant="outline">
          View all products
        </CtaLink>
      </div>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, productIndex) => (
          <li key={product.slug}>
            <Reveal delay={(productIndex % 3) * 70} className="h-full">
              <ProductCard
                product={product}
                familyName={familyName(product.familySlug)}
                index={productIndex}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
