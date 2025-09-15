"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AudioLibrary } from "@/components/mind/audio-library"
import { AudioPlayer } from "@/components/mind/audio-player"
import { PlaylistManager } from "@/components/mind/playlist-manager"
import { AudioCategories } from "@/components/mind/audio-categories"
import { Brain, Music, Headphones, List, Crown } from "lucide-react"
import type { AudioTrack } from "@/lib/data/audio"
import { MindBackground } from "@/components/ui/page-backgrounds"
import { SupplementLoader } from "@/components/ui/supplement-loader" // imported loader component

export default function MindPage() {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState("library")
  const [isLoading, setIsLoading] = useState(true) // added loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1300)
    return () => clearTimeout(timer)
  }, [])

  const handlePlayTrack = (track: AudioTrack) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const handlePauseTrack = () => {
    setIsPlaying(false)
  }

  const handleResumeTrack = () => {
    setIsPlaying(true)
  }

  if (isLoading) {
    return <SupplementLoader />
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <MindBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 liquid-text font-heading">Mind Audio Library</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Curated audio content for meditation, focus, and mental wellness optimization
          </p>
        </motion.div>

        {/* Premium Notice */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <GlassCard className="glass-subtle p-4">
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5 text-yellow-500" />
              <div className="text-sm">
                <span className="text-foreground font-medium">Premium Content Available:</span>
                <span className="text-muted-foreground ml-2">
                  Unlock exclusive meditations and advanced audio content with a subscription
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="glass-strong p-1">
                <TabsTrigger value="library" className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  <span className="hidden sm:inline">Library</span>
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span className="hidden sm:inline">Categories</span>
                </TabsTrigger>
                <TabsTrigger value="playlists" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">Playlists</span>
                </TabsTrigger>
                <TabsTrigger value="listening" className="flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  <span className="hidden sm:inline">Now Playing</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="library" className="space-y-8">
              <AudioLibrary onPlayTrack={handlePlayTrack} currentTrack={currentTrack} />
            </TabsContent>

            <TabsContent value="categories" className="space-y-8">
              <AudioCategories onPlayTrack={handlePlayTrack} />
            </TabsContent>

            <TabsContent value="playlists" className="space-y-8">
              <PlaylistManager onPlayTrack={handlePlayTrack} currentTrack={currentTrack} />
            </TabsContent>

            <TabsContent value="listening" className="space-y-8">
              <div className="flex justify-center">
                <GlassCard className="glass-strong p-8 max-w-2xl w-full">
                  {currentTrack ? (
                    <div className="text-center">
                      <div className="w-48 h-48 mx-auto mb-6 rounded-lg glass-morph flex items-center justify-center">
                        <Brain className="h-24 w-24 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2 font-heading">{currentTrack.title}</h2>
                      <p className="text-muted-foreground mb-6">{currentTrack.artist}</p>
                      <AudioPlayer
                        track={currentTrack}
                        isPlaying={isPlaying}
                        onPlay={handleResumeTrack}
                        onPause={handlePauseTrack}
                      />
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Headphones className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No track selected</h3>
                      <p className="text-muted-foreground">Choose a track from the library to start listening</p>
                    </div>
                  )}
                </GlassCard>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Fixed Audio Player */}
        {currentTrack && (
          <motion.div
            className="fixed bottom-4 left-4 right-4 z-50"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="glass-strong p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg glass-subtle flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{currentTrack.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
                </div>
                <div className="flex-shrink-0">
                  <AudioPlayer
                    track={currentTrack}
                    isPlaying={isPlaying}
                    onPlay={handleResumeTrack}
                    onPause={handlePauseTrack}
                    compact
                  />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
