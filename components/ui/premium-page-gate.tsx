"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Crown, Sparkles, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

interface PremiumPageGateProps {
  title: string
  description: string
  featureName: string
}

export function PremiumPageGate({ title, description, featureName }: PremiumPageGateProps) {
  const router = useRouter()

  const handleUpgrade = () => {
    router.push("/premium")
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <GlassCard className="glass-strong p-8 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-2xl" />

          <div className="relative z-10">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 via-yellow-500/30 to-orange-500/20 backdrop-blur-sm border border-amber-400/30" />
              <Crown className="absolute inset-0 m-auto h-8 w-8 text-amber-400 drop-shadow-lg" />
            </motion.div>

            <motion.h1
              className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-base text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="mb-6 p-3 rounded-xl bg-gradient-to-r from-amber-400/10 via-yellow-500/10 to-orange-500/10 border border-amber-400/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2">
                <Lock className="h-4 w-4 text-amber-400" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-amber-400">Premium Only:</span> {featureName}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <LiquidButton
                onClick={handleUpgrade}
                size="default"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold shadow-lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </LiquidButton>
            </motion.div>

            <motion.p
              className="text-xs text-muted-foreground mt-4 opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Unlock advanced features and insights
            </motion.p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
