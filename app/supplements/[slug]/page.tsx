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
    const filePath = path.join(process.cwd(), "public/seed/supplements.json")
    const reviewsPath = path.join(process.cwd(), "public/seed/reviews.json")

    const supplementsData = fs.readFileSync(filePath, "utf8")
    const reviewsData = fs.readFileSync(reviewsPath, "utf8")

    const supplements = JSON.parse(supplementsData)
    const reviews = JSON.parse(reviewsData)

    const supplement = supplements.find((s: any) => s.id === slug)
    if (!supplement) return null

    // Get reviews for this supplement
    const supplementReviews = reviews[slug]?.items || []

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
