import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ImageAsset, Product } from '@/lib/types'
import { cn } from '@/lib/utils'

export function ProductStage({
  image,
  sizes,
  priority = false,
  className,
}: {
  image: ImageAsset
  sizes: string
  priority?: boolean
  className?: string
}) {
  return (
    <div className={cn('product-stage relative aspect-square w-full overflow-hidden', className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="origin-center scale-[1.18] object-contain transition-transform duration-200 ease-out group-hover:scale-[1.22] motion-reduce:transition-none motion-reduce:group-hover:scale-[1.18]"
      />
    </div>
  )
}

export function ProductCard({
  product,
  familyName,
  priority = false,
  index,
}: {
  product: Product
  familyName: string
  priority?: boolean
  index?: number
}) {
  return (
    <article className="group relative flex h-full flex-col border bg-card transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-md has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring motion-reduce:transition-none">
      <ProductStage
        image={product.images[0]}
        priority={priority}
        sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
      />
      <div className="flex flex-1 flex-col border-t p-5">
        <p className="flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <span>{familyName}</span>
          {typeof index === 'number' ? (
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          ) : null}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight">
          <Link
            href={`/products/${product.slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-primary">{product.materialLabel}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.summary}</p>
        <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-semibold text-primary">
          View product
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </span>
      </div>
    </article>
  )
}
