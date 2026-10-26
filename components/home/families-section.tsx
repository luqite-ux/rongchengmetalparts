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
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {families.map((family, familyIndex) => {
          const familyProducts = products.filter((product) => product.familySlug === family.slug)
          const materials = Array.from(
            new Set(familyProducts.map((product) => product.materialLabel)),
          )
          return (
            <li key={family.slug}>
              <Reveal delay={familyIndex * 80} className="h-full">
                <article className="group relative h-full overflow-hidden border bg-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring motion-reduce:transform-none motion-reduce:transition-none">
                  <div className="flex aspect-[16/10] items-center justify-center gap-2 border-b bg-stage p-4 sm:gap-3 sm:p-5">
                    {familyProducts.map((product) => (
                      <ProductStage
                        key={product.slug}
                        image={product.images[0]}
                        sizes="(min-width: 1024px) 14vw, 30vw"
                        className={familyProducts.length === 1
                          ? "h-full w-[68%] flex-none bg-transparent [&_img]:scale-100 group-hover:[&_img]:scale-[1.04]"
                          : "h-full min-w-0 flex-1 bg-transparent [&_img]:scale-100 group-hover:[&_img]:scale-[1.04]"
                        }
                      />
                    ))}
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                      {family.descriptor}
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
                    <p className="mt-5 border-t pt-4 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{familyProducts.length}</span> products · {materials.join(' / ')}
                    </p>
                    <span className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">
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
