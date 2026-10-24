'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Hides an element only if it starts below the fold, then reveals it once when it
 * enters the viewport. Content is visible by default (SSR, no-JS, reduced motion),
 * and each observer disconnects after its single reveal, so nothing runs offscreen.
 */
export function useRevealOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return

    element.dataset.reveal = 'hidden'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.reveal = 'shown'
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}

export function Reveal({
  className,
  delay = 0,
  children,
}: {
  className?: string
  delay?: number
  children: React.ReactNode
}) {
  const ref = useRevealOnView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cn('reveal', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
