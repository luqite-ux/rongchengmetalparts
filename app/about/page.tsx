import type { Metadata } from 'next'
import Image from 'next/image'
import { getAboutContent, getPageMeta, getProductFamilies, getSiteSettings } from '@/lib/data'
import { PageHero } from '@/components/site/page-hero'
import { CtaLink, Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta()
  return {
    title: meta.about.title,
    description: meta.about.description,
    alternates: { canonical: '/about' },
  }
}

export default async function AboutPage() {
  const [about, families, site] = await Promise.all([getAboutContent(), getProductFamilies(), getSiteSettings()])

  return (
    <>
      <PageHero
        eyebrow="About"
        title="RunCing Tech"
        description="A manufacturer of ball valves, valve assemblies and connector assemblies."
        crumbs={[{ label: 'About' }]}
      />
      <Section labelledBy="company-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading id="company-title" eyebrow="Company" title="Who we are" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              {about.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Image
              src={site.logoUrl}
              alt="RunCing logo"
              width={160}
              height={160}
              className="mt-8 h-auto w-32"
            />
          </Reveal>
          <Reveal delay={100}>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Company facts
            </h3>
            <dl className="mt-3 border-t">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid gap-1 border-b py-4 text-sm sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-4"
                >
                  <dt className="font-semibold">{fact.label}</dt>
                  <dd className="text-muted-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{about.note}</p>
          </Reveal>
        </div>
      </Section>
      {site.companyMedia.length ? (
        <Section labelledBy="company-gallery-title" tone="stage">
          <Reveal>
            <SectionHeading id="company-gallery-title" eyebrow="Factory evidence" title="Inside RunCing" description="Customer-supplied views of the facility, equipment and working environment." />
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.companyMedia.map((src, index) => (
              <li key={src} className="overflow-hidden border bg-card">
                <Reveal className="h-full">
                  <div className="relative aspect-[4/3] bg-stage">
                    <Image src={src} alt={`RunCing facility view ${index + 1}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      <Section labelledBy="families-title" tone="stage">
        <Reveal>
          <SectionHeading
            id="families-title"
            eyebrow="What we supply"
            title="Three product families"
          />
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {families.map((family) => (
            <li key={family.slug}>
              <Reveal className="h-full">
                <Link
                  href={`/products?family=${family.slug}`}
                  className="flex h-full min-h-11 flex-col border-2 border-border bg-card p-6 transition-colors duration-200 hover:border-primary motion-reduce:transition-none"
                >
                  <h3 className="text-lg font-semibold tracking-tight">{family.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {family.summary}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-primary">View catalog</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/contact#rfq">Request a quote</CtaLink>
          <CtaLink href="/manufacturing" variant="outline" arrow={false}>
            View manufacturing
          </CtaLink>
        </div>
      </Section>
    </>
  )
}
