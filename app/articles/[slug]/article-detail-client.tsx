"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Calendar, User, ExternalLink, Share2, Bookmark, Edit } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useUser, hasPremiumAccess } from "@/lib/contexts/user-context"
import { PremiumGateModal } from "@/components/supplements/premium-gate-modal"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

type Article = {
  id: string
  slug: string
  title: string
  excerpt?: string
  content: string
  isPremium: boolean
  publishedAt: string
  updatedAt: string
  tags: string[]
  sources?: Array<{ label: string; url: string }>
  imageUrl?: string
  author?: {
    name: string
    bio?: string
    avatar?: string
  }
  readTime?: number
  views?: number
  likes?: number
  category?: string
}

type Props = {
  article: Article
}

export function ArticleDetailClient({ article }: Props) {
  const [showPremiumGate, setShowPremiumGate] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  const { toast } = useToast()
  const user = useUser()
  const router = useRouter()
  const isAuthLoading = (user as any)?.isLoading
  const isPremium = hasPremiumAccess(user as any)
  const canEditArticles = user.role === "owner" || user.role === "moderator"

  // Check if user can access premium content
  const canAccessContent = !article.isPremium || isPremium

  // Handle premium content access
  const handlePremiumContentClick = () => {
    if (isAuthLoading) return
    if (!isPremium) {
      setShowPremiumGate(true)
      return
    }
  }

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min((scrollTop / docHeight) * 100, 100)
      setReadingProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Article link has been copied to your clipboard.",
      })
    }
  }

  // Handle bookmark
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark removed" : "Article bookmarked",
      description: isBookmarked ? "Article removed from your bookmarks" : "Article saved to your bookmarks",
    })
  }

  // Render article content with premium gating
  const renderContent = () => {
    if (!canAccessContent) {
      // Show preview for premium content
      const previewContent = article.content.split("\n").slice(0, 10).join("\n")
      return (
        <div className="space-y-6">
          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: previewContent }}
          />

          {/* Premium gate overlay */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
            <div className="blur-sm opacity-50">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  This premium content continues with detailed implementation guides, advanced protocols, and exclusive
                  insights...
                </p>
              </div>
            </div>

            {/* Premium CTA */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <GlassCard className="p-8 text-center max-w-md">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
                <p className="text-muted-foreground mb-4">
                  Unlock the complete article with detailed protocols and advanced techniques.
                </p>
                <Button onClick={handlePremiumContentClick} size="lg" className="w-full">
                  Upgrade to Premium
                </Button>
              </GlassCard>
            </div>
          </div>
        </div>
      )
    }

    // Show full content for free articles or premium users
    return (
      <div
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    )
  }

  return (
    <div className="min-h-screen">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-8 pb-24">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/articles">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </motion.div>

        {/* Article header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 mb-12"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="glass-subtle">
                {tag}
              </Badge>
            ))}
            {article.isPremium && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">Premium</Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight">{article.title}</h1>

          {/* Excerpt */}
          {article.excerpt && <p className="text-xl text-muted-foreground leading-relaxed">{article.excerpt}</p>}

          {/* Article meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {article.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author.name}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>

            {article.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {canEditArticles && (
              <Button variant="outline" size="sm" asChild className="gap-2 bg-transparent">
                <Link href={`/articles/${article.slug}/edit`}>
                  <Edit className="h-4 w-4" />
                  Edit Article
                </Link>
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBookmark}
              className={cn("gap-2", isBookmarked && "bg-primary/10 border-primary")}
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>
        </motion.div>

        {/* Cover image */}
        {article.imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <img
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Article content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlassCard className="p-8 md:p-12">{renderContent()}</GlassCard>
        </motion.div>

        {/* Author bio */}
        {article.author && article.author.bio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                {article.author.avatar && (
                  <div className={cn(
                    "w-16 h-16 rounded-full overflow-hidden flex-shrink-0",
                    article.author.name === "bioaionics.com" && 
                    "p-2 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 shadow-lg dark:from-white/10 dark:to-white/5 dark:border-white/20"
                  )}>
                    <img
                      src={article.author.avatar || "/placeholder.svg"}
                      alt={article.author.name}
                      className={cn(
                        "w-full h-full object-cover",
                        article.author.name === "bioaionics.com" ? "" : "rounded-full"
                      )}
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg mb-2">About {article.author.name}</h3>
                  <p className="text-muted-foreground">{article.author.bio}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Sources */}
        {article.sources && article.sources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <GlassCard className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Sources & References
              </h3>
              <div className="space-y-3">
                {article.sources.map((source, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{index + 1}.</span>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors text-sm"
                    >
                      {source.label}
                    </a>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>

      {/* Floating action bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-40">
        <div className="max-w-4xl mx-auto">
          <GlassCard
            variant="strong"
            className="px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border-white/30 dark:border-white/20"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/articles" replace>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    All Articles
                  </Link>
                </Button>
                {canEditArticles && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/articles/${article.slug}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBookmark}
                  className={cn(isBookmarked && "bg-primary/10 border-primary")}
                >
                  <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Premium gate modal */}
      <PremiumGateModal isOpen={showPremiumGate} onClose={() => setShowPremiumGate(false)} />
    </div>
  )
}
