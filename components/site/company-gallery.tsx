'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'

export function CompanyGallery({ images, label }: { images: string[]; label: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeTriggerIndex = useRef(0)
  const scrollY = useRef(0)
  const isOpen = activeIndex !== null

  const openImage = (index: number) => {
    activeTriggerIndex.current = index
    setActiveIndex(index)
  }

  useEffect(() => {
    if (!isOpen) return
    const body = document.body
    const previous = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    }
    scrollY.current = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => index === null ? null : (index - 1 + images.length) % images.length)
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => index === null ? null : (index + 1) % images.length)
      }
      if (event.key === 'Tab') {
        const controls = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>('button') ?? [],
        )
        if (!controls.length) return
        const current = controls.indexOf(document.activeElement as HTMLElement)
        const next = event.shiftKey
          ? (current - 1 + controls.length) % controls.length
          : (current + 1) % controls.length
        event.preventDefault()
        controls[next].focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = previous.overflow
      body.style.paddingRight = previous.paddingRight
      const restoreY = scrollY.current
      triggerRefs.current[activeTriggerIndex.current]?.focus({ preventScroll: true })
      window.scrollTo(0, restoreY)
      requestAnimationFrame(() => window.scrollTo(0, restoreY))
    }
  }, [isOpen, images.length])

  return (
    <>
      <ul aria-label={label} className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((src, index) => (
          <li key={src} className="mb-4 break-inside-avoid">
            <Reveal delay={(index % 3) * 80}>
              <button
                ref={(node) => { triggerRefs.current[index] = node }}
                type="button"
                onClick={() => openImage(index)}
                className="group relative block w-full overflow-hidden bg-stage text-left outline-none ring-offset-4 focus-visible:ring-[3px] focus-visible:ring-ring"
                aria-label={`Open RunCing facility image ${index + 1} of ${images.length}`}
              >
                <Image
                  src={src}
                  alt={`RunCing facility and equipment view ${index + 1}`}
                  width={1600}
                  height={1200}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="absolute bottom-3 right-3 inline-flex size-11 items-center justify-center bg-background/90 text-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                  <Expand aria-hidden="true" className="size-5" />
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {activeIndex !== null ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${label}: image ${activeIndex + 1} of ${images.length}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null)
          }}
        >
          <Image
            src={images[activeIndex]}
            alt={`Expanded RunCing facility and equipment view ${activeIndex + 1}`}
            width={1800}
            height={1350}
            priority
            className="max-h-[calc(100svh-7rem)] w-auto max-w-full object-contain"
          />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 inline-flex size-12 items-center justify-center bg-background text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring sm:right-8 sm:top-8"
            aria-label="Close image viewer"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center bg-background text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring sm:left-8"
                aria-label="Previous image"
              >
                <ArrowLeft aria-hidden="true" className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                className="absolute right-4 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center bg-background text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring sm:right-8"
                aria-label="Next image"
              >
                <ArrowRight aria-hidden="true" className="size-6" />
              </button>
            </>
          ) : null}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-semibold tabular-nums text-white sm:bottom-8">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      ) : null}
    </>
  )
}
