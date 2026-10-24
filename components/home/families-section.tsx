import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product, ProductFamily } from '@/lib/types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { ProductStage } from '@/components/products/product-card'

type SectionCopy = { eyebrow: string; title: string; description: string }

export function FamiliesSection({
  copy,
  families,
  products,
}: {
  copy: SectionCopy
  families: ProductFamily[]
  products: Product[]
}) {
  return (
    <Section id="product-families" labelledBy="product-families-title" tone="stage">
      <Reveal>
        <SectionHeading id="product-families-title" {...copy} />
      </Reveal>
      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {families.map((family, familyIndex) => {
          const familyProducts = products.filter((product) => product.familySlug === family.slug)
          const materials = Array.from(
            new Set(familyProducts.map((product) => product.materialLabel)),
          )
          return (
            <li key={family.slug}>
              <Reveal delay={familyIndex * 80} className="h-full">
                <article className="group relative flex h-full flex-col border bg-card transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-md has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring motion-reduce:transition-none">
                  <div
                    className="grid gap-px border-b bg-border"
                    style={{ gridTemplateColumns: `repeat(${familyProducts.length}, minmax(0, 1fr))` }}
                  >
                    {familyProducts.map((product) => (
                      <ProductStage
                        key={product.slug}
                        image={product.images[0]}
                        sizes="(min-width: 1024px) 14vw, 30vw"
                        className="aspect-[4/5]"
                      />
                    ))}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {String(familyIndex + 1).padStart(2, '0')} / {family.descriptor}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                      <Link
                        href={`/products?family=${family.slug}`}
                        className="outline-none after:absolute after:inset-0 after:content-['']"
                      >
                        {family.name}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {family.summary}
                    </p>
                    <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t pt-4 text-sm">
                      <dt className="font-medium">Products</dt>
                      <dd className="text-muted-foreground">{familyProducts.length}</dd>
                      <dt className="font-medium">Materials</dt>
                      <dd className="text-muted-foreground">{materials.join(', ')}</dd>
                    </dl>
                    <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-semibold text-primary">
                      View {family.name}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      />
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
