"use client"
import { useState, useMemo } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AudioTrackCard } from "@/components/mind/audio-track-card"
import { Search, Filter, Grid, List } from "lucide-react"
import { audioTracksData, type AudioTrack } from "@/lib/data/audio"

interface AudioLibraryProps {
  onPlayTrack: (track: AudioTrack) => void
  currentTrack: AudioTrack | null
}

export function AudioLibrary({ onPlayTrack, currentTrack }: AudioLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)

  const categories = useMemo(() => {
    const cats = new Set<string>()
    audioTracksData.forEach((track) => {
      track.categories.forEach((cat) => cats.add(cat))
    })
    return Array.from(cats).sort()
  }, [])

  const filteredTracks = useMemo(() => {
    return audioTracksData.filter((track) => {
      const matchesSearch =
        searchQuery === "" ||
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || track.categories.includes(selectedCategory)

      const matchesPremium = !showPremiumOnly || track.isPremium

      return matchesSearch && matchesCategory && matchesPremium
    })
  }, [searchQuery, selectedCategory, showPremiumOnly])

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <GlassCard className="glass-strong p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tracks, artists, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass-subtle"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            <LiquidButton
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </LiquidButton>
            {categories.map((category) => (
              <LiquidButton
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </LiquidButton>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex gap-2">
            <LiquidButton
              variant={showPremiumOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowPremiumOnly(!showPremiumOnly)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Premium
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
        {(selectedCategory !== "all" || showPremiumOnly) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="glass-subtle">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory("all")} className="ml-2 hover:text-destructive">
                  ×
                </button>
              </Badge>
            )}
            {showPremiumOnly && (
              <Badge variant="secondary" className="glass-subtle">
                Premium Only
                <button onClick={() => setShowPremiumOnly(false)} className="ml-2 hover:text-destructive">
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </GlassCard>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          {filteredTracks.length} track{filteredTracks.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Tracks Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredTracks.map((track) => (
          <AudioTrackCard
            key={track.id}
            track={track}
            onPlay={() => onPlayTrack(track)}
            isCurrentTrack={currentTrack?.id === track.id}
            viewMode={viewMode}
          />
        ))}
      </div>

      {filteredTracks.length === 0 && (
        <div className="text-center py-12">
          <GlassCard className="glass-subtle p-8">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold mb-2">No tracks found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
