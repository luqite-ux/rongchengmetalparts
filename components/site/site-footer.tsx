import Link from 'next/link'
import type { NavItem } from '@/lib/types'
import { Container } from '@/components/site/primitives'
import { Logo } from '@/components/site/logo'

type FooterSite = {
  name: string
  legalNameEn: string
  legalNameZh: string
  email: string
  location: string
  streetAddress: string | null
}

const footerLink =
  'inline-flex min-h-11 items-center text-sm text-white underline-offset-4 transition-colors duration-200 hover:underline focus-visible:underline motion-reduce:transition-none'

export function SiteFooter({
  site,
  links,
  primary,
}: {
  site: FooterSite
  links: { label: string; href: string }[]
  primary: NavItem[]
}) {
  const products = primary.find((item) => item.children)?.children ?? []
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-deep text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="inline-block rounded-md bg-white px-3 py-1">
            <Logo />
          </div>
          <p className="text-sm leading-relaxed text-white">
            {site.legalNameEn}
          </p>
        </div>

        <nav aria-label="Product families">
          <h2 className="font-mono text-xs uppercase tracking-[0.14em]">Products</h2>
          <ul className="mt-3">
            <li>
              <Link href="/products" className={footerLink}>
                All products
              </Link>
            </li>
            {products.map((child) => (
              <li key={child.href}>
                <Link href={child.href} className={footerLink}>
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="font-mono text-xs uppercase tracking-[0.14em]">Company</h2>
          <ul className="mt-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.14em]">Contact</h2>
          <address className="mt-3 space-y-2 text-sm not-italic leading-relaxed">
            <a href={`mailto:${site.email}`} className={footerLink}>
              {site.email}
            </a>
            <p>{site.streetAddress ?? site.location}</p>
          </address>
        </div>
      </Container>
      <div className="border-t border-white/30">
        <Container className="flex flex-col gap-1 py-5 text-xs sm:flex-row sm:justify-between">
          <p>
            &copy; {year} {site.legalNameEn}
          </p>
          <p>rongchengmetalparts.com</p>
        </Container>
      </div>
    </footer>
  )
}
