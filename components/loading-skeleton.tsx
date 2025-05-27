import type React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  children?: React.ReactNode
}

export function Skeleton({ className, children, ...props }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-md bg-gray-200", className)} {...props}>
      {children}
    </div>
  )
}

export function ImageSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("aspect-[4/3] w-full", className)} />
}

export function TextSkeleton({ lines = 1, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i === lines - 1 && lines > 1 ? "w-3/4" : "w-full")} />
      ))}
    </div>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-gray-100 p-6 shadow-sm", className)}>
      <div className="space-y-4">
        <Skeleton className="h-20 w-20 rounded-full mx-auto" />
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <TextSkeleton lines={3} />
      </div>
    </div>
  )
}
