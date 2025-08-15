import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Zap } from "lucide-react"
import type { Supplement } from "@/lib/data/supplements"

interface SupplementCardProps {
  supplement: Supplement
  viewMode: "grid" | "list"
}

export function SupplementCard({ supplement, viewMode }: SupplementCardProps) {
  const averageRating = supplement.ratings.reduce((sum, rating) => sum + rating.score, 0) / supplement.ratings.length

  if (viewMode === "list") {
    return (
      <GlassCard className="glass-morph p-6 hover:glass-strong transition-all duration-300" hover>
        <Link href={`/supplements/${supplement.slug}`} className="block">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold font-heading">{supplement.name}</h3>
                <Badge variant={supplement.evidenceLevel === "High" ? "default" : "secondary"} className="text-xs">
                  {supplement.evidenceLevel} Evidence
                </Badge>
              </div>
              <p className="text-muted-foreground mb-3 line-clamp-2">{supplement.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {supplement.goals.slice(0, 3).map((goal) => (
                  <Badge key={goal} variant="outline" className="text-xs glass-subtle">
                    {goal}
                  </Badge>
                ))}
                {supplement.goals.length > 3 && (
                  <Badge variant="outline" className="text-xs glass-subtle">
                    +{supplement.goals.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{averageRating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{supplement.ratings.length}</span>
              </div>
            </div>
          </div>
        </Link>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="glass-morph p-6 h-full hover:glass-strong transition-all duration-300" hover>
      <Link href={`/supplements/${supplement.slug}`} className="block h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <Badge variant={supplement.evidenceLevel === "High" ? "default" : "secondary"} className="text-xs">
              {supplement.evidenceLevel} Evidence
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{averageRating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2 font-heading">{supplement.name}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{supplement.description}</p>

          <div className="space-y-3">
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
                <Users className="h-3 w-3" />
                <span>{supplement.ratings.length} reviews</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {supplement.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </GlassCard>
  )
}
