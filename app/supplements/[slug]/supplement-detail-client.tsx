"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Star,
  Users,
  Info,
  ArrowLeft,
  BookOpen,
  Zap,
  Shield,
  Plus,
  X,
  MessageSquare,
  Calendar,
  User,
} from "lucide-react"
import Link from "next/link"
import { useUser } from "@/lib/hooks/use-user"
import { reviewsStore } from "@/lib/stores/reviews-store"
import { StarRatingPicker } from "@/components/supplements/star-rating-picker"
import { ReviewModal } from "@/components/supplements/review-modal"
import { PremiumGateModal } from "@/components/supplements/premium-gate-modal"

interface Review {
  id: string
  slug: string
  rating: number
  title: string
  body: string
  verified_purchase: boolean
  created_at: string
}

interface SupplementDetailClientProps {
  supplement: {
    id: string
    name: string
    summary: string
    evidence_level: string
    goals: string[]
    categories: string[]
    timing: string
    dosage: string
    cycle: string
    benefits: string[]
    popular_manufacturer: string[]
    rating: number | null
    reviews_count: number
    reviews: Review[]
  }
}

export function SupplementDetailClient({ supplement: initialSupplement }: SupplementDetailClientProps) {
  const [supplement, setSupplement] = useState(initialSupplement)
  const [allReviews, setAllReviews] = useState<Review[]>([])
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showPremiumGate, setShowPremiumGate] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [isLoadingReviews, setIsLoadingReviews] = useState(true)

  const user = useUser()
  const { toast } = useToast()

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoadingReviews(true)
        const response = await fetch("/seed/reviews.json")
        if (!response.ok) {
          console.warn("Reviews file not found or invalid, continuing without reviews")
          setAllReviews([])
          return
        }

        const reviewsData = await response.json()
        const supplementReviews = reviewsData[supplement.id]

        if (supplementReviews && supplementReviews.items) {
          // Sort newest first
          const sortedReviews = supplementReviews.items.sort(
            (a: Review, b: Review) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
          )
          setAllReviews(sortedReviews)

          // Update supplement with calculated rating
          if (sortedReviews.length > 0) {
            const totalRating = sortedReviews.reduce((sum: number, review: Review) => sum + review.rating, 0)
            const avgRating = totalRating / sortedReviews.length
            setSupplement((prev) => ({
              ...prev,
              rating: avgRating,
              reviews_count: sortedReviews.length,
            }))
          }
        } else {
          setAllReviews([])
        }
      } catch (error) {
        console.warn("Error loading reviews:", error)
        setAllReviews([])
      } finally {
        setIsLoadingReviews(false)
      }
    }

    loadReviews()
  }, [supplement.id])

  const hasRating = supplement.rating !== null && supplement.reviews_count > 0

  const handleRatingClick = () => {
    console.log("[v0] Rating clicked, user status:", user.status)
    if (user.status !== "premium") {
      setShowPremiumGate(true)
    }
    // For premium users, the StarRatingPicker will handle the popover
  }

  const handleAddReviewClick = () => {
    console.log("[v0] Add review clicked, user status:", user.status)
    if (user.status !== "premium") {
      setShowPremiumGate(true)
      return
    }
    setShowReviewModal(true)
  }

  const handleRatingSubmit = async (rating: number) => {
    console.log("[v0] Rating submitted:", rating)
    try {
      const result = await reviewsStore.submit(supplement.id, {
        rating,
        title: "",
        body: "",
        slug: supplement.id,
        verified_purchase: false,
      })

      console.log("[v0] Rating submission result:", result)

      // Update UI optimistically
      setSupplement((prev) => ({
        ...prev,
        rating: result.rating,
        reviews_count: result.reviews_count,
      }))

      // Reload reviews
      const userReviews = await reviewsStore.list(supplement.id)
      const mergedReviews = [...userReviews, ...initialSupplement.reviews].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      setAllReviews(mergedReviews)

      toast({
        title: "Thanks for your feedback!",
        description: "Your rating has been submitted.",
      })
    } catch (error) {
      console.error("[v0] Rating submission error:", error)
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReviewSubmit = async (data: { rating: number; title: string; body: string }) => {
    try {
      const result = await reviewsStore.submit(supplement.id, {
        ...data,
        slug: supplement.id,
        verified_purchase: false,
      })

      console.log("[v0] Review submission result:", result)

      // Update UI optimistically
      setSupplement((prev) => ({
        ...prev,
        rating: result.rating,
        reviews_count: result.reviews_count,
      }))

      // Reload reviews
      const userReviews = await reviewsStore.list(supplement.id)
      const mergedReviews = [...userReviews, ...initialSupplement.reviews].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      setAllReviews(mergedReviews)

      toast({
        title: "Thanks for your feedback!",
        description: "Your review has been submitted.",
      })
    } catch (error) {
      console.error("[v0] Review submission error:", error)
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getEvidenceLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "strong":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "moderate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "limited":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LiquidButton variant="ghost" asChild>
            <Link href="/supplements">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Supplements
            </Link>
          </LiquidButton>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <GlassCard className="glass-strong p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {supplement.categories.map((category: string) => (
                    <Badge key={category} variant="outline" className="glass-subtle">
                      {category}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">{supplement.name}</h1>
                <p className="text-xl text-muted-foreground mb-6">{supplement.summary}</p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  {hasRating ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      {user.status === "premium" ? (
                        <StarRatingPicker
                          currentRating={userRating}
                          onSubmit={handleRatingSubmit}
                          onCancel={() => {}}
                          trigger={
                            <button className="flex items-center gap-2 hover:bg-white/5 p-1 rounded transition-colors">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-5 w-5 ${
                                      star <= (supplement.rating || 0)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-semibold text-lg">{supplement.rating?.toFixed(1)}</span>
                              <span className="text-muted-foreground whitespace-nowrap">
                                ({supplement.reviews_count} reviews)
                              </span>
                            </button>
                          }
                        />
                      ) : (
                        <button
                          className="flex items-center gap-2 hover:bg-white/5 p-1 rounded transition-colors"
                          onClick={handleRatingClick}
                        >
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= (supplement.rating || 0)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-lg">{supplement.rating?.toFixed(1)}</span>
                          <span className="text-muted-foreground whitespace-nowrap">
                            ({supplement.reviews_count} reviews)
                          </span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      onClick={handleRatingClick}
                    >
                      No ratings yet - be the first!
                    </button>
                  )}

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="whitespace-nowrap">{supplement.reviews_count} users</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <GlassCard className="glass-morph p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold font-heading">Primary Goals</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {supplement.goals.map((goal: string) => (
                    <Badge key={goal} className="glass-subtle">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard className="glass-morph p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold font-heading">Benefits</h2>
                </div>
                <ul className="space-y-2">
                  {supplement.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>

            {/* Dosage & Timing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <GlassCard className="glass-morph p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold font-heading">Dosage & Timing</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Recommended Dosage</h3>
                    <p className="text-muted-foreground">{supplement.dosage}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Timing</h3>
                    <p className="text-muted-foreground capitalize">{supplement.timing}</p>
                  </div>
                  {supplement.cycle && (
                    <div>
                      <h3 className="font-medium mb-2">Cycling</h3>
                      <p className="text-muted-foreground">{supplement.cycle}</p>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GlassCard className="glass-morph p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold font-heading">Reviews</h2>
                    {hasRating && (
                      <Badge variant="outline" className="ml-2">
                        {supplement.reviews_count} reviews
                      </Badge>
                    )}
                  </div>
                  <LiquidButton size="sm" onClick={handleAddReviewClick} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Review
                  </LiquidButton>
                </div>

                {isLoadingReviews ? (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground">Loading reviews...</div>
                  </div>
                ) : allReviews.length > 0 ? (
                  <div className="space-y-4">
                    {allReviews.map((review) => (
                      <div key={review.id} className="border-l-2 border-primary/20 pl-4 py-2">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                              <User className="h-3 w-3" />
                            </div>
                            <div className="flex items-center gap-2">
                              {renderStars(review.rating)}
                              {review.verified_purchase && (
                                <Badge variant="outline" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(review.created_at)}</span>
                          </div>
                        </div>
                        {review.title && <h4 className="font-medium mb-1">{review.title}</h4>}
                        {review.body && <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>}
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
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Evidence Level */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <GlassCard className="glass-morph p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Evidence Level</h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`border ${getEvidenceLevelColor(supplement.evidence_level)}`}>
                    {supplement.evidence_level}
                  </Badge>
                </div>
              </GlassCard>
            </motion.div>

            {/* Popular Manufacturers - only show if array is non-empty */}
            {supplement.popular_manufacturer.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <GlassCard className="glass-morph p-6">
                  <h3 className="font-semibold mb-3">Popular Manufacturers</h3>
                  <div className="flex flex-wrap gap-2">
                    {supplement.popular_manufacturer.map((manufacturer) => (
                      <Badge key={manufacturer} variant="outline" className="glass-subtle text-xs">
                        {manufacturer}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>
        </div>

        {/* Fixed bottom bar */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 p-4 z-40 safe-area-pb"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3">
            <LiquidButton variant="outline" className="flex-1 min-h-[44px]" asChild>
              <Link href="/supplements">
                <X className="h-4 w-4 mr-2" />
                Close
              </Link>
            </LiquidButton>
            <LiquidButton className="flex-1 liquid-gradient min-h-[44px]">
              <Plus className="h-4 w-4 mr-2" />
              Add to Journal
            </LiquidButton>
          </div>
        </motion.div>

        <div className="h-24" />
      </div>

      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
        initialRating={userRating}
      />

      <PremiumGateModal isOpen={showPremiumGate} onClose={() => setShowPremiumGate(false)} />
    </div>
  )
}
