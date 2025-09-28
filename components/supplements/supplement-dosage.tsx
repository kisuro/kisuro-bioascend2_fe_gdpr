"use client"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Clock, Pill, Calendar, Info, AlertTriangle } from "lucide-react"
import { journalFeatureEnabled } from "@/lib/features"

interface SupplementDosageProps {
  supplement: {
    dosageGuidelines: {
      beginner: string
      intermediate: string
      advanced: string
    }
    scheduleExamples: {
      timing: string
      frequency: string
      notes: string
    }[]
  }
}

export function SupplementDosage({ supplement }: SupplementDosageProps) {
  return (
    <GlassCard className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Pill className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold font-heading">Dosage Guidelines</h2>
        </div>

        <div className="backdrop-blur-md bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-100">
              <p className="font-medium mb-2">Understanding Dosage Levels:</p>
              <ul className="space-y-1 text-blue-200/80">
                <li>
                  <strong>Beginner:</strong> Start here if you're new to this supplement or sensitive to new substances
                </li>
                <li>
                  <strong>Intermediate:</strong> For those with some experience or after 2-4 weeks on beginner dose
                </li>
                <li>
                  <strong>Advanced:</strong> Maximum effective dose for experienced users with established tolerance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Dosage Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="backdrop-blur-md bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                Beginner
              </Badge>
            </div>
            <p className="text-sm font-medium mb-2">{supplement.dosageGuidelines.beginner}</p>
            <p className="text-xs text-green-300/70">
              Recommended starting dose. Monitor for 1-2 weeks before increasing.
            </p>
          </div>

          <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Intermediate
              </Badge>
            </div>
            <p className="text-sm font-medium mb-2">{supplement.dosageGuidelines.intermediate}</p>
            <p className="text-xs text-yellow-300/70">
              Standard effective dose for most users with established tolerance.
            </p>
          </div>

          <div className="backdrop-blur-md bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
                Advanced
              </Badge>
            </div>
            <p className="text-sm font-medium mb-2">{supplement.dosageGuidelines.advanced}</p>
            <p className="text-xs text-red-300/70">
              Maximum dose. Only for experienced users. Monitor closely for side effects.
            </p>
          </div>
        </div>

        <div className="backdrop-blur-md bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-200 mb-1">Important Safety Guidelines:</p>
              <ul className="space-y-1 text-amber-200/80 text-xs">
                <li>• Always start with the beginner dose regardless of experience with other supplements</li>
                <li>• Take with food unless otherwise specified to improve absorption and reduce stomach upset</li>
                <li>• Consult healthcare provider before use if pregnant, nursing, or taking medications</li>
                <li>• Discontinue use and consult a doctor if adverse reactions occur</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Schedule Examples */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Schedule Examples</h3>
          </div>

          <div className="backdrop-blur-md bg-purple-500/5 border border-purple-500/20 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Info className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-purple-100">
                <p className="font-medium mb-2">Optimal Timing & Frequency:</p>
                <p className="text-purple-200/80 text-xs">
                  These examples show when and how often to take this supplement for maximum effectiveness. Timing can
                  significantly impact absorption, bioavailability, and potential interactions with other supplements or
                  medications.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {supplement.scheduleExamples.map((schedule, index) => (
              <div key={index} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{schedule.timing}</span>
                      <Badge variant="outline" className="text-xs">
                        {schedule.frequency}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{schedule.notes}</p>
                    <div className="text-xs text-muted-foreground/70">
                      {index === 0 && "💡 Best for: Consistent daily routine, steady blood levels"}
                      {index === 1 && "💡 Best for: Maximizing absorption, reducing side effects"}
                      {index === 2 && "💡 Best for: Targeting specific times when benefits are most needed"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 backdrop-blur-md bg-teal-500/5 border border-teal-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-teal-200 mb-1">Personalizing Your Schedule:</p>
                <p className="text-teal-200/80 text-xs">
                  {journalFeatureEnabled
                    ? "Individual responses vary. Track your experience in your journal to find the optimal timing and dosage that works best for your body, lifestyle, and health goals. Consider factors like meal timing, sleep schedule, and other supplements when planning your routine."
                    : "Individual responses vary. Keep notes about your experience to find the optimal timing and dosage that works best for your body, lifestyle, and health goals. Consider factors like meal timing, sleep schedule, and other supplements when planning your routine."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
