import type { ApplicationArea, HeroSlide, ProductFamily } from '@/lib/types'

export const customerHeroSlides: HeroSlide[] = [
  {
    id: 'custom-machined-components',
    image: {
      src: '/images/banners/custom-machined-components.jpg',
      alt: 'Customer-supplied banner showing a range of machined metal components',
      width: 3840,
      height: 1600,
    },
    eyebrow: 'Drawing-Based Custom Manufacturing',
    headline: 'Custom Components Built From Your Drawings',
    body: 'Send a drawing, sample or interface requirement for technical review across CNC, hot forging, stamping and welding.',
    primaryCta: { label: 'Review Our Capabilities', href: '/manufacturing' },
    secondaryCta: { label: 'Send an RFQ', href: '/contact#rfq' },
    tone: 'on-dark',
    textSide: 'left',
    objectPosition: { mobile: '73% 50%', desktop: '50% 50%' },
  },
  {
    id: 'precision-manufacturing',
    image: {
      src: '/images/banners/precision-manufacturing.jpg',
      alt: 'Customer-supplied banner showing precision-machined metal components',
      width: 3840,
      height: 1600,
    },
    eyebrow: 'Manufacturing Capability',
    headline: 'CNC, Hot Forging, Stamping and Welding',
    body: 'Review the four core processes first, then share the material, dimensions, interfaces and quantity required for your part.',
    primaryCta: { label: 'Explore Manufacturing', href: '/manufacturing' },
    secondaryCta: { label: 'Request a Quote', href: '/contact#rfq' },
    tone: 'on-dark',
    textSide: 'right',
    objectPosition: { mobile: '26% 50%', desktop: '50% 50%' },
  },
  {
    id: 'air-ball-valve-series',
    image: {
      src: '/images/banners/air-ball-valve-series.jpg',
      alt: 'Customer-supplied banner showing brass valve components and fittings',
      width: 3840,
      height: 1600,
    },
    eyebrow: 'Featured Product Series',
    headline: 'Air Ball Valve Series and Related Components',
    body: 'Browse representative valve assemblies, fittings and adapters, or send a drawing for another component requirement.',
    primaryCta: { label: 'Browse Product Categories', href: '/products' },
    secondaryCta: { label: 'Send an RFQ', href: '/contact#rfq' },
    tone: 'on-dark',
    textSide: 'left',
    objectPosition: { mobile: '75% 50%', desktop: '50% 50%' },
  },
]

export const catalogParentName = 'Air Ball Valve Series'

export const catalogFamilies: ProductFamily[] = [
  {
    slug: 'valve-assemblies',
    name: 'Valve Assemblies',
    descriptor: 'Air Ball Valve Series',
    summary: 'Representative air ball valves and machined valve assemblies for drawing-based review.',
    scope: ['Air Line Ball Valve', 'Brass Valve Assembly', 'Stainless Steel Valve Assembly', 'Aluminum Valve Assembly'],
  },
  {
    slug: 'fittings-adapters',
    name: 'Fittings & Adapters',
    descriptor: 'Air Ball Valve Series',
    summary: 'Representative elbows, straight connectors, fittings and adapters reviewed against your drawing or sample.',
    scope: ['Elbow Assembly', 'Straight Connector'],
  },
  {
    slug: 'others',
    name: 'Others',
    descriptor: 'Drawing-Based Review',
    summary: 'Additional product types are discussed only after RunCing reviews the drawing, sample and operating requirements.',
    scope: [],
  },
]

const fittings = new Set(['elbow-assembly', 'straight-connector'])
const valves = new Set([
  'air-line-ball-valve',
  'brass-valve-assembly',
  'stainless-steel-valve-assembly',
  'aluminum-valve-assembly',
])

export function catalogFamilyForProduct(slug: string, categorySlug?: string | null) {
  const category = categorySlug?.trim().toLowerCase()
  if (category === 'valve-assemblies') return 'valve-assemblies'
  if (category === 'fittings-adapters') return 'fittings-adapters'
  if (category === 'others') return 'others'
  if (fittings.has(slug)) return 'fittings-adapters'
  if (valves.has(slug)) return 'valve-assemblies'
  return 'others'
}

export const priorityCapabilities = [
  { title: 'CNC', description: 'Machining requirements are reviewed against the drawing, material, tolerances and interfaces supplied for the project.' },
  { title: 'Hot Forging', description: 'Hot-forged parts are assessed against the required material, geometry and downstream machining work.' },
  { title: 'Stamping', description: 'Stamped component requirements are reviewed from the drawing, sample, material and expected quantity.' },
  { title: 'Welding', description: 'Welded assemblies are evaluated from the joint design, material and inspection requirements provided by the buyer.' },
]

export const customerApplications: ApplicationArea[] = [
  {
    slug: 'compressed-air-systems',
    name: 'Compressed Air Systems',
    summary: 'Air ball valves and related components for compressed-air lines, subject to confirmation of the medium, pressure, thread and interface requirements.',
    rfqInputs: ['Medium', 'Operating pressure', 'Thread and interface'],
  },
  {
    slug: 'drawing-based-custom-parts',
    name: 'Drawing-Based Custom Parts',
    summary: 'Machined, forged, stamped or welded parts are reviewed only against the buyer’s drawing, sample, material and operating requirements.',
    rfqInputs: ['Drawing or sample', 'Material', 'Dimensions and tolerances'],
  },
]

export const catalogIntroduction = 'Browse representative products from the Air Ball Valve Series. The displayed items are examples rather than the complete range; send a drawing or sample for other configurations and regular model details.'
