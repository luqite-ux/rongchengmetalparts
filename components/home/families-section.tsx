import Link from 'next/link'
import { ArrowRight, CircleGauge, Settings2, Waypoints, type LucideIcon } from 'lucide-react'
import type { Product, ProductFamily } from '@/lib/types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'

type SectionCopy = { eyebrow: string; title: string; description: string }

const familyIcons: Record<string, LucideIcon> = {
  'ball-valve-series': CircleGauge,
  'valve-assemblies': Settings2,
  'connector-series': Waypoints,
}

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
      <ul
        aria-label="Browse by family"
        className="mt-8 divide-y border-y border-border lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0"
      >
        {families.map((family, familyIndex) => {
          const familyProducts = products.filter((product) => product.familySlug === family.slug)
          const materials = Array.from(
            new Set(familyProducts.map((product) => product.materialLabel)),
          )
          const FamilyIcon = familyIcons[family.slug] ?? Settings2
          return (
            <li key={family.slug} className="min-w-0">
              <Reveal delay={familyIndex * 80} className="h-full">
                <Link
                  href={`/products?family=${family.slug}`}
                  className="group flex h-full min-h-44 flex-col justify-between gap-6 px-1 py-6 outline-none transition-colors hover:bg-card focus-visible:bg-card focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring sm:px-5 lg:px-7 lg:py-8"
                >
                  <div>
                    <div className="flex items-start justify-between gap-5">
                      <p className="pt-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                        {family.descriptor}
                      </p>
                      <span className="grid size-11 flex-none place-items-center border border-primary/25 text-primary transition-[background-color,color,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:bg-primary group-focus-visible:text-primary-foreground motion-reduce:transform-none motion-reduce:transition-none">
                        <FamilyIcon aria-hidden="true" className="size-5" strokeWidth={1.7} />
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                      {family.name}
                    </h3>
                  </div>
                  <div className="flex items-end justify-between gap-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">{familyProducts.length}</span>{' '}
                      {familyProducts.length === 1 ? 'product' : 'products'} · {materials.join(' / ')}
                    </p>
                    <ArrowRight
                      aria-hidden="true"
                      className="mb-0.5 size-5 flex-none text-primary transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
                  </div>
                </Link>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
