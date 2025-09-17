"use client"

import { Crown } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LiquidButton } from "@/components/ui/liquid-button"
import { GlassCard } from "@/components/ui/glass-card"
import { useRouter } from "next/navigation"

interface PremiumGateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PremiumGateModal({ isOpen, onClose }: PremiumGateModalProps) {
  const router = useRouter()

  console.log("[v0] PremiumGateModal mounted, isOpen:", isOpen)

  const handleUpgrade = () => {
    router.push("/premium")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-transparent border-none shadow-none max-w-md mx-4 p-0">
        {isOpen && console.log("[v0] PremiumGateModal DialogContent mounted")}

        <GlassCard
          variant="strong"
          animate
          className="p-8 rounded-3xl backdrop-blur-2xl bg-white/15 dark:bg-white/10 border-2 border-white/30 dark:border-white/20 shadow-2xl"
        >
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 backdrop-blur-sm border border-yellow-400/40 shadow-lg"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-md"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <Crown className="h-10 w-10 text-yellow-400 drop-shadow-lg" />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Premium Feature
              </h2>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground/90">Submit Reviews & Ratings</h3>
                <p className="text-sm text-foreground/70 leading-relaxed max-w-xs mx-auto">
                  Share your supplement experiences and help the community make informed decisions.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <LiquidButton
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/40 backdrop-blur-sm text-foreground/80 hover:text-foreground transition-all duration-300"
              >
                Close
              </LiquidButton>
              <LiquidButton
                onClick={handleUpgrade}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                Upgrade to Premium
              </LiquidButton>
            </div>
          </div>
        </GlassCard>
      </DialogContent>
    </Dialog>
  )
}
