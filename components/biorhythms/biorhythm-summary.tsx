"use client"
import { GlassCard } from "@/components/ui/glass-card"
import { TrendingUp, TrendingDown, Activity, Brain, Heart } from "lucide-react"

interface BiorhythmData {
  date: string
  physical: number
  emotional: number
  intellectual: number
  daysSinceBirth: number
}

interface ExtremaPoint {
  date: string
  value: number
  type: "max" | "min"
  daysSinceBirth: number
}

interface BiorhythmExtrema {
  physical: ExtremaPoint[]
  emotional: ExtremaPoint[]
  intellectual: ExtremaPoint[]
}

interface BiorhythmSummaryProps {
  data: BiorhythmData
  extrema: BiorhythmExtrema
  targetDate: string
}

function getQualitativeLabel(value: number): string {
  if (value > 0.7) return "Excellent"
  if (value > 0.3) return "Good"
  if (value > -0.3) return "Average"
  if (value > -0.7) return "Low"
  return "Critical"
}

function getStatusColor(value: number): string {
  if (value > 0.7) return "text-green-500"
  if (value > 0.3) return "text-blue-500"
  if (value > -0.3) return "text-yellow-500"
  if (value > -0.7) return "text-orange-500"
  return "text-red-500"
}

function calculateNextExtrema(daysSinceBirth: number, cycle: number, targetDate: string) {
  const targetDays = Math.floor(
    (new Date(targetDate).getTime() - new Date(1970, 0, 1).getTime()) / (1000 * 60 * 60 * 24),
  )
  const birthDays = targetDays - daysSinceBirth

  // Calculate the phase of the current cycle
  const currentPhase = (2 * Math.PI * daysSinceBirth) / cycle

  // Find next maximum (when sin = 1, phase = π/2 + 2πn)
  let nextMaxPhase = Math.PI / 2
  while (nextMaxPhase <= currentPhase) {
    nextMaxPhase += 2 * Math.PI
  }
  const daysToNextMax = Math.ceil((nextMaxPhase * cycle) / (2 * Math.PI) - daysSinceBirth)

  // Find next minimum (when sin = -1, phase = 3π/2 + 2πn)
  let nextMinPhase = (3 * Math.PI) / 2
  while (nextMinPhase <= currentPhase) {
    nextMinPhase += 2 * Math.PI
  }
  const daysToNextMin = Math.ceil((nextMinPhase * cycle) / (2 * Math.PI) - daysSinceBirth)

  // Calculate actual dates
  const targetTime = new Date(targetDate).getTime()
  const nextMaxDate = new Date(targetTime + daysToNextMax * 24 * 60 * 60 * 1000)
  const nextMinDate = new Date(targetTime + daysToNextMin * 24 * 60 * 60 * 1000)

  return {
    nextMaximum: {
      date: nextMaxDate.toISOString().split("T")[0],
      type: "max" as const,
    },
    nextMinimum: {
      date: nextMinDate.toISOString().split("T")[0],
      type: "min" as const,
    },
  }
}

export function BiorhythmSummary({ data, extrema, targetDate }: BiorhythmSummaryProps) {
  const cycles = [
    {
      name: "Physical",
      value: data.physical,
      icon: Activity,
      color: "text-[#E57373]", // Use exact biorhythm colors
      cycle: 23,
      extrema: extrema.physical,
      description: "Energy, strength, and physical coordination",
    },
    {
      name: "Emotional",
      value: data.emotional,
      icon: Heart,
      color: "text-[#64B5F6]", // Use exact biorhythm colors
      cycle: 28,
      extrema: extrema.emotional,
      description: "Mood, creativity, and interpersonal relationships",
    },
    {
      name: "Intellectual",
      value: data.intellectual,
      icon: Brain,
      color: "text-[#81C784]", // Use exact biorhythm colors
      cycle: 33,
      extrema: extrema.intellectual,
      description: "Mental clarity, analytical thinking, and memory",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 font-heading">
          Biorhythm Summary for {new Date(targetDate).toLocaleDateString()}
        </h2>
        <p className="text-muted-foreground">Day {data.daysSinceBirth} since birth</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cycles.map((cycle) => {
          const Icon = cycle.icon
          const percentage = Math.round(cycle.value * 100)
          const label = getQualitativeLabel(cycle.value)
          const statusColor = getStatusColor(cycle.value)
          const { nextMaximum, nextMinimum } = calculateNextExtrema(data.daysSinceBirth, cycle.cycle, targetDate)

          return (
            <GlassCard key={cycle.name} className="glass-morph p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg glass-subtle ${cycle.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{cycle.name}</h3>
                  <p className="text-xs text-muted-foreground">{cycle.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Level</span>
                  <span className={`font-bold ${statusColor}`}>
                    {percentage > 0 ? "+" : ""}
                    {percentage}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className={`text-sm font-medium ${statusColor}`}>{label}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Next Maximum
                  </span>
                  <span className="text-green-500">
                    {new Date(nextMaximum.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    Next Minimum
                  </span>
                  <span className="text-red-500">
                    {new Date(nextMinimum.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>

      <GlassCard className="glass-subtle p-6">
        <h3 className="font-semibold mb-3">Daily Insights</h3>
        <div className="space-y-2 text-sm">
          {data.physical > 0.5 && (
            <p className="text-green-600">
              • Your physical energy is high today - great time for workouts or physical activities
            </p>
          )}
          {data.emotional > 0.5 && (
            <p className="text-blue-600">
              • You're in a positive emotional state - ideal for social interactions and creative work
            </p>
          )}
          {data.intellectual > 0.5 && (
            <p className="text-purple-600">
              • Your mental clarity is sharp - perfect for learning, problem-solving, and decision-making
            </p>
          )}
          {Math.max(data.physical, data.emotional, data.intellectual) < 0 && (
            <p className="text-orange-600">
              • All cycles are in low phases - consider taking it easy and focusing on rest and recovery
            </p>
          )}
        </div>
      </GlassCard>
    </div>
  )
}
