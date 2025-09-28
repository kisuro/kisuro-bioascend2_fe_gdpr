import type { Article, ArticleFilters } from "@/lib/data/articles"
import { articlesData } from "@/lib/data/articles"
import { buildAuthHeaders } from "@/lib/hooks/use-user"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

// Mock service functions - replace with actual API calls when backend is ready
export class ArticleService {
  // Get all articles with filtering and pagination
  static async getArticles(
    filters: ArticleFilters = {},
    page = 1,
    limit = 10,
  ): Promise<{
    articles: Article[]
    total: number
    hasMore: boolean
  }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredArticles = [...articlesData]

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.excerpt.toLowerCase().includes(searchTerm) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      )
    }

    if (filters.category && filters.category !== "All") {
      filteredArticles = filteredArticles.filter((article) => article.category === filters.category)
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredArticles = filteredArticles.filter((article) => filters.tags!.some((tag) => article.tags.includes(tag)))
    }

    if (filters.isPremium !== undefined) {
      filteredArticles = filteredArticles.filter((article) => article.isPremium === filters.isPremium)
    }

    if (filters.dateRange) {
      filteredArticles = filteredArticles.filter((article) => {
        const publishedDate = new Date(article.publishedAt)
        return publishedDate >= filters.dateRange!.from && publishedDate <= filters.dateRange!.to
      })
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "oldest":
        filteredArticles.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
        break
      case "popular":
        filteredArticles.sort((a, b) => b.views - a.views)
        break
      case "trending":
        filteredArticles.sort((a, b) => b.likes - a.likes)
        break
      case "newest":
      default:
        filteredArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        break
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

    return {
      articles: paginatedArticles,
      total: filteredArticles.length,
      hasMore: endIndex < filteredArticles.length,
    }
  }

  // Get single article by slug
  static async getArticle(slug: string): Promise<Article | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const article = articlesData.find((a) => a.slug === slug)
    if (!article) return null

    // Increment view count (in real app, this would be handled by backend)
    article.views += 1

    return article
  }

  // Create new article (requires authentication)
  static async createArticle(articleData: Partial<Article>): Promise<Article> {
    // In real implementation, this would make an API call
    const headers = buildAuthHeaders({ "Content-Type": "application/json" })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newArticle: Article = {
      id: Date.now().toString(),
      slug: articleData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "",
      title: articleData.title || "",
      excerpt: articleData.excerpt || "",
      content: articleData.content || "",
      coverImage: articleData.coverImage || "/open-book-knowledge.png",
      author: articleData.author || {
        id: "current-user",
        name: "Current User",
        avatar: "/abstract-geometric-shapes.png",
      },
      publishedAt: new Date().toISOString(),
      readingTime: Math.ceil((articleData.content?.length || 0) / 200), // Rough estimate
      tags: articleData.tags || [],
      category: articleData.category || "General",
      isPremium: articleData.isPremium || false,
      isPublished: articleData.isPublished || false,
      views: 0,
      likes: 0,
      sources: articleData.sources || [],
      seoMetadata: articleData.seoMetadata || {},
    }

    // In real app, this would be handled by the backend
    articlesData.unshift(newArticle)

    return newArticle
  }

  // Update existing article
  static async updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
    const headers = buildAuthHeaders({ "Content-Type": "application/json" })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const articleIndex = articlesData.findIndex((a) => a.id === id)
    if (articleIndex === -1) {
      throw new Error("Article not found")
    }

    const updatedArticle = {
      ...articlesData[articleIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    articlesData[articleIndex] = updatedArticle
    return updatedArticle
  }

  // Delete article
  static async deleteArticle(id: string): Promise<void> {
    const headers = buildAuthHeaders()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const articleIndex = articlesData.findIndex((a) => a.id === id)
    if (articleIndex === -1) {
      throw new Error("Article not found")
    }

    articlesData.splice(articleIndex, 1)
  }

  // Like/unlike article
  static async toggleLike(id: string): Promise<{ liked: boolean; likes: number }> {
    const headers = buildAuthHeaders()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    const article = articlesData.find((a) => a.id === id)
    if (!article) {
      throw new Error("Article not found")
    }

    // In real app, this would track user likes in database
    const liked = Math.random() > 0.5 // Simulate user like status
    article.likes += liked ? 1 : -1

    return { liked, likes: article.likes }
  }

  // Get related articles
  static async getRelatedArticles(articleId: string, limit = 3): Promise<Article[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const currentArticle = articlesData.find((a) => a.id === articleId)
    if (!currentArticle) return []

    // Find articles with similar tags or category
    const relatedArticles = articlesData
      .filter(
        (article) =>
          article.id !== articleId &&
          (article.category === currentArticle.category ||
            article.tags.some((tag) => currentArticle.tags.includes(tag))),
      )
      .sort((a, b) => {
        // Sort by relevance (shared tags count)
        const aSharedTags = a.tags.filter((tag) => currentArticle.tags.includes(tag)).length
        const bSharedTags = b.tags.filter((tag) => currentArticle.tags.includes(tag)).length
        return bSharedTags - aSharedTags
      })
      .slice(0, limit)

    return relatedArticles
  }
}
