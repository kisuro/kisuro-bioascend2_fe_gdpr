import { readFileSync } from "fs"
import { join } from "path"
import { SupplementsClient } from "@/components/supplements/supplements-client"

function getSupplements() {
  try {
    const filePath = join(process.cwd(), "public", "seed", "supplements.json")
    const fileContents = readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error loading supplements:", error)
    return []
  }
}

export default function SupplementsPage() {
  const supplements = getSupplements()

  return <SupplementsClient supplements={supplements} />
}
