"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter, X } from "lucide-react"

interface SupplementFiltersProps {
  allGoals: string[]
  allTags: string[]
  selectedGoals: string[]
  selectedTags: string[]
  onGoalsChange: (goals: string[]) => void
  onTagsChange: (tags: string[]) => void
}

export function SupplementFilters({
  allGoals,
  allTags,
  selectedGoals,
  selectedTags,
  onGoalsChange,
  onTagsChange,
}: SupplementFiltersProps) {
  const handleGoalChange = (goal: string, checked: boolean) => {
    if (checked) {
      onGoalsChange([...selectedGoals, goal])
    } else {
      onGoalsChange(selectedGoals.filter((g) => g !== goal))
    }
  }

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      onTagsChange([...selectedTags, tag])
    } else {
      onTagsChange(selectedTags.filter((t) => t !== tag))
    }
  }

  const clearAllFilters = () => {
    onGoalsChange([])
    onTagsChange([])
  }

  return (
    <div className="space-y-6">
      <GlassCard className="glass-strong p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          {(selectedGoals.length > 0 || selectedTags.length > 0) && (
            <LiquidButton variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-3 w-3 mr-1" />
              Clear
            </LiquidButton>
          )}
        </div>

        {/* Goals Filter */}
        <div className="mb-6">
          <Label className="text-sm font-medium mb-3 block">Goals</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allGoals.map((goal) => (
              <div key={goal} className="flex items-center space-x-2">
                <Checkbox
                  id={`goal-${goal}`}
                  checked={selectedGoals.includes(goal)}
                  onCheckedChange={(checked) => handleGoalChange(goal, checked as boolean)}
                />
                <Label htmlFor={`goal-${goal}`} className="text-sm cursor-pointer">
                  {goal}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Tags</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag}`}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                />
                <Label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer">
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
