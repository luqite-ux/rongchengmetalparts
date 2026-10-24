import { Check } from 'lucide-react'
import { CtaLink, Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'

export function CustomizationSection({
  copy,
  capabilities,
  buyerInputs,
}: {
  copy: { eyebrow: string; title: string; description: string }
  capabilities: { title: string; description: string }[]
  buyerInputs: string[]
}) {
  return (
    <Section id="customization" labelledBy="customization-title" tone="stage">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading id="customization-title" {...copy} />
          <ul className="mt-8 divide-y border-y">
            {capabilities.map((item, itemIndex) => (
              <li key={item.title} className="flex gap-4 py-5">
                <span
                  aria-hidden="true"
                  className="font-mono text-sm font-semibold text-primary"
                >
                  {String(itemIndex + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100}>
          <div className="border bg-card p-6 sm:p-8">
            <h3 className="text-xl font-semibold tracking-tight">Inputs to include in your RFQ</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Provide what you have. Missing items are clarified during technical review.
            </p>
            <ul className="mt-6 space-y-3">
              {buyerInputs.map((input) => (
                <li key={input} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                  {input}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaLink href="/contact#rfq">Start an RFQ</CtaLink>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
