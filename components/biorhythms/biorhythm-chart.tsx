"use client"
import { useMemo } from "react"
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
} from "chart.js"
import { Line } from "react-chartjs-2"

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
          borderColor: "#ef4444", // red-500
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
        },
        {
          label: "Emotional",
          data: data.map((d) => d.emotional),
          borderColor: "#ec4899", // pink-500
          backgroundColor: "rgba(236, 72, 153, 0.1)",
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
        },
        {
          label: "Intellectual",
          data: data.map((d) => d.intellectual),
          borderColor: "#06b6d4", // cyan-500
          backgroundColor: "rgba(6, 182, 212, 0.1)",
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
        },
      ],
    }
  }, [data])

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "hsl(var(--foreground))",
          font: {
            size: 12,
            weight: "500",
          },
          usePointStyle: true,
          pointStyle: "line",
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
          color: "hsla(var(--border), 0.3)",
        },
        ticks: {
          color: "hsl(var(--muted-foreground))",
          font: {
            size: 11,
          },
        },
      },
      y: {
        min: -1,
        max: 1,
        grid: {
          color: "hsla(var(--border), 0.3)",
        },
        ticks: {
          color: "hsl(var(--muted-foreground))",
          font: {
            size: 11,
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
          <div className="text-4xl mb-2">📊</div>
          <p>Enter your date of birth to see your biorhythm chart</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-96">
      <Line data={chartData} options={options} />
    </div>
  )
}
