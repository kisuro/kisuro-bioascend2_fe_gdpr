"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JournalOverview } from "@/components/journal/journal-overview"
import { SupplementManager } from "@/components/journal/supplement-manager"
import { IntakeLogger } from "@/components/journal/intake-logger"
import { ReminderManager } from "@/components/journal/reminder-manager"
import { JournalHistory } from "@/components/journal/journal-history"
import { BookOpen, Plus, Bell, History, Shield } from "lucide-react"
import { JournalBackground } from "@/components/ui/page-backgrounds"

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <JournalBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 liquid-text font-heading">Personal Journal</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your supplement intake, monitor progress, and optimize your biohacking journey
          </p>
        </motion.div>

        {/* Medical Disclaimer */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <GlassCard className="glass-subtle p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Medical Disclaimer:</strong> This journal is for tracking purposes
                only. Always consult with a qualified healthcare professional before starting, stopping, or changing any
                supplement regimen. Do not use this information to diagnose or treat any health condition.
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="glass-strong p-1">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="supplements" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Supplements</span>
                </TabsTrigger>
                <TabsTrigger value="intake" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Log Intake</span>
                </TabsTrigger>
                <TabsTrigger value="reminders" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Reminders</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">History</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8">
              <JournalOverview />
            </TabsContent>

            <TabsContent value="supplements" className="space-y-8">
              <SupplementManager />
            </TabsContent>

            <TabsContent value="intake" className="space-y-8">
              <IntakeLogger />
            </TabsContent>

            <TabsContent value="reminders" className="space-y-8">
              <ReminderManager />
            </TabsContent>

            <TabsContent value="history" className="space-y-8">
              <JournalHistory />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
