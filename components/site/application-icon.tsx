import { FilePenLine, Gauge } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  'compressed-air-systems': Gauge,
  'drawing-based-custom-parts': FilePenLine,
}

export function ApplicationIcon({ slug }: { slug: string }) {
  const Icon = icons[slug] ?? FilePenLine
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-11 items-center justify-center border border-border bg-stage text-primary"
    >
      <Icon className="size-5" />
    </span>
  )
}
