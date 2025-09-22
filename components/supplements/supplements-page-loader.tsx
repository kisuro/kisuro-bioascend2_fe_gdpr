"use client"

import { AppLoader } from "@/components/ui/app-loader"

export default function SupplementsPageLoader() {
  return <AppLoader isVisible={true} message="Loading supplements database..." />
}
