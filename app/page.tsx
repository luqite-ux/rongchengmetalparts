import type { Metadata } from 'next'
import {
  getHeroSlides,
  getHomeContent,
  getProductFamilies,
  getProducts,
  getSiteSettings,
} from '@/lib/data'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { FamiliesSection } from '@/components/home/families-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { ApplicationsSection } from '@/components/home/applications-section'
import { MaterialsSection } from '@/components/home/materials-section'
import { ManufacturingSection } from '@/components/home/manufacturing-section'
import { QualitySection } from '@/components/home/quality-section'
import { CustomizationSection } from '@/components/home/customization-section'
import { ProcessSection } from '@/components/home/process-section'
import { FaqSection } from '@/components/home/faq-section'
import { RfqSection } from '@/components/rfq/rfq-section'

export const metadata: Metadata = {
  title: { absolute: 'RunCing Tech | Valves and connector assemblies manufacturer' },
  description:
    'RunCing Tech supplies ball valves, valve assemblies and connector assemblies in brass, stainless steel and aluminum, with OEM/ODM support.',
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [site, slides, home, families, products] = await Promise.all([
    getSiteSettings(),
    getHeroSlides(),
    getHomeContent(),
    getProductFamilies(),
    getProducts(),
  ])

  return (
    <>
      <HeroCarousel
        slides={slides}
        srTitle="RunCing Tech: valves and connector assemblies manufacturer"
      />
      <FamiliesSection copy={home.sections.families} families={families} products={products} />
      <FeaturedProducts
        copy={home.sections.featured}
        products={products}
        families={families}
      />
      <ApplicationsSection copy={home.sections.applications} areas={home.applications} />
      <MaterialsSection
        copy={home.sections.materials}
        materials={home.materials}
        products={products}
      />
      <ManufacturingSection
        copy={home.sections.manufacturing}
        manufacturing={home.manufacturing}
        factoryScale={site.factory.scale}
      />
      <QualitySection
        copy={home.sections.quality}
        statements={site.certificationStatements}
        inspection={home.quality.inspection}
        disclaimer={home.quality.disclaimer}
      />
      <CustomizationSection
        copy={home.sections.customization}
        capabilities={home.customization.capabilities}
        buyerInputs={home.customization.buyerInputs}
      />
      <ProcessSection copy={home.sections.process} steps={home.process} />
      <FaqSection copy={home.sections.faq} items={home.faq} />
      <RfqSection
        copy={home.sections.rfq}
        site={site}
        products={products}
        materials={home.materials}
        applications={home.applications}
        buyerInputs={home.customization.buyerInputs}
      />
    </>
  )
}
