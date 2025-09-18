"use client"

import React from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Activity, Brain, BookOpen, Zap, Sparkles, Shield, ArrowRight, ExternalLink, Info } from "lucide-react"
import { SupplementLoader } from "@/components/ui/supplement-loader"

const features = [
  {
    title: "Biorhythms",
    description: "Visualize cycles and plan your day with awareness.",
    href: "/biorhythms",
    cta: "Learn more",
    icon: Activity,
    color: "text-primary",
    isPremium: false,
  },
  {
    title: "Supplements",
    description: "Browse structured monographs with sources and safety notes.",
    href: "/supplements",
    cta: "Explore database",
    icon: Zap,
    color: "text-accent",
    isPremium: false,
  },
  {
    title: "Journal",
    description: "Guided prompts for mood, sleep, focus.",
    href: "/journal",
    cta: "See example",
    icon: BookOpen,
    color: "text-secondary",
    isPremium: true,
  },
  {
    title: "AudioMind",
    description: "Curated audios for relaxation and focus.",
    href: "/mind",
    cta: "View library",
    icon: Brain,
    color: "text-tertiary",
    isPremium: true,
  },
  {
    title: "AI Assistant",
    description: "Structured Q&A over your entries and goals.",
    href: "/assistant",
    cta: "See capabilities",
    icon: Sparkles,
    color: "text-quaternary",
    isPremium: true,
  },
]

const trustedStats = [
  {
    number: "58.5%",
    label: "U.S. adults used at least one dietary supplement in the past 30 days.",
    source: "CDC / NCHS (2023)",
    sourceUrl: "https://www.cdc.gov/nchs/data/databriefs/db399.pdf",
  },
  {
    number: "16.9%",
    label: "U.S. adults practiced yoga in 2022; most cite general health.",
    source: "CDC Data Brief 501 (2024)",
    sourceUrl: "https://www.cdc.gov/nchs/products/databriefs/db476.htm",
  },
  {
    number: "18.3%",
    label: "U.S. adults practiced meditation in 2022 (population trend).",
    source: "NIH / NLM summary",
    sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8739022/",
  },
  {
    number: "46%",
    label: "Young adults report using mental-health apps; 83% of therapists recommend apps.",
    source: "Market.us overview",
    sourceUrl: "https://market.us/report/mental-health-apps-market/",
  },
  {
    number: "8%",
    label: "People who journal consistently; practitioners report stress-management benefits.",
    source: "Habitbetter survey",
    sourceUrl: "https://habitbetter.com/journaling-statistics/",
  },
]

const AnimatedCounter = ({
  number,
  label,
  source,
  sourceUrl,
}: {
  number: string
  label: string
  source: string
  sourceUrl: string
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayNumber, setDisplayNumber] = React.useState("0")

  React.useEffect(() => {
    if (isInView) {
      // Extract numeric value for animation
      const numericValue = Number.parseFloat(number.replace(/[^\d.]/g, ""))
      const suffix = number.replace(/[\d.]/g, "")

      let start = 0
      const duration = 2000
      const increment = numericValue / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= numericValue) {
          setDisplayNumber(number)
          clearInterval(timer)
        } else {
          setDisplayNumber(Math.floor(start) + suffix)
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, number])

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-3">{displayNumber}</div>
      <div className="text-sm text-muted-foreground mb-3 leading-relaxed">{label}</div>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1"
        title="Opens external source"
      >
        {source}
        <ExternalLink className="h-3 w-3" />
      </a>
    </motion.div>
  )
}

const BiorhythmBackground = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Bio-inspired hexagonal cell pattern */}
      <motion.svg
        className="absolute top-10 right-20 w-40 h-40 text-primary/10"
        viewBox="0 0 100 100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 4, delay: 2 }}
      >
        <motion.polygon
          points="50,15 65,25 65,45 50,55 35,45 35,25"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.svg>

      {/* Neuron-like branching lines */}
      <motion.svg
        className="absolute bottom-20 left-10 w-32 h-32 text-accent/8"
        viewBox="0 0 100 100"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, delay: 2.5 }}
      >
        <motion.path
          d="M50,50 L30,30 M50,50 L70,30 M50,50 L30,70 M50,50 L70,70 M50,50 L50,20 M50,50 L50,80"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.svg>
    </motion.div>
  )
}

export default function HomePage() {
  const [isClient, setIsClient] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!isClient || isLoading) {
    return <SupplementLoader isVisible={true} message="Loading BioAionics..." />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 pb-32 px-4">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/20"
            animate={{
              background: [
                "linear-gradient(45deg, hsl(var(--background)), hsl(var(--background)/0.95), hsl(var(--primary)/0.2))",
                "linear-gradient(90deg, hsl(var(--background)/0.98), hsl(var(--primary)/0.15), hsl(var(--accent)/0.1))",
                "linear-gradient(135deg, hsl(var(--primary)/0.1), hsl(var(--background)), hsl(var(--accent)/0.15))",
                "linear-gradient(45deg, hsl(var(--background)), hsl(var(--background)/0.95), hsl(var(--primary)/0.2))",
              ],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />
        <BiorhythmBackground />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 font-heading text-foreground"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              AI-referenced tools
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="text-primary"
              >
                for personal wellness tracking
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.8,
                type: "spring",
                stiffness: 80,
                damping: 12,
              }}
            >
              Explore biorhythms, organize your supplement research, journal your habits, and use AI for structured
              guidance
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <LiquidButton
                  size="lg"
                  className="bg-gradient-to-br from-primary/90 via-accent/70 to-primary/95 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
                  asChild
                >
                  <Link href="/biorhythms">
                    Start Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </LiquidButton>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-sm text-muted-foreground mt-6 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              BioAionics provides educational information and tools. It is not medical advice. Always consult a
              qualified health professional.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section id="features" className="relative py-18 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">Core Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools for your wellness tracking journey
            </p>
          </motion.div>

          {/* Horizontal scrollable feature cards */}
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-6 min-w-max px-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    className="flex-shrink-0 w-80"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <GlassCard
                      variant="strong"
                      className="p-6 h-full group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer rounded-2xl relative"
                      hover
                    >
                      <Link href={feature.href} className="block">
                        {feature.isPremium && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-accent/80 to-primary/80 text-white text-xs px-2 py-1 rounded-full font-medium opacity-90">
                            Premium
                          </div>
                        )}

                        <div className="flex items-center mb-4">
                          <motion.div
                            className="p-3 rounded-xl bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-xl border border-white/30 shadow-xl dark:from-white/15 dark:to-white/5 dark:border-white/20 mr-4"
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                          >
                            <Icon className={`h-6 w-6 ${feature.color}`} />
                          </motion.div>
                          <h3 className="text-xl font-semibold font-heading">{feature.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                        <motion.div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                          <span className="text-sm font-medium">{feature.cta}</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.div>
                      </Link>
                    </GlassCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">Trusted Data Insights</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Population statistics from reputable health organizations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {trustedStats.map((stat, index) => (
              <AnimatedCounter
                key={index}
                number={stat.number}
                label={stat.label}
                source={stat.source}
                sourceUrl={stat.sourceUrl}
              />
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-full">
              <Info className="h-4 w-4" />
              External sources provide general population data and may not apply to you.
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading text-foreground">How We Use Sources</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Our database summarizes publicly available research and reputable health statistics. We indicate evidence
              levels where applicable, and separate user opinions from reference content.
            </p>

            <GlassCard variant="strong" className="p-8 rounded-2xl text-left max-w-3xl mx-auto">
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Informational only — not medical advice.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>No disease claims. Individual responses vary.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Consult a qualified professional before using any supplement.</span>
                </li>
              </ul>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlassCard
              variant="strong"
              className="p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/15 shadow-2xl"
              animate
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Start tracking your wellness journey</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                Access educational tools and structured information to support your personal wellness tracking.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <LiquidButton
                  size="lg"
                  className="bg-gradient-to-br from-primary/90 via-accent/70 to-primary/95 hover:shadow-2xl hover:shadow-primary/30"
                  asChild
                >
                  <Link href="/biorhythms">
                    Start Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </LiquidButton>

                <LiquidButton variant="outline" size="lg" asChild>
                  <Link href="/supplements">Browse Database</Link>
                </LiquidButton>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>No credit card required • Free biorhythms calculator • Premium features available</p>
              </div>
            </GlassCard>
          </motion.div>

          <div className="text-center border-t border-border/30 pt-12">
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy & Data Use
              </Link>
              <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-border/30 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <GlassCard variant="subtle" className="p-8 rounded-2xl">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Safety notice:</strong> Dietary supplements are not a substitute for
                professional care. They may interact with medications and aren't evaluated by the FDA for treating
                diseases. Speak with a licensed clinician before use.
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
