"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Badge } from "@/components/ui/badge"
import { X, Star, User, Calendar, ThumbsUp } from "lucide-react"
import type { Supplement } from "@/lib/data/supplements"

interface SupplementReviewsModalProps {
  supplement: Supplement
  isOpen: boolean
  onClose: () => void
}

export function SupplementReviewsModal({ supplement, isOpen, onClose }: SupplementReviewsModalProps) {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest" | "lowest">("newest")

  const averageRating = supplement.ratings.reduce((sum, rating) => sum + rating.score, 0) / supplement.ratings.length

  const sortedReviews = [...supplement.ratings].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "highest":
        return b.score - a.score
      case "lowest":
        return a.score - b.score
      default:
        return 0
    }
  })

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: supplement.ratings.filter((r) => r.score === rating).length,
    percentage: (supplement.ratings.filter((r) => r.score === rating).length / supplement.ratings.length) * 100,
  }))

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
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="modal-content max-w-4xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="glass-strong p-6 overflow-y-auto max-h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{supplement.name} Reviews</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(Math.round(averageRating))}</div>
                      <span className="text-xl font-semibold">{averageRating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({supplement.ratings.length} reviews)</span>
                    </div>
                  </div>
                </div>
                <LiquidButton
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="relative z-10 min-w-[2.5rem] min-h-[2.5rem] flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close reviews dialog</span>
                </LiquidButton>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Rating Distribution */}
                <div className="lg:col-span-1">
                  <GlassCard className="glass-subtle p-4">
                    <h3 className="font-semibold mb-4">Rating Distribution</h3>
                    <div className="space-y-2">
                      {ratingDistribution.map(({ rating, count, percentage }) => (
                        <div key={rating} className="flex items-center gap-2 text-sm">
                          <span className="w-8 flex-shrink-0">{rating}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                          <div className="flex-1 bg-muted rounded-full h-2 min-w-0">
                            <div
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="w-8 text-muted-foreground flex-shrink-0">{count}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Sort Controls */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full p-2 rounded-lg glass-subtle border border-border/50 bg-background/50"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest">Highest Rating</option>
                      <option value="lowest">Lowest Rating</option>
                    </select>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-4">
                  {sortedReviews.map((review, index) => (
                    <motion.div
                      key={`${review.userId}-${review.date}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <GlassCard className="glass-subtle p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium">User {review.userId.slice(-3)}</span>
                                <Badge variant="outline" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3 flex-shrink-0" />
                                <span>{formatDate(review.date)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-start sm:justify-end">
                            {renderStars(review.score)}
                          </div>
                        </div>

                        {review.comment && (
                          <div className="mb-3">
                            <p className="text-sm leading-relaxed">{review.comment}</p>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                              <ThumbsUp className="h-3 w-3 flex-shrink-0" />
                              <span>Helpful ({Math.floor(Math.random() * 10) + 1})</span>
                            </button>
                          </div>
                          <span className="text-right">
                            Reviewed after {Math.floor(Math.random() * 90) + 30} days of use
                          </span>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}

                  {supplement.ratings.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📝</div>
                      <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                      <p className="text-muted-foreground">Be the first to review this supplement!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Reviews are from verified customers who have purchased this supplement
                </p>
                <LiquidButton onClick={onClose}>Back to Supplements</LiquidButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
