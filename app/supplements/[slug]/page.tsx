import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import { SupplementDetailClient } from "./supplement-detail-client"

interface SupplementDetailPageProps {
  params: {
    slug: string
  }
}

async function getSupplement(slug: string) {
  try {
    const supplementsPath = path.join(process.cwd(), "public/seed/supplements.json")
    const reviewsPath = path.join(process.cwd(), "public/seed/reviews.json")

    const [supplementsData, reviewsData] = await Promise.all([
      fs.promises.readFile(supplementsPath, "utf8").then(JSON.parse),
      fs.promises.readFile(reviewsPath, "utf8").then(JSON.parse).catch(() => ({}))
    ])

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

export default async function SupplementDetailPage({ params }: SupplementDetailPageProps) {
  const supplement = await getSupplement(params.slug)

  if (!supplement) {
    notFound()
  }

  return <SupplementDetailClient supplement={supplement} />
}
