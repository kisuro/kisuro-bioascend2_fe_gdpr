import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import { SupplementDetailClient } from "./supplement-detail-client"

interface SupplementDetailPageProps {
  params: {
    slug: string
  }
}

function getSupplement(slug: string) {
  try {
    const supplementsPath = path.join(process.cwd(), "public/seed/supplements.json")
    const reviewsPath = path.join(process.cwd(), "public/seed/reviews.json")

    const supplementsData = JSON.parse(fs.readFileSync(supplementsPath, "utf8"))
    let reviewsData = {}

    try {
      reviewsData = JSON.parse(fs.readFileSync(reviewsPath, "utf8"))
    } catch (reviewsError) {
      console.warn("Reviews file not found or invalid, continuing without reviews")
    }

    const supplement = supplementsData.find((s: any) => s.id === slug)
    if (!supplement) return null

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
  } catch (error) {
    console.error("Error loading supplement:", error)
    return null
  }
}

export default function SupplementDetailPage({ params }: SupplementDetailPageProps) {
  const supplement = getSupplement(params.slug)

  if (!supplement) {
    notFound()
  }

  return <SupplementDetailClient supplement={supplement} />
}
