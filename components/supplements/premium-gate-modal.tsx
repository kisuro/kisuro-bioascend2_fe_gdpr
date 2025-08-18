"use client"

import { Crown, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { LiquidButton } from "@/components/ui/liquid-button"

interface PremiumGateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PremiumGateModal({ isOpen, onClose }: PremiumGateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-morph border-white/20 max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Premium Feature
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors">
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
          <DialogDescription>Upgrade to premium to submit reviews and ratings for supplements.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
            <Crown className="h-8 w-8 text-yellow-400" />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Submit Reviews & Ratings</h3>
            <p className="text-sm text-muted-foreground">
              Share your supplement experiences and help the community make informed decisions.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <LiquidButton variant="outline" onClick={onClose} className="flex-1">
              Close
            </LiquidButton>
            <LiquidButton className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600">
              Upgrade to Premium
            </LiquidButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
