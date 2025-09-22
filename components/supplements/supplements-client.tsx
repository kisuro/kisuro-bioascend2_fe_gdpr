"use client"
import { useState, useMemo, useCallback, useEffect } from "react"
import { useUser } from "@/lib/hooks/use-user"
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
import { AlphabetFilter } from "@/components/supplements/alphabet-filter"
import { AppLoader } from "@/components/ui/app-loader"
import { Search, Filter, Grid, List, Lock, Sparkles, Plus } from "lucide-react"
import { SupplementsBackground } from "@/components/ui/page-backgrounds"

interface Supplement {
  id: string
  name: string
  summary?: string
  evidence_level?: string
  goals?: string[]
  categories?: string[]
  timing?: string
  dosage?: string
  cycle?: string
  benefits?: string[]
  popular_manufacturers?: string[]
  popular_manufacturer?: string | string[]
  rating?: number | { avg: number | null; count: number } | null
  reviews_count?: number
  [key: string]: any
}

interface SupplementsClientProps {
  supplements: Supplement[]
}

const ITEMS_PER_PAGE = 24

const CRAVING_TO_SUPPLEMENT_MAP: Record<string, { nutrients: string[]; goals: string[]; keywords: string[] }> = {
  chocolate: {
    nutrients: ["Magnesium", "Iron", "Serotonin"],
    goals: ["stress management", "calm", "energy"],
    keywords: ["magnesium", "iron", "ashwagandha", "l-theanine"],
  },
  sugar: {
    nutrients: ["Chromium", "B-Complex", "Protein"],
    goals: ["energy", "focus", "wellbeing"],
    keywords: ["ginseng", "rhodiola", "caffeine"],
  },
  salty: {
    nutrients: ["Sodium", "Adrenal Support", "B-Complex"],
    goals: ["stress management", "energy", "wellbeing"],
    keywords: ["ashwagandha", "rhodiola", "ginseng"],
  },
  carbs: {
    nutrients: ["Serotonin", "B-Complex", "Chromium"],
    goals: ["calm", "stress management", "energy"],
    keywords: ["l-theanine", "ashwagandha", "ginseng"],
  },
  coffee: {
    nutrients: ["Adrenal Support", "B-Complex", "Magnesium"],
    goals: ["energy", "focus", "stress management"],
    keywords: ["rhodiola", "ashwagandha", "ginseng", "l-theanine"],
  },
  ice: {
    nutrients: ["Iron", "B12", "Folate"],
    goals: ["energy", "circulation", "wellbeing"],
    keywords: ["iron", "ginkgo", "ginseng"],
  },
  fatty: {
    nutrients: ["Omega-3", "Fat-soluble vitamins", "Essential fatty acids"],
    goals: ["circulation", "focus", "wellbeing"],
    keywords: ["ginkgo", "lion", "bacopa"],
  },
}

export function SupplementsClient({ supplements }: SupplementsClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const authUser = useUser()
  const safeSupplements: Supplement[] = Array.isArray(supplements) ? supplements : []

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
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return searchParams.get("manufacturers")?.split(",").filter(Boolean) || []
    }
    return []
  })
  const [selectedLetter, setSelectedLetter] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return searchParams.get("letter") || null
    }
    return null
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const [foodCraving, setFoodCraving] = useState("")
  const [cravingResults, setCravingResults] = useState<any>(null)
  const [isLoadingCravings, setIsLoadingCravings] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    setIsPremium(authUser.status === "premium")
  }, [authUser.status])

  const updateURL = useCallback(
    (
      newPage: number,
      query: string,
      goals: string[],
      categories: string[],
      evidence: string[],
      manufacturers: string[],
      letter: string | null,
    ) => {
      const params = new URLSearchParams()

      if (newPage > 1) params.set("page", newPage.toString())
      if (query) params.set("q", query)
      if (goals.length > 0) params.set("goals", goals.join(","))
      if (categories.length > 0) params.set("categories", categories.join(","))
      if (evidence.length > 0) params.set("evidence", evidence.join(","))
      if (manufacturers.length > 0) params.set("manufacturers", manufacturers.join(","))
      if (letter) params.set("letter", letter)

      const url = params.toString() ? `/supplements?${params.toString()}` : "/supplements"
      router.replace(url, { scroll: false })
    },
    [router],
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      setCurrentPage(1)
      updateURL(
        1,
        value,
        selectedGoals,
        selectedCategories,
        selectedEvidenceLevels,
        selectedManufacturers,
        selectedLetter,
      )
    },
    [selectedGoals, selectedCategories, selectedEvidenceLevels, selectedManufacturers, selectedLetter, updateURL],
  )

  const handleGoalsChange = useCallback(
    (goals: string[]) => {
      setSelectedGoals(goals)
      setCurrentPage(1)
      updateURL(
        1,
        searchQuery,
        goals,
        selectedCategories,
        selectedEvidenceLevels,
        selectedManufacturers,
        selectedLetter,
      )
    },
    [searchQuery, selectedCategories, selectedEvidenceLevels, selectedManufacturers, selectedLetter, updateURL],
  )

  const handleCategoriesChange = useCallback(
    (categories: string[]) => {
      setSelectedCategories(categories)
      setCurrentPage(1)
      updateURL(
        1,
        searchQuery,
        selectedGoals,
        categories,
        selectedEvidenceLevels,
        selectedManufacturers,
        selectedLetter,
      )
    },
    [searchQuery, selectedGoals, selectedEvidenceLevels, selectedManufacturers, selectedLetter, updateURL],
  )

  const handleEvidenceLevelsChange = useCallback(
    (evidence: string[]) => {
      setSelectedEvidenceLevels(evidence)
      setCurrentPage(1)
      updateURL(1, searchQuery, selectedGoals, selectedCategories, evidence, selectedManufacturers, selectedLetter)
    },
    [searchQuery, selectedGoals, selectedCategories, selectedManufacturers, selectedLetter, updateURL],
  )

  const handleManufacturersChange = useCallback(
    (manufacturers: string[]) => {
      setSelectedManufacturers(manufacturers)
      setCurrentPage(1)
      updateURL(
        1,
        searchQuery,
        selectedGoals,
        selectedCategories,
        selectedEvidenceLevels,
        manufacturers,
        selectedLetter,
      )
    },
    [searchQuery, selectedGoals, selectedCategories, selectedEvidenceLevels, selectedLetter, updateURL],
  )

  const handleLetterChange = useCallback(
    (letter: string | null) => {
      setSelectedLetter(letter)
      setCurrentPage(1)
      updateURL(
        1,
        searchQuery,
        selectedGoals,
        selectedCategories,
        selectedEvidenceLevels,
        selectedManufacturers,
        letter,
      )
    },
    [searchQuery, selectedGoals, selectedCategories, selectedEvidenceLevels, selectedManufacturers, updateURL],
  )

  const filteredSupplements = useMemo(() => {
    return safeSupplements.filter((supplement) => {
      const matchesSearch =
        searchQuery === "" ||
        (supplement.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (supplement.summary ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (supplement.goals ?? []).some((goal) => (goal ?? "").toLowerCase().includes(searchQuery.toLowerCase())) ||
        (supplement.benefits ?? []).some((benefit) => (benefit ?? "").toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesGoals =
        selectedGoals.length === 0 || selectedGoals.some((goal) => (supplement.goals ?? []).includes(goal))

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) => (supplement.categories ?? []).includes(category))

      const matchesEvidenceLevel =
        selectedEvidenceLevels.length === 0 || selectedEvidenceLevels.includes(supplement.evidence_level ?? "")

      const matchesManufacturers =
        selectedManufacturers.length === 0 ||
        (() => {
          const manufacturerData = supplement.popular_manufacturers || (supplement as any).popular_manufacturer
          if (!manufacturerData) return false

          const manufacturerArray = Array.isArray(manufacturerData) ? manufacturerData : [manufacturerData]
          return selectedManufacturers.some((manufacturer) => manufacturerArray.includes(manufacturer))
        })()

      const matchesLetter = selectedLetter === null || (supplement.name ?? "").toUpperCase().startsWith(selectedLetter)

      return (
        matchesSearch &&
        matchesGoals &&
        matchesCategories &&
        matchesEvidenceLevel &&
        matchesManufacturers &&
        matchesLetter
      )
    })
  }, [
    searchQuery,
    selectedGoals,
    selectedCategories,
    selectedEvidenceLevels,
    selectedManufacturers,
    selectedLetter,
    safeSupplements,
  ])

  const displayedSupplements = useMemo(() => {
    return filteredSupplements.slice(0, currentPage * ITEMS_PER_PAGE)
  }, [filteredSupplements, currentPage])

  const hasMoreItems = displayedSupplements.length < filteredSupplements.length

  const handleLoadMore = useCallback(() => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)
    updateURL(
      newPage,
      searchQuery,
      selectedGoals,
      selectedCategories,
      selectedEvidenceLevels,
      selectedManufacturers,
      selectedLetter,
    )
  }, [
    currentPage,
    searchQuery,
    selectedGoals,
    selectedCategories,
    selectedEvidenceLevels,
    selectedManufacturers,
    selectedLetter,
    updateURL,
  ])

  const allGoals = useMemo(() => {
    const goals = new Set<string>()
    safeSupplements.forEach((supplement) => {
      ;(supplement.goals ?? []).forEach((goal) => goals.add(goal))
    })
    return Array.from(goals).sort()
  }, [safeSupplements])

  const allCategories = useMemo(() => {
    const categories = new Set<string>()
    safeSupplements.forEach((supplement) => {
      ;(supplement.categories ?? []).forEach((category) => categories.add(category))
    })
    return Array.from(categories).sort()
  }, [safeSupplements])

  const allEvidenceLevels = useMemo(() => {
    const levels = new Set<string>()
    safeSupplements.forEach((supplement) => {
      if (supplement.evidence_level) levels.add(supplement.evidence_level)
    })
    return Array.from(levels).sort()
  }, [safeSupplements])

  const allManufacturers = useMemo(() => {
    const manufacturers = new Set<string>()
    safeSupplements.forEach((supplement) => {
      // Handle both popular_manufacturer (singular) and popular_manufacturers (plural)
      const manufacturerData = supplement.popular_manufacturers || (supplement as any).popular_manufacturer
      if (manufacturerData) {
        if (Array.isArray(manufacturerData)) {
          manufacturerData.forEach((manufacturer) => manufacturers.add(manufacturer))
        } else if (typeof manufacturerData === "string") {
          manufacturers.add(manufacturerData)
        }
      }
    })
    return Array.from(manufacturers).sort()
  }, [safeSupplements])

  const availableLetters = useMemo(() => {
    const letters = new Set<string>()
    safeSupplements.forEach((supplement) => {
      const firstChar = (supplement.name ?? "").charAt(0).toUpperCase()
      // Include numbers (0-9) and letters (A-Z)
      if ((firstChar >= "0" && firstChar <= "9") || (firstChar >= "A" && firstChar <= "Z")) {
        letters.add(firstChar)
      }
    })
    return letters
  }, [safeSupplements])

  const findRelevantSupplements = (craving: string): Supplement[] => {
    const cravingLower = craving.toLowerCase()

    let matchedMapping = null
    for (const [key, mapping] of Object.entries(CRAVING_TO_SUPPLEMENT_MAP)) {
      if (cravingLower.includes(key)) {
        matchedMapping = mapping
        break
      }
    }

    if (!matchedMapping) {
      matchedMapping = {
        nutrients: ["B-Complex", "Magnesium", "Adaptogenic herbs"],
        goals: ["stress management", "energy", "wellbeing"],
        keywords: ["ashwagandha", "rhodiola", "ginseng", "l-theanine"],
      }
    }

    const relevantSupplements = safeSupplements.filter((supplement) => {
      const nameMatch = matchedMapping.keywords.some((keyword) =>
        (supplement.name ?? "").toLowerCase().includes(keyword),
      )
      const goalMatch = (supplement.goals ?? []).some((goal) => matchedMapping.goals.includes(goal))
      const benefitMatch = (supplement.benefits ?? []).some((benefit) =>
        matchedMapping.keywords.some((keyword) => (benefit ?? "").toLowerCase().includes(keyword)),
      )

      return nameMatch || goalMatch || benefitMatch
    })

    return relevantSupplements.slice(0, 4)
  }

    const handleFoodCravingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!foodCraving.trim()) return

    setIsLoadingCravings(true)

    try {
      let data = null

      // Try to call the real API first
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
        const response = await fetch(`${API_URL}/v1/cravings/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ foods: [foodCraving] }),
        })

        if (response.ok) {
          const apiData = await response.json()
          
          // Transform API response to match our UI format
          data = {
            food_name: foodCraving,
            foods_analyzed: apiData.foods_analyzed,
            nutrients: apiData.potential_deficiencies,
            deficiency_frequency: apiData.deficiency_frequency,
            recommendations: apiData.recommended_supplements.map((supplement: any) => ({
              name: supplement.name,
              reason: `Based on your ${foodCraving} craving, this may help with ${supplement.summary || 'nutritional balance'}`,
              supplement_id: supplement.id,
              supplement: supplement,
              dosage: supplement.dosage,
              evidence_level: supplement.evidence_level
            })),
          }
        }
      } catch (apiError) {
        console.log("Cravings API not available, using fallback logic")
      }

      // Fallback to local logic if API fails
      if (!data) {
        const relevantSupplements = findRelevantSupplements(foodCraving)
        const cravingLower = foodCraving.toLowerCase()
        let nutrients = ["Magnesium", "Iron", "B-Complex"]

        for (const [key, mapping] of Object.entries(CRAVING_TO_SUPPLEMENT_MAP)) {
          if (cravingLower.includes(key)) {
            nutrients = mapping.nutrients
            break
          }
        }

        data = {
          food_name: foodCraving,
          nutrients: nutrients,
          recommendations: relevantSupplements.map((supplement) => ({
            name: supplement.name,
            reason: `May help with ${(supplement.goals ?? []).slice(0, 2).join(" and ")} related to your ${foodCraving} craving`,
            supplement_id: supplement.id,
            supplement: supplement,
          })),
        }
      }

      setCravingResults(data)
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      const relevantSupplements = findRelevantSupplements(foodCraving)
      setCravingResults({
        food_name: foodCraving,
        nutrients: ["Magnesium", "Iron", "B-Complex"],
        recommendations: relevantSupplements.slice(0, 2).map((supplement) => ({
          name: supplement.name,
          reason: `May help with ${(supplement.goals ?? [])[0]} related to your craving`,
          supplement_id: supplement.id,
          supplement: supplement,
        })),
      })
    } finally {
      setIsLoadingCravings(false)
    }
  }

  const saveToJournal = (supplementName: string) => {
    alert(`${supplementName} saved to journal!`)
  }

  const handleUpgrade = () => {
    router.push("/premium")
  }

  useEffect(() => {
    // If we have supplements data, hide loading immediately
    if (safeSupplements.length > 0) {
      setIsInitialLoading(false)
    } else {
      // If no data, show a brief loading then hide (fallback for edge cases)
      const timer = setTimeout(() => {
        setIsInitialLoading(false)
      }, 300) // Much shorter delay
      return () => clearTimeout(timer)
    }
  }, [safeSupplements.length]) // Depend on data availability

  return (
    <>
      <AppLoader isVisible={isInitialLoading} message="Loading supplements database..." />

      <div className="min-h-screen py-8 px-4 relative">
        <SupplementsBackground />

        <div className="max-w-7xl mx-auto relative z-10">
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

              <TabsContent value="supplements">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <GlassCard className="glass-strong p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search supplements, goals, or benefits..."
                          value={searchQuery}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          className="pl-10 glass-subtle"
                        />
                      </div>

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

                    {(selectedGoals.length > 0 ||
                      selectedCategories.length > 0 ||
                      selectedEvidenceLevels.length > 0 ||
                      selectedManufacturers.length > 0 ||
                      selectedLetter !== null) && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                        {selectedLetter && (
                          <Badge variant="secondary" className="glass-subtle">
                            Starting with: {selectedLetter}
                            <button onClick={() => handleLetterChange(null)} className="ml-2 hover:text-destructive">
                              ×
                            </button>
                          </Badge>
                        )}
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
                        {selectedManufacturers.map((manufacturer) => (
                          <Badge key={manufacturer} variant="outline" className="glass-subtle">
                            Manufacturer: {manufacturer}
                            <button
                              onClick={() =>
                                handleManufacturersChange(selectedManufacturers.filter((m) => m !== manufacturer))
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

                <AlphabetFilter
                  selectedLetter={selectedLetter}
                  onLetterSelect={handleLetterChange}
                  availableLetters={availableLetters}
                />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                        allManufacturers={allManufacturers}
                        selectedGoals={selectedGoals}
                        selectedCategories={selectedCategories}
                        selectedEvidenceLevels={selectedEvidenceLevels}
                        selectedManufacturers={selectedManufacturers}
                        onGoalsChange={handleGoalsChange}
                        onCategoriesChange={handleCategoriesChange}
                        onEvidenceLevelsChange={handleEvidenceLevelsChange}
                        onManufacturersChange={handleManufacturersChange}
                      />
                    </motion.div>
                  )}

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
                          <SupplementCard
                            supplement={{
                              ...supplement,
                              summary: supplement.summary ?? "",
                              evidence_level: supplement.evidence_level ?? "",
                              goals: supplement.goals ?? [],
                              categories: supplement.categories ?? [],
                              timing: supplement.timing ?? "",
                              dosage: supplement.dosage ?? "",
                              cycle: supplement.cycle ?? "",
                              benefits: supplement.benefits ?? [],
                              reviews_count: supplement.reviews_count ?? 0,
                              rating: supplement.rating ?? null,
                            }}
                            viewMode={viewMode}
                          />
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
                      <LiquidButton type="button" onClick={handleUpgrade} className="w-full">
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
                          {isLoadingCravings ? "Analyzing nutrients..." : "Analyze"}
                        </LiquidButton>
                      </form>
                    </GlassCard>

                    {isLoadingCravings && (
                      <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <GlassCard className="glass-subtle p-8 text-center">
                          <div className="flex flex-col items-center space-y-4">
                            <div className="relative w-12 h-12">
                              <motion.div
                                className="absolute inset-0"
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              >
                                <div className="relative w-full h-full">
                                  <div className="absolute left-1 top-0 w-0.5 h-full bg-gradient-to-b from-primary to-accent rounded-full" />
                                  <div className="absolute right-1 top-0 w-0.5 h-full bg-gradient-to-b from-accent to-primary rounded-full" />
                                  {[...Array(4)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute left-1 right-1 h-px bg-gradient-to-r from-primary to-accent"
                                      style={{ top: `${20 + i * 15}%` }}
                                      animate={{ rotateZ: [0, 180, 360] }}
                                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                                    />
                                  ))}
                                </div>
                              </motion.div>
                            </div>
                            <p className="text-muted-foreground">Analyzing your craving for nutrient patterns...</p>
                          </div>
                        </GlassCard>
                      </motion.div>
                    )}

                    {cravingResults && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <GlassCard className="glass-strong p-6 mb-6">
                          <h3 className="text-xl font-bold mb-4">
                            Analysis for "{cravingResults.food_name}"
                            {cravingResults.foods_analyzed && cravingResults.foods_analyzed.length > 0 && (
                              <span className="text-sm font-normal text-muted-foreground ml-2">
                                (Found {cravingResults.foods_analyzed.length} matching foods)
                              </span>
                            )}
                          </h3>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Potential Deficiencies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {cravingResults.nutrients.map((nutrient: string) => (
                                <Badge 
                                  key={nutrient} 
                                  variant="secondary" 
                                  className="glass-subtle relative"
                                >
                                  {nutrient}
                                  {cravingResults.deficiency_frequency?.[nutrient] && (
                                    <span className="ml-1 text-xs text-primary">
                                      ×{cravingResults.deficiency_frequency[nutrient]}
                                    </span>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {cravingResults.foods_analyzed && cravingResults.foods_analyzed.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold mb-2">Matching Foods:</h4>
                              <div className="flex flex-wrap gap-2">
                                {cravingResults.foods_analyzed.map((food: string) => (
                                  <Badge key={food} variant="outline" className="glass-subtle">
                                    {food}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
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
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h4 className="font-bold text-lg">{rec.name}</h4>
                                    {rec.evidence_level && (
                                      <Badge variant="outline" className="text-xs mt-1">
                                        Evidence: {rec.evidence_level}
                                      </Badge>
                                    )}
                                  </div>
                                  {rec.supplement_id && (
                                    <LiquidButton
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => router.push(`/supplements/${rec.supplement_id}`)}
                                      className="text-xs"
                                    >
                                      View Details
                                    </LiquidButton>
                                  )}
                                </div>
                                <p className="text-muted-foreground mb-4">{rec.reason}</p>

                                {rec.supplement && (
                                  <div className="mb-4 space-y-2">
                                    <div className="flex flex-wrap gap-1">
                                      {(rec.supplement.goals || []).slice(0, 3).map((goal: string) => (
                                        <Badge key={goal} variant="outline" className="text-xs">
                                          {goal}
                                        </Badge>
                                      ))}
                                    </div>
                                    {(rec.dosage || rec.supplement.dosage) && (
                                      <p className="text-sm text-muted-foreground">
                                        <strong>Dosage:</strong> {rec.dosage || rec.supplement.dosage}
                                      </p>
                                    )}
                                    {rec.supplement.summary && (
                                      <p className="text-sm text-muted-foreground line-clamp-2">
                                        {rec.supplement.summary}
                                      </p>
                                    )}
                                  </div>
                                )}

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
    </>
  )
}
