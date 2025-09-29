"use client"

import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { PremiumBadge } from "@/components/articles/premium-badge"
import { Lock, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Article } from "@/lib/services/articles.tsx"

interface PremiumGateTitleOnlyProps {
  article: Article
  viewMode?: "grid" | "list"
}

export function PremiumGateTitleOnly({ article, viewMode = "grid" }: PremiumGateTitleOnlyProps) {
  return (
    <GlassCard 
      variant="strong" 
      className={cn(
        "p-6 rounded-2xl relative opacity-75 hover:opacity-90 transition-opacity",
        viewMode === "grid" ? "h-[500px] flex flex-col overflow-hidden" : "flex gap-6 items-start"
      )}
    >
      {/* Image placeholder to match regular card structure */}
      {viewMode === "grid" && (
        <div className="mb-4 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover opacity-50"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center">
              <div className="text-4xl text-muted-foreground/30">📄</div>
            </div>
          )}
        </div>
      )}

      {viewMode === "list" && article.imageUrl && (
        <div className="mb-0 w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      )}

      <div className={cn("flex flex-col", viewMode === "grid" ? "flex-1 justify-between" : "flex-1")}>
        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-semibold font-heading mb-2 text-muted-foreground line-clamp-2 overflow-hidden">{article.title}</h3>
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

          <div className={cn(
            "flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-xl",
            viewMode === "grid" ? "py-8" : "py-4"
          )}>
            <div className="text-center">
              <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-3">Premium content requires subscription</p>
              <Button asChild size="sm">
                <Link href="/premium">More about Premium</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section with tags to match regular card structure */}
        <div className={cn(viewMode === "grid" ? "mt-4" : "mt-4")}>
          <div className="flex flex-wrap gap-2 overflow-hidden">
            {article.tags.slice(0, 3).map((tag) => (
              <div key={tag} className="px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground truncate max-w-[100px]">
                {tag}
              </div>
            ))}
            {article.tags.length > 3 && (
              <div className="px-2 py-1 bg-muted/30 rounded text-xs text-muted-foreground">
                +{article.tags.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
