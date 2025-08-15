"use client"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BiorhythmChart } from "@/components/biorhythms/biorhythm-chart"
import { BiorhythmSummary } from "@/components/biorhythms/biorhythm-summary"
import { Calendar, Download, RotateCcw, TrendingUp } from "lucide-react"

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

const CYCLES = {
  physical: 23,
  emotional: 28,
  intellectual: 33,
}

function calculateBiorhythm(daysSinceBirth: number, cycle: number): number {
  return Math.sin((2 * Math.PI * daysSinceBirth) / cycle)
}

function findExtrema(data: BiorhythmData[], cycle: keyof typeof CYCLES): ExtremaPoint[] {
  const extrema: ExtremaPoint[] = []
  const values = data.map((d) => ({ date: d.date, value: d[cycle], daysSinceBirth: d.daysSinceBirth }))

  for (let i = 1; i < values.length - 1; i++) {
    const prev = values[i - 1].value
    const curr = values[i].value
    const next = values[i + 1].value

    // Local maximum
    if (curr > prev && curr > next) {
      extrema.push({
        date: values[i].date,
        value: curr,
        type: "max",
        daysSinceBirth: values[i].daysSinceBirth,
      })
    }
    // Local minimum
    else if (curr < prev && curr < next) {
      extrema.push({
        date: values[i].date,
        value: curr,
        type: "min",
        daysSinceBirth: values[i].daysSinceBirth,
      })
    }
  }

  return extrema
}

function getQualitativeLabel(value: number): string {
  if (value > 0.7) return "Excellent"
  if (value > 0.3) return "Good"
  if (value > -0.3) return "Average"
  if (value > -0.7) return "Low"
  return "Critical"
}

export default function BiorhythmsPage() {
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0])
  const [range, setRange] = useState(7)

  const biorhythmData = useMemo(() => {
    if (!dateOfBirth) return []

    const birthDate = new Date(dateOfBirth)
    const target = new Date(targetDate)
    const data: BiorhythmData[] = []

    for (let i = -range; i <= range; i++) {
      const currentDate = new Date(target)
      currentDate.setDate(target.getDate() + i)

      const daysSinceBirth = Math.floor((currentDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))

      data.push({
        date: currentDate.toISOString().split("T")[0],
        physical: calculateBiorhythm(daysSinceBirth, CYCLES.physical),
        emotional: calculateBiorhythm(daysSinceBirth, CYCLES.emotional),
        intellectual: calculateBiorhythm(daysSinceBirth, CYCLES.intellectual),
        daysSinceBirth,
      })
    }

    return data
  }, [dateOfBirth, targetDate, range])

  const extrema = useMemo(() => {
    if (biorhythmData.length === 0) return { physical: [], emotional: [], intellectual: [] }

    return {
      physical: findExtrema(biorhythmData, "physical"),
      emotional: findExtrema(biorhythmData, "emotional"),
      intellectual: findExtrema(biorhythmData, "intellectual"),
    }
  }, [biorhythmData])

  const targetDayData = useMemo(() => {
    return biorhythmData.find((d) => d.date === targetDate)
  }, [biorhythmData, targetDate])

  const handleExport = () => {
    // This would implement image export functionality
    console.log("Exporting biorhythm chart...")
  }

  const handleReset = () => {
    setDateOfBirth("")
    setTargetDate(new Date().toISOString().split("T")[0])
    setRange(7)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 liquid-text font-heading">Biorhythm Calculator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover your natural cycles and optimize your performance with scientific biorhythm analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard className="glass-strong p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold font-heading">Calculate Your Biorhythms</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="dob" className="text-sm font-medium mb-2 block">
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="glass-subtle"
                  />
                </div>

                <div>
                  <Label htmlFor="target" className="text-sm font-medium mb-2 block">
                    Target Date
                  </Label>
                  <Input
                    id="target"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="glass-subtle"
                  />
                </div>

                <div>
                  <Label htmlFor="range" className="text-sm font-medium mb-2 block">
                    Range (±{range} days)
                  </Label>
                  <Input
                    id="range"
                    type="range"
                    min="3"
                    max="30"
                    value={range}
                    onChange={(e) => setRange(Number.parseInt(e.target.value))}
                    className="glass-subtle"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>3 days</span>
                    <span>30 days</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <LiquidButton onClick={handleExport} disabled={!dateOfBirth} variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </LiquidButton>
                  <LiquidButton onClick={handleReset} variant="ghost">
                    <RotateCcw className="h-4 w-4" />
                  </LiquidButton>
                </div>
              </div>
            </GlassCard>

            {/* Legend */}
            <GlassCard className="glass-subtle p-4 mt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Biorhythm Cycles
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-0.5 bg-chart-1 rounded"></div>
                  <span>Physical (23 days)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-0.5 bg-chart-2 rounded"></div>
                  <span>Emotional (28 days)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-0.5 bg-chart-3 rounded"></div>
                  <span>Intellectual (33 days)</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Chart and Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GlassCard className="glass-strong p-6">
                <BiorhythmChart data={biorhythmData} targetDate={targetDate} extrema={extrema} />
              </GlassCard>
            </motion.div>

            {/* Summary */}
            {targetDayData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <BiorhythmSummary data={targetDayData} extrema={extrema} targetDate={targetDate} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
