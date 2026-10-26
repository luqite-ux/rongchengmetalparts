import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('public English copy uses buyer-facing language and includes verified company facts', () => {
  const pages = read('lib/content/en/pages.ts')
  const manufacturing = read('app/manufacturing/page.tsx')

  for (const phrase of [
    'Browse the real catalog',
    'Three real families',
    'A neutral view of the steps',
    'RunCing states',
    'trading name',
    'Company documentation can be discussed',
  ]) {
    assert.equal(pages.includes(phrase) || manufacturing.includes(phrase), false, phrase)
  }

  assert.match(pages, /10,000 m²/)
  assert.match(pages, /founded in 2014/)
  assert.match(pages, /roots in custom metalworking dating to 1997/)
  assert.match(pages, /monthly capacity of approximately 500,000 pieces/i)
})

test('mobile hero follows content height without a fixed flex spacer', () => {
  const hero = read('components/home/hero-carousel.tsx')
  assert.doesNotMatch(hero, /relative flex flex-1 lg:h-\[640px\]/)
  assert.match(hero, /relative lg:h-\[640px\]/)
})

test('application areas use a consistent semantic icon set', () => {
  const homeApplications = read('components/home/applications-section.tsx')
  const applicationsPage = read('app/applications/page.tsx')
  const applicationIcon = read('components/site/application-icon.tsx')

  assert.match(homeApplications, /ApplicationIcon/)
  assert.match(applicationsPage, /ApplicationIcon/)
  assert.match(applicationIcon, /Truck/)
  assert.match(applicationIcon, /Gauge/)
  assert.match(applicationIcon, /Factory/)
})

test('alerts do not use thick side-tab borders', () => {
  const quality = read('components/home/quality-section.tsx')
  const rfq = read('components/rfq/rfq-form.tsx')
  assert.doesNotMatch(quality, /border-l-4/)
  assert.doesNotMatch(rfq, /border-l-4/)
})

test('English RFQ captcha uses English accessible text', () => {
  const captchaField = read('components/inquiry-captcha-field.tsx')
  const captchaSvg = read('lib/inquiry-captcha.ts')

  assert.match(captchaField, /alt="4-character verification code"/)
  assert.match(captchaSvg, /aria-label="Verification code image"/)
  assert.doesNotMatch(captchaField, /[\u3400-\u9fff]/)
  assert.doesNotMatch(captchaSvg, /[\u3400-\u9fff]/)
})

test('product families are a compact navigation layer rather than a second product-card grid', () => {
  const families = read('components/home/families-section.tsx')

  assert.match(families, /Browse by family/)
  assert.match(families, /family\.descriptor/)
  assert.match(families, /'product' : 'products'/)
  assert.doesNotMatch(families, /ProductStage/)
  assert.doesNotMatch(families, /<article/)
  assert.doesNotMatch(families, /aspect-\[/)
  assert.doesNotMatch(families, /gridTemplateColumns/)
})

test('material cards use a flat comparison layout without nested product cards', () => {
  const materials = read('components/home/materials-section.tsx')

  assert.match(materials, /aspect-\[16\/10\]/)
  assert.match(materials, /Products in this material/)
  assert.match(materials, /ArrowUpRight/)
  assert.doesNotMatch(materials, /border-t-4/)
  assert.doesNotMatch(materials, /grid-cols-2 gap-3/)
  assert.doesNotMatch(materials, /group block border bg-card/)
})

test('desktop product menu closes after pointer exit, outside click, and Escape', () => {
  const header = read('components/site/site-header.tsx')

  assert.match(header, /desktopMenuOpen/)
  assert.match(header, /onPointerLeave/)
  assert.match(header, /pointerdown/)
  assert.match(header, /event\.key === 'Escape'/)
})

test('company photography uses the reusable masonry lightbox experience', () => {
  const gallery = read('components/site/company-gallery.tsx')
  const about = read('app/about/page.tsx')
  const manufacturing = read('app/manufacturing/page.tsx')

  assert.match(gallery, /columns-1/)
  assert.match(gallery, /break-inside-avoid/)
  assert.match(gallery, /role="dialog"/)
  assert.match(gallery, /scrollY/)
  assert.match(gallery, /ArrowLeft/)
  assert.match(gallery, /ArrowRight/)
  assert.match(about, /CompanyGallery/)
  assert.match(manufacturing, /CompanyGallery/)
})

test('applications page leads with real product imagery and a graphic application grid', () => {
  const applications = read('app/applications/page.tsx')

  assert.match(applications, /hero-product-range\.jpg/)
  assert.match(applications, /ApplicationIcon/)
  assert.match(applications, /aria-hidden="true" className="size-12/)
  assert.doesNotMatch(applications, /padStart\(2, '0'\)/)
})

test('about introduction includes real company photography beside company facts', () => {
  const about = read('app/about/page.tsx')

  assert.match(about, /site\.companyMedia\[0\]/)
  assert.match(about, /Factory exterior at RunCing/)
})
