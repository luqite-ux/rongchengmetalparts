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
          View All Products
        </CtaLink>
      </div>
      <Reveal className="mt-10">
        <div className="grid overflow-hidden border bg-stage lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,.7fr)]">
          <div className="relative aspect-[12/5] min-h-64 lg:aspect-auto">
            <Image
              src="/images/banners/air-ball-valve-series.jpg"
              alt="Customer-supplied collection of brass valve components, fittings and adapters"
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover object-[70%_50%]"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Product Collection
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              More Than Six Product Configurations
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              The cards below are representative products. Send a drawing, sample or regular model reference so the required size, thread, interface and material can be reviewed.
            </p>
            <div className="mt-6">
              <CtaLink href="/contact#rfq">Send Your Drawing</CtaLink>
            </div>
          </div>
        </div>
      </Reveal>
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
import Image from 'next/image'
