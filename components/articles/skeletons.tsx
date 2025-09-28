"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ArticleCardSkeletonProps {
  viewMode?: "grid" | "list"
}

export function ArticleCardSkeleton({ viewMode = "grid" }: ArticleCardSkeletonProps) {
  return (
    <GlassCard variant="strong" className={cn("p-6 rounded-2xl", viewMode === "list" && "flex gap-6 items-start")}>
      {/* Cover Image Skeleton */}
      <Skeleton
        className={cn("rounded-xl mb-4", viewMode === "grid" ? "w-full h-48" : "w-48 h-32 flex-shrink-0 mb-0")}
      />

      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </GlassCard>
  )
}

export function ArticleListSkeleton({ count = 6, viewMode = "grid" }: { count?: number; viewMode?: "grid" | "list" }) {
  return (
    <div className={cn("gap-6", viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "space-y-6")}>
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} viewMode={viewMode} />
      ))}
    </div>
  )
}

export function ArticleReaderSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* Cover Image */}
      <Skeleton className="w-full h-64 rounded-xl" />

      {/* Content */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>

      {/* Sources */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-2/3" />
          ))}
        </div>
      </div>
    </div>
  )
}
