import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'

const requiredFields = ['name', 'company', 'email', 'country', 'message'] as const
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * RFQ intake boundary.
 * Validates the payload on the server, then reports honestly that delivery is not
 * connected yet. Replace the `not_configured` branch with the real handoff
 * (Supabase insert, email delivery, image CAPTCHA verification) and return 200.
 * Never return success until the inquiry has actually been stored or sent.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, code: 'invalid_json' }, { status: 400 })
  }

  const errors: Record<string, string> = {}
  for (const field of requiredFields) {
    const value = payload[field]
    if (typeof value !== 'string' || value.trim().length === 0) {
      errors[field] = 'required'
    }
  }
  if (typeof payload.email === 'string' && !emailPattern.test(payload.email.trim())) {
    errors.email = 'invalid'
  }
  if (payload.consent !== true) {
    errors.consent = 'required'
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, code: 'validation', errors }, { status: 400 })
  }
  const secret = process.env.CAPTCHA_SECRET?.trim()
  if (!secret) return NextResponse.json({ ok: false, code: 'verification_unavailable' }, { status: 503 })
  try {
    const context = createSupabaseCaptchaContextFromEnv()
    const captcha = await verifyCaptchaSubmission({
      secret,
      ...context,
      scope: String(payload.captchaScope ?? '').slice(0, 160),
      token: String(payload.captchaToken ?? '').slice(0, 4096),
      answer: String(payload.captchaAnswer ?? '').slice(0, 16),
    })
    if (!captcha.ok) return NextResponse.json({ ok: false, code: 'captcha' }, { status: 400 })
  } catch {
    return NextResponse.json({ ok: false, code: 'verification_unavailable' }, { status: 503 })
  }
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!tenantId || !url || !key) return NextResponse.json({ ok: false, code: 'storage_unavailable' }, { status: 503 })
  const clean = (name: string, max: number) => String(payload[name] ?? '').trim().slice(0, max)
  const details = [
    clean('message', 7000),
    clean('country', 120) && `Country/region: ${clean('country', 120)}`,
    clean('product', 200) && `Product: ${clean('product', 200)}`,
    clean('material', 120) && `Material: ${clean('material', 120)}`,
    clean('application', 200) && `Application: ${clean('application', 200)}`,
    clean('quantity', 120) && `Estimated quantity: ${clean('quantity', 120)}`,
    clean('specs', 500) && `Size / interface: ${clean('specs', 500)}`,
  ].filter(Boolean).join('\n\n')
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  const { data, error } = await db.from('inquiries').insert({
    tenant_id: tenantId,
    name: clean('name', 200),
    company: clean('company', 200),
    email: clean('email', 320),
    phone: clean('phone', 80) || null,
    subject: clean('product', 200) ? `RFQ: ${clean('product', 200)}` : 'Website RFQ',
    message: details,
    status: 'new',
  }).select('id').single()
  if (error) return NextResponse.json({ ok: false, code: 'storage_unavailable' }, { status: 503 })
  return NextResponse.json({ ok: true, reference: data.id }, { status: 201 })
}
