import { Suspense } from "react"
import { SupplementsClient } from "@/components/supplements/supplements-client"

const API = process.env.NEXT_PUBLIC_API_URL

type Rating = null | {
  avg: number | null
  count: number
}

export type SupplementItem = {
  id: string
  name: string
  summary?: string
  dosage?: string
  evidence_level?: string
  categories?: string[]
  goals?: string[]
  timing?: string
  cycle?: string
  benefits?: string[]
  popular_manufacturer?: string[]
  rating: Rating
  reviews_count?: number
  [key: string]: any
}

function toArray<T>(x: T | T[] | undefined | null): T[] {
  if (!x) return []
  return Array.isArray(x) ? x : [x]
}

function normalizeRating(raw: any, fallbackReviews?: any[]): Rating {
  if (raw && typeof raw === "object" && ("avg" in raw || "count" in raw)) {
    return { avg: raw.avg ?? null, count: raw.count ?? 0 }
  }
  if (typeof raw === "number") {
    return { avg: raw, count: fallbackReviews?.length ?? 0 }
  }
  if (Array.isArray(fallbackReviews) && fallbackReviews.length > 0) {
    const sum = fallbackReviews.reduce((a, r) => a + (r?.rating ?? 0), 0)
    const avg = Math.round((sum / fallbackReviews.length) * 100) / 100
    return { avg, count: fallbackReviews.length }
  }
  return null
}

async function fetchFromAPI(): Promise<SupplementItem[]> {
  const res = await fetch(`${API}/v1/supplements`, { cache: "no-store" })
  if (!res.ok) throw new Error(`API /v1/supplements failed: ${res.status}`)
  const data = (await res.json()) as any[]

  return data.map((s) => ({
    ...s,
    popular_manufacturer: toArray<string>(s.popular_manufacturer),
    categories: toArray<string>(s.categories),
    goals: toArray<string>(s.goals),
    benefits: toArray<string>(s.benefits),
    rating: normalizeRating(s.rating),
  }))
}

async function fetchFromSeed(): Promise<SupplementItem[]> {
  const { default: fs } = await import("fs/promises")
  const { default: path } = await import("path")

  const supplementsPath = path.join(process.cwd(), "public/seed/supplements.json")
  const reviewsPath = path.join(process.cwd(), "public/seed/reviews.json")

  const [suppsRaw, reviewsRaw] = await Promise.all([
    fs
      .readFile(supplementsPath, "utf8")
      .then(JSON.parse)
      .catch(() => []),
    fs
      .readFile(reviewsPath, "utf8")
      .then(JSON.parse)
      .catch(() => ({})),
  ])

  const reviewsBySlug = (reviewsRaw as any) ?? {}

  return (suppsRaw as any[]).map((s) => {
    const slug = s.id ?? s.slug
    const reviewsForSlug: any[] = reviewsBySlug?.[slug]?.items ?? []
    return {
      ...s,
      id: slug,
      popular_manufacturer: toArray<string>(s.popular_manufacturer),
      categories: toArray<string>(s.categories),
      goals: toArray<string>(s.goals),
      benefits: toArray<string>(s.benefits),
      rating: normalizeRating(s.rating, reviewsForSlug),
      reviews_count:
        s.reviews_count ?? (s.rating && typeof s.rating === "object" ? s.rating.count : (reviewsForSlug.length ?? 0)),
    }
  })
}

export default async function SupplementsPage() {
  let supplements: SupplementItem[] = []
  if (API) {
    try {
      supplements = await fetchFromAPI()
    } catch {
      supplements = await fetchFromSeed()
    }
  } else {
    supplements = await fetchFromSeed()
  }
  if (!Array.isArray(supplements)) supplements = []

  return (
    <Suspense fallback={<div className="p-6">Loading supplements…</div>}>
      <SupplementsClient supplements={supplements} />
    </Suspense>
  )
}
