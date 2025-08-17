"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, AlertTriangle, Info, ArrowLeft, BookOpen, Zap, Shield, ExternalLink, Plus, X } from "lucide-react"
import Link from "next/link"

interface SupplementDetailClientProps {
  supplement: any
}

export function SupplementDetailClient({ supplement }: SupplementDetailClientProps) {
  const hasRating = supplement.rating.avg !== null && supplement.rating.count > 0

  const getEvidenceLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "moderate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "limited":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

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
                  {supplement.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="glass-subtle">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">{supplement.name}</h1>
                <p className="text-xl text-muted-foreground mb-6">{supplement.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  {hasRating ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= (supplement.rating.avg || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-lg">{supplement.rating.avg?.toFixed(1)}</span>
                      <span className="text-muted-foreground whitespace-nowrap">
                        ({supplement.rating.count} reviews)
                      </span>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">No ratings yet</div>
                  )}

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="whitespace-nowrap">{supplement.rating.count} users</span>
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
                  {supplement.goals.map((goal: string) => (
                    <Badge key={goal} className="glass-subtle">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard className="glass-morph p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold font-heading">Benefits</h2>
                </div>
                <ul className="space-y-2">
                  {supplement.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>

            {/* Dosage & Timing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <GlassCard className="glass-morph p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold font-heading">Dosage & Timing</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Recommended Dosage</h3>
                    <p className="text-muted-foreground">{supplement.dosage}</p>
                    {supplement.dosage_range.notes && (
                      <p className="text-sm text-muted-foreground mt-1">{supplement.dosage_range.notes}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Timing</h3>
                    <p className="text-muted-foreground capitalize">{supplement.timing}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Available Forms</h3>
                    <div className="flex flex-wrap gap-2">
                      {supplement.forms.map((form: string) => (
                        <Badge key={form} variant="secondary" className="glass-subtle">
                          {form}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {supplement.cycle && (
                    <div>
                      <h3 className="font-medium mb-2">Cycling</h3>
                      <p className="text-muted-foreground">{supplement.cycle}</p>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>

            {/* Interactions */}
            {(supplement.interactions.synergizes_with.length > 0 || supplement.interactions.avoid_with.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <GlassCard className="glass-morph p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold font-heading">Interactions</h2>
                  </div>
                  <div className="space-y-4">
                    {supplement.interactions.synergizes_with.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2 text-green-400">Synergizes With</h3>
                        <div className="flex flex-wrap gap-2">
                          {supplement.interactions.synergizes_with.map((item: string) => (
                            <Badge key={item} variant="secondary" className="glass-subtle border-green-500/30">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {supplement.interactions.avoid_with.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2 text-red-400">Avoid With</h3>
                        <div className="flex flex-wrap gap-2">
                          {supplement.interactions.avoid_with.map((item: string) => (
                            <Badge key={item} variant="secondary" className="glass-subtle border-red-500/30">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Contraindications & Side Effects */}
            {(supplement.contraindications.length > 0 || supplement.side_effects.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <GlassCard className="glass-morph p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <h2 className="text-xl font-semibold font-heading">Safety Information</h2>
                  </div>
                  <div className="space-y-4">
                    {supplement.contraindications.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2">Contraindications</h3>
                        <ul className="space-y-1">
                          {supplement.contraindications.map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-muted-foreground">
                              <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {supplement.side_effects.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2">Potential Side Effects</h3>
                        <div className="flex flex-wrap gap-2">
                          {supplement.side_effects.map((effect: string) => (
                            <Badge key={effect} variant="secondary" className="glass-subtle border-orange-500/30">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Sources */}
            {supplement.sources.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <GlassCard className="glass-morph p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold font-heading">Sources & References</h2>
                  </div>
                  <div className="space-y-2">
                    {supplement.sources.map((source: string, index: number) => (
                      <a
                        key={index}
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm">{source}</span>
                      </a>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
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
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`border ${getEvidenceLevelColor(supplement.evidence_level)}`}>
                    {supplement.evidence_level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{supplement.evidence_notes}</p>
              </GlassCard>
            </motion.div>

            {/* Additional Info */}
            {(supplement.bioavailability || supplement.half_life) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <GlassCard className="glass-morph p-6">
                  <h3 className="font-semibold mb-3">Additional Information</h3>
                  <div className="space-y-2 text-sm">
                    {supplement.bioavailability && (
                      <div>
                        <span className="font-medium">Bioavailability:</span>
                        <span className="text-muted-foreground ml-2">{supplement.bioavailability}</span>
                      </div>
                    )}
                    {supplement.half_life && (
                      <div>
                        <span className="font-medium">Half-life:</span>
                        <span className="text-muted-foreground ml-2">{supplement.half_life}</span>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Alternatives */}
            {supplement.alternatives.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <GlassCard className="glass-morph p-6">
                  <h3 className="font-semibold mb-3">Alternatives</h3>
                  <div className="flex flex-wrap gap-2">
                    {supplement.alternatives.map((alt: string) => (
                      <Badge key={alt} variant="outline" className="glass-subtle">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50 p-4 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="max-w-6xl mx-auto flex gap-3">
            <LiquidButton variant="outline" className="flex-1" asChild>
              <Link href="/supplements">
                <X className="h-4 w-4 mr-2" />
                Close
              </Link>
            </LiquidButton>
            <LiquidButton className="flex-1 liquid-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add to Journal
            </LiquidButton>
          </div>
        </motion.div>

        <div className="h-20" />
      </div>
    </div>
  )
}
