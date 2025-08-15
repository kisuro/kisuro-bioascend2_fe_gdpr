"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AudioTrackCard } from "@/components/mind/audio-track-card"
import { Plus, List, Play, Trash2 } from "lucide-react"
import { audioTracks, type AudioTrack } from "@/lib/data/audio"

interface Playlist {
  id: string
  name: string
  description: string
  tracks: AudioTrack[]
  createdAt: Date
}

interface PlaylistManagerProps {
  onPlayTrack: (track: AudioTrack) => void
  currentTrack: AudioTrack | null
}

export function PlaylistManager({ onPlayTrack, currentTrack }: PlaylistManagerProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "1",
      name: "Morning Focus",
      description: "Energizing tracks to start your day",
      tracks: audioTracks.slice(0, 3),
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Deep Meditation",
      description: "Profound meditative experiences",
      tracks: audioTracks.slice(3, 6),
      createdAt: new Date(),
    },
  ])

  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("")

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      description: newPlaylistDescription,
      tracks: [],
      createdAt: new Date(),
    }

    setPlaylists([...playlists, newPlaylist])
    setNewPlaylistName("")
    setNewPlaylistDescription("")
    setIsCreating(false)
  }

  const deletePlaylist = (playlistId: string) => {
    setPlaylists(playlists.filter((p) => p.id !== playlistId))
    if (selectedPlaylist?.id === playlistId) {
      setSelectedPlaylist(null)
    }
  }

  const playPlaylist = (playlist: Playlist) => {
    if (playlist.tracks.length > 0) {
      onPlayTrack(playlist.tracks[0])
    }
  }

  return (
    <div className="space-y-6">
      {!selectedPlaylist ? (
        <>
          {/* Create Playlist Section */}
          <GlassCard className="backdrop-blur-md bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold font-heading">Your Playlists</h2>
              <LiquidButton onClick={() => setIsCreating(!isCreating)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Playlist
              </LiquidButton>
            </div>

            {isCreating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 mb-6 p-4 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10"
              >
                <Input
                  placeholder="Playlist name"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="backdrop-blur-sm bg-white/10 border-white/20"
                />
                <Input
                  placeholder="Description (optional)"
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                  className="backdrop-blur-sm bg-white/10 border-white/20"
                />
                <div className="flex gap-2">
                  <Button onClick={createPlaylist} size="sm">
                    Create
                  </Button>
                  <Button onClick={() => setIsCreating(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </GlassCard>

          {/* Playlists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="backdrop-blur-md bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <List className="h-8 w-8 text-primary" />
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => playPlaylist(playlist)} className="h-8 w-8 p-0">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deletePlaylist(playlist.id)}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 font-heading">{playlist.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{playlist.description}</p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{playlist.tracks.length} tracks</span>
                    <span>{playlist.createdAt.toLocaleDateString()}</span>
                  </div>

                  <LiquidButton onClick={() => setSelectedPlaylist(playlist)} className="w-full mt-4" variant="outline">
                    View Playlist
                  </LiquidButton>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        /* Playlist Detail View */
        <div className="space-y-6">
          <GlassCard className="backdrop-blur-md bg-white/5 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold font-heading">{selectedPlaylist.name}</h2>
                <p className="text-muted-foreground">{selectedPlaylist.description}</p>
              </div>
              <div className="flex gap-2">
                <LiquidButton onClick={() => playPlaylist(selectedPlaylist)} className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Play All
                </LiquidButton>
                <Button onClick={() => setSelectedPlaylist(null)} variant="outline">
                  Back to Playlists
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {selectedPlaylist.tracks.length} tracks • Created {selectedPlaylist.createdAt.toLocaleDateString()}
            </div>
          </GlassCard>

          {/* Playlist Tracks */}
          <div className="space-y-4">
            {selectedPlaylist.tracks.length > 0 ? (
              selectedPlaylist.tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AudioTrackCard
                    track={track}
                    onPlay={() => onPlayTrack(track)}
                    isPlaying={currentTrack?.id === track.id}
                  />
                </motion.div>
              ))
            ) : (
              <GlassCard className="backdrop-blur-md bg-white/5 border border-white/10 p-12 text-center">
                <List className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Empty Playlist</h3>
                <p className="text-muted-foreground">Add tracks from the library to get started</p>
              </GlassCard>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
