"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { Star } from "lucide-react"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { GlassCard } from "@/components/ui/glass-card"

interface StarRatingPickerProps {
  currentRating?: number
  onSubmit: (rating: number) => void
  onCancel: () => void
  trigger: React.ReactNode

  /** Optional controlled open state (so parent can force-open the popover). */
  open?: boolean
  /** Optional controlled open change handler. */
  onOpenChange?: (open: boolean) => void
}

export function StarRatingPicker({
  currentRating = 0,
  onSubmit,
  onCancel,
  trigger,
  open,
  onOpenChange,
}: StarRatingPickerProps) {
  const [rating, setRating] = useState(currentRating)
  const [hoverRating, setHoverRating] = useState(0)

  // controlled / uncontrolled support
  const isControlled = typeof open === "boolean"
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = isControlled ? (open as boolean) : internalOpen

  // keep local rating in sync when dialog re-opens or currentRating changes
  useEffect(() => {
    setRating(currentRating)
  }, [currentRating, isOpen])

  const setOpen = useMemo(() => {
    return (next: boolean) => {
      if (isControlled) {
        onOpenChange?.(next)
      } else {
        setInternalOpen(next)
      }
      if (!next) {
        // reset transient UI state when closing
        setHoverRating(0)
      }
    }
  }, [isControlled, onOpenChange])

  const handleSubmit = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log("[v0] StarRatingPicker: Submitting rating:", rating)
    if (rating > 0) {
      onSubmit(rating)
      setOpen(false)
    }
  }

  const handleCancel = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log("[v0] StarRatingPicker: Cancelling rating")
    setRating(currentRating)
    setHoverRating(0)
    setOpen(false)
    onCancel()
  }

  const handleRatingClick = (star: number, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    console.log("[v0] StarRatingPicker: Rating clicked:", star)
    setRating(star)
  }

  const handleOpenChange = (openNext: boolean) => {
    console.log("[v0] StarRatingPicker: Open state changed:", openNext)
    setOpen(openNext)
  }

  const handleInteractOutside = (event: Event) => {
    // Prevent closing when clicking on the trigger or rating stars
    const target = event.target as Element
    if (target?.closest("[data-rating-trigger]") || target?.closest("[data-rating-star]")) {
      event.preventDefault()
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild data-rating-trigger>
        {/* The trigger must be a focusable/ref-forwarding element */}
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        className="w-[min(18rem,calc(100vw-2rem))] p-0 bg-transparent border-none shadow-none"
        align="center"
        sideOffset={8}
        onInteractOutside={handleInteractOutside}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <GlassCard
          variant="strong"
          animate
          className="space-y-4 p-5 sm:p-6 text-center rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-950/90 border-white/80 dark:border-white/30 backdrop-blur-2xl"
        >
          <h4 className="text-lg font-semibold text-foreground">
            Rate this supplement
          </h4>

          <div className="flex items-center gap-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="p-1.5 transition-colors rounded-full hover:bg-white/10"
                data-rating-star
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={(e) => handleRatingClick(star, e)}
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

          {rating > 0 && (
            <div className="text-center text-sm text-foreground/80">
              Selected: {rating} star{rating !== 1 ? "s" : ""}
            </div>
          )}

          <div className="flex gap-2">
            <LiquidButton
              variant="outline"
              className="flex-1 bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/40 backdrop-blur-sm text-foreground/80 hover:text-foreground transition-all duration-300"
              onClick={handleCancel}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
            >
              Cancel
            </LiquidButton>
            <LiquidButton
              className="flex-1"
              onClick={handleSubmit}
              disabled={rating === 0}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
            >
              Submit
            </LiquidButton>
          </div>
        </GlassCard>
      </PopoverContent>
    </Popover>
  )
}
