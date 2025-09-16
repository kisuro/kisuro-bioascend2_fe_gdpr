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

// Basic user hook backed by backend auth cookie
export function useUser(): User {
  // Dev override to simulate premium
  if (process.env.NEXT_PUBLIC_FORCE_PREMIUM === "true") {
    return { id: "dev", status: "premium", name: "Dev Premium", isLoading: false }
  }
  const [user, setUser] = useState<User>({ status: "guest", isLoading: true })

  useEffect(() => {
    let cancelled = false
    async function loadMe() {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" })
        if (res.ok) {
          const data = await res.json()
          if (!cancelled) {
            setUser({ status: (data.status as UserStatus) || "user", id: data.id, name: data.name, email: data.email, created_at: data.created_at, avatar_url: data.avatar_url, bio: data.bio, stats: data.stats, is_email_verified: data.is_email_verified, isLoading: false })
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
  return res.json()
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Login failed")
  return res.json()
}

export async function logoutUser() {
  await fetch(`${API_BASE}/auth/logout`, { method: "POST", credentials: "include" })
}

export async function updateProfile(payload: { name?: string; email?: string; avatar_url?: string }) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Update failed")
  return res.json()
}

export async function requestEmailVerification() {
  const res = await fetch(`${API_BASE}/auth/request-email-verification`, { method: "POST", credentials: "include" })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Request failed")
  return res.json()
}

export async function deleteAccount() {
  const res = await fetch(`${API_BASE}/auth/account`, {
    method: "DELETE",
    credentials: "include",
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail || "Delete failed")
  return res.json()
}
