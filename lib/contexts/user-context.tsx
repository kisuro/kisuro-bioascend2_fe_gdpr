"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type UserStatus = "guest" | "user" | "premium"
export type UserRole = "user" | "moderator" | "owner"

interface User {
  status: UserStatus
  role?: UserRole
  id?: string
  name?: string
  email?: string
  created_at?: string
  avatar_url?: string
  bio?: string
  date_of_birth?: string
  stats?: Record<string, number>
  is_email_verified?: boolean
  isLoading?: boolean
}

interface UserContextType {
  user: User
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
const TOKEN_STORAGE_KEY = "bioaionics_access_token"

const readToken = () => {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

const buildAuthHeaders = (base: HeadersInit = {}) => {
  const headers: Record<string, string> = {}
  if (base instanceof Headers) {
    base.forEach((value, key) => {
      headers[key] = value
    })
  } else if (Array.isArray(base)) {
    base.forEach(([key, value]) => {
      headers[key] = value
    })
  } else {
    Object.assign(headers, base)
  }
  const storedToken = readToken()
  if (storedToken && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${storedToken}`
  }
  return headers
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({ status: "guest", isLoading: true })

  const loadUser = async () => {
    try {
      // Set a timeout for the request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
        console.log("[UserProvider] Request timed out")
      }, 3000)
      
      const headers = buildAuthHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      })
      
      console.log("[UserProvider] Loading user...")
      
      const res = await fetch(`${API_BASE}/v1/auth/me`, { 
        credentials: "include",
        headers,
        cache: 'no-store',
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (res.ok) {
        const data = await res.json()
        console.log("[UserProvider] User data received:", data)
        setUser({
          status: (data.status as UserStatus) || "user",
          role: (data.role as UserRole) || "user",
          id: data.id,
          name: data.name,
          email: data.email,
          created_at: data.created_at,
          avatar_url: data.avatar_url,
          bio: data.bio,
          date_of_birth: data.date_of_birth,
          stats: data.stats,
          is_email_verified: data.is_email_verified,
          isLoading: false,
        })
      } else {
        console.log("[UserProvider] Auth failed with status:", res.status)
        setUser({ status: "guest", isLoading: false })
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log("[UserProvider] Request was aborted due to timeout")
      } else {
        console.error("[UserProvider] Auth request failed:", error)
      }
      setUser({ status: "guest", isLoading: false })
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  // Dev override to simulate premium
  const finalUser = process.env.NEXT_PUBLIC_FORCE_PREMIUM === "true" 
    ? { id: "dev", status: "premium" as UserStatus, role: "user" as UserRole, name: "Dev Premium", isLoading: false }
    : user

  return (
    <UserContext.Provider value={{ user: finalUser, refreshUser: loadUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser(): User {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context.user
}

export function useUserActions() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserActions must be used within a UserProvider')
  }
  return { refreshUser: context.refreshUser }
}

// Helper: treat moderators/owners as having premium capabilities
export function hasPremiumAccess(u: User | undefined | null): boolean {
  if (!u) return false
  return u.status === "premium" || u.role === "moderator" || u.role === "owner"
}
