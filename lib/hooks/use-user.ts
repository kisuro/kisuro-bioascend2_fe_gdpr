"use client"

import { useState, useEffect } from "react"

export type UserStatus = "guest" | "user" | "premium"

interface User {
  status: UserStatus
  id?: string
  name?: string
  email?: string
  created_at?: string
  avatar_url?: string
  bio?: string
  stats?: Record<string, number>
  is_email_verified?: boolean
  isLoading?: boolean
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/v1"
const TOKEN_STORAGE_KEY = "bioaionics_access_token" // updated storage key

const readToken = () => {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

const storeToken = (token: string | null | undefined) => {
  if (typeof window === "undefined") return
  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
  }
}

const clearToken = () => {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(TOKEN_STORAGE_KEY)
}

export const buildAuthHeaders = (base: HeadersInit = {}) => {
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

// Basic user hook backed by backend auth cookie
export function useUser(): User {
  const [user, setUser] = useState<User>({ status: "guest", isLoading: true })

  useEffect(() => {
    let cancelled = false
    async function loadMe() {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include", headers: buildAuthHeaders() })
        if (res.ok) {
          const data = await res.json()
          if (!cancelled) {
            setUser({
              status: (data.status as UserStatus) || "user",
              id: data.id,
              name: data.name,
              email: data.email,
              created_at: data.created_at,
              avatar_url: data.avatar_url,
              bio: data.bio,
              stats: data.stats,
              is_email_verified: data.is_email_verified,
              isLoading: false,
            })
          }
        } else {
          if (!cancelled) setUser({ status: "guest", isLoading: false })
        }
      } catch {
        if (!cancelled) setUser({ status: "guest", isLoading: false })
      }
    }
    loadMe()
    return () => {
      cancelled = true
    }
  }, [])

  // Dev override to simulate premium
  if (process.env.NEXT_PUBLIC_FORCE_PREMIUM === "true") {
    return { id: "dev", status: "premium", name: "Dev Premium", isLoading: false }
  }

  return user
}

// Optional helpers for UI actions
export async function registerUser(email: string, password: string, name?: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, name }),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Registration failed")
  const data = await res.json()
  storeToken(res.headers.get("X-Access-Token"))
  return data
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Login failed")
  const data = await res.json()
  storeToken(res.headers.get("X-Access-Token"))
  return data
}

export async function logoutUser() {
  await fetch(`${API_BASE}/auth/logout`, { method: "POST", credentials: "include", headers: buildAuthHeaders() })
  clearToken()
}

export async function updateProfile(payload: { name?: string; email?: string; avatar_url?: string }) {
  const headers = buildAuthHeaders({ "Content-Type": "application/json" })
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: "PATCH",
    headers,
    credentials: "include",
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Update failed")
  const data = await res.json()
  const token = res.headers.get("X-Access-Token")
  if (token) storeToken(token)
  return data
}

export async function requestEmailVerification() {
  const res = await fetch(`${API_BASE}/auth/request-email-verification`, {
    method: "POST",
    credentials: "include",
    headers: buildAuthHeaders(),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Request failed")
  return res.json()
}

export async function deleteAccount() {
  const res = await fetch(`${API_BASE}/auth/account`, {
    method: "DELETE",
    credentials: "include",
    headers: buildAuthHeaders(),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Delete failed")
  clearToken()
  return res.json()
}

export async function requestPasswordChange() {
  const res = await fetch(`${API_BASE}/auth/profile/security/change-password`, {
    method: "POST",
    credentials: "include",
    headers: buildAuthHeaders(),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Could not send reset email")
  return res.json()
}

export async function requestEmailChange(newEmail: string) {
  const headers = buildAuthHeaders({ "Content-Type": "application/json" })
  const res = await fetch(`${API_BASE}/auth/profile/security/request-email-change`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({ new_email: newEmail }),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Could not request email change")
  return res.json()
}

export async function triggerTwoFactorPlaceholder() {
  const res = await fetch(`${API_BASE}/auth/profile/security/two-factor`, {
    method: "POST",
    credentials: "include",
    headers: buildAuthHeaders(),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Two-factor action failed")
  return res.json()
}
