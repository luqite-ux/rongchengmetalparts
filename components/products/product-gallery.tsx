'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ImageAsset } from '@/lib/types'
import { cn } from '@/lib/utils'

export function ProductGallery({ images, name }: { images: ImageAsset[]; name: string }) {
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]

  return (
    <div className="space-y-3">
      <div className="product-stage relative aspect-square w-full overflow-hidden border">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="origin-center scale-[1.12] object-contain"
        />
      </div>
      {images.length > 1 ? (
        <ul className="grid grid-cols-4 gap-3" aria-label={`${name} images`}>
          {images.map((image, imageIndex) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(imageIndex)}
                aria-label={`Show image ${imageIndex + 1} of ${images.length}`}
                aria-pressed={imageIndex === active}
                className={cn(
                  'product-stage relative block aspect-square min-h-11 w-full overflow-hidden border-2 transition-colors duration-200 motion-reduce:transition-none',
                  imageIndex === active ? 'border-primary' : 'border-transparent hover:border-primary/60',
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="12vw"
                  className="scale-[1.12] object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
