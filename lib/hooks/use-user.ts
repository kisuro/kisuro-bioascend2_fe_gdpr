"use client"

import { useState, useEffect } from "react"

export type UserStatus = "guest" | "user" | "premium"

interface User {
  status: UserStatus
  id?: string
  name?: string
}

// Mock user hook for testing - replace with real auth integration later
export function useUser(): User {
      if (process.env.NEXT_PUBLIC_FORCE_PREMIUM === "true") {
        return { id: "dev", isPremium: true, status: "premium" };
      }
  const [user, setUser] = useState<User>({ status: "guest" })

  useEffect(() => {
    // Simulate different user states for testing
    // In real implementation, this would connect to your auth system
    const mockStatus = (localStorage.getItem("mock_user_status") as UserStatus) || "guest"
    setUser({
      status: mockStatus,
      id: mockStatus !== "guest" ? "user_123" : undefined,
      name: mockStatus !== "guest" ? "Test User" : undefined,
    })
  }, [])

  return user
}

// Helper function to cycle through user states for testing
export function cycleMockUserStatus() {
  const current = localStorage.getItem("mock_user_status") || "guest"
  const next = current === "guest" ? "user" : current === "user" ? "premium" : "guest"
  localStorage.setItem("mock_user_status", next)
  window.location.reload()
}
