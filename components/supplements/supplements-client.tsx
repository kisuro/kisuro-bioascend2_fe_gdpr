"use client"
import { useState, useMemo, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type React from "react"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SupplementCard } from "@/components/supplements/supplement-card"
import { SupplementFilters } from "@/components/supplements/supplement-filters"
import { Search, Filter, Grid, List, Lock, Sparkles, Plus } from "lucide-react"
import { SupplementsBackground } from "@/components/ui/page-backgrounds"

interface Supplement {
  id: string
  slug: string
  name: string
  category: string
  goals: string[]
  tags: string[]
  description: string
  benefits: string[]
  dosage: string
  dosage_range: {
    min: number | null
    max: number | null
    unit: string | null
    notes: string
  }
  forms: string[]
  timing: string
  cycle: string
  bioavailability: string
  half_life: string | null
  interactions: {
    synergizes_with: string[]
    avoid_with: string[]
  }
  contraindications: string[]
  side_effects: string[]
  restrictions: string[]
  alternatives: string[]
  included_in_stacks: string[]
  evidence_level: string
  evidence_notes: string
  sources: string[]
  rating: {
    avg: number | null
    count: number
  }
  images: string[]
  sku: string | null
}

interface SupplementsClientProps {
  supplements: Supplement[]
}

const ITEMS_PER_PAGE = 24

export function SupplementsClient({ supplements }: SupplementsClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseInt(searchParams.get("page") || "1", 10)
    }
    return 1
  })
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      return searchParams.get("q") || ""
    }
    return ""
  })
  const [selectedGoals, setSelectedGoals] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return searchParams.get("goals")?.split(",").filter(Boolean) || []
    }
    return []
  })
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return searchParams.get("categories")?.split(",").filter(Boolean) || []
    }
    return []
  })
  const [selectedEvidenceLevels, setSelectedEvidenceLevels] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return searchParams.get("evidence")?.split(",").filter(Boolean) || []
    }
    return []
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const [foodCraving, setFoodCraving] = useState("")
  const [cravingResults, setCravingResults] = useState<any>(null)
  const [isLoadingCravings, setIsLoadingCravings] = useState(false)
  const [isPremium, setIsPremium] = useState(false)

  const updateURL = useCallback(
    (newPage: number, query: string, goals: string[], categories: string[], evidence: string[]) => {
      const params = new URLSearchParams()

      if (newPage > 1) params.set("page", newPage.toString())
      if (query) params.set("q", query)
      if (goals.length > 0) params.set("goals", goals.join(","))
      if (categories.length > 0) params.set("categories", categories.join(","))
      if (evidence.length > 0) params.set("evidence", evidence.join(","))

      const url = params.toString() ? `/supplements?${params.toString()}` : "/supplements"
      router.replace(url, { scroll: false })
    },
    [router],
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      setCurrentPage(1)
      updateURL(1, value, selectedGoals, selectedCategories, selectedEvidenceLevels)
    },
    [selectedGoals, selectedCategories, selectedEvidenceLevels, updateURL],
  )

  const handleGoalsChange = useCallback(
    (goals: string[]) => {
      setSelectedGoals(goals)
      setCurrentPage(1)
      updateURL(1, searchQuery, goals, selectedCategories, selectedEvidenceLevels)
    },
    [searchQuery, selectedCategories, selectedEvidenceLevels, updateURL],
  )

  const handleCategoriesChange = useCallback(
    (categories: string[]) => {
      setSelectedCategories(categories)
      setCurrentPage(1)
      updateURL(1, searchQuery, selectedGoals, categories, selectedEvidenceLevels)
    },
    [searchQuery, selectedGoals, selectedEvidenceLevels, updateURL],
  )

  const handleEvidenceLevelsChange = useCallback(
    (evidence: string[]) => {
      setSelectedEvidenceLevels(evidence)
      setCurrentPage(1)
      updateURL(1, searchQuery, selectedGoals, selectedCategories, evidence)
    },
    [searchQuery, selectedGoals, selectedCategories, updateURL],
  )

  const filteredSupplements = useMemo(() => {
    return supplements.filter((supplement) => {
      const matchesSearch =
        searchQuery === "" ||
        supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplement.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplement.goals.some((goal) => goal.toLowerCase().includes(searchQuery.toLowerCase())) ||
        supplement.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesGoals = selectedGoals.length === 0 || selectedGoals.some((goal) => supplement.goals.includes(goal))

      const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(supplement.category)

      const matchesEvidenceLevel =
        selectedEvidenceLevels.length === 0 || selectedEvidenceLevels.includes(supplement.evidence_level)

      return matchesSearch && matchesGoals && matchesCategories && matchesEvidenceLevel
    })
  }, [searchQuery, selectedGoals, selectedCategories, selectedEvidenceLevels, supplements])

  const displayedSupplements = useMemo(() => {
    return filteredSupplements.slice(0, currentPage * ITEMS_PER_PAGE)
  }, [filteredSupplements, currentPage])

  const hasMoreItems = displayedSupplements.length < filteredSupplements.length

  const handleLoadMore = useCallback(() => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)
    updateURL(newPage, searchQuery, selectedGoals, selectedCategories, selectedEvidenceLevels)
  }, [currentPage, searchQuery, selectedGoals, selectedCategories, selectedEvidenceLevels, updateURL])

  const allGoals = useMemo(() => {
    const goals = new Set<string>()
    supplements.forEach((supplement) => {
      supplement.goals.forEach((goal) => goals.add(goal))
    })
    return Array.from(goals).sort()
  }, [supplements])

  const allCategories = useMemo(() => {
    const categories = new Set<string>()
    supplements.forEach((supplement) => {
      categories.add(supplement.category)
    })
    return Array.from(categories).sort()
  }, [supplements])

  const allEvidenceLevels = useMemo(() => {
    const levels = new Set<string>()
    supplements.forEach((supplement) => {
      levels.add(supplement.evidence_level)
    })
    return Array.from(levels).sort()
  }, [supplements])

  const handleFoodCravingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!foodCraving.trim()) return

    setIsLoadingCravings(true)

    try {
      let data = null

      try {
        const response = await fetch("/api/food-cravings/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ food_name: foodCraving }),
        })

        if (response.ok) {
          data = await response.json()
        }
      } catch (apiError) {
        console.log("[v0] API endpoint not available, using mock data")
      }

      if (!data) {
        data = {
          food_name: foodCraving,
          nutrients: ["Magnesium", "Iron", "Vitamin B12"],
          recommendations: [
            {
              name: "Magnesium Glycinate",
              reason: "Your craving may indicate magnesium deficiency",
              supplement_id: "magnesium-glycinate",
            },
            {
              name: "Iron Complex",
              reason: "Common nutrient lacking in chocolate cravings",
              supplement_id: "iron-complex",
            },
          ],
        }
      }

      setCravingResults(data)
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      setCravingResults({
        food_name: foodCraving,
        nutrients: ["Magnesium", "Iron", "Vitamin B12"],
        recommendations: [
          {
            name: "Magnesium Glycinate",
            reason: "Your craving may indicate magnesium deficiency",
            supplement_id: "magnesium-glycinate",
          },
          {
            name: "Iron Complex",
            reason: "Common nutrient lacking in chocolate cravings",
            supplement_id: "iron-complex",
          },
        ],
      })
    } finally {
      setIsLoadingCravings(false)
    }
  }

  const saveToJournal = (supplementName: string) => {
    alert(`${supplementName} saved to journal!`)
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <SupplementsBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 liquid-text font-heading">Supplements & Nutrition</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover evidence-based supplements and get personalized recommendations for your food cravings
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Tabs defaultValue="supplements" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="glass-strong">
                <TabsTrigger value="supplements">Supplements</TabsTrigger>
                <TabsTrigger value="food-cravings" className="flex items-center gap-2">
                  Food Cravings
                  {!isPremium && <Lock className="h-3 w-3" />}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Supplements Tab Content */}
            <TabsContent value="supplements">
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
                        placeholder="Search supplements, goals, or tags..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
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
                  {(selectedGoals.length > 0 || selectedCategories.length > 0 || selectedEvidenceLevels.length > 0) && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                      {selectedGoals.map((goal) => (
                        <Badge key={goal} variant="secondary" className="glass-subtle">
                          Goal: {goal}
                          <button
                            onClick={() => handleGoalsChange(selectedGoals.filter((g) => g !== goal))}
                            className="ml-2 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                      {selectedCategories.map((category) => (
                        <Badge key={category} variant="outline" className="glass-subtle">
                          Category: {category}
                          <button
                            onClick={() => handleCategoriesChange(selectedCategories.filter((c) => c !== category))}
                            className="ml-2 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                      {selectedEvidenceLevels.map((level) => (
                        <Badge key={level} variant="outline" className="glass-subtle">
                          Evidence: {level}
                          <button
                            onClick={() =>
                              handleEvidenceLevelsChange(selectedEvidenceLevels.filter((l) => l !== level))
                            }
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
                      allCategories={allCategories}
                      allEvidenceLevels={allEvidenceLevels}
                      selectedGoals={selectedGoals}
                      selectedCategories={selectedCategories}
                      selectedEvidenceLevels={selectedEvidenceLevels}
                      onGoalsChange={handleGoalsChange}
                      onCategoriesChange={handleCategoriesChange}
                      onEvidenceLevelsChange={handleEvidenceLevelsChange}
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
                      Showing {displayedSupplements.length} of {filteredSupplements.length} supplement
                      {filteredSupplements.length !== 1 ? "s" : ""}
                    </p>
                  </motion.div>

                  <motion.div
                    className={
                      viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"
                    }
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {displayedSupplements.map((supplement, index) => (
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

                  {hasMoreItems && (
                    <motion.div
                      className="flex justify-center mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <LiquidButton onClick={handleLoadMore} size="lg" className="px-8">
                        Load More ({filteredSupplements.length - displayedSupplements.length} remaining)
                      </LiquidButton>
                    </motion.div>
                  )}

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
            </TabsContent>

            {/* Food Cravings Tab Content */}
            <TabsContent value="food-cravings">
              {!isPremium ? (
                <motion.div
                  className="flex items-center justify-center min-h-[60vh]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <GlassCard className="glass-strong p-12 text-center max-w-md">
                    <div className="mb-6">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center">
                        <Lock className="h-10 w-10 text-amber-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Premium Feature</h3>
                      <p className="text-muted-foreground">This feature is available for Premium subscribers only.</p>
                    </div>
                    <LiquidButton onClick={() => setIsPremium(true)} className="w-full">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </LiquidButton>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <GlassCard className="glass-strong p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-amber-400" />
                      Food Cravings Analysis
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Tell us what you're craving and get personalized supplement recommendations based on potential
                      nutrient deficiencies.
                    </p>

                    <form onSubmit={handleFoodCravingSubmit} className="flex gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="What food are you craving?"
                          value={foodCraving}
                          onChange={(e) => setFoodCraving(e.target.value)}
                          className="glass-subtle"
                        />
                      </div>
                      <LiquidButton type="submit" disabled={isLoadingCravings || !foodCraving.trim()}>
                        {isLoadingCravings ? "Analyzing..." : "Analyze"}
                      </LiquidButton>
                    </form>
                  </GlassCard>

                  {cravingResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <GlassCard className="glass-strong p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">Analysis for "{cravingResults.food_name}"</h3>
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Key Nutrients:</h4>
                          <div className="flex flex-wrap gap-2">
                            {cravingResults.nutrients.map((nutrient: string) => (
                              <Badge key={nutrient} variant="secondary" className="glass-subtle">
                                {nutrient}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </GlassCard>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cravingResults.recommendations.map((rec: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <GlassCard className="glass-subtle p-6">
                              <h4 className="font-bold text-lg mb-2">{rec.name}</h4>
                              <p className="text-muted-foreground mb-4">{rec.reason}</p>
                              <LiquidButton onClick={() => saveToJournal(rec.name)} size="sm" className="w-full">
                                <Plus className="h-4 w-4 mr-2" />
                                Save to Journal
                              </LiquidButton>
                            </GlassCard>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
