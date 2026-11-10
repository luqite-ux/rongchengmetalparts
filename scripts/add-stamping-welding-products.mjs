import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { createRequire } from 'node:module'
import { stampingWeldingProducts } from '../lib/customer-revision.ts'

const require = createRequire('file:///D:/Cursor/Grand/huanqiu-admin/package.json')
const { createClient } = require('@supabase/supabase-js')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

for (const file of [
  'D:/Cursor/Grand/huanqiu-admin/.env',
  'D:/Cursor/Grand/huanqiu-admin/.env.local',
  'D:/Cursor/Grand/huanqiu-admin/_migrate-batch/.env',
]) {
  if (!fs.existsSync(file)) continue
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.trim().match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (match) process.env[match[1]] ??= match[2].trim().replace(/^['"]|['"]$/g, '')
  }
}

const required = (key) => {
  if (!process.env[key]) throw new Error(`Missing ${key}`)
  return process.env[key]
}

const sourceRoot = 'C:/Users/Grandlin/Documents/xwechat_files/wxid_zdhqp0r6gpta22_43a9/msg/file/2026-11/stamping&welding/stamping&welding'
const publicBase = (process.env.R2_PUBLIC_URL_PREFIX || process.env.R2_PUBLIC_URL || '').replace(/\/$/, '')
if (!publicBase) throw new Error('Missing R2 public base')

const db = createClient(required('NEXT_PUBLIC_SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), {
  auth: { persistSession: false },
})
const s3 = new S3Client({
  region: 'auto',
  endpoint: required('R2_S3_ENDPOINT'),
  credentials: {
    accessKeyId: required('R2_ACCESS_KEY_ID'),
    secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
  },
})
const bucket = required('R2_BUCKET_NAME')

async function upload(file, key) {
  const bytes = fs.readFileSync(file)
  const digest = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12)
  const objectKey = `site-assets/rongchengmetalparts/products/stamping-welding/${key}-${digest}.png`
  const signed = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: bucket,
      Key: objectKey,
      ContentType: 'image/png',
      ContentLength: bytes.length,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
    { expiresIn: 600 },
  )
  const response = await fetch(signed, {
    method: 'PUT',
    headers: { 'Content-Type': 'image/png', 'Content-Length': String(bytes.length) },
    body: bytes,
  })
  if (!response.ok) throw new Error(`R2 upload ${response.status}: ${path.basename(file)}`)
  const url = `${publicBase}/${objectKey}`
  const readback = await fetch(url, { method: 'HEAD' })
  if (!readback.ok) throw new Error(`R2 readback ${readback.status}: ${url}`)
  return url
}

const tenant = await db
  .from('tenants')
  .select('id')
  .eq('domain', 'rongchengmetalparts.com')
  .single()
if (tenant.error) throw tenant.error

const coverUrl = await upload(path.join(sourceRoot, '封面.png'), 'cover')
const category = await db
  .from('product_categories')
  .upsert({
    tenant_id: tenant.data.id,
    slug: 'others',
    name: 'Others',
    name_en: 'Others',
    name_i18n: { en: 'Others' },
    description: 'Customer-supplied stamping and welding products.',
    description_en: 'Customer-supplied stamping and welding products.',
    description_i18n: { en: 'Customer-supplied stamping and welding products.' },
    icon: coverUrl,
    sort_order: 2,
    is_active: true,
  }, { onConflict: 'tenant_id,slug' })
if (category.error) throw category.error

for (const [index, product] of stampingWeldingProducts.entries()) {
  const imageUrl = await upload(path.join(sourceRoot, product.sourceFile), product.slug)
  const description = 'Customer-supplied stamped or welded metal component for drawing-based manufacturing review.'
  const write = await db.from('products').upsert({
    tenant_id: tenant.data.id,
    slug: product.slug,
    name: product.name,
    name_en: product.name,
    name_i18n: { en: product.name },
    description,
    description_en: description,
    description_i18n: { en: description },
    overview: description,
    overview_en: description,
    overview_i18n: { en: description },
    image_url: imageUrl,
    category: 'Others',
    category_slug: 'others',
    features: ['Customer-supplied stamping or welding product', 'Specifications confirmed during RFQ'],
    features_i18n: { en: ['Customer-supplied stamping or welding product', 'Specifications confirmed during RFQ'] },
    applications: [],
    applications_i18n: { en: [] },
    advantages: [],
    advantages_i18n: { en: [] },
    specs: { 'Manufacturing scope': 'Stamping and welding', 'Drawing and dimensions': 'Confirmed during RFQ' },
    extra_data: { images: [imageUrl], source: 'customer supplied stamping&welding folder' },
    sort_order: 100 + index,
    is_active: true,
  }, { onConflict: 'tenant_id,slug' })
  if (write.error) throw write.error
}

const readback = await db
  .from('products')
  .select('slug,image_url,category_slug,is_active')
  .eq('tenant_id', tenant.data.id)
  .eq('category_slug', 'others')
  .like('slug', 'stamping-welding-part-%')
  .order('sort_order')
if (readback.error) throw readback.error
if (readback.data.length !== 21 || readback.data.some((item) => !item.is_active || !item.image_url.startsWith(publicBase))) {
  throw new Error('Stamping and welding product readback contract failed')
}

console.log(JSON.stringify({ result: 'PASS', tenantId: tenant.data.id, category: 'others', productCount: readback.data.length, coverUrl }))
