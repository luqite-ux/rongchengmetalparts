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

export const revalidate = 60

export const metadata: Metadata = {
  title: { absolute: 'RunCing Tech | Air Ball Valves and Custom Components' },
  description:
    'RunCing Tech supplies representative air ball valves, valve assemblies, fittings and adapters, with drawing-based CNC, hot forging, stamping and welding review.',
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
        srTitle="RunCing Tech: Air Ball Valves and Custom Components"
      />
      <ManufacturingSection
        copy={home.sections.manufacturing}
        manufacturing={home.manufacturing}
        imageSrc={site.companyMedia[1] ?? site.companyMedia[0]}
      />
      <CustomizationSection
        copy={home.sections.customization}
        capabilities={home.customization.capabilities}
        buyerInputs={home.customization.buyerInputs}
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
      <QualitySection
        copy={home.sections.quality}
        statements={site.certificationStatements}
        inspection={home.quality.inspection}
        disclaimer={home.quality.disclaimer}
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
