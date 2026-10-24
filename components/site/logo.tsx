import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  tone = 'default',
}: {
  className?: string
  tone?: 'default' | 'onDark'
}) {
  return (
    <Link
      href="/"
      aria-label="RunCing Tech, home"
      className={cn(
        'group inline-flex min-h-11 items-center gap-3 rounded-md transition-opacity duration-200 hover:opacity-90',
        className,
      )}
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={100}
        height={100}
        className="size-10 shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-lg font-semibold tracking-tight',
            tone === 'onDark' ? 'text-white' : 'text-foreground',
          )}
        >
          RunCing <span className={tone === 'onDark' ? 'text-white' : 'text-primary'}>Tech</span>
        </span>
        <span
          className={cn(
            'mt-1 hidden font-mono text-[10px] uppercase tracking-[0.16em] sm:block',
            tone === 'onDark' ? 'text-white' : 'text-muted-foreground',
          )}
        >
          Valves and connectors
        </span>
      </span>
    </Link>
  )
}
