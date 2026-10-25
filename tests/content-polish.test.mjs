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
