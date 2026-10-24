'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import type { NavItem } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Container, ctaClassName } from '@/components/site/primitives'
import { Logo } from '@/components/site/logo'

function isActive(pathname: string, href: string) {
  const path = href.split('?')[0].split('#')[0]
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

const linkBase =
  'inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none'

export function SiteHeader({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const active = isActive(pathname, item.href)
              const linkClass = cn(
                linkBase,
                active
                  ? 'text-primary'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground',
              )
              return (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(linkClass, 'relative')}
                  >
                    {item.label}
                    {item.children ? (
                      <ChevronDown
                        aria-hidden="true"
                        className="ml-1 size-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180 motion-reduce:transition-none"
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 bottom-1 h-0.5 bg-primary transition-opacity duration-200',
                        active ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </Link>
                  {item.children ? (
                    <div className="invisible absolute left-0 top-full z-50 w-72 pt-1 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 motion-reduce:transition-none">
                      <ul className="rounded-md border bg-background p-2 shadow-lg">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block min-h-11 rounded-md px-3 py-2 transition-colors duration-200 hover:bg-accent focus-visible:bg-accent motion-reduce:transition-none"
                            >
                              <span className="block text-sm font-semibold text-foreground">
                                {child.label}
                              </span>
                              {child.description ? (
                                <span className="block text-xs text-muted-foreground">
                                  {child.description}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact#rfq"
            className={ctaClassName('primary', 'hidden sm:inline-flex')}
          >
            Request a quote
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border transition-colors duration-200 hover:bg-accent motion-reduce:transition-none lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="border-t bg-background lg:hidden"
      >
        <Container className="max-h-[calc(100svh-4.5rem)] overflow-y-auto py-3">
          <nav aria-label="Mobile">
            <ul>
              {items.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href} className="border-b last:border-b-0">
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-12 items-center text-base font-semibold transition-colors duration-200 motion-reduce:transition-none',
                        active ? 'text-primary' : 'text-foreground',
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <ul className="mb-2 ml-3 border-l-2 border-primary/30 pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="flex min-h-11 items-center text-sm text-foreground transition-colors duration-200 hover:text-primary motion-reduce:transition-none"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>
            <Link
              href="/contact#rfq"
              className={ctaClassName('primary', 'my-4 w-full')}
            >
              Request a quote
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  )
}
