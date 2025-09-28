"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

export interface Source {
  label: string
  url: string
}

interface SourcesListProps {
  sources: Source[]
  onChange: (sources: Source[]) => void
  className?: string
}

export function SourcesList({ sources, onChange, className }: SourcesListProps) {
  const addSource = () => {
    onChange([...sources, { label: "", url: "" }])
  }

  const updateSource = (index: number, field: keyof Source, value: string) => {
    const newSources = [...sources]
    newSources[index] = { ...newSources[index], [field]: value }
    onChange(newSources)
  }

  const removeSource = (index: number) => {
    onChange(sources.filter((_, i) => i !== index))
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <Label className="text-base font-semibold">Sources & References</Label>
        <Button type="button" variant="outline" size="sm" onClick={addSource}>
          <Plus className="h-4 w-4 mr-2" />
          Add Source
        </Button>
      </div>

      <div className="space-y-3">
        {sources.map((source, index) => (
          <GlassCard key={index} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-3">
                <div>
                  <Label htmlFor={`source-label-${index}`} className="text-sm">
                    Label
                  </Label>
                  <Input
                    id={`source-label-${index}`}
                    placeholder="e.g., Harvard Medical School"
                    value={source.label}
                    onChange={(e) => updateSource(index, "label", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`source-url-${index}`} className="text-sm">
                    URL
                  </Label>
                  <Input
                    id={`source-url-${index}`}
                    type="url"
                    placeholder="https://example.com"
                    value={source.url}
                    onChange={(e) => updateSource(index, "url", e.target.value)}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSource(index)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </GlassCard>
        ))}

        {sources.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No sources added yet.</p>
            <p className="text-sm">Click "Add Source" to include references for your article.</p>
          </div>
        )}
      </div>
    </div>
  )
}
