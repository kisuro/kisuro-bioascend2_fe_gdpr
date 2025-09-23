"use client"

import { useEffect, useState } from "react"

export default function VerifyEmailPage() {
  const [message, setMessage] = useState("Verifying...")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    if (!token) {
      setMessage("Missing token")
      return
    }
    fetch((process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000") + `/v1/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        if (r.ok) setMessage("Email verified. You can close this page.")
        else {
          const j = await r.json().catch(() => ({}))
          setMessage(j.detail || "Verification failed")
        }
      })
      .catch(() => setMessage("Verification failed"))
  }, [])
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center text-sm text-muted-foreground">{message}</div>
    </div>
  )
}
