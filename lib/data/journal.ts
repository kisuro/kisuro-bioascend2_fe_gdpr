export interface UserSupplement {
  id: string
  name: string
  dosage: string
  frequency: string
  timing: string[]
  cycleInfo?: {
    length: number
    pause: number
    currentDay: number
  }
  notes?: string
  active: boolean
  taken: boolean
  weeklyProgress: number
}

export interface IntakeLog {
  id: string
  supplementName: string
  dosage: string
  timestamp: string
  notes?: string
}

export interface Reminder {
  id: string
  supplementName: string
  dosage: string
  time: string
  timeUntil: string
  enabled: boolean
}

export interface JournalStats {
  activeSupplements: number
  streakDays: number
  complianceRate: number
  totalIntakes: number
}

export interface JournalData {
  userSupplements: UserSupplement[]
  recentIntakes: IntakeLog[]
  upcomingReminders: Reminder[]
  stats: JournalStats
}

export const mockJournalData: JournalData = {
  userSupplements: [
    {
      id: "1",
      name: "Omega-3 Fish Oil",
      dosage: "1000mg",
      frequency: "Daily",
      timing: ["Morning", "With Meals"],
      cycleInfo: {
        length: 30,
        pause: 7,
        currentDay: 15,
      },
      notes: "Taking with breakfast for better absorption",
      active: true,
      taken: true,
      weeklyProgress: 85,
    },
    {
      id: "2",
      name: "Magnesium Glycinate",
      dosage: "400mg",
      frequency: "Daily",
      timing: ["Evening", "Before Bed"],
      notes: "Helps with sleep quality",
      active: true,
      taken: false,
      weeklyProgress: 92,
    },
    {
      id: "3",
      name: "Vitamin D3 + K2",
      dosage: "5000 IU + 100mcg",
      frequency: "Daily",
      timing: ["Morning", "With Meals"],
      active: true,
      taken: true,
      weeklyProgress: 78,
    },
    {
      id: "4",
      name: "Creatine Monohydrate",
      dosage: "5g",
      frequency: "Daily",
      timing: ["Post-workout", "Afternoon"],
      cycleInfo: {
        length: 60,
        pause: 14,
        currentDay: 45,
      },
      active: true,
      taken: false,
      weeklyProgress: 95,
    },
  ],
  recentIntakes: [
    {
      id: "1",
      supplementName: "Omega-3 Fish Oil",
      dosage: "1000mg",
      timestamp: "Today at 8:30 AM",
      notes: "Taken with breakfast",
    },
    {
      id: "2",
      supplementName: "Vitamin D3 + K2",
      dosage: "5000 IU + 100mcg",
      timestamp: "Today at 8:30 AM",
    },
    {
      id: "3",
      supplementName: "Magnesium Glycinate",
      dosage: "400mg",
      timestamp: "Yesterday at 10:00 PM",
      notes: "Helped with sleep",
    },
    {
      id: "4",
      supplementName: "Creatine Monohydrate",
      dosage: "5g",
      timestamp: "Yesterday at 2:30 PM",
    },
  ],
  upcomingReminders: [
    {
      id: "1",
      supplementName: "Creatine Monohydrate",
      dosage: "5g",
      time: "2:30 PM",
      timeUntil: "3 hours",
      enabled: true,
    },
    {
      id: "2",
      supplementName: "Magnesium Glycinate",
      dosage: "400mg",
      time: "10:00 PM",
      timeUntil: "12 hours",
      enabled: true,
    },
    {
      id: "3",
      supplementName: "Omega-3 Fish Oil",
      dosage: "1000mg",
      time: "8:30 AM",
      timeUntil: "Tomorrow",
      enabled: true,
    },
  ],
  stats: {
    activeSupplements: 4,
    streakDays: 12,
    complianceRate: 87,
    totalIntakes: 156,
  },
}
