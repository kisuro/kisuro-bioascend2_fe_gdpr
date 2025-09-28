"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { motion } from "framer-motion"

import { LoginCard } from "@/components/auth/login-card"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Calendar,
  Settings,
  Bell,
  Shield,
  Activity,
  Crown,
  Edit3,
  Save,
  X,
  Camera,
  Upload,
  Trash2,
} from "lucide-react"
import { AppLoader } from "@/components/ui/app-loader"
import { useUser } from "@/lib/contexts/user-context"
import {
  logoutUser,
  updateProfile,
  requestEmailVerification,
  deleteAccount,
  buildAuthHeaders,
  requestPasswordChange,
  requestEmailChange,
  triggerTwoFactorPlaceholder,
} from "@/lib/hooks/use-user"
import { hasPremiumAccess } from "@/lib/hooks/use-user"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { journalFeatureEnabled } from "@/lib/features"

// Mock user data
const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  joinDate: "2024-01-15",
  subscription: "Premium",
  avatar: "/professional-headshot.png",
  bio: "Passionate biohacker focused on optimizing health through data-driven approaches.",
  dateOfBirth: null as Date | null,
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

const ProfileBackground = () => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Enhanced User Data Visualization - larger and more complex */}
      <motion.div
        className="absolute top-20 right-10 w-80 h-80"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 4, delay: 1 }}
      >
        <motion.svg
          className="w-full h-full text-primary/20"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {/* Enhanced Profile Data Rings */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            animate={{
              strokeDasharray: [0, 283, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="35"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            animate={{
              strokeDasharray: [0, 220, 0],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="25"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            animate={{
              strokeDasharray: [0, 157, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="15"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            animate={{
              strokeDasharray: [0, 94, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
          />
        </motion.svg>
      </motion.div>

      {/* Enhanced Achievement Particles - more particles across full screen */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2.5 h-2.5 bg-accent/50 rounded-full"
          style={{
            left: `${8 + i * 5}%`,
            top: `${15 + (i % 6) * 12}%`,
          }}
          animate={{
            y: [-20, -50, -20],
            x: [-12, 18, -12],
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 2.2, 1],
          }}
          transition={{
            duration: 8 + i * 0.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Enhanced Personal Growth Spiral - larger and more prominent */}
      <motion.div
        className="absolute bottom-16 left-10 w-72 h-72"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3, delay: 2 }}
      >
        <motion.svg
          className="w-full h-full text-accent/25"
          viewBox="0 0 100 100"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <motion.path
            d="M50,50 Q30,30 50,10 Q70,30 50,50 Q30,70 50,90 Q70,70 50,50"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.path
            d="M50,50 Q35,35 50,20 Q65,35 50,50 Q35,65 50,80 Q65,65 50,50"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            animate={{
              pathLength: [1, 0, 1],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
        </motion.svg>
      </motion.div>

      {/* New: Profile Stats Constellation */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-64 h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 4, delay: 3 }}
      >
        <motion.svg
          className="w-full h-full text-primary/15"
          viewBox="0 0 100 100"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <motion.circle
            cx="20"
            cy="20"
            r="2"
            fill="currentColor"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.circle
            cx="80"
            cy="30"
            r="2"
            fill="currentColor"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
          <motion.circle
            cx="30"
            cy="80"
            r="2"
            fill="currentColor"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.circle
            cx="70"
            cy="70"
            r="2"
            fill="currentColor"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.line
            x1="20"
            y1="20"
            x2="80"
            y2="30"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.line
            x1="80"
            y1="30"
            x2="70"
            y2="70"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
          <motion.line
            x1="70"
            y1="70"
            x2="30"
            y2="80"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  )
}

export default function ProfilePage() {
  const authUser = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(mockUser)
  const [originalUser, setOriginalUser] = useState(mockUser) // Store original state for cancel
  const [imageError, setImageError] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false) // removed artificial delay
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletePending, setDeletePending] = useState(false)
  const [passwordPending, setPasswordPending] = useState(false)
  const [passwordDebugLink, setPasswordDebugLink] = useState<string | null>(null)
  const [showEmailChangeDialog, setShowEmailChangeDialog] = useState(false)
  const [emailChangeValue, setEmailChangeValue] = useState("")
  const [emailChangePending, setEmailChangePending] = useState(false)
  const [emailChangeDebugLink, setEmailChangeDebugLink] = useState<string | null>(null)
  const [twoFactorPending, setTwoFactorPending] = useState(false)
  const [savePending, setSavePending] = useState(false)

  const { toast } = useToast()

  // Removed artificial delay - profile loads naturally with auth

  // Sync auth user data into editable state (also override mock avatar)
  useEffect(() => {
    if (authUser && authUser.status !== "guest") {
      const updatedUser = {
        ...mockUser,
        name: authUser.name || mockUser.name,
        email: authUser.email || mockUser.email,
        avatar: authUser.avatar_url || mockUser.avatar,
        dateOfBirth: authUser.date_of_birth ? new Date(authUser.date_of_birth) : mockUser.dateOfBirth,
      }
      setUser(updatedUser)
      setOriginalUser(updatedUser) // Store the original state
    }
  }, [authUser])

  useEffect(() => {
    if (authUser?.email) {
      setEmailChangeValue(authUser.email)
    }
  }, [authUser?.email])

  const handleSave = async () => {
    setSavePending(true)
    try {
      const payload: any = {
        name: user.name,
        email: user.email,
        avatar_url: user.avatar,
        ...(user.bio ? { bio: user.bio } : {}),
      }
      if (user.dateOfBirth) {
        payload.date_of_birth = user.dateOfBirth.toISOString().split("T")[0] // Format as YYYY-MM-DD
      }
      await updateProfile(payload)
      setOriginalUser(user) // Update original state to current after successful save
      setIsEditing(false)
      setAvatarPreview(null)
    } catch (e: any) {
      alert(e?.message || "Failed to update profile")
    } finally {
      setSavePending(false)
    }
  }

  const handleCancel = () => {
    setUser(originalUser) // Restore original user data instead of mock data
    setIsEditing(false)
    setAvatarPreview(null)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageError(false)
  }

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB")
      return
    }
    // Optimistic preview
    const reader = new FileReader()
    reader.onload = (e) => setAvatarPreview(e.target?.result as string)
    reader.readAsDataURL(file)
    // Upload to backend
    const form = new FormData()
    form.append("file", file)
    try {
      // Use improved headers for Mobile Safari compatibility
      const headers = buildAuthHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        // Note: Don't set Content-Type for FormData, let browser set it with boundary
      })
      // Remove Content-Type header for FormData to let browser handle it
      delete (headers as any)['Content-Type']
      
      console.log("[Avatar Upload] Uploading with headers:", headers) // Debug logging
      
      const res = await fetch((process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000") + "/v1/auth/avatar", {
        method: "POST",
        credentials: "include",
        headers,
        body: form,
        cache: 'no-store', // Prevent caching issues in mobile Safari
      })
      
      console.log("[Avatar Upload] Response status:", res.status) // Debug logging
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error("[Avatar Upload] Error:", { status: res.status, errorData }) // Debug logging
        throw new Error(errorData?.detail || `Upload failed with status ${res.status}`)
      }
      const data = await res.json()
      console.log("[Avatar Upload] Success:", data) // Debug logging
      const updatedUser = { ...user, avatar: data.avatar_url }
      setUser(updatedUser)
      // Don't update originalUser here - only update it when the full profile is saved
      // This allows the user to cancel and revert the avatar change if they want
    } catch (e: any) {
      console.error("[Avatar Upload] Exception:", e) // Debug logging
      const errorMsg = e?.message || "Failed to upload avatar"
      alert(`Avatar upload failed: ${errorMsg}`)
      // Reset preview on error
      setAvatarPreview(null)
    }
  }

  const handleDeleteAccount = async () => {
    setDeletePending(true)
    try {
      await deleteAccount()
      setShowDeleteDialog(false)
      window.location.href = "/"
    } catch (e: any) {
      alert(e?.message || "Failed to delete account")
    } finally {
      setDeletePending(false)
    }
  }

  const handlePasswordChangeRequest = async () => {
    setPasswordPending(true)
    try {
      const res = await requestPasswordChange()
      setPasswordDebugLink(res.reset_link ?? null)
      toast({
        title: "Password reset email",
        description: res.reset_link ? `Development link: ${res.reset_link}` : res.message,
      })
    } catch (err: any) {
      toast({ title: "Password change failed", description: err?.message || "Try again later", variant: "destructive" })
    } finally {
      setPasswordPending(false)
    }
  }

  const handleEmailChangeSubmit = async () => {
    setEmailChangePending(true)
    try {
      const res = await requestEmailChange(emailChangeValue)
      setEmailChangeDebugLink(res.confirm_link ?? null)
      toast({
        title: "Email change requested",
        description: res.confirm_link ? `Development link: ${res.confirm_link}` : res.message,
      })
      setShowEmailChangeDialog(false)
    } catch (err: any) {
      toast({ title: "Email change failed", description: err?.message || "Try again later", variant: "destructive" })
    } finally {
      setEmailChangePending(false)
    }
  }

  const handleTwoFactorClick = async () => {
    setTwoFactorPending(true)
    try {
      const res = await triggerTwoFactorPlaceholder()
      toast({ title: "Two-factor", description: res.message })
    } catch (err: any) {
      toast({ title: "Two-factor", description: err?.message || "Try again later", variant: "destructive" })
    } finally {
      setTwoFactorPending(false)
    }
  }

  if (authUser.isLoading) {
    return <AppLoader isVisible={true} message="Authenticating..." />
  }

  // If user is not authenticated, show inline login form
  if (authUser.status === "guest") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4 pt-24 relative">
        <ProfileBackground />
        <div className="max-w-md mx-auto relative z-10">
          <LoginCard
            onSuccess={() => {
              window.location.href = "/profile"
            }}
            className="w-full"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-4 pt-24 relative">
      <ProfileBackground />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <GlassCard className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1">
              <div className="relative flex-shrink-0">
                <div className={`relative ${isEditing ? "cursor-pointer group" : ""}`} onClick={handleAvatarClick}>
                  <img
                    src={
                      avatarPreview || (imageError ? "/placeholder-logo.svg" : user.avatar || "/placeholder-logo.svg")
                    }
                    alt="Profile"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-primary/20"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  )}
                  {(authUser.role === "owner" || authUser.role === "moderator" || authUser.status === "premium") && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold truncate">{authUser.name ?? user.name}</h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="bg-primary/20 text-primary w-fit">
                      {authUser.status
                        ? authUser.status.charAt(0).toUpperCase() + authUser.status.slice(1)
                        : user.subscription}
                    </Badge>
                    {authUser.role && authUser.role !== "user" && (
                      <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                        {authUser.role.charAt(0).toUpperCase() + authUser.role.slice(1)}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground mb-1 text-sm sm:text-base truncate">
                  {authUser.email ?? user.email}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Member since {new Date((authUser.created_at as any) || user.joinDate).toLocaleDateString()}
                </p>
                {authUser.id && authUser.is_email_verified === false && (
                  <div className="mt-2 text-xs sm:text-sm text-amber-600">
                    Email not verified.{" "}
                    <button
                      className="underline"
                      onClick={async () => {
                        try {
                          const res = await requestEmailVerification()
                          alert(
                            res.verification_link
                              ? `Dev verification link: ${res.verification_link}`
                              : "Verification email sent",
                          )
                        } catch (e: any) {
                          alert(e?.message || "Failed to send verification")
                        }
                      }}
                    >
                      Verify now
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto flex gap-2">
              <LiquidButton
                variant={isEditing ? "ghost" : "outline"}
                onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                className="gap-2 w-full sm:w-auto"
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {isEditing ? "Cancel" : "Edit Profile"}
              </LiquidButton>
              {authUser.id && (
                <LiquidButton
                  variant="outline"
                  onClick={async () => {
                    await logoutUser()
                    window.location.href = "/auth/login"
                  }}
                  className="gap-2 w-full sm:w-auto"
                >
                  Logout
                </LiquidButton>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Profile Tabs */}
        <GlassCard className="p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 mt-6">
              {isEditing && (
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={
                          avatarPreview ||
                          (imageError ? "/placeholder-logo.svg" : user.avatar || "/placeholder-logo.svg")
                        }
                        alt="Avatar preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                    </div>
                    <LiquidButton variant="outline" onClick={handleAvatarClick} className="gap-2">
                      <Upload className="w-4 h-4" />
                      Change Avatar
                    </LiquidButton>
                  </div>
                  <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF. Max size: 5MB</p>
                </div>
              )}
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
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={user.dateOfBirth ? user.dateOfBirth.toISOString().split("T")[0] : ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setUser({ ...user, dateOfBirth: e.target.value ? new Date(e.target.value) : null })
                    }
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
                  <LiquidButton onClick={handleSave} disabled={savePending} className="gap-2">
                    {savePending ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
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
                  <div className="space-y-2">
                    <LiquidButton
                      variant="outline"
                      className="w-full justify-start gap-2"
                      disabled={passwordPending}
                      onClick={handlePasswordChangeRequest}
                    >
                      <Shield className="w-4 h-4" />
                      {passwordPending ? "Sending..." : "Change Password"}
                    </LiquidButton>
                    {passwordDebugLink && (
                      <p className="text-xs text-muted-foreground break-words px-3">
                        Dev reset link:{" "}
                        <a className="underline" href={passwordDebugLink}>
                          {passwordDebugLink}
                        </a>
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <LiquidButton
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => {
                        setEmailChangeValue(authUser.email || user.email || "")
                        setShowEmailChangeDialog(true)
                      }}
                      disabled={emailChangePending}
                    >
                      <Mail className="w-4 h-4" />
                      Update Email
                    </LiquidButton>
                    {emailChangeDebugLink && (
                      <p className="text-xs text-muted-foreground break-words px-3">
                        Dev confirm link:{" "}
                        <a className="underline" href={emailChangeDebugLink}>
                          {emailChangeDebugLink}
                        </a>
                      </p>
                    )}
                  </div>
                  <LiquidButton
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={handleTwoFactorClick}
                    disabled={twoFactorPending}
                  >
                    <Settings className="w-4 h-4" />
                    {twoFactorPending ? "Please wait..." : "Two-Factor Authentication"}
                  </LiquidButton>
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-2">Danger zone</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently remove your account and all associated data from BioAionics.
                    </p>
                    <LiquidButton
                      variant="outline"
                      className="w-full justify-start gap-2 border-red-500/60 text-red-500 hover:bg-red-500/10"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </LiquidButton>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </GlassCard>

        {/* Stats Overview */}
        <div className={`grid grid-cols-2 ${journalFeatureEnabled ? "md:grid-cols-4" : "md:grid-cols-3"} gap-4`}>
          <GlassCard className="p-4 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">
              {(authUser.stats?.supplements_tracked ?? user.stats.supplementsTracked) as any}
            </div>
            <div className="text-sm text-muted-foreground">Supplements</div>
          </GlassCard>
          {journalFeatureEnabled && (
            <GlassCard className="p-4 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">
                {(authUser.stats?.journal_entries ?? user.stats.journalEntries) as any}
              </div>
              <div className="text-sm text-muted-foreground">Journal Entries</div>
            </GlassCard>
          )}
          <GlassCard className="p-4 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">
              {(authUser.stats?.meditation_minutes ?? user.stats.meditationMinutes) as any}
            </div>
            <div className="text-sm text-muted-foreground">Meditation Min</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">
              {(authUser.stats?.biorhythm_checks ?? user.stats.biorhythmChecks) as any}
            </div>
            <div className="text-sm text-muted-foreground">Biorhythm Checks</div>
          </GlassCard>
        </div>
      </div>

      <Dialog open={showEmailChangeDialog} onOpenChange={setShowEmailChangeDialog}>
        <DialogContent className="glass-morph border-white/20 max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Update email</DialogTitle>
            <DialogDescription>Enter the new email address you want to associate with your account.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="new-email">New email</Label>
              <Input
                id="new-email"
                type="email"
                value={emailChangeValue}
                onChange={(e) => setEmailChangeValue(e.target.value)}
                placeholder="new.email@example.com"
                autoFocus
              />
            </div>
            <p className="text-xs text-muted-foreground">
              We’ll send a confirmation link to your current email. The change completes only after you confirm from
              that message.
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <LiquidButton
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={() => setShowEmailChangeDialog(false)}
              disabled={emailChangePending}
            >
              Cancel
            </LiquidButton>
            <LiquidButton className="w-full sm:w-auto" disabled={emailChangePending} onClick={handleEmailChangeSubmit}>
              {emailChangePending ? "Requesting..." : "Send confirmation"}
            </LiquidButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="glass-morph border-white/20 max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
            <DialogDescription>
              This action permanently removes your BioAionics account, profile data, and any saved preferences. This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <LiquidButton
              type="button"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => setShowDeleteDialog(false)}
              disabled={deletePending}
            >
              Cancel
            </LiquidButton>
            <LiquidButton
              type="button"
              variant="outline"
              className="w-full sm:w-auto border-red-500/60 text-red-500 hover:bg-red-500/10"
              onClick={handleDeleteAccount}
              disabled={deletePending}
            >
              {deletePending ? "Deleting…" : "Yes, delete"}
            </LiquidButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
