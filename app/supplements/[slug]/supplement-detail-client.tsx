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
import { reviewsStore } from "@/lib/stores/reviews-store";

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
  const normalized: SupplementDTO & { popular_manufacturer: string[]; goals: string[]; categories: string[]; benefits: string[]; reviews: Review[]; } = {
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

  const { toast } = useToast();
const user = useUser()
const isPremium = !!(user?.isPremium || user?.status === "premium")

const handleRatingClick = () => {
  if (!isPremium) {
    setShowPremiumGate(true)
    return
  }
  // (опционально) открыть пикер рейтинга, если он у тебя есть:
  // setShowRatingPicker(true)
}

  // если пропсы обновились – синхронизируем
  useEffect(() => {
    setSupplement(normalized);
    setAllReviews(normalized.reviews);
    setIsLoadingReviews(false);
  }, [initial]);

  const avg = useMemo(() => ratingAvg(supplement.rating), [supplement.rating]);
  const cnt = useMemo(() => {
    if (supplement.rating && typeof supplement.rating === "object" && "count" in supplement.rating) {
      return supplement.rating.count ?? supplement.reviews_count ?? 0;
    }
    return supplement.reviews_count ?? 0;
  }, [supplement.rating, supplement.reviews_count]);

  const hasRating = avg != null && cnt > 0;

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const renderStars = (value: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
      ))}
    </div>
  );

  // ------ Review actions ------------------------------------------------
  const handleAddReviewClick = () => {
    if (!user?.isPremium) return setShowPremiumGate(true);
    setShowReviewModal(true);
  };

  const handleReviewSubmit = async (data: { rating: number; title: string; body: string }) => {
    try {
      const result = await reviewsStore.submit(supplement.id, {
        ...data,
        slug: supplement.id,
        verified_purchase: false,
      });

      setSupplement((prev) => ({
        ...prev,
        rating: result.rating,
        reviews_count: result.reviews_count,
      }));

      const userReviews = await reviewsStore.list(supplement.id);
      const merged = [...userReviews, ...normalized.reviews].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setAllReviews(merged);
      toast({ title: "Thanks for your feedback!", description: "Your review has been submitted." });
    } catch (e) {
      toast({ title: "Error", description: "Failed to submit review.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header / rating row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard className="col-span-2 flex items-center justify-between p-4">
            {hasRating ? (
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleRatingClick}
              >
                {renderStars(Math.round(avg!))}
                <span className="text-sm font-semibold">{avg!.toFixed(1)}</span>
              </div>
            ) : (
              <div
                className="text-sm text-muted-foreground cursor-pointer"
                onClick={handleRatingClick}
              >
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
            <button className="text-sm underline" onClick={() => handleAddReviewClick()}>Add review</button>
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

        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
          initialRating={userRating}
        />
        <PremiumGateModal isOpen={showPremiumGate} onClose={() => setShowPremiumGate(false)} />
      </div>
    </div>
  );
}