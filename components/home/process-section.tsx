import type { ProcessStep } from '@/lib/types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { StepLine } from '@/components/site/step-line'

export function ProcessSection({
  copy,
  steps,
}: {
  copy: { eyebrow: string; title: string; description: string }
  steps: ProcessStep[]
}) {
  return (
    <Section id="cooperation-process" labelledBy="process-title">
      <Reveal>
        <SectionHeading id="process-title" {...copy} />
      </Reveal>
      <div className="mt-12">
        <StepLine steps={steps} columns={5} />
      </div>
    </Section>
  )
}
