import { families, products } from './products'
import {
  aboutContent,
  applicationAreas,
  customizationContent,
  faqItems,
  heroSlides,
  homeSections,
  manufacturingContent,
  materialOptions,
  pageMeta,
  processSteps,
  qualityContent,
} from './pages'
import { certificationStatements, footerLinks, navigation, site } from './site'

export const en = {
  site,
  navigation,
  footerLinks,
  certificationStatements,
  families,
  products,
  heroSlides,
  homeSections,
  applicationAreas,
  materialOptions,
  manufacturingContent,
  qualityContent,
  customizationContent,
  processSteps,
  faqItems,
  aboutContent,
  pageMeta,
}

export type SiteContent = typeof en
