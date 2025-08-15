"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Plus, Trash2, Clock, Mail, Smartphone } from "lucide-react"

interface Reminder {
  id: string
  supplementName: string
  time: string
  frequency: string
  enabled: boolean
  method: "email" | "push"
}

export function ReminderManager() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      supplementName: "Vitamin D3",
      time: "08:00",
      frequency: "daily",
      enabled: true,
      method: "push",
    },
    {
      id: "2",
      supplementName: "Omega-3",
      time: "20:00",
      frequency: "daily",
      enabled: false,
      method: "email",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newReminder, setNewReminder] = useState({
    supplementName: "",
    time: "",
    frequency: "daily",
    method: "push" as "email" | "push",
  })

  const addReminder = () => {
    if (newReminder.supplementName && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        ...newReminder,
        enabled: true,
      }
      setReminders([...reminders, reminder])
      setNewReminder({
        supplementName: "",
        time: "",
        frequency: "daily",
        method: "push",
      })
      setShowAddForm(false)
    }
  }

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder)),
    )
  }

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Reminder Management</h2>
          <p className="text-muted-foreground">Set up notifications for your supplement schedule</p>
        </div>
        <LiquidButton onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </LiquidButton>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">New Reminder</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supplement">Supplement Name</Label>
                <Input
                  id="supplement"
                  value={newReminder.supplementName}
                  onChange={(e) => setNewReminder({ ...newReminder, supplementName: e.target.value })}
                  placeholder="Enter supplement name"
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={newReminder.frequency}
                  onValueChange={(value) => setNewReminder({ ...newReminder, frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="method">Notification Method</Label>
                <Select
                  value={newReminder.method}
                  onValueChange={(value: "email" | "push") => setNewReminder({ ...newReminder, method: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <LiquidButton onClick={addReminder}>Add Reminder</LiquidButton>
              <LiquidButton variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </LiquidButton>
            </div>
          </GlassCard>
        </motion.div>
      )}

      <div className="space-y-4">
        {reminders.map((reminder) => (
          <motion.div key={reminder.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} layout>
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Bell className={`h-5 w-5 ${reminder.enabled ? "text-teal-500" : "text-gray-400"}`} />
                    <div>
                      <h3 className="font-semibold">{reminder.supplementName}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {reminder.time}
                        </div>
                        <span className="capitalize">{reminder.frequency}</span>
                        <div className="flex items-center gap-1">
                          {reminder.method === "email" ? (
                            <Mail className="h-3 w-3" />
                          ) : (
                            <Smartphone className="h-3 w-3" />
                          )}
                          {reminder.method === "email" ? "Email" : "Push"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={reminder.enabled} onCheckedChange={() => toggleReminder(reminder.id)} />
                  <LiquidButton variant="outline" size="sm" onClick={() => deleteReminder(reminder.id)}>
                    <Trash2 className="h-4 w-4" />
                  </LiquidButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {reminders.length === 0 && (
        <GlassCard className="p-8 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Reminders Set</h3>
          <p className="text-muted-foreground mb-4">
            Create your first reminder to stay on track with your supplements
          </p>
          <LiquidButton onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Reminder
          </LiquidButton>
        </GlassCard>
      )}
    </div>
  )
}
