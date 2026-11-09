import assert from 'node:assert/strict'
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
