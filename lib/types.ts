export type FamilySlug =
  | 'ball-valve-series'
  | 'valve-assemblies'
  | 'connector-series'

export type MaterialSlug = 'brass' | 'stainless-steel' | 'aluminum'

export interface ImageAsset {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface ProductFamily {
  slug: FamilySlug
  name: string
  descriptor: string
  summary: string
  scope: string[]
}

export interface ProductFact {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  familySlug: FamilySlug
  materialSlug: MaterialSlug | null
  materialLabel: string
  summary: string
  description: string[]
  highlights: string[]
  facts: ProductFact[]
  images: ImageAsset[]
  seo: { title: string; description: string }
}

export interface MaterialOption {
  slug: MaterialSlug
  name: string
  summary: string
  note: string
  productSlugs: string[]
}

export interface ApplicationArea {
  slug: string
  name: string
  summary: string
  rfqInputs: string[]
}

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

export interface HeroSlide {
  id: string
  image: ImageAsset
  eyebrow: string
  headline: string
  body: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  tone: 'on-dark' | 'on-light'
  textSide: 'left' | 'right'
  objectPosition: { mobile: string; desktop: string }
}

export interface ProcessStep {
  title: string
  description: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface CertificationStatement {
  label: string
  note: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  author?: string
  coverImage?: ImageAsset
  body: string[]
  seo?: { title?: string; description?: string }
}
