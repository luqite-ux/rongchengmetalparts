import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Container, Eyebrow } from '@/components/site/primitives'

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  crumbs: { label: string; href?: string }[]
  children?: React.ReactNode
}) {
  return (
    <section aria-labelledby="page-title" className="border-b bg-stage">
      <Container className="py-10 sm:py-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-primary hover:underline motion-reduce:transition-none"
              >
                Home
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1">
                <ChevronRight aria-hidden="true" className="size-4" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-primary hover:underline motion-reduce:transition-none"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-foreground">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-4 max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            id="page-title"
            className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </Container>
    </section>
  )
}
