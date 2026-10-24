import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('hq_admin_session')?.value
  const tenant = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (token && tenant && request.cookies.get('hq_tenant_id')?.value === tenant) {
    const db = createAdminClient()
    const { data: session } = await db.from('admin_user_sessions').select('id,admin_user_id').eq('token', token).maybeSingle()
    if (session) await db.from('admin_user_sessions').delete().eq('id', session.id).eq('token', token)
  }
  const response = NextResponse.redirect(new URL('/admin/login', request.url), 303)
  for (const name of ['hq_admin_session', 'hq_tenant_id']) response.cookies.set(name, '', { httpOnly: true, path: '/', maxAge: 0, sameSite: 'lax', secure: request.nextUrl.protocol === 'https:' })
  return response
}
