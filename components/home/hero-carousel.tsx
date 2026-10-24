'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { HeroSlide } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Container, CtaLink } from '@/components/site/primitives'

const SLIDE_DURATION_MS = 7000

const controlButton =
  'inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-accent disabled:opacity-60 disabled:hover:bg-transparent motion-reduce:transition-none'

export function HeroCarousel({
  slides,
  srTitle,
}: {
  slides: HeroSlide[]
  srTitle: string
}) {
  const rootRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setReducedMotion(query.matches)
      if (query.matches) setPlaying(false)
    }
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const element = rootRef.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const running = playing && !reducedMotion && !interacting && inView

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % slides.length),
      SLIDE_DURATION_MS,
    )
    return () => window.clearTimeout(timer)
  }, [running, index, slides.length])

  const goTo = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length],
  )

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      className="relative bg-background"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false)
      }}
    >
      <h1 className="sr-only">{srTitle}</h1>

      <div className="grid">
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index
          const onDark = slide.tone === 'on-dark'
          const textRight = slide.textSide === 'right'
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${slides.length}`}
              data-active={active}
              aria-hidden={!active}
              inert={!active}
              className="hero-slide relative col-start-1 row-start-1 flex flex-col lg:block"
              style={
                {
                  '--pos-mobile': slide.objectPosition.mobile,
                  '--pos-desktop': slide.objectPosition.desktop,
                } as React.CSSProperties
              }
            >
              <div className="relative h-[250px] w-full sm:h-[340px] lg:absolute lg:inset-0 lg:h-auto">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  priority={slideIndex === 0}
                  sizes="100vw"
                  className="hero-image object-cover"
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0 hidden lg:block',
                    onDark
                      ? 'bg-[linear-gradient(90deg,rgba(6,30,96,0.9)_0%,rgba(6,30,96,0.72)_30%,rgba(6,30,96,0)_58%)]'
                      : 'bg-[linear-gradient(270deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.82)_38%,rgba(255,255,255,0)_66%)]',
                  )}
                />
              </div>

              <Container className="relative flex flex-1 lg:h-[640px] lg:items-center xl:h-[680px]">
                <div
                  className={cn(
                    'w-full border-t-4 border-primary bg-background py-8 lg:max-w-[34rem] lg:border-t-0 lg:bg-transparent lg:py-0',
                    textRight && 'lg:ml-auto',
                    onDark ? 'lg:text-white' : 'lg:text-foreground',
                  )}
                >
                  <p
                    className={cn(
                      'font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary',
                      onDark && 'lg:text-white',
                    )}
                  >
                    {slide.eyebrow}
                  </p>
                  <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                    {slide.headline}
                  </h2>
                  <p
                    className={cn(
                      'mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg',
                      onDark ? 'lg:text-white' : 'lg:text-foreground',
                    )}
                  >
                    {slide.body}
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <CtaLink
                      href={slide.primaryCta.href}
                      variant="primary"
                      className={cn(onDark && 'lg:border-white lg:bg-white lg:text-primary lg:hover:bg-accent lg:hover:border-accent')}
                    >
                      {slide.primaryCta.label}
                    </CtaLink>
                    <CtaLink
                      href={slide.secondaryCta.href}
                      variant="outline"
                      arrow={false}
                      className={cn(onDark && 'lg:border-white lg:bg-transparent lg:text-white lg:hover:bg-white/15')}
                    >
                      {slide.secondaryCta.label}
                    </CtaLink>
                  </div>
                </div>
              </Container>
            </div>
          )
        })}
      </div>

      <div className="border-t bg-background lg:absolute lg:inset-x-0 lg:bottom-6 lg:border-t-0 lg:bg-transparent">
        <Container className="flex items-center justify-between py-2 lg:py-0">
          <div
            role="group"
            aria-label="Carousel controls"
            className="flex items-center gap-1 rounded-full border bg-background px-1 lg:shadow-md"
          >
            <button
              type="button"
              className={controlButton}
              onClick={() => goTo(index - 1)}
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={controlButton}
              onClick={() => setPlaying((value) => !value)}
              disabled={reducedMotion}
              aria-label={
                reducedMotion
                  ? 'Autoplay is off because reduced motion is enabled'
                  : playing
                    ? 'Pause slide rotation'
                    : 'Start slide rotation'
              }
            >
              {playing && !reducedMotion ? (
                <Pause className="size-5" aria-hidden="true" />
              ) : (
                <Play className="size-5" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              className={controlButton}
              onClick={() => goTo(index + 1)}
              aria-label="Next slide"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <div className="flex items-center" role="group" aria-label="Choose slide">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  className="group inline-flex size-11 items-center justify-center rounded-full outline-offset-[-4px]"
                  aria-label={`Show slide ${slideIndex + 1} of ${slides.length}`}
                  aria-current={slideIndex === index}
                  onClick={() => goTo(slideIndex)}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-2.5 rounded-full transition-[width,background-color] duration-200 motion-reduce:transition-none',
                      slideIndex === index
                        ? 'w-7 bg-primary'
                        : 'w-2.5 bg-muted-foreground/60 group-hover:bg-primary',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
          <p className="sr-only" aria-live={running ? 'off' : 'polite'}>
            Slide {index + 1} of {slides.length}: {slides[index].headline}
          </p>
        </Container>
      </div>
    </section>
  )
}
