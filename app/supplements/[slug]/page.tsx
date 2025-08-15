"use client"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SupplementRating } from "@/components/supplements/supplement-rating"
import { SupplementInteractions } from "@/components/supplements/supplement-interactions"
import { SupplementDosage } from "@/components/supplements/supplement-dosage"
import { Star, Users, AlertTriangle, Info, ArrowLeft, BookOpen, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { supplementsData } from "@/lib/data/supplements"

interface SupplementDetailPageProps {
  params: {
    slug: string
  }
}

export default function SupplementDetailPage({ params }: SupplementDetailPageProps) {
  const supplement = supplementsData.find((s) => s.slug === params.slug)

  if (!supplement) {
    notFound()
  }

  const averageRating = supplement.ratings.reduce((sum, rating) => sum + rating.score, 0) / supplement.ratings.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: supplement.ratings.filter((r) => r.score === stars).length,
    percentage: (supplement.ratings.filter((r) => r.score === stars).length / supplement.ratings.length) * 100,
  }))

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LiquidButton variant="ghost" asChild>
            <Link href="/supplements">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Supplements
            </Link>
          </LiquidButton>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <GlassCard className="glass-strong p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {supplement.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="glass-subtle">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">{supplement.name}</h1>
                <p className="text-xl text-muted-foreground mb-6">{supplement.description}</p>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= averageRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{averageRating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({supplement.ratings.length} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{supplement.ratings.length} users</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <GlassCard className="glass-morph p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold font-heading">Primary Goals</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {supplement.goals.map((goal) => (
                    <Badge key={goal} className="glass-subtle">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Composition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard className="glass-morph p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold font-heading">Composition & Standardization</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Active Ingredients</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      {supplement.composition.map((ingredient, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{ingredient.name}</span>
                          <span className="font-medium">{ingredient.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Standardization</h3>
                    <p className="text-muted-foreground">{supplement.standardization}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Dosage Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <SupplementDosage supplement={supplement} />
            </motion.div>

            {/* Interactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <SupplementInteractions supplement={supplement} />
            </motion.div>

            {/* Contraindications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <GlassCard className="glass-morph p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <h2 className="text-xl font-semibold font-heading">Contraindications & Limitations</h2>
                </div>
                <ul className="space-y-2">
                  {supplement.contraindications.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Rating Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard className="glass-strong p-6">
                <h3 className="font-semibold mb-4">Rating Breakdown</h3>
                <div className="space-y-3">
                  {ratingDistribution.map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3">
                      <span className="text-sm w-8">{rating.stars}★</span>
                      <Progress value={rating.percentage} className="flex-1" />
                      <span className="text-sm text-muted-foreground w-8">{rating.count}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Evidence Level */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <GlassCard className="glass-morph p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Evidence Level</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={supplement.evidenceLevel === "High" ? "default" : "secondary"}>
                    {supplement.evidenceLevel}
                  </Badge>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on peer-reviewed research and clinical studies
                </p>
              </GlassCard>
            </motion.div>

            {/* Part of Stacks */}
            {supplement.partOfStacks && supplement.partOfStacks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <GlassCard className="glass-morph p-6">
                  <h3 className="font-semibold mb-3">Part of Stacks</h3>
                  <div className="space-y-2">
                    {supplement.partOfStacks.map((stack) => (
                      <Link
                        key={stack.id}
                        href={`/stacks/${stack.slug}`}
                        className="block p-3 rounded-lg glass-subtle hover:glass-strong transition-all duration-200"
                      >
                        <div className="font-medium">{stack.name}</div>
                        <div className="text-sm text-muted-foreground">{stack.description}</div>
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <GlassCard className="glass-strong p-6">
                <div className="space-y-3">
                  <LiquidButton className="w-full liquid-gradient">Add to Journal</LiquidButton>
                  <LiquidButton variant="outline" className="w-full">
                    Add to Stack
                  </LiquidButton>
                </div>
              </GlassCard>
            </motion.div>

            {/* Rate This Supplement */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <SupplementRating supplementId={supplement.id} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
