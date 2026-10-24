import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8', className)}>
      {children}
    </div>
  )
}

type SectionTone = 'white' | 'stage' | 'green'

const toneClasses: Record<SectionTone, string> = {
  white: 'bg-background text-foreground',
  stage: 'bg-stage text-foreground',
  green: 'bg-primary text-primary-foreground',
}

export function Section({
  id,
  labelledBy,
  tone = 'white',
  className,
  children,
}: {
  id?: string
  labelledBy: string
  tone?: SectionTone
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('py-16 sm:py-24', toneClasses[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({
  children,
  onDark = false,
}: {
  children: React.ReactNode
  onDark?: boolean
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em]',
        onDark ? 'text-white' : 'text-primary',
      )}
    >
      <span
        aria-hidden="true"
        className={cn('size-2', onDark ? 'bg-white' : 'bg-primary')}
      />
      {children}
    </p>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  onDark = false,
  as: Tag = 'h2',
  className,
}: {
  id: string
  eyebrow: string
  title: string
  description?: string
  onDark?: boolean
  as?: 'h1' | 'h2'
  className?: string
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
      <Tag
        id={id}
        className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            'mt-4 text-pretty text-base leading-relaxed sm:text-lg',
            onDark ? 'text-white' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

type CtaVariant = 'primary' | 'outline' | 'onDark' | 'onDarkOutline'

const ctaVariants: Record<CtaVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-brand-deep border-2 border-primary hover:border-brand-deep',
  outline:
    'border-2 border-primary bg-background text-primary hover:bg-accent',
  onDark:
    'border-2 border-white bg-white text-primary hover:bg-accent hover:border-accent',
  onDarkOutline:
    'border-2 border-white bg-transparent text-white hover:bg-white/15',
}

export function ctaClassName(variant: CtaVariant = 'primary', className?: string) {
  return cn(
    'group inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100',
    ctaVariants[variant],
    className,
  )
}

export function CtaLink({
  href,
  variant = 'primary',
  className,
  arrow = true,
  children,
}: {
  href: string
  variant?: CtaVariant
  className?: string
  arrow?: boolean
  children: React.ReactNode
}) {
  return (
    <Link href={href} className={ctaClassName(variant, className)}>
      {children}
      {arrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
      ) : null}
    </Link>
  )
}
