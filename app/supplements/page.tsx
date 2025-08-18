import { readFileSync } from "fs"
import { join } from "path"
import { SupplementsClient } from "@/components/supplements/supplements-client"

function getSupplements() {
  try {
    const supplementsPath = join(process.cwd(), "public", "seed", "supplements.json")
    const reviewsPath = join(process.cwd(), "public", "seed", "reviews.json")

    const supplementsData = JSON.parse(readFileSync(supplementsPath, "utf8"))
    let reviewsData = {}

    try {
      reviewsData = JSON.parse(readFileSync(reviewsPath, "utf8"))
    } catch (reviewsError) {
      console.warn("Reviews file not found or invalid, continuing without reviews")
    }

    // Normalize rating data contract and merge reviews
    const normalizedSupplements = supplementsData.map((supplement: any) => {
      // Normalize rating field
      let rating = null
      let reviews_count = 0

      if (supplement.rating) {
        if (typeof supplement.rating === "number") {
          rating = supplement.rating
        } else if (supplement.rating.avg !== null) {
          rating = supplement.rating.avg
        }

        reviews_count = supplement.reviews_count || supplement.rating?.count || 0
      }

      // Get reviews for this supplement
      const supplementReviews = (reviewsData as any)[supplement.slug]?.items || []

      // Calculate rating from actual reviews if no rating exists
      if (!rating && supplementReviews.length > 0) {
        const totalRating = supplementReviews.reduce((sum: number, review: any) => sum + review.rating, 0)
        rating = totalRating / supplementReviews.length
        reviews_count = supplementReviews.length
      }

      // Ensure popular_manufacturer is an array
      let popular_manufacturer = []
      if (supplement.popular_manufacturer) {
        popular_manufacturer = Array.isArray(supplement.popular_manufacturer)
          ? supplement.popular_manufacturer
          : [supplement.popular_manufacturer]
      }

      return {
        ...supplement,
        rating,
        reviews_count,
        popular_manufacturer,
        reviews: supplementReviews,
      }
    })

    return normalizedSupplements
  } catch (error) {
    console.error("Error loading supplements:", error)
    return []
  }
}

export default function SupplementsPage() {
  const supplements = getSupplements()

  return <SupplementsClient supplements={supplements} />
}
