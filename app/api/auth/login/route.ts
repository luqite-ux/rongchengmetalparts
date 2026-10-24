import { randomUUID } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const fail = () => NextResponse.redirect(new URL('/admin/login?error=invalid', request.url), 303)
  if (request.headers.get('origin') !== request.nextUrl.origin || Number(request.headers.get('content-length') || 0) > 8192) return fail()
  try {
    const form = await request.formData()
    const email = String(form.get('email') || '').trim().toLowerCase()
    const password = String(form.get('password') || '')
    const tenant = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
    if (!email || !password || !tenant || password.length > 256) return fail()
    const db = createAdminClient()
    const { data: user } = await db.from('admin_users').select('id,password_hash,tenant_id,is_active').eq('email', email).maybeSingle()
    if (!user?.is_active || user.tenant_id !== tenant || !await bcrypt.compare(password, user.password_hash)) return fail()
    const token = randomUUID()
    const expires = new Date(Date.now() + 7 * 86400000)
    const { error } = await db.from('admin_user_sessions').insert({ admin_user_id: user.id, token, expires_at: expires.toISOString(), user_agent: request.headers.get('user-agent')?.slice(0, 500) || null })
    if (error) return fail()
    await db.from('admin_users').update({ last_login_at: new Date().toISOString() }).eq('id', user.id)
    const response = NextResponse.redirect(new URL('/admin', request.url), 303)
    for (const [name, value] of [['hq_admin_session', token], ['hq_tenant_id', tenant]]) response.cookies.set(name, value, { httpOnly: true, secure: request.nextUrl.protocol === 'https:', sameSite: 'lax', path: '/', expires })
    response.headers.set('Cache-Control', 'no-store')
    return response
  } catch { return fail() }
}
