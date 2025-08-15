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

function findNearestExtrema(extrema: ExtremaPoint[], targetDate: string) {
  const target = new Date(targetDate).getTime()

  let nearestMax: ExtremaPoint | null = null
  let nearestMin: ExtremaPoint | null = null
  let minMaxDistance = Number.POSITIVE_INFINITY
  let minMinDistance = Number.POSITIVE_INFINITY

  extrema.forEach((point) => {
    const pointTime = new Date(point.date).getTime()
    const distance = Math.abs(pointTime - target)

    if (point.type === "max" && distance < minMaxDistance) {
      minMaxDistance = distance
      nearestMax = point
    } else if (point.type === "min" && distance < minMinDistance) {
      minMinDistance = distance
      nearestMin = point
    }
  })

  return { nearestMax, nearestMin }
}

export function BiorhythmSummary({ data, extrema, targetDate }: BiorhythmSummaryProps) {
  const cycles = [
    {
      name: "Physical",
      value: data.physical,
      icon: Activity,
      color: "text-chart-1",
      extrema: extrema.physical,
      description: "Energy, strength, and physical coordination",
    },
    {
      name: "Emotional",
      value: data.emotional,
      icon: Heart,
      color: "text-chart-2",
      extrema: extrema.emotional,
      description: "Mood, creativity, and interpersonal relationships",
    },
    {
      name: "Intellectual",
      value: data.intellectual,
      icon: Brain,
      color: "text-chart-3",
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
          const { nearestMax, nearestMin } = findNearestExtrema(cycle.extrema, targetDate)

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

                {nearestMax && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Next Peak
                    </span>
                    <span className="text-green-500">
                      {new Date(nearestMax.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                )}

                {nearestMin && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      Next Low
                    </span>
                    <span className="text-red-500">
                      {new Date(nearestMin.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                )}
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Overall Insights */}
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
