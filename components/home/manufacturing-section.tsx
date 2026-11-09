import Image from 'next/image'
import { CtaLink, Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'

type Manufacturing = {
  facts: { label: string; description: string }[]
}

export function ManufacturingSection({
  copy,
  manufacturing,
  imageSrc,
}: {
  copy: { eyebrow: string; title: string; description: string }
  manufacturing: Manufacturing
  imageSrc?: string
}) {
  const facts = manufacturing.facts

  return (
    <Section id="manufacturing-capability" labelledBy="manufacturing-title" tone="green">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <SectionHeading id="manufacturing-title" onDark {...copy} />
          <dl className="mt-8 space-y-0">
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-white/60 py-4">
                <dt className="text-lg font-semibold">{fact.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-white">{fact.description}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4">
            <CtaLink href="/manufacturing" variant="onDark">
              Manufacturing details
            </CtaLink>
          </div>
        </Reveal>
        {imageSrc ? <Reveal delay={100}>
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
            <Image
              src={imageSrc}
              alt="RunCing machining workshop with production equipment"
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
        </Reveal> : null}
      </div>
    </Section>
  )
}
