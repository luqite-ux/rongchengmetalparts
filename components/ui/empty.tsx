import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Empty({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn('flex flex-col items-center justify-center text-center', className)} {...props} /> }
export function EmptyHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn('space-y-2', className)} {...props} /> }
export function EmptyMedia({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn('mx-auto flex items-center justify-center', className)} {...props} /> }
export function EmptyTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) { return <h2 className={cn('text-xl font-semibold', className)} {...props} /> }
export function EmptyDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) { return <p className={cn('text-muted-foreground', className)} {...props} /> }
export function EmptyContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn('mt-4', className)} {...props} /> }
