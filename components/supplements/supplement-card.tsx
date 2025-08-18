"use client"
import Link from "next/link"
import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Eye, Clock, Leaf, Brain, FlaskConical, Pill, Heart, Shield } from "lucide-react"

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
  rating: number | null
  reviews_count: number
}

interface SupplementCardProps {
  supplement: Supplement
  viewMode: "grid" | "list"
}

export function SupplementCard({ supplement, viewMode }: SupplementCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase()
    switch (categoryLower) {
      case "adaptogen":
        return <Shield className="h-3 w-3" />
      case "nootropic":
        return <Brain className="h-3 w-3" />
      case "herb":
        return <Leaf className="h-3 w-3" />
      case "vitamin":
        return <Pill className="h-3 w-3" />
      case "mineral":
        return <FlaskConical className="h-3 w-3" />
      case "amino acid":
        return <Heart className="h-3 w-3" />
      case "extract":
        return <Leaf className="h-3 w-3" />
      case "mushroom":
        return <Leaf className="h-3 w-3" />
      default:
        return <Zap className="h-3 w-3" />
    }
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

  const hasRating = supplement.rating !== null && supplement.reviews_count > 0

  const SupplementImage = () => {
    return (
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
        <Zap className="h-6 w-6 text-primary/60" />
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <GlassCard className="glass-morph p-6 hover:glass-strong transition-all duration-300" hover>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <SupplementImage />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold font-heading">{supplement.name}</h3>
              </div>
              <p className="text-muted-foreground mb-3 line-clamp-2">{truncateDescription(supplement.summary, 150)}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {supplement.goals.slice(0, 3).map((goal) => (
                  <Badge key={goal} variant="outline" className="text-xs glass-subtle">
                    <Zap className="h-3 w-3 mr-1" />
                    {goal}
                  </Badge>
                ))}
                {supplement.goals.length > 3 && (
                  <Badge variant="outline" className="text-xs glass-subtle">
                    +{supplement.goals.length - 3} more
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span className="capitalize">{supplement.timing}</span>
                </div>
                <Badge variant="secondary" className="text-xs capitalize flex items-center gap-1">
                  {getCategoryIcon(supplement.categories[0])}
                  {supplement.categories[0]}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0 min-w-[120px]">
            <Badge className={`text-xs border ${getEvidenceColor(supplement.evidence_level)}`}>
              {supplement.evidence_level}
            </Badge>
            {hasRating ? (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{supplement.rating?.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground hidden sm:inline">({supplement.reviews_count})</span>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No ratings</div>
            )}
            <LiquidButton size="sm" className="w-full min-h-[36px] text-xs" asChild>
              <Link href={`/supplements/${supplement.id}`}>
                <Eye className="h-3 w-3 mr-1" />
                <span>View Details</span>
              </Link>
            </LiquidButton>
          </div>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="glass-morph p-6 h-full hover:glass-strong transition-all duration-300 flex flex-col" hover>
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Zap className="h-8 w-8 text-primary/60" />
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between mb-3">
        <Badge className={`text-xs border ${getEvidenceColor(supplement.evidence_level)}`}>
          {supplement.evidence_level}
        </Badge>
        {hasRating ? (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{supplement.rating?.toFixed(1)}</span>
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
          {supplement.goals.slice(0, 2).map((goal) => (
            <Badge key={goal} variant="outline" className="text-xs glass-subtle">
              <Zap className="h-3 w-3 mr-1" />
              {goal}
            </Badge>
          ))}
          {supplement.goals.length > 2 && (
            <Badge variant="outline" className="text-xs glass-subtle">
              +{supplement.goals.length - 2}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="capitalize">{supplement.timing}</span>
          </div>
          <Badge variant="secondary" className="text-xs capitalize flex items-center gap-1">
            {getCategoryIcon(supplement.categories[0])}
            {supplement.categories[0]}
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
