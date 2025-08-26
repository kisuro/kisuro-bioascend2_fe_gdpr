"use client"

import { useEffect, useMemo, useState } from "react";
import { Star, Users, Calendar, User } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/lib/hooks/use-user";
import { StarRatingPicker } from "@/components/supplements/star-rating-picker";
import { ReviewModal } from "@/components/supplements/review-modal";
import { PremiumGateModal } from "@/components/supplements/premium-gate-modal";

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
const TOKEN = process.env.NEXT_PUBLIC_PREMIUM_TOKEN || "";

// --- Types ---------------------------------------------------------------
interface Review {
  id: string;
  slug: string;
  rating: number;
  title: string;
  body: string;
  verified_purchase: boolean;
  created_at: string;
}

// `rating` может приходить числом или объектом {avg,count}
export type RatingShape = number | { avg: number | null; count: number } | null;

interface SupplementDTO {
  id: string;
  name: string;
  summary?: string;
  evidence_level?: string;
  goals?: string[];
  categories?: string[];
  timing?: string;
  dosage?: string;
  cycle?: string;
  benefits?: string[];
  popular_manufacturer?: string[] | string;
  rating: RatingShape;
  reviews_count?: number;
  reviews?: Review[];
}

interface Props { supplement: SupplementDTO }

// --- Helpers ------------------------------------------------------------
function toArray<T>(v: T | T[] | undefined): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function ratingAvg(r: RatingShape): number | null {
  if (r == null) return null;
  if (typeof r === "number") return r;
  return r.avg ?? null;
}

// --- Component ----------------------------------------------------------
export function SupplementDetailClient({ supplement: initial }: Props) {
  // нормализуем вход
  const normalized: SupplementDTO & {
    popular_manufacturer: string[];
    goals: string[];
    categories: string[];
    benefits: string[];
    reviews: Review[];
  } = {
    ...initial,
    goals: toArray(initial.goals),
    categories: toArray(initial.categories),
    benefits: toArray(initial.benefits),
    popular_manufacturer: toArray(initial.popular_manufacturer as any),
    reviews: Array.isArray(initial.reviews) ? initial.reviews : [],
  };

  const [supplement, setSupplement] = useState(normalized);
  const [allReviews, setAllReviews] = useState<Review[]>(normalized.reviews);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [showRatingPicker, setShowRatingPicker] = useState(false);

  const { toast } = useToast();
  const user = useUser();
  const isPremium = !!(user?.isPremium || user?.status === "premium" || (TOKEN && TOKEN.length > 0));

  // === КЛИК ПО ЗВЁЗДАМ ==================================================
  const handleRatingClick = () => {
    console.log('[UI] star click', { isPremium });
    if (!isPremium) {
      console.log('[UI] opening PremiumGateModal');
      setShowPremiumGate(true);
      return;
    }
    console.log('[UI] opening StarRatingPicker');
    setShowRatingPicker(true);
  };

  // если пропсы обновились – синхронизируем
  useEffect(() => {
    setSupplement(normalized);
    // Не трогаем allReviews здесь, чтобы не затирать данные только что полученные с API
    setIsLoadingReviews(false);
  }, [initial]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (showRatingPicker) {
      console.log('[UI] StarRatingPicker isOpen -> true');
    } else {
      console.log('[UI] StarRatingPicker isOpen -> false');
    }
  }, [showRatingPicker]);

  // always refresh from API on mount & when id changes
  useEffect(() => {
    refreshFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplement.id]);

  const avg = useMemo(() => ratingAvg(supplement.rating), [supplement.rating]);
  const cnt = useMemo(() => {
    if (supplement.rating && typeof supplement.rating === "object" && "count" in supplement.rating) {
      return supplement.rating.count ?? supplement.reviews_count ?? 0;
    }
    return supplement.reviews_count ?? 0;
  }, [supplement.rating, supplement.reviews_count]);

  const hasRating = avg != null && cnt > 0;
  const currentDisplayRating = Math.max(0, Math.min(5, Math.round(avg ?? 0)));

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const renderStars = (value: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
        />
      ))}
    </div>
  );

  // --- API helpers -------------------------------------------------------
  const mapApiReviewToUI = (r: any): Review => ({
    id: r.id,
    slug: supplement.id,
    rating: r.rating,
    title: "", // у нас на бэке нет title — оставляем пустым
    body: r.comment || "",
    verified_purchase: false,
    created_at: r.created_at,
  });

  const refreshFromAPI = async () => {
    try {
      setIsLoadingReviews(true);
      const [aggRes, revRes] = await Promise.all([
        fetch(`${API}/v1/ratings/${supplement.id}/aggregate`, {
          headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
          cache: "no-store",
        }),
        fetch(`${API}/v1/reviews/${supplement.id}`, {
          cache: "no-store",
          headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
        }),
      ]);

      let nextCountFromAgg: number | undefined;
      if (aggRes.ok) {
        const agg = await aggRes.json();
        const nextRating = agg?.rating ?? null;
        nextCountFromAgg = (typeof nextRating === "object" && nextRating?.count) || undefined;
        setSupplement((prev) => ({
          ...prev,
          rating: nextRating,
          reviews_count: nextCountFromAgg ?? prev.reviews_count ?? 0,
        }));
      }

      if (revRes.ok) {
        const items = await revRes.json();
        const mapped = Array.isArray(items) ? items.map(mapApiReviewToUI) : [];
        setAllReviews(mapped);
        // если агрегат ничего не вернул по count — подстрахуемся длиной отзывов
        if (!(nextCountFromAgg ?? 0)) {
          setSupplement((prev) => ({
            ...prev,
            reviews_count: mapped.length,
            rating: typeof prev.rating === 'number' || prev.rating == null
              ? prev.rating
              : { ...prev.rating, count: mapped.length },
          }));
        }
      }
    } catch (e) {
      // swallow errors
    } finally {
      setIsLoadingReviews(false);
    }
  };

  // ------ Review actions ------------------------------------------------
  const handleAddReviewClick = () => {
    console.log('[UI] add review click');
    if (!isPremium) return setShowPremiumGate(true);
    setShowReviewModal(true);
  };

  const resolveUsername = () =>
    user?.name ||
    (user as any)?.username ||
    (user as any)?.email?.split("@")?.[0] ||
    "anonymous";

  // Отправка полноценного отзыва (звёзды + текст)
  const handleReviewSubmit = async (data: any) => {
    try {
      // поддерживаем разные поля из модалки: body/title/comment/text
      const comment: string = (data?.body ?? data?.title ?? data?.comment ?? data?.text ?? "").toString();
      const rating: number = Number(data?.rating ?? userRating ?? 0) || 0;
      const username = resolveUsername();

      const optimistic: Review = {
        id: (globalThis as any).crypto?.randomUUID?.() || `${Date.now()}`,
        slug: supplement.id,
        rating,
        title: data?.title || "",
        body: comment,
        verified_purchase: false,
        created_at: new Date().toISOString(),
      };

      // оптимистично покажем отзыв
      setAllReviews((prev) => [optimistic, ...prev]);

      const payload = { user: username, rating, comment };
      const res = await fetch(`${API}/v1/reviews/${supplement.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        // откат оптимистичного элемента
        setAllReviews((prev) => prev.filter((r) => r.id !== optimistic.id));
        throw new Error(j?.detail || `HTTP ${res.status}`);
      }

      await refreshFromAPI();
      setUserRating(rating);
      setShowReviewModal(false);
      toast({ title: "Thanks for your feedback!", description: "Your review has been submitted." });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message || "Failed to submit review.",
        variant: "destructive",
      });
    }
  };

  // Быстрая отправка рейтинга (через звездочки)
  const handleQuickRatingSubmit = async (rating: number) => {
    try {
      const payload = { user: resolveUsername(), rating, comment: "" };
      const res = await fetch(`${API}/v1/reviews/${supplement.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.detail || `HTTP ${res.status}`);
      }

      await refreshFromAPI();
      setUserRating(rating);
      setShowRatingPicker(false);
      toast({ title: "Thanks!", description: "Your rating has been saved." });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message || "Failed to submit rating.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header / rating row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard
            className="col-span-2 flex items-center justify-between p-4 cursor-pointer"
            onClick={handleRatingClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleRatingClick()}
          >
            {hasRating ? (
              <StarRatingPicker
                currentRating={currentDisplayRating}
                onSubmit={handleQuickRatingSubmit}
                onCancel={() => setShowRatingPicker(false)}
                trigger={
                  <div className="flex items-center gap-3">
                    {renderStars(Math.round(avg!))}
                    <span className="text-sm font-semibold">{avg!.toFixed(1)}</span>
                  </div>
                }
                open={showRatingPicker}
                onOpenChange={setShowRatingPicker}
              />
            ) : (
              <div className="text-sm text-muted-foreground">
                No ratings yet – be the first!
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="whitespace-nowrap">{cnt} users</span>
            </div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-sm font-medium mb-2">Evidence Level</div>
            <div className="flex gap-2">
              {supplement.evidence_level ? (
                <Badge variant="outline">{supplement.evidence_level}</Badge>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Primary Goals */}
        <GlassCard className="p-4">
          <div className="text-lg font-semibold mb-3">Primary Goals</div>
          {supplement.goals.length ? (
            <div className="flex flex-wrap gap-2">
              {supplement.goals.map((g) => (
                <Badge key={g} variant="secondary">{g}</Badge>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground">—</div>
          )}
        </GlassCard>

        {/* Benefits */}
        <GlassCard className="p-4">
          <div className="text-lg font-semibold mb-3">Benefits</div>
          {supplement.benefits.length ? (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {supplement.benefits.map((b, i) => (
                <li key={`${b}-${i}`}>{b}</li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground">—</div>
          )}
        </GlassCard>

        {/* Dosage & Timing */}
        <GlassCard className="p-4">
          <div className="text-lg font-semibold mb-3">Dosage &amp; Timing</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Recommended Dosage</div>
              <div>{supplement.dosage || "—"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Timing</div>
              <div>{supplement.timing || "—"}</div>
            </div>
          </div>
        </GlassCard>

        {/* Reviews */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-semibold">Reviews</div>
            <button className="text-sm underline" onClick={handleAddReviewClick}>
              Add review
            </button>
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

        {/* Always mount modals so portals exist; control visibility via `open` */}
        <ReviewModal
          open={showReviewModal}
          isOpen={showReviewModal}
          onOpenChange={(v: boolean) => setShowReviewModal(!!v)}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
          initialRating={userRating}
        />

        <PremiumGateModal
          open={showPremiumGate}
          isOpen={showPremiumGate}
          onOpenChange={(v: boolean) => setShowPremiumGate(!!v)}
          onClose={() => setShowPremiumGate(false)}
        />

      </div>
    </div>
  );
}