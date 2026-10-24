import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import {
  getApplicationAreas,
  getHomeContent,
  getMaterialOptions,
  getPageMeta,
  getProducts,
  getSiteSettings,
} from '@/lib/data'
import { RfqSection } from '@/components/rfq/rfq-section'

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMeta()
  return {
    title: meta.contact.title,
    description: meta.contact.description,
    alternates: { canonical: '/contact' },
  }
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string | string[] }>
}) {
  const { product } = await searchParams
  const defaultProduct = Array.isArray(product) ? product[0] : product
  const [site, products, materials, applications, home] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getMaterialOptions(),
    getApplicationAreas(),
    getHomeContent(),
  ])

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact and request for quotation"
        description="Send your requirements to RunCing for product selection, availability and quotation details."
        crumbs={[{ label: 'Contact' }]}
      />
      <RfqSection
        copy={home.sections.rfq}
        site={site}
        products={products}
        materials={materials}
        applications={applications}
        buyerInputs={home.customization.buyerInputs}
        defaultProduct={defaultProduct}
        headingAs="h2"
      />
    </>
  )
}
