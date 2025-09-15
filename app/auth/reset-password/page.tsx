"use client"

import { useEffect, useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const [token, setToken] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/v1"

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setToken(params.get("token"))
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) {
      setMessage("Missing token")
      return
    }
    setPending(true)
    setMessage(null)
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) setMessage("Password updated. You can log in now.")
      else setMessage(data.detail || "Failed to reset password")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold">Set new password</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">New password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" disabled={pending || !token} className="w-full">{pending ? "Saving..." : "Save password"}</Button>
        </form>
        {message && <div className="text-xs text-muted-foreground">{message}</div>}
      </GlassCard>
    </div>
  )
}

