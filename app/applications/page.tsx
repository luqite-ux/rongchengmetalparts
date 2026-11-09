import type { Metadata } from 'next'
import Image from 'next/image'
import { getApplicationAreas, getPageMeta, getProducts } from '@/lib/data'
import { PageHero } from '@/components/site/page-hero'
import { CtaLink, Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { ApplicationIcon } from '@/components/site/application-icon'

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta()
  return {
    title: meta.applications.title,
    description: meta.applications.description,
    alternates: { canonical: '/applications' },
  }
}

export default async function ApplicationsPage() {
  const [areas, products] = await Promise.all([getApplicationAreas(), getProducts()])
  const airBallValve = products.find((product) => product.slug === 'air-line-ball-valve') ?? products[0]

  return (
    <>
      <PageHero
        eyebrow="Applications"
        title="Confirmed Application Scope"
        description="RunCing currently focuses on air ball valves for compressed-air systems and drawing-based custom component review."
        crumbs={[{ label: 'Applications' }]}
      />
      <Section labelledBy="application-context-title">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,.85fr)] lg:gap-14">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden bg-stage">
              {airBallValve ? (
                <Image
                  src={airBallValve.images[0].src}
                  alt={airBallValve.images[0].alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-contain p-8 sm:p-12"
                />
              ) : null}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              id="application-context-title"
              eyebrow="Selection context"
              title="Start With Your Compressed-Air Requirement"
              description="For air ball valves, provide the medium, working pressure, thread and interface requirements. Drawing-based custom parts are reviewed separately against the supplied drawing or sample."
            />
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
              <span className="bg-stage px-3 py-2">Compressed Air</span>
              <span className="bg-stage px-3 py-2">Thread &amp; Interface</span>
              <span className="bg-stage px-3 py-2">Drawing or Sample</span>
            </div>
          </Reveal>
        </div>
      </Section>
      <Section labelledBy="areas-title">
        <h2 id="areas-title" className="sr-only">
          Application Areas
        </h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <li key={area.slug}>
              <Reveal className="h-full">
                <article
                  id={area.slug}
                  className="group flex h-full flex-col border bg-card p-6 transition-colors duration-200 hover:border-primary hover:bg-stage motion-reduce:transition-none sm:p-8"
                >
                  <div aria-hidden="true" className="size-12 text-primary [&>span]:size-12 [&_svg]:size-6">
                    <ApplicationIcon slug={area.slug} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{area.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {area.summary}
                  </p>
                  <div className="mt-6 border-t pt-4">
                    <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      Helpful RFQ inputs
                    </h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {area.rfqInputs.map((input) => (
                        <li
                          key={input}
                          className="bg-stage px-3 py-1.5 text-sm font-medium text-foreground"
                        >
                          {input}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
      <Section labelledBy="applications-cta-title" tone="stage">
        <Reveal>
          <SectionHeading
            id="applications-cta-title"
            eyebrow="Next step"
            title="Describe Your Application"
            description="Tell RunCing the medium, pressure, drawing, material and interface. Suitability is confirmed only after technical review."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/contact#rfq">Request a Quote</CtaLink>
            <CtaLink href="/products" variant="outline" arrow={false}>
              Browse Products
            </CtaLink>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
