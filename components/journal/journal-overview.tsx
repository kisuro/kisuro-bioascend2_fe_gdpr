"use client"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, Zap, AlertCircle, CheckCircle, Clock, Bell } from "lucide-react"
import { mockJournalData } from "@/lib/data/journal"

export function JournalOverview() {
  const { userSupplements, recentIntakes, upcomingReminders, stats } = mockJournalData

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="glass-morph p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass-subtle">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.activeSupplements}</p>
              <p className="text-sm text-muted-foreground">Active Supplements</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="glass-morph p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass-subtle">
              <Calendar className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.streakDays}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="glass-morph p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass-subtle">
              <TrendingUp className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.complianceRate}%</p>
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="glass-morph p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass-subtle">
              <CheckCircle className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalIntakes}</p>
              <p className="text-sm text-muted-foreground">Total Intakes</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <GlassCard className="glass-strong p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold font-heading">Today's Schedule</h2>
            <Badge variant="outline" className="glass-subtle">
              {new Date().toLocaleDateString()}
            </Badge>
          </div>

          <div className="space-y-4">
            {userSupplements.slice(0, 4).map((supplement) => (
              <div key={supplement.id} className="flex items-center justify-between p-3 rounded-lg glass-subtle">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="font-medium">{supplement.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {supplement.dosage} • {supplement.timing.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {supplement.taken ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-orange-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <LiquidButton className="w-full mt-4" variant="outline">
            View Full Schedule
          </LiquidButton>
        </GlassCard>

        {/* Recent Activity */}
        <GlassCard className="glass-strong p-6">
          <h2 className="text-xl font-semibold mb-6 font-heading">Recent Activity</h2>

          <div className="space-y-4">
            {recentIntakes.map((intake) => (
              <div key={intake.id} className="flex items-start gap-3 p-3 rounded-lg glass-subtle">
                <div className="w-2 h-2 rounded-full bg-chart-2 mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium">{intake.supplementName}</p>
                  <p className="text-sm text-muted-foreground">{intake.dosage}</p>
                  <p className="text-xs text-muted-foreground">{intake.timestamp}</p>
                  {intake.notes && <p className="text-sm text-muted-foreground mt-1">"{intake.notes}"</p>}
                </div>
              </div>
            ))}
          </div>

          <LiquidButton className="w-full mt-4" variant="outline">
            View All Activity
          </LiquidButton>
        </GlassCard>
      </div>

      {/* Upcoming Reminders */}
      <GlassCard className="glass-morph p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold font-heading">Upcoming Reminders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingReminders.map((reminder) => (
            <div key={reminder.id} className="p-4 rounded-lg glass-subtle">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{reminder.supplementName}</p>
                <Badge variant="outline" className="text-xs">
                  {reminder.time}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{reminder.dosage}</p>
              <div className="flex items-center gap-1 mt-2">
                <AlertCircle className="h-3 w-3 text-orange-500" />
                <p className="text-xs text-muted-foreground">in {reminder.timeUntil}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Weekly Progress */}
      <GlassCard className="glass-morph p-6">
        <h2 className="text-xl font-semibold mb-6 font-heading">Weekly Progress</h2>

        <div className="space-y-4">
          {userSupplements.slice(0, 3).map((supplement) => (
            <div key={supplement.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-medium">{supplement.name}</p>
                <p className="text-sm text-muted-foreground">{supplement.weeklyProgress}% this week</p>
              </div>
              <Progress value={supplement.weeklyProgress} className="h-2" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
