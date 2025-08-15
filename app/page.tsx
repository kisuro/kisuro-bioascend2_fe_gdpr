"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Activity, Brain, BookOpen, Zap, Sparkles, TrendingUp, Shield, Users, ArrowRight, Play } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "Biorhythms",
    description: "Track your physical, emotional, and intellectual cycles with interactive charts",
    href: "/biorhythms",
    color: "text-chart-1",
  },
  {
    icon: Zap,
    title: "Supplements",
    description: "Discover evidence-based supplements with detailed interactions and ratings",
    href: "/supplements",
    color: "text-chart-2",
  },
  {
    icon: BookOpen,
    title: "Personal Journal",
    description: "Log your intake, track progress, and get personalized reminders",
    href: "/journal",
    color: "text-chart-3",
  },
  {
    icon: Brain,
    title: "Mind Library",
    description: "Access curated audio content for meditation, focus, and mental wellness",
    href: "/mind",
    color: "text-chart-4",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    description: "Get personalized recommendations based on your profile and goals",
    href: "/assistant",
    color: "text-chart-5",
  },
]

const stats = [
  { label: "Active Users", value: "10K+", icon: Users },
  { label: "Success Rate", value: "94%", icon: TrendingUp },
  { label: "Data Security", value: "100%", icon: Shield },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background"></div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Optimize Your
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Human Potential
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Unlock the science of biohacking with personalized insights, evidence-based supplements, and AI-powered
              recommendations for mental health and longevity.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <LiquidButton
                size="lg"
                className="bg-gradient-to-br from-primary/80 via-accent/60 to-primary/90 animate-pulse"
                asChild
              >
                <Link href="/biorhythms">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </LiquidButton>

              <LiquidButton variant="outline" size="lg" asChild>
                <Link href="#features">
                  <Play className="mr-2 h-5 w-5" />
                  Explore Features
                </Link>
              </LiquidButton>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-md border border-white/20 dark:bg-white/5 dark:border-white/10 rounded-2xl p-6 text-center animate-bounce"
                  style={{ animationDelay: `${index * 0.2}s`, animationDuration: "6s" }}
                >
                  <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">
              Everything You Need to
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {" "}
                Biohack
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and insights to optimize your health, performance, and longevity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassCard
                    className="bg-white/10 backdrop-blur-md border border-white/20 dark:bg-white/5 dark:border-white/10 rounded-2xl p-8 h-full group transition-all duration-300 hover:bg-white/15 hover:backdrop-blur-lg hover:border-white/25 hover:shadow-xl dark:hover:bg-white/8 dark:hover:border-white/15 cursor-pointer"
                    hover
                  >
                    <Link href={feature.href} className="block">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg dark:bg-white/10 dark:border-white/20 mr-4">
                          <Icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <h3 className="text-xl font-semibold font-heading">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                      <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-200">
                        <span className="text-sm font-medium">Learn more</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </Link>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlassCard className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg dark:bg-white/10 dark:border-white/20 p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">Ready to Transform Your Health?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of biohackers who are already optimizing their performance with science-backed insights
                and personalized recommendations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LiquidButton
                  size="lg"
                  className="bg-gradient-to-br from-primary/80 via-accent/60 to-primary/90"
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

              <div className="mt-8 text-sm text-muted-foreground">
                <p>No credit card required • Free biorhythms calculator • Premium features available</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-8 px-4 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="bg-white/5 backdrop-blur-sm border border-white/10 dark:bg-white/3 dark:border-white/5 p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
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
