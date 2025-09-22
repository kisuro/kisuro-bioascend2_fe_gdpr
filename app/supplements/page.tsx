"use client"

import { Suspense } from "react"
import { SupplementsClient } from "@/components/supplements/supplements-client"
import { AppLoader } from "@/components/ui/app-loader"
import { motion } from "framer-motion"

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
  const metaRecommended =
    typeof meta?.recommended_dosage === "string" && meta.recommended_dosage.trim()
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
  const minStr = typeof min === "number" ? String(min) : min || ""
  const maxStr = typeof max === "number" ? String(max) : max || ""

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
      const reviewsForSlug: any[] = (reviewsBySlug as any)?.[slug]?.items ?? []
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

const SupplementBackground = () => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Molecular Structure Animation */}
      <motion.div
        className="absolute top-20 right-20 w-48 h-48"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 3, delay: 1 }}
      >
        <motion.svg
          className="w-full h-full text-primary/10"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="2" fill="currentColor" />
          <circle cx="30" cy="30" r="1.5" fill="currentColor" />
          <circle cx="70" cy="30" r="1.5" fill="currentColor" />
          <circle cx="30" cy="70" r="1.5" fill="currentColor" />
          <circle cx="70" cy="70" r="1.5" fill="currentColor" />
          <motion.line
            x1="50"
            y1="50"
            x2="30"
            y2="30"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.line
            x1="50"
            y1="50"
            x2="70"
            y2="30"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
        </motion.svg>
      </motion.div>

      {/* Vitamin Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-accent/20 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            x: [-10, 15, -10],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + i,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  )
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
    <>
      <SupplementBackground />
      <div className="relative z-10">
        <Suspense fallback={<AppLoader isVisible={true} message="Loading supplements..." />}>
          <SupplementsClient supplements={supplements} />
        </Suspense>
      </div>
    </>
  )
}
