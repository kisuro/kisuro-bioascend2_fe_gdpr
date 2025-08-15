"use client"
import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Plus } from "lucide-react"
import { mockJournalData } from "@/lib/data/journal"

export function IntakeLogger() {
  const [selectedSupplement, setSelectedSupplement] = useState("")
  const [customDosage, setCustomDosage] = useState("")
  const [notes, setNotes] = useState("")
  const { userSupplements } = mockJournalData

  const handleQuickLog = (supplementId: string) => {
    console.log("Quick logging supplement:", supplementId)
    // Implementation for quick logging
  }

  const handleDetailedLog = () => {
    console.log("Detailed logging:", { selectedSupplement, customDosage, notes })
    // Implementation for detailed logging
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-heading">Log Intake</h2>
        <p className="text-muted-foreground">Record your supplement intake and track your progress</p>
      </div>

      {/* Quick Log - Today's Schedule */}
      <GlassCard className="glass-strong p-6">
        <h3 className="text-xl font-semibold mb-6 font-heading">Quick Log - Today's Schedule</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userSupplements.map((supplement) => (
            <div
              key={supplement.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                supplement.taken
                  ? "glass-subtle border-green-500/50 bg-green-500/5"
                  : "glass-subtle border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{supplement.name}</h4>
                    {supplement.taken && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{supplement.dosage}</p>
                  <div className="flex flex-wrap gap-1">
                    {supplement.timing.map((time) => (
                      <Badge key={time} variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="ml-4">
                  <LiquidButton
                    size="sm"
                    variant={supplement.taken ? "outline" : "default"}
                    onClick={() => handleQuickLog(supplement.id)}
                    disabled={supplement.taken}
                  >
                    {supplement.taken ? "Logged" : "Log"}
                  </LiquidButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Detailed Log Form */}
      <GlassCard className="glass-morph p-6">
        <h3 className="text-xl font-semibold mb-6 font-heading">Detailed Log Entry</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="supplement-select">Supplement</Label>
              <Select value={selectedSupplement} onValueChange={setSelectedSupplement}>
                <SelectTrigger className="glass-subtle">
                  <SelectValue placeholder="Select a supplement" />
                </SelectTrigger>
                <SelectContent>
                  {userSupplements.map((supplement) => (
                    <SelectItem key={supplement.id} value={supplement.id}>
                      {supplement.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Custom / Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                value={customDosage}
                onChange={(e) => setCustomDosage(e.target.value)}
                placeholder="e.g., 1000mg or 2 capsules"
                className="glass-subtle"
              />
            </div>

            <div>
              <Label htmlFor="time">Time Taken</Label>
              <Input
                id="time"
                type="datetime-local"
                defaultValue={new Date().toISOString().slice(0, 16)}
                className="glass-subtle"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did you feel? Any side effects? Taken with food?"
                className="glass-subtle h-32"
              />
            </div>

            <div className="space-y-2">
              <Label>Quick Notes</Label>
              <div className="flex flex-wrap gap-2">
                {["With food", "Empty stomach", "Post-workout", "Before bed", "Felt energized", "No effects"].map(
                  (note) => (
                    <Badge
                      key={note}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 glass-subtle"
                      onClick={() => setNotes(notes ? `${notes}, ${note}` : note)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {note}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <LiquidButton onClick={handleDetailedLog} className="liquid-gradient">
            Log Intake
          </LiquidButton>
          <LiquidButton variant="outline">Save as Draft</LiquidButton>
        </div>
      </GlassCard>

      {/* Recent Logs */}
      <GlassCard className="glass-subtle p-6">
        <h3 className="text-xl font-semibold mb-6 font-heading">Recent Logs</h3>

        <div className="space-y-3">
          {mockJournalData.recentIntakes.map((intake) => (
            <div key={intake.id} className="flex items-start gap-3 p-3 rounded-lg glass-subtle">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{intake.supplementName}</p>
                  <p className="text-sm text-muted-foreground">{intake.timestamp}</p>
                </div>
                <p className="text-sm text-muted-foreground">{intake.dosage}</p>
                {intake.notes && <p className="text-sm text-muted-foreground mt-1">"{intake.notes}"</p>}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
