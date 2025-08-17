"use client"
import { GlassCard } from "@/components/ui/glass-card"
import { TrendingUp, TrendingDown, Activity, Brain, Heart, Eye, Sparkles, Palette, Users } from "lucide-react"

interface BiorhythmData {
  date: string
  physical: number
  emotional: number
  intellectual: number
  intuitive?: number
  spiritual?: number
  aesthetic?: number
  charismatic?: number
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
  intuitive?: ExtremaPoint[]
  spiritual?: ExtremaPoint[]
  aesthetic?: ExtremaPoint[]
  charismatic?: ExtremaPoint[]
}

interface BiorhythmSummaryProps {
  data: BiorhythmData
  extrema: BiorhythmExtrema
  targetDate: string
  showAdditional?: {
    intuitive: boolean
    spiritual: boolean
    aesthetic: boolean
    charismatic: boolean
  }
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

function getBiorhythmDescription(name: string, value: number): string {
  const percentage = Math.round(value * 100)

  switch (name) {
    case "Physical":
      if (value > 0.7)
        return `Your physical energy is at peak performance (${percentage > 0 ? "+" : ""}${percentage}%). Excellent time for intense workouts, sports, or physically demanding tasks.`
      if (value > 0.3)
        return `Your physical energy is good (${percentage > 0 ? "+" : ""}${percentage}%). Great for moderate exercise, outdoor activities, or manual work.`
      if (value > -0.3)
        return `Your physical energy is balanced (${percentage > 0 ? "+" : ""}${percentage}%). Maintain regular activity levels and listen to your body.`
      if (value > -0.7)
        return `Your physical energy is low (${percentage}%). Consider lighter activities, stretching, or gentle movement.`
      return `Your physical energy is at a critical low (${percentage}%). Focus on rest, recovery, and avoid strenuous activities.`

    case "Emotional":
      if (value > 0.7)
        return `Your emotional state is excellent (${percentage > 0 ? "+" : ""}${percentage}%). Perfect for social interactions, creative projects, and building relationships.`
      if (value > 0.3)
        return `Your emotional state is positive (${percentage > 0 ? "+" : ""}${percentage}%). Good time for teamwork, artistic endeavors, and meaningful conversations.`
      if (value > -0.3)
        return `Your emotional state is stable (${percentage > 0 ? "+" : ""}${percentage}%). Maintain emotional balance and practice mindfulness.`
      if (value > -0.7)
        return `Your emotional state is low (${percentage}%). Be patient with yourself and others, avoid major emotional decisions.`
      return `Your emotional state is critical (${percentage}%). Focus on self-care, seek support, and postpone emotionally challenging situations.`

    case "Intellectual":
      if (value > 0.7)
        return `Your mental clarity is exceptional (${percentage > 0 ? "+" : ""}${percentage}%). Ideal for complex problem-solving, learning new skills, and important decisions.`
      if (value > 0.3)
        return `Your mental clarity is sharp (${percentage > 0 ? "+" : ""}${percentage}%). Great for studying, analytical work, and strategic planning.`
      if (value > -0.3)
        return `Your mental clarity is average (${percentage > 0 ? "+" : ""}${percentage}%). Handle routine tasks and avoid overly complex challenges.`
      if (value > -0.7)
        return `Your mental clarity is low (${percentage}%). Take breaks, avoid important decisions, and focus on simple tasks.`
      return `Your mental clarity is critically low (${percentage}%). Rest your mind, avoid complex thinking, and postpone important decisions.`

    case "Intuitive":
      if (value > 0.7)
        return `Your intuitive abilities are heightened (${percentage > 0 ? "+" : ""}${percentage}%). Trust your instincts, practice meditation, and pay attention to subtle insights.`
      if (value > 0.3)
        return `Your intuitive sense is strong (${percentage > 0 ? "+" : ""}${percentage}%). Good time for creative problem-solving and following your gut feelings.`
      if (value > -0.3)
        return `Your intuitive abilities are balanced (${percentage > 0 ? "+" : ""}${percentage}%). Combine logical thinking with intuitive insights.`
      if (value > -0.7)
        return `Your intuitive sense is low (${percentage}%). Rely more on logical analysis and avoid making decisions based solely on hunches.`
      return `Your intuitive abilities are at a low point (${percentage}%). Focus on concrete facts and analytical thinking.`

    case "Spiritual":
      if (value > 0.7)
        return `Your spiritual awareness is elevated (${percentage > 0 ? "+" : ""}${percentage}%). Excellent time for meditation, spiritual practices, and connecting with deeper meaning.`
      if (value > 0.3)
        return `Your spiritual connection is strong (${percentage > 0 ? "+" : ""}${percentage}%). Good for reflection, mindfulness practices, and exploring personal values.`
      if (value > -0.3)
        return `Your spiritual state is balanced (${percentage > 0 ? "+" : ""}${percentage}%). Maintain regular spiritual practices and stay grounded.`
      if (value > -0.7)
        return `Your spiritual energy is low (${percentage}%). Focus on practical matters and gentle spiritual practices.`
      return `Your spiritual connection feels distant (${percentage}%). Be patient with yourself and focus on basic grounding practices.`

    case "Aesthetic":
      if (value > 0.7)
        return `Your aesthetic sensitivity is peak (${percentage > 0 ? "+" : ""}${percentage}%). Perfect for creative projects, art appreciation, and design work.`
      if (value > 0.3)
        return `Your aesthetic sense is heightened (${percentage > 0 ? "+" : ""}${percentage}%). Great time for artistic endeavors and beautifying your environment.`
      if (value > -0.3)
        return `Your aesthetic awareness is balanced (${percentage > 0 ? "+" : ""}${percentage}%). Appreciate beauty in everyday moments.`
      if (value > -0.7)
        return `Your aesthetic sensitivity is low (${percentage}%). Focus on functional rather than decorative aspects.`
      return `Your aesthetic sense is diminished (${percentage}%). Postpone major design decisions and focus on practical matters.`

    case "Charismatic":
      if (value > 0.7)
        return `Your charisma is at its peak (${percentage > 0 ? "+" : ""}${percentage}%). Excellent for leadership, public speaking, and influential conversations.`
      if (value > 0.3)
        return `Your charismatic presence is strong (${percentage > 0 ? "+" : ""}${percentage}%). Good time for networking, presentations, and social leadership.`
      if (value > -0.3)
        return `Your charismatic energy is balanced (${percentage > 0 ? "+" : ""}${percentage}%). Maintain authentic connections and steady influence.`
      if (value > -0.7)
        return `Your charismatic presence is low (${percentage}%). Focus on listening and supporting others rather than leading.`
      return `Your charismatic energy is at a low point (${percentage}%). Avoid important presentations and focus on behind-the-scenes work.`

    default:
      return `Current level: ${percentage > 0 ? "+" : ""}${percentage}%`
  }
}

export function BiorhythmSummary({ data, extrema, targetDate, showAdditional }: BiorhythmSummaryProps) {
  const cycles = [
    {
      name: "Physical",
      value: data.physical,
      icon: Activity,
      color: "text-[#E57373]",
      cycle: 23,
      extrema: extrema.physical,
      description: "Energy, strength, and physical coordination",
    },
    {
      name: "Emotional",
      value: data.emotional,
      icon: Heart,
      color: "text-[#64B5F6]",
      cycle: 28,
      extrema: extrema.emotional,
      description: "Mood, creativity, and interpersonal relationships",
    },
    {
      name: "Intellectual",
      value: data.intellectual,
      icon: Brain,
      color: "text-[#81C784]",
      cycle: 33,
      extrema: extrema.intellectual,
      description: "Mental clarity, analytical thinking, and memory",
    },
  ]

  if (showAdditional?.intuitive && data.intuitive !== undefined) {
    cycles.push({
      name: "Intuitive",
      value: data.intuitive,
      icon: Eye,
      color: "text-[#FFB74D]",
      cycle: 38,
      extrema: extrema.intuitive || [],
      description: "Instinct, inner wisdom, and subconscious insights",
    })
  }

  if (showAdditional?.spiritual && data.spiritual !== undefined) {
    cycles.push({
      name: "Spiritual",
      value: data.spiritual,
      icon: Sparkles,
      color: "text-[#BA68C8]",
      cycle: 53,
      extrema: extrema.spiritual || [],
      description: "Connection to higher purpose and inner peace",
    })
  }

  if (showAdditional?.aesthetic && data.aesthetic !== undefined) {
    cycles.push({
      name: "Aesthetic",
      value: data.aesthetic,
      icon: Palette,
      color: "text-[#4DB6AC]",
      cycle: 43,
      extrema: extrema.aesthetic || [],
      description: "Appreciation of beauty, art, and design",
    })
  }

  if (showAdditional?.charismatic && data.charismatic !== undefined) {
    cycles.push({
      name: "Charismatic",
      value: data.charismatic,
      icon: Users,
      color: "text-[#F06292]",
      cycle: 48,
      extrema: extrema.charismatic || [],
      description: "Personal magnetism and social influence",
    })
  }

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

                <div className="mt-4 p-3 rounded-lg glass-subtle">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {getBiorhythmDescription(cycle.name, cycle.value)}
                  </p>
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
        <h3 className="font-semibold mb-4">Daily Insights</h3>
        <div className="p-4 rounded-lg glass-subtle border-l-4 border-primary">
          <h4 className="font-medium text-primary mb-2">Today's Recommendation</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {(() => {
              const highCycles = cycles.filter((c) => c.value > 0.3).map((c) => c.name.toLowerCase())
              const lowCycles = cycles.filter((c) => c.value < -0.3).map((c) => c.name.toLowerCase())

              if (highCycles.length >= 2) {
                return `With ${highCycles.join(" and ")} cycles running high, this is an excellent day for activities that combine these strengths. Take advantage of this positive alignment.`
              } else if (lowCycles.length >= 2) {
                return `With ${lowCycles.join(" and ")} cycles running low, focus on rest, recovery, and gentle activities. This is a natural time for restoration.`
              } else if (highCycles.length === 1) {
                return `Your ${highCycles[0]} cycle is strong today. Focus activities around this strength while being mindful of other areas that may need more care.`
              } else {
                return "Your biorhythms are in a balanced state today. This is a good time for routine activities and maintaining steady progress in all areas."
              }
            })()}
          </p>
        </div>
      </GlassCard>
    </div>
  )
}
