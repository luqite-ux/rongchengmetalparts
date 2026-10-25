import { Cog, Factory, Gauge, PanelsTopLeft, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  'commercial-vehicles': Truck,
  trailers: PanelsTopLeft,
  'cnc-equipment': Cog,
  'hydraulic-pneumatic-systems': Gauge,
  'industrial-equipment': Factory,
}

export function ApplicationIcon({ slug }: { slug: string }) {
  const Icon = icons[slug] ?? Factory
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-11 items-center justify-center border border-border bg-stage text-primary"
    >
      <Icon className="size-5" />
    </span>
  )
}
