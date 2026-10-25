import type { Metadata } from 'next'
import { getApplicationAreas, getPageMeta } from '@/lib/data'
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
  const areas = await getApplicationAreas()

  return (
    <>
      <PageHero
        eyebrow="Applications"
        title="Where RunCing valves and connectors are used"
        description="Review common use areas for RunCing valves and connectors, then share your system details for product selection."
        crumbs={[{ label: 'Applications' }]}
      />
      <Section labelledBy="areas-title">
        <h2 id="areas-title" className="sr-only">
          Application areas
        </h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {areas.map((area, areaIndex) => (
            <li key={area.slug}>
              <Reveal className="h-full">
                <article
                  id={area.slug}
                  className="flex h-full flex-col border-2 border-border bg-card p-6 transition-colors duration-200 hover:border-primary motion-reduce:transition-none sm:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <ApplicationIcon slug={area.slug} />
                    <span aria-hidden="true" className="font-mono text-sm font-semibold text-primary">
                      {String(areaIndex + 1).padStart(2, '0')}
                    </span>
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
            title="Describe your application"
            description="Tell RunCing the system, the media and the interface. Technical review starts from the details you provide."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/contact#rfq">Request a quote</CtaLink>
            <CtaLink href="/products" variant="outline" arrow={false}>
              Browse products
            </CtaLink>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
