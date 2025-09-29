"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { PremiumBadge } from "@/components/articles/premium-badge"
import { PremiumGateTitleOnly } from "@/components/articles/premium-gate-title-only"
import { Calendar, ExternalLink, Clock } from "lucide-react"
import { useUser, hasPremiumAccess } from "@/lib/contexts/user-context"
import { cn } from "@/lib/utils"
import type { Article } from "@/lib/services/articles.tsx"

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
        className={cn(viewMode === "list" && "w-full")}
      >
        <PremiumGateTitleOnly article={article} viewMode={viewMode} />
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
            "p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer rounded-2xl relative hover:scale-[1.02]",
            viewMode === "grid" ? "h-[500px] flex flex-col overflow-hidden" : "flex gap-6 items-start",
          )}
          hover
        >
          {viewMode === "grid" && (
            <div className="mb-4 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
              {article.imageUrl ? (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-4xl text-primary/40">📄</div>
                </div>
              )}
            </div>
          )}
          
          {viewMode === "list" && article.imageUrl && (
            <div className="mb-0 w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className={cn("flex flex-col", viewMode === "grid" ? "flex-1 justify-between" : "flex-1")}>
            {/* Main content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold font-heading mb-2 group-hover:text-primary transition-colors line-clamp-2 overflow-hidden">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    {article.readTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime} min read</span>
                      </div>
                    )}
                  </div>
                  {article.author && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className={cn(
                        "w-6 h-6 rounded-full overflow-hidden",
                        article.author.name === "bioaionics.com" && 
                        "p-1 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 shadow-lg dark:from-white/10 dark:to-white/5 dark:border-white/20"
                      )}>
                        <img
                          src={article.author.avatar || "/placeholder.svg?key=author"}
                          alt={article.author.name}
                          className={cn(
                            "w-full h-full object-cover",
                            article.author.name === "bioaionics.com" ? "" : "rounded-full"
                          )}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">by {article.author.name}</span>
                    </div>
                  )}
                </div>
                {article.isPremium && <PremiumBadge />}
              </div>

              <p className="text-muted-foreground leading-relaxed line-clamp-3 overflow-hidden">{article.excerpt}</p>
            </div>

            {/* Bottom section with tags and stats */}
            <div className={cn("flex items-center justify-between", viewMode === "grid" ? "mt-4" : "mt-4")}>
              <div className="flex flex-wrap gap-2 flex-1 min-w-0 mr-4">
                {article.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs truncate max-w-[100px]">
                    {tag}
                  </Badge>
                ))}
                {article.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{article.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                {article.sources && article.sources.length > 0 && (
                  <div className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-xs">{article.sources.length}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <span className="text-xs">{article.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  )
}
