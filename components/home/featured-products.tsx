import Image from 'next/image'
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
        <div className="grid overflow-hidden border bg-card lg:grid-cols-[minmax(0,1.45fr)_minmax(19rem,.75fr)]">
          <div className="grid grid-cols-3 gap-px bg-border p-px" aria-label="Representative product collection">
            {products.slice(0, 6).map((product) => (
              <div key={product.slug} className="relative aspect-square bg-stage">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 33vw"
                  className="object-contain p-3 sm:p-5"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Product Collection
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Representative Air Ball Valve Series
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Explore representative valve assemblies, fittings and adapters. Additional configurations can be reviewed against your drawing, sample or regular model reference.
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
