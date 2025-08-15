"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Clock, Crown, Lock } from "lucide-react"
import type { AudioTrack } from "@/lib/data/audio"

interface AudioTrackCardProps {
  track: AudioTrack
  onPlay: () => void
  isCurrentTrack: boolean
  viewMode: "grid" | "list"
}

export function AudioTrackCard({ track, onPlay, isCurrentTrack, viewMode }: AudioTrackCardProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handlePlay = () => {
    if (track.isPremium && !track.hasAccess) {
      // Show premium upgrade modal
      console.log("Premium content - show upgrade modal")
      return
    }
    onPlay()
  }

  if (viewMode === "list") {
    return (
      <GlassCard className="glass-morph p-4 hover:glass-strong transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-lg glass-subtle flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{track.categories[0]?.charAt(0)}</span>
              </div>
            </div>
            {track.isPremium && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{track.title}</h3>
              {track.isPremium && !track.hasAccess && <Lock className="h-4 w-4 text-muted-foreground" />}
            </div>
            <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{track.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatDuration(track.duration)}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {track.categories.slice(0, 2).map((category) => (
                  <Badge key={category} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <LiquidButton
              size="sm"
              onClick={handlePlay}
              variant={isCurrentTrack ? "outline" : "default"}
              disabled={track.isPremium && !track.hasAccess}
            >
              {isCurrentTrack ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </LiquidButton>
          </div>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="glass-morph p-6 hover:glass-strong transition-all duration-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {track.isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
            <Badge variant="outline" className="text-xs glass-subtle">
              {track.categories[0]}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatDuration(track.duration)}</span>
          </div>
        </div>

        {/* Cover Art */}
        <div className="relative">
          <div className="w-full h-32 rounded-lg glass-subtle flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{track.categories[0]?.charAt(0)}</span>
            </div>
          </div>
          {track.isPremium && !track.hasAccess && (
            <div className="absolute inset-0 rounded-lg bg-black/50 flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate">{track.title}</h3>
            {track.isPremium && !track.hasAccess && <Lock className="h-4 w-4 text-muted-foreground" />}
          </div>
          <p className="text-sm text-muted-foreground">{track.artist}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{track.description}</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {track.categories.slice(1).map((category) => (
            <Badge key={category} variant="outline" className="text-xs glass-subtle">
              {category}
            </Badge>
          ))}
        </div>

        {/* Play Button */}
        <LiquidButton
          className="w-full"
          onClick={handlePlay}
          variant={isCurrentTrack ? "outline" : "default"}
          disabled={track.isPremium && !track.hasAccess}
        >
          {track.isPremium && !track.hasAccess ? (
            <>
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Play
            </>
          ) : isCurrentTrack ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Playing
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Play
            </>
          )}
        </LiquidButton>
      </div>
    </GlassCard>
  )
}
