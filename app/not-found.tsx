import { CtaLink, Section } from '@/components/site/primitives'

export default function NotFound() {
  return (
    <Section labelledBy="not-found-title">
      <div className="max-w-xl">
        <p className="font-mono text-sm font-semibold text-primary">404</p>
        <h1
          id="not-found-title"
          className="mt-3 text-balance text-4xl font-semibold tracking-tight"
        >
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The page you requested does not exist or has moved. Return home or browse the product
          catalog.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/">Back to home</CtaLink>
          <CtaLink href="/products" variant="outline" arrow={false}>
            Browse products
          </CtaLink>
        </div>
      </div>
    </Section>
  )
}
