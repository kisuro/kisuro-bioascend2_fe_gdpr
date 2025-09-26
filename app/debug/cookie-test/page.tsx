"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/lib/contexts/user-context"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

interface CookieTestResponse {
  cookies_received: Record<string, string>
  auth_cookie_present: boolean
  auth_cookie_value_length: number
  bearer_token_present: boolean
  bearer_token_length: number
  user_agent: string
  origin: string
  referer: string
  x_forwarded_for: string
  cookie_name_expected: string
  env: string
  backend_base_url: string
}

export default function CookieTestPage() {
  const [testResult, setTestResult] = useState<CookieTestResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const user = useUser()

  const runCookieTest = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_BASE}/v1/auth/debug/cookie-test`, {
        method: "GET",
        credentials: "include", // Important: включаем cookies
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      setTestResult(data)
    } catch (e: any) {
      setError(e.message || "Test failed")
    } finally {
      setLoading(false)
    }
  }

  const runAuthTest = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_BASE}/v1/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      console.log("Auth test response status:", response.status)
      console.log("Auth test response headers:", Object.fromEntries(response.headers.entries()))
      
      if (response.ok) {
        const data = await response.json()
        console.log("Auth test response data:", data)
        setTestResult({
          ...testResult,
          auth_test_success: true,
          auth_test_data: data,
        } as any)
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.log("Auth test error data:", errorData)
        throw new Error(`Auth failed: ${response.status} - ${errorData.detail || "Unknown error"}`)
      }
    } catch (e: any) {
      console.error("Auth test error:", e)
      setError(e.message || "Auth test failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runCookieTest()
  }, [])

  const isMobileSafari = typeof navigator !== "undefined" && 
    /Safari/.test(navigator.userAgent) && 
    /Mobile/.test(navigator.userAgent) &&
    !/Chrome/.test(navigator.userAgent)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-blue-900 to-teal-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-morph p-8 border border-white/20 rounded-2xl">
          <h1 className="text-3xl font-bold text-white mb-6">Cookie & Auth Debug</h1>
          
          <div className="space-y-6">
            {/* User Info */}
            <div className="p-4 bg-white/5 rounded-lg">
              <h2 className="text-lg font-semibold text-white mb-2">Current User Status</h2>
              <pre className="text-sm text-white/80 overflow-auto">
                {JSON.stringify({ 
                  user: user,
                  isLoading: (user as any)?.isLoading,
                  isPremium: user?.status === "premium"
                }, null, 2)}
              </pre>
            </div>

            {/* Browser Info */}
            <div className="p-4 bg-white/5 rounded-lg">
              <h2 className="text-lg font-semibold text-white mb-2">Browser Info</h2>
              <div className="text-sm text-white/80 space-y-1">
                <div>User Agent: {typeof navigator !== "undefined" ? navigator.userAgent : "N/A"}</div>
                <div>Is Mobile Safari: {isMobileSafari ? "YES" : "NO"}</div>
                <div>Cookies Enabled: {typeof navigator !== "undefined" ? navigator.cookieEnabled : "N/A"}</div>
                <div>API Base URL: {API_BASE}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={runCookieTest}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                {loading ? "Testing..." : "Test Cookies"}
              </button>
              
              <button
                onClick={runAuthTest}
                disabled={loading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                {loading ? "Testing..." : "Test Auth"}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <h3 className="text-red-200 font-semibold mb-2">Error</h3>
                <p className="text-red-100">{error}</p>
              </div>
            )}

            {/* Test Results */}
            {testResult && (
              <div className="p-4 bg-white/5 rounded-lg">
                <h2 className="text-lg font-semibold text-white mb-4">Test Results</h2>
                <pre className="text-xs text-white/80 overflow-auto max-h-96 bg-black/20 p-4 rounded">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
                
                {/* Key Insights */}
                <div className="mt-4 space-y-2">
                  <div className={`p-2 rounded ${testResult.auth_cookie_present ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                    Auth Cookie: {testResult.auth_cookie_present ? "PRESENT" : "MISSING"}
                  </div>
                  
                  {testResult.bearer_token_present && (
                    <div className="p-2 bg-blue-500/20 text-blue-200 rounded">
                      Bearer Token: PRESENT
                    </div>
                  )}
                  
                  {isMobileSafari && !testResult.auth_cookie_present && (
                    <div className="p-2 bg-yellow-500/20 text-yellow-200 rounded">
                      ⚠️ Mobile Safari detected with missing auth cookie - this is likely the root cause of the reviews issue
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}