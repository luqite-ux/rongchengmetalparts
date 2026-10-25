import Image from 'next/image'
import type { ImageAsset } from '@/lib/types'
import { CtaLink, Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { StepLine } from '@/components/site/step-line'

type Manufacturing = {
  facts: { label: string; description: string }[]
  capabilityLine: { title: string; description: string }[]
  images: ImageAsset[]
}

export function ManufacturingSection({
  copy,
  manufacturing,
}: {
  copy: { eyebrow: string; title: string; description: string }
  manufacturing: Manufacturing
}) {
  const image = manufacturing.images[0]
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
        <Reveal delay={100}>
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover object-[12%_50%]"
            />
          </div>
        </Reveal>
      </div>
      <div className="mt-14 border-t border-white/60 pt-10">
        <StepLine steps={manufacturing.capabilityLine} onDark />
      </div>
    </Section>
  )
}
