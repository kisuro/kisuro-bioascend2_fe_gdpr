"use client"

import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { PremiumBadge } from "@/components/articles/premium-badge"
import { Lock, Calendar } from "lucide-react"
import type { Article } from "@/components/articles/article-card"

interface PremiumGateTitleOnlyProps {
  article: Article
}

export function PremiumGateTitleOnly({ article }: PremiumGateTitleOnlyProps) {
  return (
    <GlassCard variant="strong" className="p-6 rounded-2xl relative opacity-75 hover:opacity-90 transition-opacity">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold font-heading mb-2 text-muted-foreground">{article.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Calendar className="h-4 w-4" />
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
        <PremiumBadge />
      </div>

      <div className="flex items-center justify-center py-8 border-2 border-dashed border-muted-foreground/30 rounded-xl mb-4">
        <div className="text-center">
          <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-3">Premium content requires subscription</p>
          <Button asChild size="sm">
            <Link href="/premium">More about Premium</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {article.tags.slice(0, 3).map((tag) => (
          <div key={tag} className="px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground">
            {tag}
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
