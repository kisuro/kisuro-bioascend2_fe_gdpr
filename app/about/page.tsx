"use client"

import React from "react"
import { motion, useInView } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Heart, Users, Target, Lightbulb, Sparkles, Globe, ArrowRight } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Honesty",
    description: "We believe in transparent, evidence-based information to help you make informed decisions about your health journey.",
    color: "text-red-400",
  },
  {
    icon: Users,
    title: "Community",
    description: "Health is better together. We foster a supportive environment where experiences and insights are shared openly.",
    color: "text-blue-400",
  },
  {
    icon: Target,
    title: "Personalization",
    description: "No two people are alike. Our platform adapts to your unique needs, goals, and biological rhythms.",
    color: "text-green-400",
  },
]

const teamValues = [
  "Diverse backgrounds and experiences",
  "Different ages and perspectives", 
  "Varied beliefs united by common purpose",
  "Passionate about health and technology",
  "Committed to helping others thrive",
]

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, hsl(220 14% 4%), hsl(220 14% 4% / 0.95), hsl(180 100% 50% / 0.08))",
            "linear-gradient(90deg, hsl(220 14% 4% / 0.98), hsl(240 100% 50% / 0.06), hsl(180 100% 50% / 0.04))",
            "linear-gradient(135deg, hsl(180 100% 50% / 0.05), hsl(220 14% 4%), hsl(240 100% 50% / 0.08))",
            "linear-gradient(45deg, hsl(220 14% 4%), hsl(220 14% 4% / 0.95), hsl(180 100% 50% / 0.08))",
          ],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(180 100% 50% / 0.3) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 right-1/3 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(240 100% 50% / 0.4) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  )
}

const AnimatedSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 pb-32 px-4">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8 font-heading text-foreground"
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
              About 
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="text-primary"
              >
                BioAionics
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
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
              Born out of personal experience, designed for your unique wellness journey
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <AnimatedSection className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <GlassCard 
            variant="strong" 
            className="p-12 rounded-3xl"
            animate
          >
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">Our Story</h2>
              
              <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
                <p className="text-xl">
                  BioAionics was born out of personal experience. For years, health data and insights had to be 
                  collected piece by piece across different platforms and apps. But health is never just about 
                  supplements — it's about sleep, nutrition, the state of the body, sport, and how all these 
                  factors interact.
                </p>
                
                <p className="text-lg">
                  We believe it all belongs in one place, enhanced by AI to create a truly personal path to 
                  wellness and longevity.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </AnimatedSection>

      {/* Mission & Vision Section */}
      <AnimatedSection className="py-24 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard 
              variant="strong" 
              className="p-10 rounded-2xl hover:scale-105 transition-transform duration-300"
              hover
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-xl border border-red-500/30"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <Target className="h-8 w-8 text-red-400" />
                </motion.div>
                <h3 className="text-2xl font-bold font-heading">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To help people in their journey of biohacking, health optimization, and extending longevity through 
                personalized, evidence-based tools and insights.
              </p>
            </GlassCard>

            <GlassCard 
              variant="strong" 
              className="p-10 rounded-2xl hover:scale-105 transition-transform duration-300"
              hover
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-500/30"
                  whileHover={{ scale: 1.05, rotate: -5 }}
                >
                  <Globe className="h-8 w-8 text-blue-400" />
                </motion.div>
                <h3 className="text-2xl font-bold font-heading">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To become a leading platform for personalized health, where every user can build their unique 
                program and path toward a better, longer, and healthier life.
              </p>
            </GlassCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-heading">What We Stand For</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <GlassCard
                    variant="strong"
                    className="p-8 rounded-2xl h-full group hover:scale-105 transition-all duration-300"
                    hover
                  >
                    <motion.div
                      className={`p-4 rounded-xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 mb-6 w-fit`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <Icon className={`h-8 w-8 ${value.color}`} />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-4 font-heading">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* What Makes Us Different */}
      <AnimatedSection className="py-24 px-4 bg-gradient-to-br from-accent/5 via-background to-primary/5">
        <div className="max-w-5xl mx-auto">
          <GlassCard 
            variant="strong" 
            className="p-12 rounded-3xl"
            animate
          >
            <div className="text-center mb-12">
              <motion.div
                className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl border border-green-500/30 mb-6 w-fit mx-auto"
                whileHover={{ scale: 1.1, rotate: -10 }}
              >
                <Lightbulb className="h-10 w-10 text-green-400" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">What Makes Us Different</h2>
            </div>
            
            <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
              <p className="text-lg">
                Our holistic approach sets us apart. We don't believe in a single "magic pill" or 
                one-size-fits-all solutions. Instead, our platform combines supplements, lifestyle tracking, 
                and AI-driven insights — acting like a personal coach that continuously adapts and evolves 
                your program based on your individuality.
              </p>
            </div>
          </GlassCard>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Small but driven — a diverse group of enthusiasts united by a shared passion
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard 
              variant="strong" 
              className="p-10 rounded-2xl hover:scale-105 transition-transform duration-300"
              hover
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl border border-purple-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <Users className="h-8 w-8 text-purple-400" />
                </motion.div>
                <h3 className="text-2xl font-bold font-heading">Who We Are</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our team is small but driven — a diverse group of enthusiasts from different backgrounds, 
                ages, and beliefs, united by a shared passion for health and technology.
              </p>
            </GlassCard>

            <GlassCard 
              variant="strong" 
              className="p-10 rounded-2xl hover:scale-105 transition-transform duration-300"
              hover
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </motion.div>
                <h3 className="text-2xl font-bold font-heading">Our Diversity</h3>
              </div>
              <div className="space-y-3">
                {teamValues.map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ArrowRight className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                    <span>{value}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection className="py-24 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/15">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard
            variant="strong"
            className="p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/15 shadow-2xl"
            animate
          >
            <motion.div
              className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl border border-primary/30 mb-8 w-fit mx-auto"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Heart className="h-10 w-10 text-primary" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Join Our Journey</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6 mb-8">
              <p className="text-xl">
                Join us. Share your reviews, your experiences, and your journey. Together, we can make 
                the world healthier and better.
              </p>
            </div>

            <motion.div
              className="text-sm text-muted-foreground bg-muted/30 px-6 py-3 rounded-full inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-medium">Ready to start?</span> Begin with our free biorhythms calculator
            </motion.div>
          </GlassCard>
        </div>
      </AnimatedSection>
    </div>
  )
}