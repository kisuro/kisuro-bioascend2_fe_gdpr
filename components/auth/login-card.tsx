"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginUser } from "@/lib/hooks/use-user"
import { cn } from "@/lib/utils"

type LoginCardProps = {
  className?: string
  onSuccess?: () => void | Promise<void>
  title?: string
}

export function LoginCard({ className, onSuccess, title = "Log in" }: LoginCardProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSuccess = async () => {
    if (onSuccess) {
      await onSuccess()
    } else {
      router.replace("/profile")
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      await loginUser(email, password)
      await handleSuccess()
    } catch (err: any) {
      setError(err?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GlassCard className={cn("w-full max-w-md p-6", className)}>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
          />
        </div>
        {error && (
          <div className="text-sm text-red-500 space-y-1">
            <p>{error}</p>
            {error === "Invalid email or password" && (
              <Link className="underline" href="/auth/forgot-password">
                Forgot password?
              </Link>
            )}
          </div>
        )}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Signing in..." : "Log In"}
        </Button>
      </form>
      <div className="flex items-center justify-between mt-4 text-sm">
        <Link className="underline" href="/auth/register">
          Create account
        </Link>
        {error !== "Invalid email or password" && (
          <Link className="underline" href="/auth/forgot-password">
            Forgot password?
          </Link>
        )}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">
        <Link href="/privacy-policy" className="text-primary hover:underline">
          Privacy Policy
        </Link>{" "}
        •{" "}
        <Link href="/terms-of-service" className="text-primary hover:underline">
          Terms of Service
        </Link>
      </p>
    </GlassCard>
  )
}
