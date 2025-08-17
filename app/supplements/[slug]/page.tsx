import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import { SupplementDetailClient } from "./supplement-detail-client"

interface SupplementDetailPageProps {
  params: {
    slug: string
  }
}

function getSupplement(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "public/seed/supplements.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const supplements = JSON.parse(fileContents)
    return supplements.find((s: any) => s.id === slug)
  } catch (error) {
    console.error("Error loading supplement:", error)
    return null
  }
}

export default function SupplementDetailPage({ params }: SupplementDetailPageProps) {
  const supplement = getSupplement(params.slug)

  if (!supplement) {
    notFound()
  }

  return <SupplementDetailClient supplement={supplement} />
}
