"use client"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface SupplementRatingProps {
  supplementId: string
}

export function SupplementRating({ supplementId }: SupplementRatingProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)

    // Reset form
    setRating(0)
    setReview("")
  }

  return (
    <GlassCard className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
      <h3 className="font-semibold mb-4">Rate This Supplement</h3>

      <div className="space-y-4">
        {/* Star Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="p-1 transition-colors"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground hover:text-yellow-400"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Review Text */}
        <Textarea
          placeholder="Share your experience with this supplement..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="backdrop-blur-md bg-white/5 border-white/20"
          rows={3}
        />

        {/* Submit Button */}
        <LiquidButton onClick={handleSubmit} disabled={rating === 0 || isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Rating"}
        </LiquidButton>
      </div>
    </GlassCard>
  )
}
