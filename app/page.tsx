"use client"

import React from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Activity, Brain, BookOpen, Zap, Sparkles, Shield, ArrowRight, ExternalLink, Info } from "lucide-react"

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
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayNumber, setDisplayNumber] = React.useState("0")

  React.useEffect(() => {
    if (isInView) {
      const numericValue = Number.parseFloat(number.replace(/[^\d.]/g, ""))
      const suffix = number.replace(/[\d.]/g, "")

      let start = 0
      const duration = 2500
      const increment = numericValue / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= numericValue) {
          setDisplayNumber(number)
          clearInterval(timer)
        } else {
          const currentValue = Math.floor(start * 10) / 10
          setDisplayNumber(currentValue + suffix)
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, number])

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-white/30 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -5 }}
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

const WellnessBackground = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
    >
      {/* DNA Helix Animation */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 4, delay: 1 }}
      >
        <motion.svg
          className="w-full h-full text-primary/15"
          viewBox="0 0 100 100"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <motion.path
            d="M20,20 Q50,40 80,20 Q50,60 20,80 Q50,60 80,80"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.svg>
      </motion.div>

      {/* Molecular Orbits */}
      <motion.div
        className="absolute bottom-32 left-16 w-40 h-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3, delay: 2 }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent/60 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <motion.div
            className="absolute top-0 left-1/2 w-1 h-1 bg-primary/60 rounded-full -translate-x-1/2"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-1 h-1 bg-accent/60 rounded-full -translate-x-1/2"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>
      </motion.div>

      {/* Floating Health Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, -30, -10],
            x: [-5, 10, -5],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.div>
  )
}

const StaticBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10" />
    </div>
  )
}

export default function HomePage() {
  const [isClient, setIsClient] = React.useState(false)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" })
    }
  }

  if (!isClient) {
    return null // Show nothing until client-side hydration
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 pb-32 px-4">
        <StaticBackground />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />
        <WellnessBackground />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 font-heading text-foreground"
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
              className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
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
                  className="bg-gradient-to-br from-primary/90 via-accent/70 to-primary/95 hover:shadow-2xl hover:shadow-primary/30 hover:ring-2 hover:ring-primary/50 transition-all duration-300"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading text-foreground">Core Features</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools for your wellness tracking journey
            </p>
          </motion.div>

          <div className="relative">
            {/* Desktop horizontal scroll */}
            <div className="hidden md:block">
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-20 h-full flex items-center justify-start bg-gradient-to-r from-background via-background/90 to-transparent hover:from-background transition-all duration-300"
                aria-label="Scroll left"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center ml-4 transition-all duration-300 hover:scale-110">
                  <ArrowRight className="h-5 w-5 text-foreground rotate-180" />
                </div>
              </button>

              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-20 h-full flex items-center justify-end bg-gradient-to-l from-background via-background/90 to-transparent hover:from-background transition-all duration-300"
                aria-label="Scroll right"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center mr-4 transition-all duration-300 hover:scale-110">
                  <ArrowRight className="h-5 w-5 text-foreground" />
                </div>
              </button>

              <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

              <div ref={scrollContainerRef} className="overflow-x-auto pb-8 pt-8 scrollbar-hide">
                <div className="flex gap-6 pl-24 pr-24 w-max">
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
                      >
                        <GlassCard
                          variant="strong"
                          className="p-6 h-full group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer rounded-2xl relative hover:scale-105"
                          hover
                        >
                          <Link href={feature.href} className="block">
                            {feature.isPremium && (
                              <div className="absolute top-4 right-4 bg-gradient-to-r from-accent/80 to-primary/80 text-white text-xs px-2 py-1 rounded-full font-medium opacity-90 z-10">
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

              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">← Scroll to see all features →</p>
              </div>
            </div>

            {/* Mobile responsive grid */}
            <div className="md:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <GlassCard
                        variant="strong"
                        className="p-4 h-full group transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer rounded-xl relative"
                        hover
                      >
                        <Link href={feature.href} className="block">
                          {feature.isPremium && (
                            <div className="absolute top-3 right-3 bg-gradient-to-r from-accent/80 to-primary/80 text-white text-xs px-2 py-1 rounded-full font-medium opacity-90 z-10">
                              Premium
                            </div>
                          )}

                          <div className="flex items-center mb-3">
                            <motion.div
                              className="p-2 rounded-lg bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-xl border border-white/30 shadow-lg dark:from-white/15 dark:to-white/5 dark:border-white/20 mr-3"
                              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            >
                              <Icon className={`h-5 w-5 ${feature.color}`} />
                            </motion.div>
                            <h3 className="text-lg font-semibold font-heading">{feature.title}</h3>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-3">{feature.description}</p>
                          <motion.div className="flex items-center text-primary group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-sm font-medium">{feature.cta}</span>
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </motion.div>
                        </Link>
                      </GlassCard>
                    </motion.div>
                  )
                })}
              </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading text-foreground">Trusted Data Insights</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
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
            <GlassCard
              variant="strong"
              className="p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/15 shadow-2xl"
              animate
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">Start tracking your wellness journey</h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
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
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
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
