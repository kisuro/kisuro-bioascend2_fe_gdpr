"use client"
import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type Plugin,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { Activity, Brain, Heart } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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

interface BiorhythmChartProps {
  data: BiorhythmData[]
  targetDate: string
  extrema: BiorhythmExtrema
}

export function BiorhythmChart({ data, targetDate, extrema }: BiorhythmChartProps) {
  const chartData = useMemo(() => {
    const labels = data.map((d) => {
      const date = new Date(d.date)
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    })

    return {
      labels,
      datasets: [
        {
          label: "Physical",
          data: data.map((d) => d.physical),
          borderColor: "rgba(229, 115, 115, 0.8)",
          backgroundColor: "rgba(229, 115, 115, 0.1)",
          borderWidth: 4,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.5,
          shadowColor: "rgba(229, 115, 115, 0.3)",
          shadowBlur: 8,
        },
        {
          label: "Emotional",
          data: data.map((d) => d.emotional),
          borderColor: "rgba(100, 181, 246, 0.8)",
          backgroundColor: "rgba(100, 181, 246, 0.1)",
          borderWidth: 4,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.5,
          shadowColor: "rgba(100, 181, 246, 0.3)",
          shadowBlur: 8,
        },
        {
          label: "Intellectual",
          data: data.map((d) => d.intellectual),
          borderColor: "rgba(129, 199, 132, 0.8)",
          backgroundColor: "rgba(129, 199, 132, 0.1)",
          borderWidth: 4,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.5,
          shadowColor: "rgba(129, 199, 132, 0.3)",
          shadowBlur: 8,
        },
      ],
    }
  }, [data])

  const targetDateIndex = useMemo(() => {
    return data.findIndex((d) => d.date === targetDate)
  }, [data, targetDate])

  const targetDatePlugin: Plugin<"line"> = {
    id: "targetDateLine",
    afterDraw: (chart) => {
      if (targetDateIndex >= 0) {
        const ctx = chart.ctx
        const xAxis = chart.scales.x
        const yAxis = chart.scales.y

        const x = xAxis.getPixelForValue(targetDateIndex)
        const topY = yAxis.top
        const bottomY = yAxis.bottom

        ctx.save()
        ctx.strokeStyle = "rgba(200, 200, 200, 0.6)"
        ctx.lineWidth = 3
        ctx.setLineDash([8, 4])
        ctx.beginPath()
        ctx.moveTo(x, topY)
        ctx.lineTo(x, bottomY)
        ctx.stroke()

        ctx.restore()
      }
    },
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(156, 163, 175, 0.8)",
          font: {
            family: "system-ui, -apple-system, sans-serif",
            size: 12,
            weight: "400",
          },
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
        },
      },
      tooltip: {
        backgroundColor: "hsla(var(--popover), 0.95)",
        titleColor: "hsl(var(--popover-foreground))",
        bodyColor: "hsl(var(--popover-foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y
            const percentage = Math.round(value * 100)
            return `${context.dataset.label}: ${percentage}%`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          color: "rgba(156, 163, 175, 0.6)",
          width: 2,
        },
        ticks: {
          color: "rgba(156, 163, 175, 0.8)",
          font: {
            family: "system-ui, -apple-system, sans-serif",
            size: 11,
            weight: "400",
          },
          callback: (value, index) => {
            const date = new Date(data[index]?.date || "")
            const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
            return label
          },
        },
      },
      y: {
        min: -1,
        max: 1,
        grid: {
          display: false,
        },
        border: {
          color: "rgba(156, 163, 175, 0.6)",
          width: 2,
        },
        ticks: {
          color: "rgba(156, 163, 175, 0.8)",
          font: {
            family: "system-ui, -apple-system, sans-serif",
            size: 11,
            weight: "400",
          },
          callback: (value) => `${Math.round(Number(value) * 100)}%`,
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: "hsl(var(--background))",
        hoverBorderWidth: 2,
      },
    },
  }

  if (data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="flex justify-center gap-4 mb-6">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0,
              }}
            >
              <Activity className="h-8 w-8 text-[#E57373]" />
            </motion.div>
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.3,
              }}
            >
              <Heart className="h-8 w-8 text-[#64B5F6]" />
            </motion.div>
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.6,
              }}
            >
              <Brain className="h-8 w-8 text-[#81C784]" />
            </motion.div>
          </div>
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-lg"
          >
            Enter your date of birth to see your biorhythm chart
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-96">
      <Line data={chartData} options={options} plugins={[targetDatePlugin]} />
    </div>
  )
}
