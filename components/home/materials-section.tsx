import Link from 'next/link'
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
      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {materials.map((material, materialIndex) => {
          const materialProducts = material.productSlugs
            .map((slug) => products.find((product) => product.slug === slug))
            .filter((product): product is Product => Boolean(product))
          return (
            <li key={material.slug}>
              <Reveal delay={materialIndex * 80} className="h-full">
                <article className="flex h-full flex-col border-t-4 border-primary bg-stage p-6">
                  <h3 className="text-2xl font-semibold tracking-tight">{material.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{material.summary}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {material.note}
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-3">
                    {materialProducts.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={`/products/${product.slug}`}
                          className="group block border bg-card transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-sm focus-visible:border-primary motion-reduce:transition-none"
                        >
                          <ProductStage
                            image={product.images[0]}
                            sizes="(min-width: 1024px) 14vw, 40vw"
                          />
                          <span className="block min-h-11 px-3 py-2 text-sm font-medium leading-snug">
                            {product.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
