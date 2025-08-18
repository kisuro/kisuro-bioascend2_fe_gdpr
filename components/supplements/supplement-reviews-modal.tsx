            ))}
          </div>

      </DialogContent>
    </Dialog>
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-morph border-white/20 max-w-4xl mx-4">
        <DialogHeader>
          <DialogTitle>Reviews for {supplement.name}</DialogTitle>
          <DialogDescription>
            {supplement.ratings.length} reviews • {averageRating.toFixed(1)} average rating
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="w-12 text-sm text-muted-foreground">{rating} stars</div>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-right text-muted-foreground">{count}</div>
              </div>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex justify-end gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>

          {/* Reviews List */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {sortedReviews.map((review) => (
              <div key={review.id} className="border-l-2 border-primary/20 pl-4 py-2">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <User className="h-3 w-3" />
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(review.score)}
                      {review.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(review.date)}</span>
                  </div>
                </div>
                {review.title && <h4 className="font-medium mb-1">{review.title}</h4>}
                {review.comment && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                )}
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
