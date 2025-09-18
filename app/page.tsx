"use client"

import React from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import {
  Activity,
  Brain,
  BookOpen,
  Zap,
  Sparkles,
  Shield,
  ArrowRight,
  Play,
  User,
  ExternalLink,
  Quote,
  Star,
} from "lucide-react"
import { SupplementLoader } from "@/components/ui/supplement-loader"

const features = [
  {
    title: "Biorhythms",
    description: "Track your physical, emotional, and intellectual cycles with personalized insights.",
    href: "/biorhythms",
    icon: Activity,
    color: "text-primary",
    isPremium: false,
  },
  {
    title: "Supplements",
    description: "Science-backed supplements designed to enhance performance and longevity.",
    href: "/supplements",
    icon: Zap,
    color: "text-accent",
    isPremium: false,
  },
  {
    title: "Journal",
    description: "Intelligent journaling system for mental clarity and wellness tracking.",
    href: "/journal",
    icon: BookOpen,
    color: "text-secondary",
    isPremium: true,
  },
  {
    title: "AudioMind",
    description: "Brain-optimizing audio content including meditation and binaural beats.",
    href: "/mind",
    icon: Brain,
    color: "text-tertiary",
    isPremium: true,
  },
  {
    title: "AI Assistant",
    description: "Personalized health recommendations with AI-powered guidance.",
    href: "/assistant",
    icon: Sparkles,
    color: "text-quaternary",
    isPremium: true,
  },
]

const trustedStats = [
  {
    number: "58.5%",
    label: "U.S. adults used at least one dietary supplement in the past 30 days",
    source: "CDC/NCHS 2023",
    sourceUrl: "https://www.cdc.gov/nchs/data/databriefs/db399.pdf",
  },
  {
    number: "16.9%",
    label: "U.S. adults practiced yoga in 2022; over 80% for health improvement",
    source: "CDC 2024",
    sourceUrl: "https://www.cdc.gov/nchs/products/databriefs/db476.htm",
  },
  {
    number: "92%",
    label: "Meditation practitioners report stress relief; long-term users see 60% anxiety reduction",
    source: "MissionGraduate 2025",
    sourceUrl: "#",
  },
  {
    number: "46%",
    label: "Young adults (18–34) used mental health apps; 83% of therapists recommend them",
    source: "Market.us 2025",
    sourceUrl: "#",
  },
  {
    number: "8%",
    label: "People consistently journal; 65% report stress reduction",
    source: "Habitbetter survey",
    sourceUrl: "#",
  },
]

const testimonials = [
  {
    quote: "BioAionics helped me track my energy cycles and improve focus within weeks.",
    author: "Sarah M.",
    role: "Wellness Enthusiast",
    rating: 5,
  },
  {
    quote: "The AI recommendations are spot-on. I've never felt more in tune with my body.",
    author: "Michael R.",
    role: "Biohacker",
    rating: 5,
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
              Personalized Biohacking
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="text-primary"
              >
                for Mind & Body
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
              Track your biorhythms, optimize supplements, journal for mental clarity, and enhance your wellness with AI
              guidance.
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
                    Start Free Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </LiquidButton>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <LiquidButton variant="outline" size="lg" asChild>
                  <Link href="#features">
                    <Play className="mr-2 h-5 w-5" />
                    See How It Works
                  </Link>
                </LiquidButton>
              </motion.div>
            </motion.div>
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
              Comprehensive tools for your biohacking journey
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
                        {/* Premium badge */}
                        {feature.isPremium && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-accent to-primary text-white text-xs px-2 py-1 rounded-full font-medium">
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
                          <span className="text-sm font-medium">Learn more</span>
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
              Evidence-based statistics that power our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading text-foreground">Why BioAionics</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Built on evidence-based health practices and trusted by a growing community focused on longevity and
              mental wellness.
            </p>

            {/* Source logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-sm font-medium text-muted-foreground">Trusted Sources:</div>
              <div className="text-sm text-muted-foreground">CDC</div>
              <div className="text-sm text-muted-foreground">NIH</div>
              <div className="text-sm text-muted-foreground">Nutrition Reviews</div>
              <div className="text-sm text-muted-foreground">NEJM</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-accent/5 via-background to-primary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">What Our Users Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlassCard variant="strong" className="p-8 rounded-2xl">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="#"
              className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
            >
              Read more success stories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          {/* CTA bar above content */}
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                Join BioAionics and start optimizing today
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                Transform your health with personalized insights, evidence-based recommendations, and a community
                focused on longevity.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <LiquidButton
                  size="lg"
                  className="bg-gradient-to-br from-primary/90 via-accent/70 to-primary/95 hover:shadow-2xl hover:shadow-primary/30"
                  asChild
                >
                  <Link href="/biorhythms">
                    Start Free Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </LiquidButton>

                <LiquidButton variant="outline" size="lg" asChild>
                  <Link href="/supplements">Browse Supplements</Link>
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
                About Us
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Scientific Sources
              </Link>
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy & Data Use
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-12 px-4 border-t border-border/30 bg-background">
        <div className="max-w-5xl mx-auto">
          <GlassCard variant="subtle" className="p-8 rounded-2xl">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Medical Disclaimer:</strong> This application is for educational and
                informational purposes only. It is not intended to diagnose, treat, cure, or prevent any disease. Always
                consult with a qualified healthcare professional before making any changes to your health regimen or
                supplement routine.
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
