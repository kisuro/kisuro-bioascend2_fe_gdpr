"use client"
import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Calendar, Settings, Bell, Shield, Activity, Crown, Edit3, Save, X } from "lucide-react"

// Mock user data
const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  joinDate: "2024-01-15",
  subscription: "Premium",
  avatar: "/professional-headshot.png",
  bio: "Passionate biohacker focused on optimizing health through data-driven approaches.",
  preferences: {
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    reminderTimes: ["08:00", "20:00"],
  },
  stats: {
    supplementsTracked: 12,
    journalEntries: 45,
    meditationMinutes: 320,
    biorhythmChecks: 28,
  },
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(mockUser)

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setUser(mockUser)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4 pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <GlassCard className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {user.subscription}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-1">{user.email}</p>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <LiquidButton
              variant={isEditing ? "destructive" : "outline"}
              onClick={isEditing ? handleCancel : () => setIsEditing(true)}
              className="gap-2"
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isEditing ? "Cancel" : "Edit Profile"}
            </LiquidButton>
          </div>
        </GlassCard>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassCard className="p-4 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{user.stats.supplementsTracked}</div>
            <div className="text-sm text-muted-foreground">Supplements</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{user.stats.journalEntries}</div>
            <div className="text-sm text-muted-foreground">Journal Entries</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{user.stats.meditationMinutes}</div>
            <div className="text-sm text-muted-foreground">Meditation Min</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{user.stats.biorhythmChecks}</div>
            <div className="text-sm text-muted-foreground">Biorhythm Checks</div>
          </GlassCard>
        </div>

        {/* Profile Tabs */}
        <GlassCard className="p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={user.name}
                    disabled={!isEditing}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled={!isEditing}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={user.bio}
                  disabled={!isEditing}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  rows={3}
                />
              </div>
              {isEditing && (
                <div className="flex justify-end">
                  <LiquidButton onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </LiquidButton>
                </div>
              )}
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={user.preferences.emailNotifications}
                    onCheckedChange={(checked) =>
                      setUser({
                        ...user,
                        preferences: { ...user.preferences, emailNotifications: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications</p>
                  </div>
                  <Switch
                    checked={user.preferences.pushNotifications}
                    onCheckedChange={(checked) =>
                      setUser({
                        ...user,
                        preferences: { ...user.preferences, pushNotifications: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Get weekly progress summaries</p>
                  </div>
                  <Switch
                    checked={user.preferences.weeklyReports}
                    onCheckedChange={(checked) =>
                      setUser({
                        ...user,
                        preferences: { ...user.preferences, weeklyReports: checked },
                      })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Account Security</h3>
                  <p className="text-muted-foreground mb-4">Manage your account security settings and password.</p>
                </div>
                <div className="space-y-4">
                  <LiquidButton variant="outline" className="w-full justify-start gap-2">
                    <Shield className="w-4 h-4" />
                    Change Password
                  </LiquidButton>
                  <LiquidButton variant="outline" className="w-full justify-start gap-2">
                    <Mail className="w-4 h-4" />
                    Update Email
                  </LiquidButton>
                  <LiquidButton variant="outline" className="w-full justify-start gap-2">
                    <Settings className="w-4 h-4" />
                    Two-Factor Authentication
                  </LiquidButton>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </div>
    </div>
  )
}
