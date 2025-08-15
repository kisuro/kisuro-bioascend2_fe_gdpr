"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Filter, TrendingUp, Clock, Pill } from "lucide-react"

interface IntakeEntry {
  id: string
  date: string
  time: string
  supplementName: string
  dosage: string
  notes?: string
}

export function JournalHistory() {
  const [entries] = useState<IntakeEntry[]>([
    {
      id: "1",
      date: "2024-01-15",
      time: "08:00",
      supplementName: "Vitamin D3",
      dosage: "2000 IU",
      notes: "Taken with breakfast",
    },
    {
      id: "2",
      date: "2024-01-15",
      time: "20:00",
      supplementName: "Omega-3",
      dosage: "1000mg",
      notes: "After dinner",
    },
    {
      id: "3",
      date: "2024-01-14",
      time: "08:00",
      supplementName: "Vitamin D3",
      dosage: "2000 IU",
    },
    {
      id: "4",
      date: "2024-01-14",
      time: "12:00",
      supplementName: "Magnesium",
      dosage: "400mg",
      notes: "With lunch",
    },
  ])

  const [filterPeriod, setFilterPeriod] = useState("7days")
  const [searchTerm, setSearchTerm] = useState("")

  const exportData = () => {
    const csvContent = [
      ["Date", "Time", "Supplement", "Dosage", "Notes"],
      ...entries.map((entry) => [entry.date, entry.time, entry.supplementName, entry.dosage, entry.notes || ""]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "supplement-history.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.supplementName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.notes && entry.notes.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const groupedEntries = filteredEntries.reduce(
    (groups, entry) => {
      const date = entry.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(entry)
      return groups
    },
    {} as Record<string, IntakeEntry[]>,
  )

  const totalEntries = filteredEntries.length
  const uniqueSupplements = new Set(filteredEntries.map((e) => e.supplementName)).size
  const recentDays = Object.keys(groupedEntries).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Intake History</h2>
          <p className="text-muted-foreground">Review your supplement intake patterns and export data</p>
        </div>
        <LiquidButton onClick={exportData}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </LiquidButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/20">
              <Pill className="h-5 w-5 text-teal-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Entries</p>
              <p className="text-2xl font-bold">{totalEntries}</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20">
              <TrendingUp className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unique Supplements</p>
              <p className="text-2xl font-bold">{uniqueSupplements}</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Days</p>
              <p className="text-2xl font-bold">{recentDays}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search supplements or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </GlassCard>

      {/* History Entries */}
      <div className="space-y-6">
        {Object.entries(groupedEntries)
          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
          .map(([date, dayEntries]) => (
            <motion.div key={date} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} layout>
              <div className="mb-3">
                <h3 className="text-lg font-semibold">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
              </div>
              <div className="space-y-2">
                {dayEntries
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((entry) => (
                    <GlassCard key={entry.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-teal-500/20 mt-1">
                            <Pill className="h-4 w-4 text-teal-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{entry.supplementName}</h4>
                            <p className="text-sm text-muted-foreground">{entry.dosage}</p>
                            {entry.notes && (
                              <p className="text-sm text-muted-foreground mt-1 italic">"{entry.notes}"</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {entry.time}
                        </div>
                      </div>
                    </GlassCard>
                  ))}
              </div>
            </motion.div>
          ))}
      </div>

      {filteredEntries.length === 0 && (
        <GlassCard className="p-8 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No History Found</h3>
          <p className="text-muted-foreground">Start logging your supplement intake to see your history here</p>
        </GlassCard>
      )}
    </div>
  )
}
