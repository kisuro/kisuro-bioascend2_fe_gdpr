"use client"
import { useState, useRef, useEffect } from "react"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import type { AudioTrack } from "@/lib/data/audio"

interface AudioPlayerProps {
  track: AudioTrack
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  compact?: boolean
}

export function AudioPlayer({ track, isPlaying, onPlay, onPause, compact = false }: AudioPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => onPause()

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [onPause])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("[v0] Audio play failed:", error)
          // If autoplay is blocked, we should pause the player
          onPause()
        })
      }
    } else {
      audio.pause()
    }
  }, [isPlaying, onPause])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume / 100
  }, [volume, isMuted])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (value[0] / 100) * track.duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const skip = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Math.max(0, Math.min(track.duration, audio.currentTime + seconds))
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <LiquidButton size="sm" onClick={isPlaying ? onPause : onPlay}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </LiquidButton>

        <audio ref={audioRef} src={track.audioUrl} preload="metadata" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider
          value={[track.duration > 0 ? (currentTime / track.duration) * 100 : 0]}
          onValueChange={handleSeek}
          max={100}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <LiquidButton variant="ghost" size="sm" onClick={() => skip(-10)}>
          <SkipBack className="h-4 w-4" />
        </LiquidButton>

        <LiquidButton size="lg" onClick={isPlaying ? onPause : onPlay} className="liquid-gradient">
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </LiquidButton>

        <LiquidButton variant="ghost" size="sm" onClick={() => skip(10)}>
          <SkipForward className="h-4 w-4" />
        </LiquidButton>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <LiquidButton variant="ghost" size="sm" onClick={toggleMute}>
          {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </LiquidButton>

        <Slider
          value={[isMuted ? 0 : volume]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="flex-1"
        />

        <span className="text-sm text-muted-foreground w-8">{isMuted ? 0 : volume}</span>
      </div>

      <audio ref={audioRef} src={track.audioUrl} preload="metadata" />
    </div>
  )
}
