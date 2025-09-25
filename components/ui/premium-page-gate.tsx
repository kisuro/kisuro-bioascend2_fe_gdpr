"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Crown, Sparkles, Lock, Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface PremiumPageGateProps {
  title: string
  description: string
  featureName: string
}

const premiumBenefits = [
  "Add ratings and reviews, unlock deeper evidence-backed details, and see richer insights for each supplement.",
  "Track your daily wellness journey with our intelligent journaling system. Monitor your progress and gain insights into your health patterns.",
  "Enhance your mental well-being with our curated collection of brain-optimizing audio: meditation, binaural beats, and focus music.",
  "Get personalized health recommendations and insights from our AI-powered assistant.",
  "Early access to upcoming features and premium experiments.",
]

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
        className="w-full max-w-2xl"
      >
        <GlassCard className="glass-strong p-8 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-2xl" />

          <div className="relative z-10">
            <motion.div
              className="w-16 h-16 mx-auto mb-6 rounded-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 via-yellow-500/30 to-orange-500/20 backdrop-blur-sm border border-amber-400/30" />
              <Crown className="absolute inset-0 m-auto h-8 w-8 text-amber-400 drop-shadow-lg" />
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="mb-8 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-center text-foreground">Premium Benefits Include:</h3>
              <div className="space-y-3">
                {premiumBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-white/5 to-transparent border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="mb-6 p-3 rounded-xl bg-gradient-to-r from-amber-400/10 via-yellow-500/10 to-orange-500/10 border border-amber-400/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
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
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <LiquidButton
                onClick={handleUpgrade}
                size="lg"
                className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold shadow-lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                More about premium
              </LiquidButton>
            </motion.div>

            <motion.p
              className="text-xs text-muted-foreground mt-4 opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              Unlock advanced features and insights
            </motion.p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
