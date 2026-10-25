import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ApplicationArea } from '@/lib/types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { ApplicationIcon } from '@/components/site/application-icon'

export function ApplicationsSection({
  copy,
  areas,
}: {
  copy: { eyebrow: string; title: string; description: string }
  areas: ApplicationArea[]
}) {
  return (
    <Section id="applications" labelledBy="applications-title" tone="stage">
      <Reveal>
        <SectionHeading id="applications-title" {...copy} />
      </Reveal>
      <Reveal className="mt-12">
        <ul className="grid border-l border-t bg-card sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, areaIndex) => (
            <li key={area.slug} className="border-b border-r p-6">
              <ApplicationIcon slug={area.slug} />
              <p className="font-mono text-xs text-primary">
                {String(areaIndex + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{area.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.summary}</p>
            </li>
          ))}
          <li className="group border-b border-r bg-accent p-6 transition-colors duration-200 hover:bg-secondary motion-reduce:transition-none">
            <h3 className="text-xl font-semibold tracking-tight text-accent-foreground">
              Application not listed?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              Describe your equipment in an RFQ and RunCing will review it with you.
            </p>
            <Link
              href="/applications"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Applications overview
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </li>
        </ul>
      </Reveal>
    </Section>
  )
}
