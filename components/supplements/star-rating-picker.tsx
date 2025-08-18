"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface StarRatingPickerProps {
  currentRating?: number
  onSubmit: (rating: number) => void
  onCancel: () => void
  trigger: React.ReactNode
}

export function StarRatingPicker({ currentRating = 0, onSubmit, onCancel, trigger }: StarRatingPickerProps) {
  const [rating, setRating] = useState(currentRating)
  const [hoverRating, setHoverRating] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating)
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    setRating(currentRating)
    setHoverRating(0)
    setIsOpen(false)
    onCancel()
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-64 p-4 glass-morph border-white/20" align="start">
        <div className="space-y-4">
          <h4 className="font-medium">Rate this supplement</h4>

          <div className="flex items-center gap-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="p-1 transition-colors rounded hover:bg-white/10"
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

          <div className="flex gap-2">
            <LiquidButton variant="outline" size="sm" onClick={handleCancel} className="flex-1">
              Cancel
            </LiquidButton>
            <LiquidButton size="sm" onClick={handleSubmit} disabled={rating === 0} className="flex-1">
              Submit
            </LiquidButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
