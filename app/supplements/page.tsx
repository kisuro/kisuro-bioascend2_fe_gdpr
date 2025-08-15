"use client"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SupplementCard } from "@/components/supplements/supplement-card"
import { SupplementFilters } from "@/components/supplements/supplement-filters"
import { Search, Filter, Grid, List } from "lucide-react"
import { supplementsData } from "@/lib/data/supplements"

export default function SupplementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredSupplements = useMemo(() => {
    return supplementsData.filter((supplement) => {
      const matchesSearch =
        searchQuery === "" ||
        supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplement.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesGoals = selectedGoals.length === 0 || selectedGoals.some((goal) => supplement.goals.includes(goal))

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => supplement.tags.includes(tag))

      return matchesSearch && matchesGoals && matchesTags
    })
  }, [searchQuery, selectedGoals, selectedTags])

  const allGoals = useMemo(() => {
    const goals = new Set<string>()
    supplementsData.forEach((supplement) => {
      supplement.goals.forEach((goal) => goals.add(goal))
    })
    return Array.from(goals).sort()
  }, [])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    supplementsData.forEach((supplement) => {
      supplement.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 liquid-text font-heading">Supplements Catalog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover evidence-based supplements with detailed interactions, ratings, and community insights
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassCard className="glass-strong p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search supplements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-subtle"
                />
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <LiquidButton
                  variant={showFilters ? "default" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </LiquidButton>

                <div className="flex rounded-lg glass-subtle p-1">
                  <LiquidButton
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </LiquidButton>
                  <LiquidButton
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </LiquidButton>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedGoals.length > 0 || selectedTags.length > 0) && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                {selectedGoals.map((goal) => (
                  <Badge key={goal} variant="secondary" className="glass-subtle">
                    Goal: {goal}
                    <button
                      onClick={() => setSelectedGoals(selectedGoals.filter((g) => g !== goal))}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="outline" className="glass-subtle">
                    {tag}
                    <button
                      onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SupplementFilters
                allGoals={allGoals}
                allTags={allTags}
                selectedGoals={selectedGoals}
                selectedTags={selectedTags}
                onGoalsChange={setSelectedGoals}
                onTagsChange={setSelectedTags}
              />
            </motion.div>
          )}

          {/* Supplements Grid/List */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <motion.div
              className="mb-4 flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-muted-foreground">
                {filteredSupplements.length} supplement{filteredSupplements.length !== 1 ? "s" : ""} found
              </p>
            </motion.div>

            <motion.div
              className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {filteredSupplements.map((supplement, index) => (
                <motion.div
                  key={supplement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <SupplementCard supplement={supplement} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>

            {filteredSupplements.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GlassCard className="glass-subtle p-8">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No supplements found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
                </GlassCard>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
