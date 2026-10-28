import { Mail, MapPin } from 'lucide-react'
import type { ApplicationArea, MaterialOption, Product } from '@/lib/types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { RfqForm } from '@/components/rfq/rfq-form'

type SiteContact = {
  email: string
  location: string
  streetAddress: string | null
  legalNameEn: string
  legalNameZh: string
}

export function RfqSection({
  copy,
  site,
  products,
  materials,
  applications,
  buyerInputs,
  defaultProduct,
  headingAs = 'h2',
}: {
  copy: { eyebrow: string; title: string; description: string }
  site: SiteContact
  products: Product[]
  materials: MaterialOption[]
  applications: ApplicationArea[]
  buyerInputs: string[]
  defaultProduct?: string
  headingAs?: 'h1' | 'h2'
}) {
  return (
    <Section id="rfq" labelledBy="rfq-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal>
          <SectionHeading id="rfq-title" as={headingAs} {...copy} />
          <address className="mt-8 space-y-5 not-italic">
            <div className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center break-all text-base text-primary underline underline-offset-4"
                >
                  {site.email}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">Address</p>
                <p className="text-base leading-relaxed">
                  {site.legalNameEn}
                  <br />
                  {site.streetAddress ?? site.location}
                </p>
              </div>
            </div>
          </address>
          <div className="mt-8 border-t pt-6">
            <h3 className="text-base font-semibold">Useful to include</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary">
              {buyerInputs.slice(0, 6).map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <RfqForm
            email={site.email}
            defaultProduct={defaultProduct}
            productOptions={[
              ...products.map((product) => ({ value: product.slug, label: product.name })),
              { value: 'custom', label: 'Custom part / not listed' },
            ]}
            materialOptions={[
              ...materials.map((material) => ({ value: material.slug, label: material.name })),
              { value: 'undecided', label: 'Not decided' },
            ]}
            applicationOptions={[
              ...applications.map((area) => ({ value: area.slug, label: area.name })),
              { value: 'other', label: 'Other' },
            ]}
          />
        </Reveal>
      </div>
    </Section>
  )
}
