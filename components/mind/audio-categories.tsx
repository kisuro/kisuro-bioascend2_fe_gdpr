"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { AudioTrackCard } from "@/components/mind/audio-track-card"
import { Brain, Heart, Zap, Moon, Sun, Waves } from "lucide-react"
import { audioTracks, type AudioTrack } from "@/lib/data/audio"

interface AudioCategoriesProps {
  onPlayTrack: (track: AudioTrack) => void
}

const categories = [
  {
    id: "meditation",
    name: "Meditation",
    description: "Deep meditative experiences for mindfulness",
    icon: Brain,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    id: "focus",
    name: "Focus",
    description: "Enhance concentration and productivity",
    icon: Zap,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
  },
  {
    id: "sleep",
    name: "Sleep",
    description: "Relaxing sounds for better rest",
    icon: Moon,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    id: "energy",
    name: "Energy",
    description: "Uplifting tracks to boost vitality",
    icon: Sun,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
  {
    id: "healing",
    name: "Healing",
    description: "Therapeutic frequencies for wellness",
    icon: Heart,
    color: "text-green-400",
    bgColor: "bg-green-500/20",
  },
  {
    id: "nature",
    name: "Nature",
    description: "Natural soundscapes and ambient noise",
    icon: Waves,
    color: "text-teal-400",
    bgColor: "bg-teal-500/20",
  },
]

export function AudioCategories({ onPlayTrack }: AudioCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getCategoryTracks = (categoryId: string): AudioTrack[] => {
    // Filter tracks based on category - in a real app this would be based on track metadata
    switch (categoryId) {
      case "meditation":
        return audioTracks.filter(
          (track) =>
            track.title.toLowerCase().includes("meditation") || track.title.toLowerCase().includes("mindfulness"),
        )
      case "focus":
        return audioTracks.filter(
          (track) => track.title.toLowerCase().includes("focus") || track.title.toLowerCase().includes("concentration"),
        )
      case "sleep":
        return audioTracks.filter(
          (track) => track.title.toLowerCase().includes("sleep") || track.title.toLowerCase().includes("rest"),
        )
      case "energy":
        return audioTracks.filter(
          (track) => track.title.toLowerCase().includes("energy") || track.title.toLowerCase().includes("morning"),
        )
      case "healing":
        return audioTracks.filter(
          (track) => track.title.toLowerCase().includes("healing") || track.title.toLowerCase().includes("therapy"),
        )
      case "nature":
        return audioTracks.filter(
          (track) =>
            track.title.toLowerCase().includes("nature") ||
            track.title.toLowerCase().includes("rain") ||
            track.title.toLowerCase().includes("ocean"),
        )
      default:
        return audioTracks.slice(0, 3) // Default selection
    }
  }

  if (selectedCategory) {
    const category = categories.find((c) => c.id === selectedCategory)
    const categoryTracks = getCategoryTracks(selectedCategory)

    return (
      <div className="space-y-6">
        <GlassCard className="backdrop-blur-md bg-white/5 border border-white/10 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${category?.bgColor} flex-shrink-0`}>
                {category?.icon && <category.icon className={`h-6 w-6 ${category.color}`} />}
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold font-heading truncate">{category?.name}</h2>
                <p className="text-muted-foreground text-sm sm:text-base">{category?.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              Back to Categories
            </button>
          </div>
        </GlassCard>

        <div className="space-y-4">
          {categoryTracks.length > 0 ? (
            categoryTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AudioTrackCard track={track} onPlay={() => onPlayTrack(track)} isPlaying={false} />
              </motion.div>
            ))
          ) : (
            <GlassCard className="backdrop-blur-md bg-white/5 border border-white/10 p-12 text-center">
              {category?.icon && <category.icon className={`h-16 w-16 mx-auto mb-4 ${category.color}`} />}
              <h3 className="text-xl font-semibold mb-2">No tracks available</h3>
              <p className="text-muted-foreground">Check back soon for new {category?.name.toLowerCase()} content</p>
            </GlassCard>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <GlassCard className="backdrop-blur-md bg-white/5 border border-white/10 p-6">
        <h2 className="text-2xl font-bold mb-2 font-heading">Browse by Category</h2>
        <p className="text-muted-foreground">Discover audio content organized by purpose and mood</p>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard
              className="backdrop-blur-md bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div
                className={`p-4 rounded-lg ${category.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <category.icon className={`h-8 w-8 ${category.color}`} />
              </div>

              <h3 className="text-xl font-semibold mb-2 font-heading">{category.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{category.description}</p>

              <div className="text-sm text-muted-foreground">
                {getCategoryTracks(category.id).length} tracks available
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
