"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Crown, Sparkles } from "lucide-react"

interface PremiumPageGateProps {
  title: string
  description: string
  featureName: string
}

export function PremiumPageGate({ title, description, featureName }: PremiumPageGateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <GlassCard className="glass-strong p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Crown icon with glass effect */}
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full relative"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 via-yellow-500/30 to-orange-500/20 backdrop-blur-sm border border-amber-400/30" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-400/10 to-orange-500/10 backdrop-blur-md border border-amber-400/20" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-400/5 to-orange-500/5 backdrop-blur-lg border border-amber-400/10" />
              <Crown className="absolute inset-0 m-auto h-12 w-12 text-amber-400 drop-shadow-lg" />
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-400/10 via-yellow-500/10 to-orange-500/10 border border-amber-400/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-amber-400">Premium Feature:</span> {featureName} is available for
                Premium subscribers only.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <LiquidButton
                size="lg"
                className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold shadow-xl"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Upgrade to Premium
              </LiquidButton>
            </motion.div>

            <motion.p
              className="text-xs text-muted-foreground mt-6 opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Unlock advanced features and personalized insights
            </motion.p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
