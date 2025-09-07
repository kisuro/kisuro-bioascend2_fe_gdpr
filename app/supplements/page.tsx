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

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

function normalizeManufacturers(src: any): string[] {
  const candidates = [
    src?.popular_manufacturer,
    src?.popular_manufacturers,
    src?.popularManufacturers,
    src?.manufacturer,
    src?.manufacturers,
    src?.brands,
    src?.brand,
    src?.meta?.popular_manufacturer,
    src?.meta?.popular_manufacturers,
  ]
  return uniq(candidates.flatMap((c) => (Array.isArray(c) ? c : c ? [c] : []))).filter(Boolean)
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

function pickDosageString(s: any): string | undefined {
  // Priority: explicit dosage string -> meta.recommended_dosage -> meta.dosage
  const direct = typeof s?.dosage === "string" && s.dosage.trim() ? s.dosage.trim() : undefined
  if (direct) return direct
  const meta = s?.meta || {}
  const metaRecommended = typeof meta?.recommended_dosage === "string" && meta.recommended_dosage.trim()
    ? meta.recommended_dosage.trim()
    : undefined
  if (metaRecommended) return metaRecommended
  const metaDosage = typeof meta?.dosage === "string" && meta.dosage.trim() ? meta.dosage.trim() : undefined
  if (metaDosage) return metaDosage

  // Try reconstructing from min/max/unit/notes
  const min = meta?.dosage_min ?? meta?.min_dosage ?? meta?.minimum
  const max = meta?.dosage_max ?? meta?.max_dosage ?? meta?.maximum
  const unit = meta?.dosage_unit ?? meta?.unit
  const per = meta?.dosage_per ?? meta?.per // e.g., "day"
  const notes = meta?.dosage_notes ?? meta?.notes

  const hasMin = typeof min === "number" || (typeof min === "string" && min.trim())
  const hasMax = typeof max === "number" || (typeof max === "string" && max.trim())
  const minStr = typeof min === "number" ? String(min) : (min || "")
  const maxStr = typeof max === "number" ? String(max) : (max || "")

  if (hasMin || hasMax) {
    const range = hasMin && hasMax ? `${minStr}–${maxStr}` : hasMin ? `${minStr}` : `${maxStr}`
    const unitPart = unit ? ` ${unit}` : ""
    const perPart = per ? `/${per}` : ""
    const notePart = notes ? ` (${notes})` : ""
    return `${range}${unitPart}${perPart}${notePart}`.trim()
  }

  return undefined
}

async function fetchFromAPI(): Promise<SupplementItem[]> {
  const res = await fetch(`${API}/v1/supplements`, { cache: "no-store" })
  if (!res.ok) throw new Error(`API /v1/supplements failed: ${res.status}`)
  const data = (await res.json()) as any[]

  return data.map((s) => ({
    ...s,
    dosage: pickDosageString(s),
    timing: s.timing || s?.meta?.timing,
    popular_manufacturer: normalizeManufacturers(s),
    categories: toArray<string>(s.categories || s?.meta?.categories),
    goals: toArray<string>(s.goals || s?.meta?.primary_goals),
    benefits: toArray<string>(s.benefits || s?.meta?.benefits),
    rating: normalizeRating(s.rating),
  }))
}

async function fetchFromSeed(): Promise<SupplementItem[]> {
  try {
    const [suppsRes, reviewsRes] = await Promise.all([
      fetch("/seed/supplements.json", { cache: "no-store" }),
      fetch("/seed/reviews.json", { cache: "no-store" }),
    ])

    const [suppsRaw, reviewsRaw] = await Promise.all([
      suppsRes.ok ? suppsRes.json() : [],
      reviewsRes.ok ? reviewsRes.json() : {},
    ])

    const reviewsBySlug = reviewsRaw ?? {}

    return (suppsRaw as any[]).map((s) => {
      const slug = s.id ?? s.slug
      const reviewsForSlug: any[] = reviewsBySlug?.[slug]?.items ?? []
      return {
        ...s,
        id: slug,
        dosage: pickDosageString(s),
        timing: s.timing || s?.meta?.timing,
        popular_manufacturer: normalizeManufacturers(s),
        categories: toArray<string>(s.categories || s?.meta?.categories),
        goals: toArray<string>(s.goals || s?.meta?.primary_goals),
        benefits: toArray<string>(s.benefits || s?.meta?.benefits),
        rating: normalizeRating(s.rating, reviewsForSlug),
        reviews_count:
          s.reviews_count ?? (s.rating && typeof s.rating === "object" ? s.rating.count : (reviewsForSlug.length ?? 0)),
      }
    })
  } catch (error) {
    console.error("Error loading seed data:", error)
    return []
  }
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
