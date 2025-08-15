"use client"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Info, Zap, CheckCircle } from "lucide-react"

interface SupplementInteractionsProps {
  supplement: {
    interactions?: {
      synergy: string[]
      caution: string[]
      avoid: string[]
    }
  }
}

export function SupplementInteractions({ supplement }: SupplementInteractionsProps) {
  const interactions = supplement.interactions || { synergy: [], caution: [], avoid: [] }

  return (
    <GlassCard className="backdrop-blur-md bg-white/10 border border-white/20 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold font-heading">Interactions</h2>
      </div>

      <div className="space-y-6">
        {interactions.synergy.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <h3 className="font-medium">Synergistic Supplements</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interactions.synergy.map((item, index) => (
                <Badge key={index} variant="secondary" className="backdrop-blur-md bg-green-500/20 text-green-300">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {interactions.caution.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <h3 className="font-medium">Use with Caution</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interactions.caution.map((item, index) => (
                <Badge key={index} variant="secondary" className="backdrop-blur-md bg-orange-500/20 text-orange-300">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {interactions.avoid.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <h3 className="font-medium">Avoid Combining With</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interactions.avoid.map((item, index) => (
                <Badge key={index} variant="destructive" className="backdrop-blur-md bg-red-500/20">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {interactions.synergy.length === 0 && interactions.caution.length === 0 && interactions.avoid.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No known interactions reported</p>
          </div>
        )}
      </div>
    </GlassCard>
  )
}
