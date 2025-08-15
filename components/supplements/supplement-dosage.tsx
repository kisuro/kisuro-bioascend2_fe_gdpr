"use client"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Clock, Pill, Calendar } from "lucide-react"

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
      <div className="flex items-center gap-2 mb-4">
        <Pill className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold font-heading">Dosage Guidelines</h2>
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
            <p className="text-sm font-medium">{supplement.dosageGuidelines.beginner}</p>
          </div>

          <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Intermediate
              </Badge>
            </div>
            <p className="text-sm font-medium">{supplement.dosageGuidelines.intermediate}</p>
          </div>

          <div className="backdrop-blur-md bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
                Advanced
              </Badge>
            </div>
            <p className="text-sm font-medium">{supplement.dosageGuidelines.advanced}</p>
          </div>
        </div>

        {/* Schedule Examples */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Schedule Examples</h3>
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
                    <p className="text-sm text-muted-foreground">{schedule.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
