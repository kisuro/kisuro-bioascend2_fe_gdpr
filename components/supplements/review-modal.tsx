"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { LiquidButton } from "@/components/ui/liquid-button"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { rating: number; title: string; body: string }) => void
  initialRating?: number
  initialTitle?: string
  initialBody?: string
  mode?: "add" | "edit"
}

export function ReviewModal({ isOpen, onClose, onSubmit, initialRating = 0, initialTitle = "", initialBody = "", mode = "add" }: ReviewModalProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Keep form state in sync with incoming props whenever the modal is opened
  // or the initial values change (e.g., moderator selects a different review).
  useEffect(() => {
    if (isOpen) {
      setRating(initialRating || 0)
      setTitle(initialTitle || "")
      setBody(initialBody || "")
      setHoverRating(0)
    }
  }, [isOpen, initialRating, initialTitle, initialBody])

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)
    try {
      await onSubmit({ rating, title, body })
      // Reset form
      setRating(0)
      setTitle("")
      setBody("")
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setRating(initialRating || 0)
    setTitle(initialTitle || "")
    setBody(initialBody || "")
    onClose()
  }

  const titleError = title.length > 80
  const bodyError = body.length > 600
  const canSubmit = rating > 0 && !titleError && !bodyError

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-transparent border-none shadow-none !max-w-[calc(100vw-2rem)] !w-[calc(100vw-2rem)] sm:mx-4 sm:!max-w-md sm:!w-auto p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{mode === "edit" ? "Edit Review" : "Add Review"}</DialogTitle>
          <DialogDescription>
            Share your experience with this supplement to help others make informed decisions.
          </DialogDescription>
        </DialogHeader>

        <GlassCard
          variant="strong"
          animate
          className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-2xl bg-white/15 dark:bg-white/10 border-2 border-white/30 dark:border-white/20 shadow-2xl max-w-full"
        >
          <div className="space-y-4">
            {/* Visible header inside card for accessibility and style */}
            <div className="space-y-1 text-center">
              <h2 className="text-lg sm:text-xl font-bold">
                {mode === "edit" ? "Edit Review" : "Add Review"}
              </h2>
              <p className="text-xs sm:text-sm text-foreground/70">
                Share your experience with this supplement to help others make informed decisions.
              </p>
            </div>

            {/* Star Rating */}
            <div className="space-y-2">
              <Label>Rating *</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="p-1.5 transition-colors rounded-full hover:bg-white/10"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    type="button"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`h-6 w-6 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground hover:text-yellow-400"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title (optional)</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief summary of your experience"
                className="border-white/20"
                maxLength={80}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{titleError && "Title too long"}</span>
                <span>{title.length}/80</span>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-2">
              <Label htmlFor="body">Review (optional)</Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your experience with this supplement. Keep it factual and helpful for others."
                className="border-white/20 min-h-[100px]"
                maxLength={600}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{bodyError && "Review too long"}</span>
                <span>{body.length}/600</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <LiquidButton
                variant="outline"
                onClick={handleClose}
                className="flex-1 bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/40 backdrop-blur-sm text-foreground/80 hover:text-foreground transition-all duration-300 text-sm sm:text-base py-2 sm:py-2.5"
                disabled={isSubmitting}
              >
                Cancel
              </LiquidButton>
              <LiquidButton
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className="flex-1 text-sm sm:text-base py-2 sm:py-2.5"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </LiquidButton>
            </div>
          </div>
        </GlassCard>
      </DialogContent>
    </Dialog>
  )
}
