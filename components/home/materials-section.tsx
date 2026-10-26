import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { MaterialOption, Product } from '@/lib/types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { ProductStage } from '@/components/products/product-card'

export function MaterialsSection({
  copy,
  materials,
  products,
}: {
  copy: { eyebrow: string; title: string; description: string }
  materials: MaterialOption[]
  products: Product[]
}) {
  return (
    <Section id="material-options" labelledBy="material-options-title">
      <Reveal>
        <SectionHeading id="material-options-title" {...copy} />
      </Reveal>
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {materials.map((material, materialIndex) => {
          const materialProducts = material.productSlugs
            .map((slug) => products.find((product) => product.slug === slug))
            .filter((product): product is Product => Boolean(product))
          return (
            <li key={material.slug}>
              <Reveal delay={materialIndex * 80} className="h-full">
                <article className="group h-full overflow-hidden border bg-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
                  <div className="flex aspect-[16/10] items-center justify-center gap-2 border-b bg-stage p-4 sm:gap-3 sm:p-5">
                    {materialProducts.map((product) => (
                      <ProductStage
                        key={product.slug}
                        image={product.images[0]}
                        sizes="(min-width: 1024px) 14vw, 40vw"
                        className={materialProducts.length === 1
                          ? "h-full w-[68%] flex-none bg-transparent [&_img]:scale-100 group-hover:[&_img]:scale-[1.04]"
                          : "h-full min-w-0 flex-1 bg-transparent [&_img]:scale-100 group-hover:[&_img]:scale-[1.04]"
                        }
                      />
                    ))}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold tracking-tight">{material.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed">{material.summary}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {material.note}
                    </p>
                    <h4 className="mt-5 border-t pt-4 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      Products in this material
                    </h4>
                    <ul className="mt-2 divide-y">
                      {materialProducts.map((product) => (
                        <li key={product.slug}>
                          <Link
                            href={`/products/${product.slug}`}
                            className="flex min-h-11 items-center justify-between gap-3 py-2 text-sm font-semibold text-foreground outline-none transition-colors hover:text-primary focus-visible:text-primary motion-reduce:transition-none"
                          >
                            {product.name}
                            <ArrowUpRight aria-hidden="true" className="size-4 flex-none" />
                          </Link>
                        </li>
                      ))}
                    </ul>
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
