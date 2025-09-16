"use client"

import { useEffect, useMemo, useState } from "react"
import { Star, Users, Calendar, User, Zap, BookOpen, Info, Shield, X, Plus, ExternalLink } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/lib/hooks/use-user"
import { StarRatingPicker } from "@/components/supplements/star-rating-picker"
import { ReviewModal } from "@/components/supplements/review-modal"
import { PremiumGateModal } from "@/components/supplements/premium-gate-modal"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SupplementInteractions } from "@/components/supplements/supplement-interactions"

const API = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "")

// --- Types ---------------------------------------------------------------
interface SupplementLink {
  rel?: string[]
  url: string
  kind?: string
  lang?: string
  name?: string
  notes?: string
  vendor?: string
  region?: string[]
}

interface Review {
  id: string
  slug: string
  rating: number
  title: string
  body: string
  verified_purchase: boolean
  created_at: string
  user?: string
}

// `rating` может приходить числом или объектом {avg,count}
export type RatingShape = number | { avg: number | null; count: number } | null

// Define Props for the component
type Props = {
  supplement: any
  reviews?: Review[]
}

interface SupplementDTO {
  id: string
  name: string
  summary?: string
  evidence_level?: string
  goals?: string[]
  categories?: string[]
  timing?: string
  dosage?: string
  cycle?: string
  benefits?: string[]
  popular_manufacturer?: string[] | string
  rating: RatingShape
  reviews_count?: number
  reviews?: Review[]
  // allow extra fields like meta
  [key: string]: any
}

// --- Helpers ------------------------------------------------------------
function toArray<T>(v: T | T[] | undefined): T[] {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

function toStringArray(v: any): string[] {
  if (!v) return []
  if (Array.isArray(v)) return v.map((x) => String(x)).filter(Boolean)
  const s = String(v)
  return s.includes(",")
    ? s
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
    : s
      ? [s.trim()]
      : []
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

function normalizeManufacturers(src: any): string[] {
  const candidates = [
    src?.popular_manufacturer,
    src?.popular_manufacturers,
    src?.popularManufacturers,
    src?.manufacturers,
    src?.manufacturer,
    src?.brands,
    src?.brand,
    src?.meta?.popular_manufacturer,
    src?.meta?.popular_manufacturers,
    src?.meta?.manufacturers,
    src?.meta?.brands,
  ]
  return uniq(candidates.flatMap((c) => toStringArray(c))).filter(Boolean)
}

function ratingAvg(r: RatingShape): number | null {
  if (r == null) return null
  if (typeof r === "number") return r
  return r.avg ?? null
}

function evidenceBadgeClasses(level?: string): string {
  const l = (level || "").toLowerCase()
  if (l.includes("strong")) return "border bg-green-500/20 text-green-400 border-green-500/30"
  if (l.includes("moderate")) return "border bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  if (l.includes("limited") || l.includes("weak")) return "border bg-orange-500/20 text-orange-400 border-orange-500/30"
  return "border bg-slate-500/20 text-slate-300 border-slate-500/30"
}

// --- Component ----------------------------------------------------------
export function SupplementDetailClient({ supplement: initial }: Props) {
  // нормализуем вход
  const normalized: SupplementDTO & {
    popular_manufacturer: string[]
    goals: string[]
    categories: string[]
    benefits: string[]
    reviews: Review[]
  } = {
    ...initial,
    goals: toArray(initial.goals),
    categories: toArray(initial.categories),
    benefits: toArray(initial.benefits),
    popular_manufacturer: normalizeManufacturers(initial),
    reviews: Array.isArray(initial.reviews) ? initial.reviews : [],
  }

  const [supplement, setSupplement] = useState(normalized)
  const [allReviews, setAllReviews] = useState<Review[]>(normalized.reviews)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showPremiumGate, setShowPremiumGate] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)
  const [showRatingPicker, setShowRatingPicker] = useState(false)

  const { toast } = useToast()
  const user = useUser()
  const isAuthLoading = (user as any)?.isLoading
  const isPremium = !!(user?.status === "premium")
  const router = useRouter()

  const handleGoalClick = (goal: string) => {
    router.push(`/supplements?goals=${encodeURIComponent(goal)}`)
  }

  // === КЛИК ПО ЗВЁЗДАМ ==================================================
  const handleRatingClick = () => {
    console.log("[UI] star click", { isPremium, isAuthLoading })
    if (isAuthLoading) return
    if (!isPremium) {
      console.log("[UI] opening PremiumGateModal")
      setShowPremiumGate(true)
      return
    }
    console.log("[UI] opening StarRatingPicker")
    setShowRatingPicker(true)
  }

  // если пропсы обновились – синхронизируем
  useEffect(() => {
    setSupplement(normalized)
    // Не трогаем allReviews здесь, чтобы не затирать данные только что полученные с API
    setIsLoadingReviews(false)
  }, [initial]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (showRatingPicker) {
      console.log("[UI] StarRatingPicker isOpen -> true")
    } else {
      console.log("[UI] StarRatingPicker isOpen -> false")
    }
  }, [showRatingPicker])

  // always refresh from API on mount & when id changes
  useEffect(() => {
    refreshFromAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplement.id])

  const avg = useMemo(() => ratingAvg(supplement.rating), [supplement.rating])
  const cnt = useMemo(() => {
    if (supplement.rating && typeof supplement.rating === "object" && "count" in supplement.rating) {
      return supplement.rating.count ?? supplement.reviews_count ?? 0
    }
    return supplement.reviews_count ?? 0
  }, [supplement.rating, supplement.reviews_count])

  const hasRating = avg != null && cnt > 0
  const currentDisplayRating = Math.max(0, Math.min(5, Math.round(avg ?? 0)))

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  const renderStars = (value: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
      ))}
    </div>
  )

  // --- API helpers -------------------------------------------------------
const mapApiReviewToUI = (r: any): Review => ({
  id: r.id,
  slug: supplement.id,
  rating: r.rating,
  title: "", // у нас на бэке нет title — оставляем пустым
  body: r.comment || "",
  verified_purchase: false,
  created_at: r.created_at,
  user: r.user,
})

  const refreshFromAPI = async () => {
    try {
      setIsLoadingReviews(true)
      const [aggRes, revRes] = await Promise.all([
        fetch(`${API}/v1/ratings/${supplement.id}/aggregate`, {
          cache: "no-store",
        }),
        fetch(`${API}/v1/reviews/${supplement.id}`, {
          cache: "no-store",
        }),
      ])

      let nextCountFromAgg: number | undefined
      if (aggRes.ok) {
        const agg = await aggRes.json()
        const nextRating = agg?.rating ?? null
        nextCountFromAgg = (typeof nextRating === "object" && nextRating?.count) || undefined
        setSupplement((prev) => ({
          ...prev,
          rating: nextRating,
          reviews_count: nextCountFromAgg ?? prev.reviews_count ?? 0,
        }))
      }

      if (revRes.ok) {
        const items = await revRes.json()
        const mapped = Array.isArray(items) ? items.map(mapApiReviewToUI) : []
        setAllReviews(mapped)
        // если агрегат ничего не вернул по count — подстрахуемся длиной отзывов
        if (!(nextCountFromAgg ?? 0)) {
          setSupplement((prev) => ({
            ...prev,
            reviews_count: mapped.length,
            rating:
              typeof prev.rating === "number" || prev.rating == null
                ? prev.rating
                : { ...prev.rating, count: mapped.length },
          }))
        }
      }
    } catch (e) {
      // swallow errors
    } finally {
      setIsLoadingReviews(false)
    }
  }

  // ------ Review actions ------------------------------------------------
  const handleAddReviewClick = () => {
    console.log("[UI] add review click")
    if (isAuthLoading) return
    if (!isPremium) return setShowPremiumGate(true)
    setShowReviewModal(true)
  }

  const resolveUsername = () =>
    user?.name || (user as any)?.username || (user as any)?.email?.split("@")?.[0] || "anonymous"

  // Отправка полноценного отзыва (звёзды + текст)
  const handleReviewSubmit = async (data: any) => {
    try {
      // поддерживаем разные поля из модалки: body/title/comment/text
      const comment: string = (data?.body ?? data?.title ?? data?.comment ?? data?.text ?? "").toString()
      const rating: number = Number(data?.rating ?? userRating ?? 0) || 0
      const username = resolveUsername()

      const optimistic: Review = {
        id: (globalThis as any).crypto?.randomUUID?.() || `${Date.now()}`,
        slug: supplement.id,
        rating,
        title: data?.title || "",
        body: comment,
        verified_purchase: false,
        created_at: new Date().toISOString(),
        user: username,
      }

      // оптимистично покажем отзыв
      setAllReviews((prev) => [optimistic, ...prev])

      const existing = allReviews.find((r) => r.user === username)
      const payload = { user: username, rating, comment }
      const url = existing
        ? `${API}/v1/reviews/${supplement.id}/${encodeURIComponent(username)}`
        : `${API}/v1/reviews/${supplement.id}`
      const method = existing ? "PATCH" : "POST"
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        // откат оптимистичного элемента
        setAllReviews((prev) => prev.filter((r) => r.id !== optimistic.id))
        throw new Error(j?.detail || `HTTP ${res.status}`)
      }

      await refreshFromAPI()
      setUserRating(rating)
      setShowReviewModal(false)
      toast({ title: "Thanks for your feedback!", description: "Your review has been submitted." })
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message || "Failed to submit review.",
        variant: "destructive",
      })
    }
  }

  // Быстрая отправка рейтинга (через звездочки)
  const handleQuickRatingSubmit = async (rating: number) => {
    try {
      const username = resolveUsername()
      const existing = allReviews.find((r) => r.user === username)
      const payload = { user: username, rating, comment: "" }
      const url = existing
        ? `${API}/v1/reviews/${supplement.id}/${encodeURIComponent(username)}`
        : `${API}/v1/reviews/${supplement.id}`
      const method = existing ? "PATCH" : "POST"
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.detail || `HTTP ${res.status}`)
      }

      await refreshFromAPI()
      setUserRating(rating)
      setShowRatingPicker(false)
      toast({ title: "Thanks!", description: "Your rating has been saved." })
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message || "Failed to submit rating.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen px-4 pt-8 pb-36 sm:pb-40">
      <div className="max-w-6xl mx-auto">
        {/* Layout: left (content) + right (sidebar) to restore previous visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT COLUMN (spans 2) */}
          <div className="md:col-span-2 space-y-6">
            {/* Main Header Block with Description */}
            <GlassCard className="p-8">
              {/* Categories/Tags */}
              {supplement.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {supplement.categories.map((category) => (
                    <Badge key={category} variant="outline" className="glass-subtle">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">{supplement.name}</h1>

              {/* Description */}
              {supplement.summary && <p className="text-xl text-muted-foreground mb-6">{supplement.summary}</p>}

              {/* Rating and User Count */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Interactive Rating Block with Premium Logic */}
                <div
                  className="flex items-center gap-2 flex-wrap cursor-pointer"
                  onClick={handleRatingClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleRatingClick()}
                >
                  {(
                    <StarRatingPicker
                      currentRating={hasRating ? currentDisplayRating : 0}
                      onSubmit={handleQuickRatingSubmit}
                      onCancel={() => setShowRatingPicker(false)}
                      trigger={
                        hasRating ? (
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < currentDisplayRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-semibold text-lg">{avg!.toFixed(1)}</span>
                            <span className="text-muted-foreground whitespace-nowrap">({cnt} reviews)</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star key={i} className="h-5 w-5 text-muted-foreground" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">No ratings yet – be the first!</span>
                          </div>
                        )
                      }
                      open={showRatingPicker}
                      onOpenChange={setShowRatingPicker}
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="whitespace-nowrap">{cnt} users</span>
                </div>
              </div>
            </GlassCard>

            {/* Primary Goals - visual parity with previous */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold font-heading">Primary Goals</h2>
              </div>
              {supplement.goals.length ? (
                <div className="flex flex-wrap gap-2">
                  {supplement.goals.map((g) => (
                    <span
                      key={g}
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-primary text-primary-foreground hover:bg-primary/90 glass-subtle cursor-pointer"
                      onClick={() => handleGoalClick(g)}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">—</div>
              )}
            </GlassCard>

            {/* Benefits - visual parity */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold font-heading">Benefits</h2>
              </div>
              {supplement.benefits.length ? (
                <ul className="space-y-2">
                  {supplement.benefits.map((b, i) => (
                    <li key={`${b}-${i}`} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted-foreground">—</div>
              )}
            </GlassCard>

            {/* Dosage & Timing - visual parity */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold font-heading">Dosage &amp; Timing</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Recommended Dosage</h3>
                  <p className="text-muted-foreground">{supplement.dosage || "—"}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Timing</h3>
                  <p className="text-muted-foreground capitalize">{supplement.timing || "—"}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Cycling</h3>
                  <p className="text-muted-foreground">{supplement.cycling || "—"}</p>
                </div>
              </div>
            </GlassCard>

            {/* Interactions */}
            <SupplementInteractions
              supplement={{ interactions: supplement.interactions || { synergy: [], caution: [], avoid: [] } }}
            />

            {/* Reviews */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold">Reviews</div>
                {(() => {
                  const username = resolveUsername()
                  const mine = allReviews.find((r) => r.user === username)
                  return (
                    <button className="text-sm underline" onClick={handleAddReviewClick}>
                      {mine ? "Edit your review" : "Add review"}
                    </button>
                  )
                })()}
              </div>
              {isLoadingReviews ? (
                <div className="text-center py-8 text-muted-foreground">Loading reviews…</div>
              ) : allReviews.length ? (
                <div className="space-y-4">
                  {allReviews.map((rv) => (
                    <div key={rv.id} className="border-l-2 border-primary/20 pl-4 py-2">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                            <User className="h-3 w-3" />
                          </div>
                          {renderStars(rv.rating)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(rv.created_at)}</span>
                        </div>
                      </div>
                      {rv.title && <h4 className="font-medium mb-1">{rv.title}</h4>}
                      {rv.body && <p className="text-sm text-muted-foreground leading-relaxed">{rv.body}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                  <p className="text-muted-foreground">Be the first to review this supplement!</p>
                </div>
              )}
            </GlassCard>
          </div>

          {/* RIGHT COLUMN (sidebar) */}
          <div className="md:col-span-1 space-y-6">
            {/* Evidence Level */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Evidence Level</h3>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {supplement.evidence_level ? (
                  <span
                    data-slot="badge"
                    className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden hover:bg-primary/90 ${evidenceBadgeClasses(supplement.evidence_level)}`}
                  >
                    {supplement.evidence_level}
                  </span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </div>
            </GlassCard>

            {/* Popular Manufacturers (under evidence) */}
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-3">Popular Manufacturers</h3>
              {supplement.popular_manufacturer.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {supplement.popular_manufacturer.map((manufacturer: string) => (
                    <span
                      key={manufacturer}
                      data-slot="badge"
                      className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-primary text-primary-foreground hover:bg-primary/90 glass-subtle"
                    >
                      {manufacturer}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">—</div>
              )}
            </GlassCard>

            {/* Useful Links */}
            {Array.isArray((supplement as any).meta?.links) && (supplement as any).meta.links.length > 0 && (
              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Useful Links</h3>
                </div>
                <div className="space-y-3">
                  {(supplement as any).meta.links.map((link: SupplementLink, index: number) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-3">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        <span>{link.name || link.vendor || "Link"}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      {link.notes && <p className="text-xs text-muted-foreground mt-1">{link.notes}</p>}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {link.kind && (
                          <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30">
                            {link.kind}
                          </span>
                        )}
                        {link.vendor && link.vendor !== link.name && (
                          <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {link.vendor}
                          </span>
                        )}
                        {link.region && link.region.length > 0 && (
                          <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                            {link.region.join(", ")}
                          </span>
                        )}
                        {link.rel && link.rel.includes("sponsored") && (
                          <span className="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                            sponsored
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Contraindications */}
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-3">Contraindications</h3>
              {Array.isArray((supplement as any).contraindications) &&
              (supplement as any).contraindications.length > 0 ? (
                <ul className="space-y-2">
                  {(supplement as any).contraindications.map((c: string, i: number) => (
                    <li key={`${c}-${i}`} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted-foreground text-sm">—</div>
              )}
            </GlassCard>

            {/* Side Effects */}
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-3">Potential Side Effects</h3>
              {Array.isArray((supplement as any).side_effects) && (supplement as any).side_effects.length > 0 ? (
                <ul className="space-y-2">
                  {(supplement as any).side_effects.map((sfx: string, i: number) => (
                    <li key={`${sfx}-${i}`} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>{sfx}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted-foreground text-sm">—</div>
              )}
            </GlassCard>
          </div>
        </div>

        {/* Always mount modals so portals exist; control visibility via `open` */}
        {(() => {
          const username = resolveUsername()
          const mine = allReviews.find((r) => r.user === username)
          return (
            <ReviewModal
              open={showReviewModal}
              isOpen={showReviewModal}
              onOpenChange={(v: boolean) => setShowReviewModal(!!v)}
              onClose={() => setShowReviewModal(false)}
              onSubmit={handleReviewSubmit}
              initialRating={mine ? mine.rating : userRating}
              initialTitle={mine?.title || ""}
              initialBody={mine?.body || ""}
              mode={mine ? "edit" : "add"}
            />
          )
        })()}

        <PremiumGateModal
          open={showPremiumGate}
          isOpen={showPremiumGate}
          onOpenChange={(v: boolean) => setShowPremiumGate(!!v)}
          onClose={() => setShowPremiumGate(false)}
        />
      </div>

      {/* Floating action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 p-4 z-40 safe-area-pb">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3">
          <Link
            href="/supplements"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform-gpu border-2 border-primary/60 bg-white/8 backdrop-blur-md hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 hover:backdrop-blur-lg hover:border-primary/80 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg h-11 px-6 py-2.5 flex-1 min-h-[44px]"
          >
            <X className="h-4 w-4 mr-2" />
            Close
          </Link>
          <button
            type="button"
            onClick={() => router.push(`/journal?add=${encodeURIComponent(supplement.id)}`)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform-gpu bg-gradient-to-br from-primary/90 via-accent/70 to-primary/95 text-primary-foreground hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 active:scale-95 backdrop-blur-lg border border-white/20 shadow-xl h-11 px-6 py-2.5 flex-1 liquid-gradient min-h-[44px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Journal
          </button>
        </div>
      </div>
    </div>
  )
}
