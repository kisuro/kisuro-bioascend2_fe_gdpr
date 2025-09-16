"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
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
    
    // Clear previous messages
    setMessage(null)
    setError(null)
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    // Validate password strength (optional)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }
    
    setPending(true)
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) setMessage("Password updated. You can log in now.")
      else setError(data.detail || "Failed to reset password")
    } finally {
      setPending(false)
    }
  }

  const handleCancel = () => {
    router.push("/auth/login")
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
          <div>
            <label className="block text-sm mb-1">Confirm password</label>
            <Input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                // Clear error when user starts typing
                if (error === "Passwords do not match") {
                  setError(null)
                }
              }} 
              required 
              className={confirmPassword && password && password !== confirmPassword ? "border-red-500" : ""}
            />
            {confirmPassword && password && password !== confirmPassword && (
              <div className="text-xs text-red-500 mt-1">Passwords do not match</div>
            )}
          </div>
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              className="flex-1"
              disabled={pending}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={pending || !token} 
              className="flex-1"
            >
              {pending ? "Saving..." : "Save password"}
            </Button>
          </div>
        </form>
        {error && <div className="text-xs text-red-500">{error}</div>}
        {message && <div className="text-xs text-green-600">{message}</div>}
      </GlassCard>
    </div>
  )
}

