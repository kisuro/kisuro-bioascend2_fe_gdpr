"use client"

interface UserReview {
  id: string
  slug: string
  rating: number
  title: string
  body: string
  verified_purchase: boolean
  created_at: string
  user_id: string
}

interface ReviewsStore {
  list(slug: string): Promise<UserReview[]>
  submit(
    slug: string,
    payload: Omit<UserReview, "id" | "created_at" | "user_id">,
  ): Promise<{ rating: number; reviews_count: number }>
}

const STORAGE_KEY = "bioaionics_reviews_v1" // updated storage key

class LocalReviewsStore implements ReviewsStore {
  private getStoredReviews(): Record<string, UserReview[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  }

  private setStoredReviews(reviews: Record<string, UserReview[]>): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
    } catch {
      // Handle localStorage errors gracefully
    }
  }

  async list(slug: string): Promise<UserReview[]> {
    const stored = this.getStoredReviews()
    return stored[slug] || []
  }

  async submit(
    slug: string,
    payload: Omit<UserReview, "id" | "created_at" | "user_id">,
  ): Promise<{ rating: number; reviews_count: number }> {
    const stored = this.getStoredReviews()
    const existingReviews = stored[slug] || []

    // Check for existing review from same user (prevent duplicates)
    const userId = "current_user" // In real implementation, get from auth
    const existingIndex = existingReviews.findIndex((r) => r.user_id === userId)

    const newReview: UserReview = {
      ...payload,
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      user_id: userId,
    }

    if (existingIndex >= 0) {
      // Replace existing review
      existingReviews[existingIndex] = newReview
    } else {
      // Add new review
      existingReviews.unshift(newReview)
    }

    stored[slug] = existingReviews
    this.setStoredReviews(stored)

    // Calculate aggregate stats
    const allRatings = existingReviews.map((r) => r.rating)
    const rating = allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length
    const reviews_count = allRatings.length

    return { rating, reviews_count }
  }
}

export const reviewsStore: ReviewsStore = new LocalReviewsStore()
