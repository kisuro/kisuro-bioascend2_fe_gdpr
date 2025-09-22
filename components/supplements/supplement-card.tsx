"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Eye, Clock, Shield, Brain, Leaf, Pill, Flag as Flask, Heart } from "lucide-react"

interface Supplement {
  id: string
  name: string
  summary: string
  evidence_level: string
  goals: string[]
  categories: string[]
  timing: string
  dosage: string
  cycle: string
  benefits: string[]
  popular_manufacturers?: string[]
  rating: number | { avg: number | null; count: number } | null
  reviews_count: number
}

interface SupplementCardProps {
  supplement: Supplement
  viewMode: "grid" | "list"
}

type Rating = number | { avg: number | null; count: number } | null

function getRatingValue(r: Rating): number | null {
  if (typeof r === "number") return r
  if (r && typeof r === "object") return r.avg ?? null
  return null
}

function getRatingCount(r: Rating, fallback?: number): number {
  if (typeof r === "number") return fallback ?? 0
  if (r && typeof r === "object") return r.count ?? fallback ?? 0
  return fallback ?? 0
}

export function SupplementCard({ supplement, viewMode }: SupplementCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  const ratingValue = getRatingValue(supplement.rating as Rating)
  const ratingCount = getRatingCount(supplement.rating as Rating, supplement.reviews_count)
  const hasRating = ratingValue !== null && ratingCount > 0

  const handleGoalClick = (goal: string) => {
    router.push(`/supplements?goals=${encodeURIComponent(goal)}`)
  }

  const getEvidenceColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "strong":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "moderate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "limited":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + "..."
  }

  const firstCategory =
    Array.isArray(supplement.categories) && supplement.categories.length > 0 ? supplement.categories[0] : "other"
  const CategoryIcon = getCategoryIcon(firstCategory)

  const getCategoryImage = (category: string) => {
    const categoryLower = category.toLowerCase()

    if (categoryLower.includes("adaptogen")) {
      return "/minimalistic-shield-icon-for-adaptogenic-supplemen.jpg"
    }
    if (categoryLower.includes("nootropic")) {
      return "/minimalistic-brain-icon-for-nootropic-supplements.jpg"
    }
    if (categoryLower.includes("herb") || categoryLower.includes("extract") || categoryLower.includes("mushroom")) {
      return "/minimalistic-leaf-icon-for-herbal-supplements.jpg"
    }
    if (categoryLower.includes("vitamin")) {
      return "/minimalistic-pill-capsule-icon-for-vitamin-supplem.jpg"
    }
    if (categoryLower.includes("mineral")) {
      return "/minimalistic-crystal-icon-for-mineral-supplements.jpg"
    }
    if (categoryLower.includes("amino")) {
      return "/minimalistic-molecule-icon-for-amino-acid-suppleme.jpg"
    }

    return "/minimalistic-supplement-bottle-icon.jpg"
  }

  if (viewMode === "list") {
    return (
      <GlassCard className="p-4 hover:scale-[1.01] transition-all duration-300" hover>
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-lg font-semibold font-heading leading-tight">{supplement.name}</h3>
              {/* Category badge - visible on desktop */}
              <Badge
                variant="secondary"
                className="text-xs capitalize flex items-center gap-1 flex-shrink-0 hidden sm:flex"
              >
                <CategoryIcon className="h-3 w-3" />
                {firstCategory}
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
              {truncateDescription(supplement.summary, 120)}
            </p>

            {/* Category badge - visible on mobile */}
            <Badge variant="secondary" className="text-xs capitalize flex items-center gap-1 w-fit sm:hidden mb-2">
              <CategoryIcon className="h-3 w-3" />
              {firstCategory}
            </Badge>
          </div>

          {/* Right side - Action button */}
          <div className="flex-shrink-0">
            <LiquidButton size="sm" className="text-xs px-3 py-2" asChild>
              <Link href={`/supplements/${supplement.id}`}>
                <Eye className="h-3 w-3 mr-1.5" />
                <span className="hidden sm:inline">View Details</span>
                <span className="sm:hidden">Details</span>
              </Link>
            </LiquidButton>
          </div>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-6 h-full hover:scale-[1.02] transition-all duration-300 flex flex-col" hover>
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden group">
          <img
            src={getCategoryImage(firstCategory) || "/placeholder.svg"}
            alt={`${firstCategory} supplement`}
            className="w-full h-full object-contain p-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300 filter brightness-110 contrast-125"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/supplement-icon.png"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <div className="flex items-start justify-between mb-3">
        <Badge className={`text-xs border ${getEvidenceColor(supplement.evidence_level)}`}>
          {supplement.evidence_level}
        </Badge>
        {hasRating ? (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{ratingValue!.toFixed(1)}</span>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">No ratings</div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2 font-heading">{supplement.name}</h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
        {truncateDescription(supplement.summary, 120)}
      </p>

      <div className="mt-auto space-y-3">
        <div className="flex flex-wrap gap-1">
          {(supplement.goals ?? []).slice(0, 2).map((goal) => (
            <Badge
              key={goal}
              variant="outline"
              className="text-xs glass-subtle hover:glass-strong cursor-pointer transition-all duration-200"
              onClick={() => handleGoalClick(goal)}
            >
              <Zap className="h-3 w-3 mr-1" />
              {goal}
            </Badge>
          ))}
          {(supplement.goals?.length ?? 0) > 2 && (
            <Badge variant="outline" className="text-xs glass-subtle">
              +{(supplement.goals?.length ?? 0) - 2}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="capitalize">{supplement.timing}</span>
          </div>
          <Badge variant="secondary" className="text-xs capitalize flex items-center gap-1">
            <CategoryIcon className="h-3 w-3" />
            {firstCategory}
          </Badge>
        </div>

        <LiquidButton size="sm" className="w-full min-h-[40px]" asChild>
          <Link href={`/supplements/${supplement.id}`}>
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Link>
        </LiquidButton>
      </div>
    </GlassCard>
  )
}

const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase()

  if (categoryLower.includes("adaptogen")) return Shield
  if (categoryLower.includes("nootropic")) return Brain
  if (categoryLower.includes("herb") || categoryLower.includes("extract") || categoryLower.includes("mushroom"))
    return Leaf
  if (categoryLower.includes("vitamin")) return Pill
  if (categoryLower.includes("mineral")) return Flask
  if (categoryLower.includes("amino")) return Heart

  // Default icon for other categories
  return Leaf
}
