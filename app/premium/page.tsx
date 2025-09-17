"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Crown, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"

export default function PremiumPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-accent/10 to-primary/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-heading font-semibold text-lg">BioAionics</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="relative">
                <Crown className="w-8 h-8 text-amber-400" />
                <div className="absolute inset-0 bg-amber-400/20 blur-lg rounded-full" />
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                BioAionics Premium
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              More clarity. More control. More health.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            {/* Scientific Abstract Visual */}
            <div className="relative mb-8 md:mb-12">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <svg width="400" height="200" viewBox="0 0 400 200" className="max-w-full">
                  <defs>
                    <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M50 100 Q150 50 250 100 T450 100"
                    stroke="url(#dnaGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M50 100 Q150 150 250 100 T450 100"
                    stroke="url(#dnaGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </div>

            {/* Benefits at a glance */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {["Advanced biorhythms", "Deep supplement analytics", "Smart journaling", "AI insights"].map(
                (benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-primary" />
                    <span>{benefit}</span>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">What you get</h2>

            <div className="space-y-12">
              {[
                {
                  icon: "🧬",
                  title: "Supplements",
                  description:
                    "Add ratings and reviews, unlock deeper evidence-backed details, and see richer insights for each supplement.",
                },
                {
                  icon: "📝",
                  title: "Journal",
                  description:
                    "Track your daily wellness journey with our intelligent journaling system. Monitor your progress and gain insights into your health patterns.",
                },
                {
                  icon: "🧠",
                  title: "AudioMind",
                  description:
                    "Enhance your mental well-being with our curated collection of brain-optimizing audio: meditation, binaural beats, and focus music.",
                },
                {
                  icon: "🤖",
                  title: "AI Assistant",
                  description: "Get personalized health recommendations and insights from our AI-powered assistant.",
                },
                {
                  icon: "✨",
                  title: "…and more",
                  description: "Early access to upcoming features and premium experiments.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Subtle divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />
        </div>
      </section>

      {/* Access Status & Waitlist */}
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Premium is currently available by personal invitation only.
              <br />
              You can join the waitlist by leaving your email below.
            </p>

            {!isSubmitted ? (
              <GlassCard className="p-8 max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-center text-lg py-3"
                      disabled={isLoading}
                    />
                    {error && <p className="text-sm text-destructive">{error}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto px-8 py-3 text-lg font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining..." : "I want Premium"}
                  </Button>

                  <p className="text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>

                  <p className="text-xs text-muted-foreground/70">
                    Your email is secure and will only be used for Premium access notifications.
                  </p>
                </form>
              </GlassCard>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="p-8 max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Check className="w-6 h-6 text-green-500" />
                    <span className="text-lg font-semibold text-green-500">
                      Thanks! We'll email you when access opens.
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-12 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />
          <p className="text-sm text-muted-foreground">
            © BioAionics •{" "}
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
