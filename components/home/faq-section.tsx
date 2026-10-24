import type { FaqItem } from '@/lib/types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FaqSection({
  copy,
  items,
}: {
  copy: { eyebrow: string; title: string; description: string }
  items: FaqItem[]
}) {
  return (
    <Section id="faq" labelledBy="faq-title" tone="stage">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal>
          <SectionHeading id="faq-title" {...copy} />
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="border-t bg-card">
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b px-5">
                <AccordionTrigger className="min-h-11 py-4 text-left text-base font-semibold transition-colors duration-200 hover:text-primary hover:no-underline focus-visible:ring-[3px] motion-reduce:transition-none">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  )
}
