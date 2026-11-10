import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

async function revisionContract() {
  try {
    return await import('../lib/customer-revision.ts')
  } catch {
    return null
  }
}

test('customer-supplied banners carry three distinct procurement messages', async () => {
  const contract = await revisionContract()
  assert.deepEqual(
    contract?.customerHeroSlides.map(({ image, headline, primaryCta }) => ({
      image: image.src,
      headline,
      cta: primaryCta.label,
    })),
    [
      {
        image: '/images/banners/custom-machined-components.jpg',
        headline: 'Custom Components Built From Your Drawings',
        cta: 'Review Our Capabilities',
      },
      {
        image: '/images/banners/precision-manufacturing.jpg',
        headline: 'CNC, Hot Forging, Stamping and Welding',
        cta: 'Explore Manufacturing',
      },
      {
        image: '/images/banners/air-ball-valve-series.jpg',
        headline: 'Air Ball Valve Series and Related Components',
        cta: 'Browse Product Categories',
      },
    ],
  )
})

test('catalog groups products beneath the requested Air Ball Valve Series structure', async () => {
  const contract = await revisionContract()
  assert.equal(contract?.catalogParentName, 'Air Ball Valve Series')
  assert.deepEqual(
    contract?.catalogFamilies.map(({ slug, name }) => ({ slug, name })),
    [
      { slug: 'valve-assemblies', name: 'Valve Assemblies' },
      { slug: 'fittings-adapters', name: 'Fittings & Adapters' },
      { slug: 'others', name: 'Others' },
    ],
  )
  assert.equal(contract?.catalogFamilyForProduct('air-line-ball-valve'), 'valve-assemblies')
  assert.equal(contract?.catalogFamilyForProduct('straight-connector'), 'fittings-adapters')
})

test('runtime catalog mapping respects backend categories and sends unknown additions to Others', async () => {
  const contract = await import('../lib/customer-revision.ts')
  assert.equal(contract.catalogFamilyForProduct('new-adapter', 'fittings-adapters'), 'fittings-adapters')
  assert.equal(contract.catalogFamilyForProduct('new-custom-part', 'others'), 'others')
  assert.equal(contract.catalogFamilyForProduct('new-unclassified-part', 'future-category'), 'others')
  assert.equal(contract.catalogFamilyForProduct('straight-connector'), 'fittings-adapters')
})

test('capability and application copy stays inside the customer-confirmed scope', async () => {
  const contract = await revisionContract()
  assert.deepEqual(
    contract?.priorityCapabilities.map(({ title }) => title),
    ['CNC', 'Hot Forging', 'Stamping', 'Welding'],
  )
  assert.deepEqual(
    contract?.customerApplications.map(({ slug, name }) => ({ slug, name })),
    [
      { slug: 'compressed-air-systems', name: 'Compressed Air Systems' },
      { slug: 'drawing-based-custom-parts', name: 'Drawing-Based Custom Parts' },
    ],
  )
  const publicCopy = JSON.stringify(contract?.customerApplications ?? []).toLowerCase()
  assert.doesNotMatch(publicCopy, /gas|fuel|hydraulic|high-pressure/)
})

test('catalog introduction never presents six records as the complete product range', async () => {
  const contract = await revisionContract()
  assert.match(contract?.catalogIntroduction ?? '', /representative products/i)
  assert.doesNotMatch(contract?.catalogIntroduction ?? '', /six products|complete catalog/i)
})

test('visible section and catalog headings use English title case', async () => {
  const [productsPage, materials, quality, manufacturing] = await Promise.all([
    readFile(new URL('../app/products/page.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/home/materials-section.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/home/quality-section.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/manufacturing/page.tsx', import.meta.url), 'utf8'),
  ])
  const source = [productsPage, materials, quality, manufacturing].join('\n')
  assert.match(source, /All Products/)
  assert.match(source, /Products in This Material/)
  assert.match(source, /Quality Management Systems/)
  assert.match(source, /Inspection and Reports/)
})

test('customer-supplied composite banners stay inside the homepage hero', async () => {
  const [featured, applications, manufacturingPage, manufacturingHome] = await Promise.all([
    readFile(new URL('../components/home/featured-products.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/applications/page.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../app/manufacturing/page.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../components/home/manufacturing-section.tsx', import.meta.url), 'utf8'),
  ])
  for (const source of [featured, applications, manufacturingPage, manufacturingHome]) {
    assert.doesNotMatch(source, /images\/banners\//)
  }
  assert.match(featured, /product\.images\[0\]/)
  assert.match(applications, /getProducts/)
  assert.match(manufacturingPage, /site\.companyMedia/)
})

test('latest revision copy does not repeat the rejected six-product framing', async () => {
  const featured = await readFile(new URL('../components/home/featured-products.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(featured, /More Than Six|Six Product|six product/i)
  assert.match(featured, /Representative Air Ball Valve Series/)
})

test('homepage manufacturing capability section uses the requested white theme', async () => {
  const source = await readFile(new URL('../components/home/manufacturing-section.tsx', import.meta.url), 'utf8')
  assert.match(source, /tone="white"/)
  assert.doesNotMatch(source, /tone="green"|onDark|border-white|text-white/)
})

test('Others includes the complete customer-supplied stamping and welding product set', async () => {
  const contract = await revisionContract()
  assert.equal(contract?.stampingWeldingProducts.length, 21)
  assert.deepEqual(
    contract?.stampingWeldingProducts.map(({ slug, sourceFile, categorySlug }) => ({ slug, sourceFile, categorySlug })),
    Array.from({ length: 21 }, (_, index) => ({
      slug: `stamping-welding-part-${String(index + 1).padStart(2, '0')}`,
      sourceFile: `${index + 1}.png`,
      categorySlug: 'others',
    })),
  )
})
