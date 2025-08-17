import { readFileSync } from "fs"
import { join } from "path"
import { SupplementsClient } from "@/components/supplements/supplements-client"

function getSupplements() {
  try {
    const supplementsPath = join(process.cwd(), "public", "seed", "supplements.json")
    const reviewsPath = join(process.cwd(), "public", "seed", "reviews.json")

    const supplementsData = readFileSync(supplementsPath, "utf8")
    const reviewsData = readFileSync(reviewsPath, "utf8")

    const supplements = JSON.parse(supplementsData)
    const reviews = JSON.parse(reviewsData)

    return supplements.map((supplement: any) => {
      const supplementReviews = reviews[supplement.slug]?.items || []

      // Convert reviews to the format expected by components
      const ratings = supplementReviews.map((review: any) => ({
        userId: review.id,
        score: review.rating,
        comment: review.body,
        date: review.created_at,
        verified: review.verified_purchase,
      }))

      // Calculate average rating and count
      const avgRating =
        ratings.length > 0 ? ratings.reduce((sum: number, r: any) => sum + r.score, 0) / ratings.length : null

      return {
        ...supplement,
        rating: avgRating ? Number(avgRating.toFixed(1)) : null,
        reviews_count: ratings.length,
        ratings: ratings,
      }
    })
  } catch (error) {
    console.error("Error loading supplements:", error)
    return []
  }
}

export default function SupplementsPage() {
  const supplements = getSupplements()

  return <SupplementsClient supplements={supplements} />
}
