"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter, X } from "lucide-react"

interface SupplementFiltersProps {
  allGoals: string[]
  allCategories: string[]
  allEvidenceLevels: string[]
  selectedGoals: string[]
  selectedCategories: string[]
  selectedEvidenceLevels: string[]
  onGoalsChange: (goals: string[]) => void
  onCategoriesChange: (categories: string[]) => void
  onEvidenceLevelsChange: (levels: string[]) => void
}

export function SupplementFilters({
  allGoals,
  allCategories,
  allEvidenceLevels,
  selectedGoals,
  selectedCategories,
  selectedEvidenceLevels,
  onGoalsChange,
  onCategoriesChange,
  onEvidenceLevelsChange,
}: SupplementFiltersProps) {
  const handleGoalChange = (goal: string, checked: boolean) => {
    if (checked) {
      onGoalsChange([...selectedGoals, goal])
    } else {
      onGoalsChange(selectedGoals.filter((g) => g !== goal))
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onCategoriesChange([...selectedCategories, category])
    } else {
      onCategoriesChange(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleEvidenceLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      onEvidenceLevelsChange([...selectedEvidenceLevels, level])
    } else {
      onEvidenceLevelsChange(selectedEvidenceLevels.filter((l) => l !== level))
    }
  }

  const clearAllFilters = () => {
    onGoalsChange([])
    onCategoriesChange([])
    onEvidenceLevelsChange([])
  }

  return (
    <div className="space-y-6">
      <GlassCard className="glass-strong p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          {(selectedGoals.length > 0 || selectedCategories.length > 0 || selectedEvidenceLevels.length > 0) && (
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
                <Label htmlFor={`goal-${goal}`} className="text-sm cursor-pointer capitalize">
                  {goal}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-sm font-medium mb-3 block">Categories</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer capitalize">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Evidence Level</Label>
          <div className="space-y-2">
            {allEvidenceLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`evidence-${level}`}
                  checked={selectedEvidenceLevels.includes(level)}
                  onCheckedChange={(checked) => handleEvidenceLevelChange(level, checked as boolean)}
                />
                <Label htmlFor={`evidence-${level}`} className="text-sm cursor-pointer capitalize">
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
