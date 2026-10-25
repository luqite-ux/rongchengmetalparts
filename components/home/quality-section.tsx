import { ClipboardCheck, FileText, ShieldCheck } from 'lucide-react'
import type { CertificationStatement } from '@/lib/types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'

export function QualitySection({
  copy,
  statements,
  inspection,
  disclaimer,
}: {
  copy: { eyebrow: string; title: string; description: string }
  statements: CertificationStatement[]
  inspection: { title: string; description: string }[]
  disclaimer: string
}) {
  const inspectionIcons = [ClipboardCheck, FileText]

  return (
    <Section id="quality-and-certification" labelledBy="quality-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal>
          <SectionHeading id="quality-title" {...copy} />
          <p className="mt-6 border border-border bg-stage p-4 text-sm leading-relaxed">
            {disclaimer}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Quality management systems
              </h3>
              <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                {statements.map((statement) => (
                  <li key={statement.label} className="border bg-card p-5">
                    <ShieldCheck aria-hidden="true" className="size-6 text-primary" />
                    <p className="mt-3 text-xl font-semibold tracking-tight">{statement.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {statement.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Inspection and reports
              </h3>
              <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                {inspection.map((item, itemIndex) => {
                  const Icon = inspectionIcons[itemIndex % inspectionIcons.length]
                  return (
                    <li key={item.title} className="border bg-card p-5">
                      <Icon aria-hidden="true" className="size-6 text-primary" />
                      <p className="mt-3 text-xl font-semibold tracking-tight">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
