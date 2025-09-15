"use client"

import { SupplementLoader } from "@/components/ui/supplement-loader"

export function SupplementsPageLoader() {
  return <SupplementLoader isVisible={true} message="Loading supplements database..." />
}