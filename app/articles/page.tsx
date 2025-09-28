"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArticleCard } from "@/components/articles/article-card"
import { ArticleFiltersComponent, type ArticleFilters } from "@/components/articles/article-filters"
import { EmptyState } from "@/components/articles/empty-state"
import { ErrorState } from "@/components/articles/error-state"
import { ArticleListSkeleton } from "@/components/articles/skeletons"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useUser, hasPremiumAccess } from "@/lib/contexts/user-context"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getArticles, getArticleTags, type Article } from "@/lib/services/articles"

export default function ArticlesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const user = useUser()
  const hasAccess = hasPremiumAccess(user)
  const canCreateArticles = user.role === "owner" || user.role === "moderator"

  // State management
  const [articles, setArticles] = useState<Article[]>([])
  const [totalArticles, setTotalArticles] = useState(0)
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Initialize filters from URL params
  const [filters, setFilters] = useState<ArticleFilters>(() => {
    const search = searchParams.get("search") || ""
    const sort = (searchParams.get("sort") as "newest" | "oldest") || "newest"
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || []
    const fromDate = searchParams.get("from")
    const toDate = searchParams.get("to")

    return {
      search,
      sort,
      tags,
      dateRange: {
        from: fromDate ? new Date(fromDate) : undefined,
        to: toDate ? new Date(toDate) : undefined,
      },
    }
  })

  const loadArticles = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Load articles with current filters
      const searchParams = {
        search: filters.search || undefined,
        tags: filters.tags.length > 0 ? filters.tags : undefined,
        limit: 50, // Load more articles for client-side filtering
      }

      const [articlesResult, tagsResult] = await Promise.all([getArticles(searchParams), getArticleTags()])

      setArticles(articlesResult.articles)
      setTotalArticles(articlesResult.total)
      setAvailableTags(tagsResult)
    } catch (err) {
      setError("Failed to load articles. Please try again.")
      console.error("Error loading articles:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Load articles when filters change
  useEffect(() => {
    loadArticles()
  }, [filters.search, filters.tags])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.search) params.set("search", filters.search)
    if (filters.sort !== "newest") params.set("sort", filters.sort)
    if (filters.tags.length > 0) params.set("tags", filters.tags.join(","))
    if (filters.dateRange.from) params.set("from", filters.dateRange.from.toISOString())
    if (filters.dateRange.to) params.set("to", filters.dateRange.to.toISOString())

    const newUrl = params.toString() ? `/articles?${params.toString()}` : "/articles"
    router.replace(newUrl, { scroll: false })
  }, [filters, router])

  // Filter and sort articles (client-side for date range and sorting)
  const filteredArticles = useMemo(() => {
    let result = [...articles]

    // Apply date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      result = result.filter((article) => {
        const articleDate = new Date(article.publishedAt)
        const isAfterFrom = !filters.dateRange.from || articleDate >= filters.dateRange.from
        const isBeforeTo = !filters.dateRange.to || articleDate <= filters.dateRange.to
        return isAfterFrom && isBeforeTo
      })
    }

    // Apply sort
    result.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime()
      const dateB = new Date(b.publishedAt).getTime()
      return filters.sort === "newest" ? dateB - dateA : dateA - dateB
    })

    return result
  }, [articles, filters.dateRange, filters.sort])

  const handleRetry = () => {
    loadArticles()
  }

  if (error) {
    return (
      <div className="min-h-screen pt-8 px-4">
        <div className="max-w-7xl mx-auto">
          <ErrorState onRetry={handleRetry} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Articles</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore expert insights on biohacking, health optimization, and longevity research
          </p>
        </motion.div>

        {/* Filters and New Article Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 w-full lg:w-auto">
              <ArticleFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                availableTags={availableTags}
              />
            </div>

            {canCreateArticles && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button asChild size="lg" className="whitespace-nowrap">
                  <Link href="/articles/new">
                    <Plus className="h-4 w-4 mr-2" />
                    New Article
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Articles Grid/List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          {isLoading ? (
            <ArticleListSkeleton count={6} viewMode={viewMode} />
          ) : filteredArticles.length === 0 ? (
            <EmptyState
              type="no-results"
              title="No articles found"
              description="Try adjusting your search criteria or browse all articles."
              actionLabel="Clear Filters"
              onAction={() =>
                setFilters({
                  search: "",
                  dateRange: {},
                  sort: "newest",
                  tags: [],
                })
              }
            />
          ) : (
            <div
              className={cn(
                "gap-6",
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col space-y-6",
              )}
            >
              {filteredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} viewMode={viewMode} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Results Summary */}
        {!isLoading && filteredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-sm text-muted-foreground"
          >
            Showing {filteredArticles.length} of {totalArticles} articles
            {filters.search && ` for "${filters.search}"`}
            {filters.tags.length > 0 && ` tagged with ${filters.tags.join(", ")}`}
          </motion.div>
        )}
      </div>
    </div>
  )
}
