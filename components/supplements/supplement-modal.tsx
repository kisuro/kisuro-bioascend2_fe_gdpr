"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Star, Clock, Zap, AlertTriangle, CheckCircle, ExternalLink, Plus, Minus, Info } from "lucide-react"

interface Supplement {
  id: string
  slug: string
  name: string
  category: string
  goals: string[]
  tags: string[]
  description: string
  benefits: string[]
  dosage: string
  dosage_range: {
    min: number | null
    max: number | null
    unit: string | null
    notes: string
  }
  forms: string[]
  timing: string
  cycle: string
  bioavailability: string
  half_life: string | null
  interactions: {
    synergizes_with: string[]
    avoid_with: string[]
  }
  contraindications: string[]
  side_effects: string[]
  restrictions: string[]
  alternatives: string[]
  included_in_stacks: string[]
  evidence_level: string
  evidence_notes: string
  sources: string[]
  rating: {
    avg: number | null
    count: number
  }
  images: string[]
  sku: string | null
}

interface SupplementModalProps {
  supplement: Supplement
  isOpen: boolean
  onClose: () => void
}

const getEvidenceColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "strong":
      return "text-green-500"
    case "moderate":
      return "text-yellow-500"
    case "limited":
      return "text-orange-500"
    case "insufficient":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}

const getEvidenceIcon = (level: string) => {
  switch (level.toLowerCase()) {
    case "strong":
      return "🟢"
    case "moderate":
      return "🟡"
    case "limited":
      return "🟠"
    case "insufficient":
      return "🔴"
    default:
      return "⚪"
  }
}

export function SupplementModal({ supplement, isOpen, onClose }: SupplementModalProps) {
  const router = useRouter()

  const handleGoalClick = (goal: string) => {
    onClose() // Close the modal first
    router.push(`/supplements?goals=${encodeURIComponent(goal)}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay bg-black/50 backdrop-blur-sm z-modal">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="modal-content max-w-4xl"
          >
            <GlassCard className="glass-strong">
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-border/50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{supplement.name}</h2>
                    {supplement.rating.avg && (
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{supplement.rating.avg.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">({supplement.rating.count})</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{supplement.category}</Badge>
                    <div className="flex items-center gap-1">
                      <span>{getEvidenceIcon(supplement.evidence_level)}</span>
                      <span className={`font-medium ${getEvidenceColor(supplement.evidence_level)}`}>
                        {supplement.evidence_level} evidence
                      </span>
                    </div>
                  </div>
                </div>
                <LiquidButton variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-5 w-5" />
                </LiquidButton>
              </div>

              {/* Content */}
              <ScrollArea className="max-h-[70vh]">
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{supplement.description}</p>
                  </div>

                  {/* Goals */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Goals</h3>
                    <div className="flex flex-wrap gap-2">
                      {supplement.goals.map((goal) => (
                        <Badge 
                          key={goal} 
                          variant="secondary"
                          onClick={() => handleGoalClick(goal)}
                          className="cursor-pointer hover:bg-secondary/80 transition-colors"
                        >
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  {supplement.benefits.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                      <ul className="space-y-2">
                        {supplement.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Dosage Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Dosage & Timing</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span className="font-medium">Dosage:</span>
                          <span className="text-muted-foreground">{supplement.dosage}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">Timing:</span>
                          <span className="text-muted-foreground">{supplement.timing}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-primary" />
                          <span className="font-medium">Cycle:</span>
                          <span className="text-muted-foreground">{supplement.cycle}</span>
                        </div>
                      </div>
                      {supplement.dosage_range.notes && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">{supplement.dosage_range.notes}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Forms & Bioavailability</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Available forms:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {supplement.forms.map((form) => (
                              <Badge key={form} variant="outline" className="text-xs">
                                {form}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Bioavailability:</span>
                          <span className="text-muted-foreground ml-2">{supplement.bioavailability}</span>
                        </div>
                        {supplement.half_life && (
                          <div>
                            <span className="font-medium">Half-life:</span>
                            <span className="text-muted-foreground ml-2">{supplement.half_life}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Interactions */}
                  {(supplement.interactions.synergizes_with.length > 0 ||
                    supplement.interactions.avoid_with.length > 0) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Interactions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {supplement.interactions.synergizes_with.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Plus className="h-4 w-4 text-green-500" />
                              <span className="font-medium text-green-500">Synergizes with:</span>
                            </div>
                            <div className="space-y-1">
                              {supplement.interactions.synergizes_with.map((item) => (
                                <div key={item} className="text-sm text-muted-foreground">
                                  • {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {supplement.interactions.avoid_with.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Minus className="h-4 w-4 text-red-500" />
                              <span className="font-medium text-red-500">Avoid with:</span>
                            </div>
                            <div className="space-y-1">
                              {supplement.interactions.avoid_with.map((item) => (
                                <div key={item} className="text-sm text-muted-foreground">
                                  • {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Safety Information */}
                  {(supplement.side_effects.length > 0 ||
                    supplement.contraindications.length > 0 ||
                    supplement.restrictions.length > 0) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        Safety Information
                      </h3>
                      <div className="space-y-4">
                        {supplement.side_effects.length > 0 && (
                          <div>
                            <span className="font-medium">Possible side effects:</span>
                            <div className="mt-1 space-y-1">
                              {supplement.side_effects.map((effect) => (
                                <div key={effect} className="text-sm text-muted-foreground">
                                  • {effect}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {supplement.contraindications.length > 0 && (
                          <div>
                            <span className="font-medium">Contraindications:</span>
                            <div className="mt-1 space-y-1">
                              {supplement.contraindications.map((contra) => (
                                <div key={contra} className="text-sm text-muted-foreground">
                                  • {contra}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {supplement.restrictions.length > 0 && (
                          <div>
                            <span className="font-medium">Restrictions:</span>
                            <div className="mt-1 space-y-1">
                              {supplement.restrictions.map((restriction) => (
                                <div key={restriction} className="text-sm text-muted-foreground">
                                  • {restriction}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Evidence & Sources */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Evidence & Sources</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">{supplement.evidence_notes}</p>
                      </div>
                      {supplement.sources.length > 0 && (
                        <div>
                          <span className="font-medium">Sources:</span>
                          <div className="mt-2 space-y-2">
                            {supplement.sources.map((source, index) => (
                              <a
                                key={index}
                                href={source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" />
                                {source}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Alternatives */}
                  {supplement.alternatives.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Alternatives</h3>
                      <div className="flex flex-wrap gap-2">
                        {supplement.alternatives.map((alt) => (
                          <Badge key={alt} variant="outline">
                            {alt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-border/50">
                <LiquidButton variant="outline" onClick={onClose}>
                  Close
                </LiquidButton>
                <LiquidButton>Add to Journal</LiquidButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
