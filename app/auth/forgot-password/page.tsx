"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/v1"

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setPending(true)
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password?email=${encodeURIComponent(email)}`, { method: "POST" })
      const data = await res.json().catch(() => ({}))
      setMessage(data.reset_link ? `Link (dev): ${data.reset_link}` : "If the email exists, a reset link was sent")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold">Forgot password</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-2">
            <label className="block text-sm">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
          </div>

          <Button type="submit" disabled={pending} className="w-full">{pending ? "Sending..." : "Send reset link"}</Button>
        </form>
        {message && <div className="text-xs text-muted-foreground">{message}</div>}
      </GlassCard>
    </div>
  )
}
