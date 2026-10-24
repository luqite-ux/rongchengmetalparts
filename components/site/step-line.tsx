'use client'

import { cn } from '@/lib/utils'
import { useRevealOnView } from '@/components/site/reveal'

export function StepLine({
  steps,
  onDark = false,
  columns = 4,
}: {
  steps: { title: string; description: string }[]
  onDark?: boolean
  columns?: 4 | 5
}) {
  const ref = useRevealOnView<HTMLDivElement>()

  return (
    <div ref={ref} className="draw-nodes relative">
      <div
        aria-hidden="true"
        className={cn(
          'draw-line-y absolute bottom-3 left-[11px] top-3 w-0.5 lg:hidden',
          onDark ? 'bg-white' : 'bg-primary/40',
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          'draw-line absolute left-3 right-3 top-[11px] hidden h-0.5 lg:block',
          onDark ? 'bg-white' : 'bg-primary/40',
        )}
      />
      <ol
        className={cn(
          'relative grid gap-8 lg:gap-6',
          columns === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4',
        )}
      >
        {steps.map((step, stepIndex) => (
          <li key={step.title} className="relative pl-10 lg:pl-0 lg:pt-10">
            <span
              aria-hidden="true"
              style={{ transitionDelay: `${stepIndex * 140}ms` }}
              className={cn(
                'draw-node absolute left-0 top-0 flex size-6 items-center justify-center rounded-full font-mono text-[11px] font-semibold',
                onDark ? 'bg-white text-primary' : 'bg-primary text-primary-foreground',
              )}
            >
              {stepIndex + 1}
            </span>
            <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
            <p
              className={cn(
                'mt-2 text-sm leading-relaxed',
                onDark ? 'text-white' : 'text-muted-foreground',
              )}
            >
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
