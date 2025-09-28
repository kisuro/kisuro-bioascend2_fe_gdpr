"use client"

import { Badge } from "@/components/ui/badge"
import { Crown } from "lucide-react"

export function PremiumBadge() {
  return (
    <Badge variant="secondary" className="bg-gradient-to-r from-accent/80 to-primary/80 text-white border-0 shadow-lg">
      <Crown className="h-3 w-3 mr-1" />
      Premium
    </Badge>
  )
}
