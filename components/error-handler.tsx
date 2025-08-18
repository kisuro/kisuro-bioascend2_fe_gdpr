"use client"

import { useEffect, useState } from "react"

export function ErrorHandler() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleError = (e: ErrorEvent) => {
      if (
        e.message ===
          "ResizeObserver loop completed with undelivered notifications." ||
        e.message.includes("hydration")
      ) {
        e.stopImmediatePropagation()
        return false
      }
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  if (!isMounted) return null

  return null
}
