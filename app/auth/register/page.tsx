"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { registerUser } from "@/lib/hooks/use-user"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    // Validate password strength
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }
    
    setIsLoading(true)
    try {
      await registerUser(email, password, name)
      router.replace("/profile")
    } catch (err: any) {
      setError(err?.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4">Create your account</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <label className="block text-sm">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 characters" required />
          </div>
          <div className="space-y-2">
            <label className="block text-sm">Confirm Password</label>
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
              placeholder="Confirm your password" 
              required 
              className={confirmPassword && password && password !== confirmPassword ? "border-red-500" : ""}
            />
            {confirmPassword && password && password !== confirmPassword && (
              <div className="text-xs text-red-500 mt-1">Passwords do not match</div>
            )}
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-sm text-muted-foreground mt-4">
          Already have an account? <Link className="underline" href="/auth/login">Log in</Link>
        </p>
      </GlassCard>
    </div>
  )}
