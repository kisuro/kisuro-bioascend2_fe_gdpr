"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { LiquidButton } from "@/components/ui/liquid-button"
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
    setRating(initialRating)
    setTitle(initialTitle)
    setBody(initialBody)
    onClose()
  }

  const titleError = title.length > 80
  const bodyError = body.length > 600
  const canSubmit = rating > 0 && !titleError && !bodyError

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass-morph border-white/20 !max-w-[calc(100vw-2rem)] !w-[calc(100vw-2rem)] mx-4 sm:!max-w-md sm:!w-auto overflow-hidden">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Review" : "Add Review"}</DialogTitle>
          <DialogDescription>
            Share your experience with this supplement to help others make informed decisions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
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
              className="glass-subtle border-white/20"
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
              className="glass-subtle border-white/20 min-h-[100px]"
              maxLength={600}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{bodyError && "Review too long"}</span>
              <span>{body.length}/600</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <LiquidButton variant="outline" onClick={handleClose} className="flex-1 text-sm sm:text-base py-2 sm:py-2.5" disabled={isSubmitting}>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <LiquidButton variant="outline" onClick={handleClose} className="flex-1 text-sm sm:text-base py-2 sm:py-2.5" disabled={isSubmitting}>
              Cancel
            </LiquidButton>
            <LiquidButton onClick={handleSubmit} disabled={!canSubmit || isSubmitting} className="flex-1 text-sm sm:text-base py-2 sm:py-2.5">
            <LiquidButton onClick={handleSubmit} disabled={!canSubmit || isSubmitting} className="flex-1 text-sm sm:text-base py-2 sm:py-2.5">
              {isSubmitting ? "Submitting..." : "Submit"}
            </LiquidButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
