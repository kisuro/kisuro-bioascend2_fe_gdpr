// app/supplements/[slug]/page.tsx
import { notFound } from "next/navigation";
import { SupplementDetailClient } from "./supplement-detail-client";

const API = process.env.NEXT_PUBLIC_API_URL!;

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
function normalizeRating(
  raw: any,
  reviewsCountFallback = 0
): { avg: number | null; count: number } | null {
  if (raw && typeof raw === "object" && ("avg" in raw || "count" in raw)) {
    return { avg: raw.avg ?? null, count: raw.count ?? 0 };
  }
  if (typeof raw === "number") {
    return { avg: raw, count: reviewsCountFallback };
  }
  return null;
}

// ---------- fetchers ----------
async function getSupplementFromAPI(slug: string): Promise<SupplementFromAPI | null> {
  const res = await fetch(`${API}/v1/supplements/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
async function getReviewsFromAPI(slug: string): Promise<Review[]> {
  const res = await fetch(`${API}/v1/reviews/${slug}`, { cache: "no-store" });
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

  const [apiSupp, reviews] = await Promise.all([
    getSupplementFromAPI(slug),
    getReviewsFromAPI(slug),
  ]);

  if (!apiSupp) notFound();

  // Точные массивы/строки
  const goals = toArray<string>(apiSupp.goals);
  const benefits = toArray<string>(apiSupp.benefits);
  const categories = toArray<string>(apiSupp.categories);
  const popular_manufacturer = toArray<string>(apiSupp.popular_manufacturer);
  const dosage = pickStr(apiSupp.dosage);
  const timing = pickStr(apiSupp.timing);

  // Рейтинг и счётчик
  const rating = normalizeRating(apiSupp.rating, reviews.length);
  const reviews_count =
    typeof apiSupp.reviews_count === "number" ? apiSupp.reviews_count : reviews.length;
  const rating_number = rating?.avg ?? null;

  // meta — приводим к ключам, которые ожидает UI
  const meta: Record<string, any> = {
    ...(apiSupp.meta ?? {}),
    // секция Primary Goals обычно смотрит на `meta.primary_goals`
    primary_goals: goals,
    // секция Benefits — на `meta.benefits`
    benefits,
    // секция Dosage & Timing — на оба ключа, встречаются оба варианта
    dosage,
    recommended_dosage: dosage,
    timing,
    // часто теги и категории читаются из meta
    categories,
    popular_manufacturer,
  };

  // Итоговый объект — оставляем и верхний уровень, и meta
  const supplement = {
    id: apiSupp.id,
    name: apiSupp.name,
    summary: pickStr(apiSupp.summary),
    evidence_level: pickStr(apiSupp.evidence_level),
    dosage,
    timing,
    goals,
    benefits,
    categories,
    popular_manufacturer,
    meta,
    rating,
    reviews_count,
    rating_number,
  };

  return <SupplementDetailClient supplement={supplement as any} reviews={reviews} />;
}
