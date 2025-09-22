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
      {/* Enhanced Molecular Structure Animation - larger and more complex */}
      <motion.div
        className="absolute top-10 right-10 w-80 h-80"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 3, delay: 1 }}
      >
        <motion.svg
          className="w-full h-full text-primary/15"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <circle cx="25" cy="25" r="2.5" fill="currentColor" />
          <circle cx="75" cy="25" r="2.5" fill="currentColor" />
          <circle cx="25" cy="75" r="2.5" fill="currentColor" />
          <circle cx="75" cy="75" r="2.5" fill="currentColor" />
          <circle cx="15" cy="50" r="2" fill="currentColor" />
          <circle cx="85" cy="50" r="2" fill="currentColor" />
          <circle cx="50" cy="15" r="2" fill="currentColor" />
          <circle cx="50" cy="85" r="2" fill="currentColor" />

          <motion.line
            x1="50"
            y1="50"
            x2="25"
            y2="25"
            stroke="currentColor"
            strokeWidth="1"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.line
            x1="50"
            y1="50"
            x2="75"
            y2="25"
            stroke="currentColor"
            strokeWidth="1"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
          <motion.line
            x1="50"
            y1="50"
            x2="25"
            y2="75"
            stroke="currentColor"
            strokeWidth="1"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.line
            x1="50"
            y1="50"
            x2="75"
            y2="75"
            stroke="currentColor"
            strokeWidth="1"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
          />
        </motion.svg>
      </motion.div>

      {/* Enhanced Vitamin Particles - more particles across full screen */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-accent/30 rounded-full"
          style={{
            left: `${5 + i * 4.5}%`,
            top: `${15 + (i % 6) * 12}%`,
          }}
          animate={{
            y: [-25, -60, -25],
            x: [-15, 25, -15],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 180, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 10 + i * 0.3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* New: Supplement Formula Chains */}
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3, delay: 2 }}
      >
        <motion.svg
          className="w-full h-full text-accent/20"
          viewBox="0 0 100 60"
          animate={{ rotateX: [0, 360] }}
          transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <motion.path
            d="M10,30 Q30,10 50,30 Q70,50 90,30"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.path
            d="M10,40 Q30,20 50,40 Q70,60 90,40"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            animate={{
              pathLength: [1, 0, 1],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
        </motion.svg>
      </motion.div>

      {/* New: Floating Supplement Icons */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-16 h-16"
        animate={{
          y: [-10, -30, -10],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-primary/40 rounded-sm" />
        </div>
      </motion.div>
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
