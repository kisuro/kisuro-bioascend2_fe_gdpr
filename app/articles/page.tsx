"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArticleCard, type Article } from "@/components/articles/article-card"
import { ArticleFiltersComponent, type ArticleFilters } from "@/components/articles/article-filters"
import { EmptyState } from "@/components/articles/empty-state"
import { ErrorState } from "@/components/articles/error-state"
import { ArticleListSkeleton } from "@/components/articles/skeletons"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useUser, hasPremiumAccess } from "@/lib/contexts/user-context"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock data - will be replaced with real API calls
const mockArticles: Article[] = [
  {
    id: "1",
    slug: "understanding-circadian-rhythms",
    title: "Understanding Circadian Rhythms: The Science Behind Your Body Clock",
    excerpt:
      "Explore how your internal biological clock affects sleep, metabolism, and overall health. Learn practical strategies to optimize your circadian rhythm for better wellness.",
    content: "Full article content here...",
    isPremium: false,
    publishedAt: "2024-01-15T10:00:00Z",
    tags: ["Sleep", "Circadian", "Health", "Science"],
    sources: [
      { label: "Nature Sleep Research", url: "https://nature.com/sleep" },
      { label: "Harvard Medical School", url: "https://harvard.edu/sleep" },
    ],
    coverImageUrl: "/circadian-rhythm-sleep-cycle.jpg",
  },
  {
    id: "2",
    slug: "advanced-biohacking-techniques",
    title: "Advanced Biohacking Techniques for Cognitive Enhancement",
    excerpt:
      "Discover cutting-edge biohacking methods to boost cognitive performance, including nootropics, neurofeedback, and lifestyle optimization strategies.",
    content: "Full article content here...",
    isPremium: true,
    publishedAt: "2024-01-10T14:30:00Z",
    tags: ["Biohacking", "Cognitive", "Nootropics", "Performance"],
    sources: [
      { label: "Journal of Cognitive Enhancement", url: "https://example.com/cognitive" },
      { label: "Biohacker's Handbook", url: "https://example.com/biohacking" },
    ],
    coverImageUrl: "/brain-enhancement-biohacking.jpg",
  },
  {
    id: "3",
    slug: "nutrition-longevity-guide",
    title: "The Complete Guide to Nutrition for Longevity",
    excerpt:
      "Evidence-based nutritional strategies to promote healthy aging and extend lifespan. From intermittent fasting to micronutrient optimization.",
    content: "Full article content here...",
    isPremium: false,
    publishedAt: "2024-01-05T09:15:00Z",
    tags: ["Nutrition", "Longevity", "Aging", "Diet"],
    sources: [
      { label: "Longevity Research Institute", url: "https://example.com/longevity" },
      { label: "Nutrition Science Journal", url: "https://example.com/nutrition" },
    ],
    coverImageUrl: "/healthy-nutrition-longevity-food.jpg",
  },
  {
    id: "4",
    slug: "meditation-brain-plasticity",
    title: "How Meditation Rewires Your Brain: The Neuroplasticity Connection",
    excerpt:
      "Scientific insights into how meditation practices physically change brain structure and function, enhancing emotional regulation and cognitive abilities.",
    content: "Full article content here...",
    isPremium: true,
    publishedAt: "2023-12-28T16:45:00Z",
    tags: ["Meditation", "Neuroplasticity", "Brain", "Mindfulness"],
    sources: [
      { label: "Neuroscience Research", url: "https://example.com/neuroscience" },
      { label: "Mindfulness Studies", url: "https://example.com/mindfulness" },
    ],
    coverImageUrl: "/meditation-brain-neuroplasticity.jpg",
  },
  {
    id: "5",
    slug: "exercise-molecular-level",
    title: "Exercise at the Molecular Level: Understanding Cellular Adaptation",
    excerpt:
      "Deep dive into how exercise triggers molecular changes in muscle cells, mitochondria, and gene expression for optimal health benefits.",
    content: "Full article content here...",
    isPremium: false,
    publishedAt: "2023-12-20T11:20:00Z",
    tags: ["Exercise", "Molecular", "Fitness", "Cellular"],
    sources: [
      { label: "Exercise Physiology Review", url: "https://example.com/exercise" },
      { label: "Molecular Biology Journal", url: "https://example.com/molecular" },
    ],
    coverImageUrl: "/exercise-molecular-cellular-adaptation.jpg",
  },
  {
    id: "6",
    slug: "stress-hormones-optimization",
    title: "Mastering Stress Hormones: A Comprehensive Optimization Guide",
    excerpt:
      "Learn to optimize cortisol, adrenaline, and other stress hormones through lifestyle interventions, breathing techniques, and recovery protocols.",
    content: "Full article content here...",
    isPremium: true,
    publishedAt: "2023-12-15T13:10:00Z",
    tags: ["Stress", "Hormones", "Cortisol", "Recovery"],
    sources: [
      { label: "Endocrinology Today", url: "https://example.com/endocrinology" },
      { label: "Stress Research Institute", url: "https://example.com/stress" },
    ],
    coverImageUrl: "/stress-hormones-cortisol-management.jpg",
  },
]

export default function ArticlesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const user = useUser()
  const hasAccess = hasPremiumAccess(user)
  const canCreateArticles = user.role === "owner" || user.role === "moderator"

  // State management
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

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let result = [...mockArticles]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(searchLower) ||
          article.excerpt.toLowerCase().includes(searchLower) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Apply tag filter
    if (filters.tags.length > 0) {
      result = result.filter((article) => filters.tags.some((tag) => article.tags.includes(tag)))
    }

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
  }, [filters])

  // Get all available tags
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    mockArticles.forEach((article) => {
      article.tags.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [])

  const handleRetry = () => {
    setError(null)
    setIsLoading(true)
    // Simulate retry
    setTimeout(() => setIsLoading(false), 1000)
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
            Showing {filteredArticles.length} of {mockArticles.length} articles
            {filters.search && ` for "${filters.search}"`}
            {filters.tags.length > 0 && ` tagged with ${filters.tags.join(", ")}`}
          </motion.div>
        )}
      </div>
    </div>
  )
}
