import type { Metadata } from 'next'
import Image from 'next/image'
import { getHomeContent, getPageMeta, getSiteSettings } from '@/lib/data'
import { PageHero } from '@/components/site/page-hero'
import { CtaLink, Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { StepLine } from '@/components/site/step-line'

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta()
  return {
    title: meta.manufacturing.title,
    description: meta.manufacturing.description,
    alternates: { canonical: '/manufacturing' },
  }
}

export default async function ManufacturingPage() {
  const [home, site] = await Promise.all([getHomeContent(), getSiteSettings()])
  const { manufacturing, quality, process } = home
  const image = manufacturing.images[0]
  const facts = site.factory.scale
    ? [...manufacturing.facts, { label: 'Factory scale', description: site.factory.scale }]
    : manufacturing.facts

  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Hot-forging equipment, four workshops and inspection"
        description="Explore RunCing's hot-forging equipment, workshop organization and inspection workflow."
        crumbs={[{ label: 'Manufacturing' }]}
      />
      <Section labelledBy="capability-title">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              id="capability-title"
              eyebrow="Capability"
              title="What RunCing states about its factory"
            />
            <dl className="mt-8">
              {facts.map((fact) => (
                <div key={fact.label} className="border-t py-4">
                  <dt className="text-lg font-semibold">{fact.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {fact.description}
                  </dd>
                </div>
              ))}
            </dl>
            {!site.factory.scale ? (
              <p className="border-t pt-4 text-sm text-muted-foreground">{manufacturing.scaleNote}</p>
            ) : null}
          </Reveal>
          <Reveal delay={100}>
            <figure>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stage">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[18%_50%]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground">
                Manufacturing hall with CNC machines and conveyors.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>
      {site.companyMedia.length ? (
        <Section labelledBy="workshop-gallery-title" tone="stage">
          <Reveal>
            <SectionHeading id="workshop-gallery-title" eyebrow="Production environment" title="Facility and equipment gallery" description="See the spaces and equipment that support machining, assembly and material handling." />
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.companyMedia.map((src, index) => (
              <li key={src} className="overflow-hidden border bg-card">
                <Reveal className="h-full">
                  <div className="relative aspect-[4/3] bg-stage">
                    <Image src={src} alt={`RunCing workshop and equipment view ${index + 1}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      <Section labelledBy="line-title" tone="stage">
        <Reveal>
          <SectionHeading
            id="line-title"
            eyebrow="Capability line"
            title="From material to inspection"
            description="Follow the core production stages from material preparation through inspection."
          />
        </Reveal>
        <div className="mt-12">
          <StepLine steps={manufacturing.capabilityLine} columns={4} />
        </div>
      </Section>
      <Section labelledBy="inspection-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              id="inspection-title"
              eyebrow="Inspection and reports"
              title="Quality information available"
              description={quality.disclaimer}
            />
          </Reveal>
          <Reveal delay={100}>
            <ul className="divide-y border-y">
              {quality.inspection.map((item) => (
                <li key={item.title} className="py-5">
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ))}
              {site.certificationStatements.map((item) => (
                <li key={item.label} className="py-5">
                  <h3 className="text-lg font-semibold tracking-tight">{item.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
      <Section labelledBy="process-title" tone="stage">
        <Reveal>
          <SectionHeading
            id="process-title"
            eyebrow="Cooperation process"
            title="From inquiry to shipment"
            description="Timing depends on the product, the quantity and the confirmed requirements."
          />
        </Reveal>
        <div className="mt-12">
          <StepLine steps={process} columns={5} />
        </div>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/contact#rfq">Request a quote</CtaLink>
          <CtaLink href="/products" variant="outline" arrow={false}>
            Browse products
          </CtaLink>
        </div>
      </Section>
    </>
  )
}
