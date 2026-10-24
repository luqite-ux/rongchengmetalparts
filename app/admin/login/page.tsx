import Image from 'next/image'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return <main className="grid min-h-screen place-items-center bg-slate-100 p-6">
    <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl" aria-labelledby="login-title">
      <Image src="/images/logo-full.png" alt="RunCing Tech" width={210} height={60} className="h-auto w-52" priority />
      <h1 id="login-title" className="mt-8 text-2xl font-semibold text-slate-950">Customer administration</h1>
      <p className="mt-2 text-sm text-slate-600">Sign in to manage products, articles, inquiries and site settings.</p>
      {error ? <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800">The email or password is incorrect. Please try again.</p> : null}
      <form action="/api/auth/login" method="post" className="mt-6 space-y-5">
        <label className="block text-sm font-medium text-slate-800">Email<input name="email" type="email" required autoComplete="username" className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-950" /></label>
        <label className="block text-sm font-medium text-slate-800">Password<input name="password" type="password" required autoComplete="current-password" className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-950" /></label>
        <button type="submit" className="h-11 w-full rounded-lg bg-[#006a17] px-4 font-semibold text-white hover:bg-[#005413]">Sign in</button>
      </form>
      <a href="/" className="mt-6 inline-block text-sm font-medium text-[#006a17] underline underline-offset-4">Return to website</a>
    </section>
  </main>
}
