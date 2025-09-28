// app/supplements/[slug]/page.tsx
import { notFound } from "next/navigation";
import { SupplementDetailClient } from "./supplement-detail-client";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

type Rating = number | { avg: number | null; count: number } | null;

type SupplementFromAPI = {
  id: string;
  name: string;
  summary?: string | null;
  evidence_level?: string | null;
  dosage?: string | null;
  timing?: string | null;
  goals?: string[] | null;
  benefits?: string[] | null;
  categories?: string[] | null;
  popular_manufacturer?: string[] | string | null;
  rating?: Rating;
  reviews_count?: number | null;
  meta?: Record<string, any> | null;
  // Allow variants sometimes returned by API
  popular_manufacturers?: string[] | string | null;
  interactions?: any;
  contraindications?: string[] | null;
  side_effects?: string[] | null;
};

type Review = {
  id: string;
  user: string;
  rating: number;
  comment: string;
  created_at: string;
};

// ---------- helpers ----------
function toArray<T = string>(x: any): T[] {
  if (!x) return [];
  return Array.isArray(x) ? x : [x];
}
function pickStr(x: any): string | undefined {
  return typeof x === "string" && x.trim() ? x : undefined;
}
function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
function normalizeRating(
  raw: any,
  reviewsCountFallback = 0
): { avg: number | null; count: number } | null {
  if (raw && typeof raw === "object" && ("avg" in raw || "count" in raw)) {
    return { avg: (raw as any).avg ?? null, count: (raw as any).count ?? 0 };
  }
  if (typeof raw === "number") {
    return { avg: raw, count: reviewsCountFallback };
  }
  return null;
}

// Map various interaction key variants into UI-friendly shape
function deriveInteractions(src: any): { synergy: string[]; caution: string[]; avoid: string[] } | undefined {
  if (!src) return undefined;

  // Если это массив строк (как в вашем примере), считаем их предупреждениями
  if (Array.isArray(src)) {
    return {
      synergy: [],
      caution: [],
      avoid: src.filter(item => typeof item === 'string')
    };
  }

  const m = (key: string) => toArray<string>(src[key]);
  // direct UI shape
  let synergy: string[] = m("synergy");
  let caution: string[] = m("caution");
  let avoid: string[] = m("avoid");
  // common variants
  synergy = uniq([...synergy, ...m("synergizes_with"), ...m("synergy_with"), ...m("combine_with")]);
  avoid = uniq([...avoid, ...m("avoid_with"), ...m("do_not_combine"), ...m("contraindicated_with")]);
  caution = uniq([...caution, ...m("caution_with"), ...m("use_with_caution")]);

  if (synergy.length || caution.length || avoid.length) {
    return { synergy, caution, avoid };
  }
  return undefined;
}

// ---------- fetchers ----------
async function getSupplementFromAPI(slug: string): Promise<SupplementFromAPI | null> {
  const res = await fetch(`${API_BASE}/v1/supplements/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
async function getReviewsFromAPI(slug: string): Promise<Review[]> {
  const res = await fetch(`${API_BASE}/v1/reviews/${slug}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

// ---------- page ----------
export default async function SupplementDetailPage({
  params,
}: {
  // Next 15: params — async
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if review feature is enabled
  const reviewFeatureEnabled = process.env.NEXT_PUBLIC_REVIEW_FEATURE?.toLowerCase() === 'true'

  const [apiSupp, reviews] = await Promise.all([
    getSupplementFromAPI(slug),
    // Only fetch reviews if feature is enabled
    reviewFeatureEnabled ? getReviewsFromAPI(slug) : Promise.resolve([]),
  ]);

  if (!apiSupp) notFound();

  // Arrays/strings
  const goals = toArray<string>(apiSupp.goals);
  const benefits = toArray<string>(apiSupp.benefits);
  const categories = toArray<string>(apiSupp.categories);

  // Dosage: check both top-level and meta with multiple variants
  const dosage = pickStr(apiSupp.dosage) ||
                 pickStr(apiSupp.meta?.dosage) ||
                 pickStr(apiSupp.meta?.recommended_dosage) ||
                 pickStr(apiSupp.meta?.dose) ||
                 "50-100 mg daily"; // временное тестовое значение

  // Timing: check both top-level and meta
  const timing = pickStr(apiSupp.timing) || pickStr(apiSupp.meta?.timing);

  // Cycling: check meta for cycling or cycle
  const cycling = pickStr(apiSupp.meta?.cycling) || pickStr(apiSupp.meta?.cycle);

  // Debug logging - временное логирование для проверки данных
  console.log('DEBUG - Raw API response:', apiSupp);
  console.log('DEBUG - Raw meta data:', apiSupp.meta);
  console.log('DEBUG - Top-level dosage:', apiSupp.dosage);
  console.log('DEBUG - Meta dosage:', apiSupp.meta?.dosage);
  console.log('DEBUG - Meta timing:', apiSupp.meta?.timing);
  console.log('DEBUG - Meta cycling:', apiSupp.meta?.cycling);
  console.log('DEBUG - Extracted dosage:', dosage);
  console.log('DEBUG - Extracted timing:', timing);
  console.log('DEBUG - Extracted cycling:', cycling);
  console.log('DEBUG - Final supplement object dosage:', dosage);
  console.log('DEBUG - Final supplement object cycling:', cycling);

  // Manufacturers: merge singular/plural + meta variants
  const manufacturers = uniq([
    ...toArray<string>(apiSupp.popular_manufacturer),
    ...toArray<string>((apiSupp as any).popular_manufacturers),
    ...toArray<string>(apiSupp.meta?.popular_manufacturer),
    ...toArray<string>(apiSupp.meta?.popular_manufacturers),
  ]);

  // Side effects / Contraindications (top-level or inside meta)
  const side_effects = uniq([
    ...toArray<string>(apiSupp.side_effects),
    ...toArray<string>(apiSupp.meta?.side_effects),
  ]);
  const contraindications = uniq([
    ...toArray<string>(apiSupp.contraindications),
    ...toArray<string>(apiSupp.meta?.contraindications),
  ]);

  // Interactions can be nested or top-level
  const interactions =
    deriveInteractions((apiSupp as any).interactions) ||
    deriveInteractions(apiSupp.meta?.interactions) ||
    undefined;

  // Rating and counts
  const rating = normalizeRating(apiSupp.rating, reviewFeatureEnabled ? reviews.length : 0);
  const reviews_count = reviewFeatureEnabled 
    ? (typeof apiSupp.reviews_count === "number" ? apiSupp.reviews_count : reviews.length)
    : 0;

  // meta — enrich with keys UI expects
  const meta: Record<string, any> = {
    ...(apiSupp.meta ?? {}),
    primary_goals: goals,
    benefits,
    dosage,
    recommended_dosage: dosage,
    timing,
    cycling,
    categories,
    popular_manufacturer: manufacturers,
    popular_manufacturers: manufacturers,
    side_effects,
    contraindications,
    interactions,
  };

  // Final object to client
  const supplement = {
    id: apiSupp.id,
    name: apiSupp.name,
    summary: pickStr(apiSupp.summary),
    evidence_level: pickStr(apiSupp.evidence_level),
    dosage,
    timing,
    cycling, // добавляем cycling
    goals,
    benefits,
    categories,
    popular_manufacturer: manufacturers,
    side_effects,
    contraindications,
    interactions,
    meta,
    rating,
    reviews_count,
  } as any;
  // The client component fetches reviews itself; don't pass server-fetched reviews to avoid type mismatch
  return <SupplementDetailClient supplement={supplement as any} />;
}
