"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { PremiumBadge } from "@/components/articles/premium-badge"
import { PremiumGateTitleOnly } from "@/components/articles/premium-gate-title-only"
import { Calendar, ExternalLink } from "lucide-react"
import { useUser, hasPremiumAccess } from "@/lib/contexts/user-context"
import { cn } from "@/lib/utils"

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  isPremium: boolean
  publishedAt: string
  tags: string[]
  sources: Array<{ label: string; url: string }>
  coverImageUrl?: string
}

interface ArticleCardProps {
  article: Article
  index?: number
  viewMode?: "grid" | "list"
}

export function ArticleCard({ article, index = 0, viewMode = "grid" }: ArticleCardProps) {
  const user = useUser()
  const hasAccess = hasPremiumAccess(user)
  const canViewContent = !article.isPremium || hasAccess

  if (article.isPremium && !hasAccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <PremiumGateTitleOnly article={article} />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("group", viewMode === "list" && "w-full")}
    >
      <Link href={`/articles/${article.slug}`}>
        <GlassCard
          variant="strong"
          className={cn(
            "p-6 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer rounded-2xl relative hover:scale-[1.02]",
            viewMode === "list" && "flex gap-6 items-start",
          )}
          hover
        >
          {article.coverImageUrl && (
            <div
              className={cn("mb-4 rounded-xl overflow-hidden", viewMode === "list" && "mb-0 w-48 h-32 flex-shrink-0")}
            >
              <img
                src={article.coverImageUrl || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold font-heading mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
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
              {article.isPremium && <PremiumBadge />}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {article.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{article.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ExternalLink className="h-4 w-4" />
                <span>{article.sources.length} sources</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}
