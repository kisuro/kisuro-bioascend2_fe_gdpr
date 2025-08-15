export interface AudioTrack {
  id: string
  title: string
  artist: string
  description: string
  duration: number // in seconds
  categories: string[]
  audioUrl: string
  isPremium: boolean
  hasAccess: boolean // whether user has access to premium content
  tags: string[]
}

export interface Playlist {
  id: string
  name: string
  description: string
  tracks: string[] // track IDs
  isPublic: boolean
  createdAt: string
}

export const audioTracksData: AudioTrack[] = [
  {
    id: "1",
    title: "Deep Focus Flow",
    artist: "Mindful Sounds",
    description: "A 20-minute guided meditation designed to enhance concentration and mental clarity",
    duration: 1200, // 20 minutes
    categories: ["Meditation", "Focus", "Productivity"],
    audioUrl: "/placeholder.mp3",
    isPremium: false,
    hasAccess: true,
    tags: ["concentration", "clarity", "work", "study"],
  },
  {
    id: "2",
    title: "Ocean Waves Ambience",
    artist: "Nature Sounds",
    description: "Relaxing ocean waves for stress relief and better sleep quality",
    duration: 3600, // 60 minutes
    categories: ["Nature", "Sleep", "Relaxation"],
    audioUrl: "/placeholder.mp3",
    isPremium: false,
    hasAccess: true,
    tags: ["ocean", "waves", "sleep", "relaxation", "nature"],
  },
  {
    id: "3",
    title: "Advanced Breathwork Session",
    artist: "Dr. Sarah Chen",
    description: "Professional breathwork techniques for stress management and energy optimization",
    duration: 1800, // 30 minutes
    categories: ["Breathwork", "Stress Relief", "Energy"],
    audioUrl: "/placeholder.mp3",
    isPremium: true,
    hasAccess: false,
    tags: ["breathing", "stress", "energy", "professional", "advanced"],
  },
  {
    id: "4",
    title: "Morning Motivation Mantra",
    artist: "Positive Vibes",
    description: "Energizing mantras to start your day with intention and positivity",
    duration: 900, // 15 minutes
    categories: ["Mantras", "Morning", "Motivation"],
    audioUrl: "/placeholder.mp3",
    isPremium: false,
    hasAccess: true,
    tags: ["morning", "motivation", "mantras", "positive", "energy"],
  },
  {
    id: "5",
    title: "Binaural Beats - Alpha Waves",
    artist: "Brainwave Labs",
    description: "Scientifically designed alpha wave frequencies for enhanced creativity and relaxation",
    duration: 2700, // 45 minutes
    categories: ["Binaural Beats", "Creativity", "Relaxation"],
    audioUrl: "/placeholder.mp3",
    isPremium: true,
    hasAccess: false,
    tags: ["binaural", "alpha waves", "creativity", "science", "brainwaves"],
  },
  {
    id: "6",
    title: "Body Scan Meditation",
    artist: "Mindful Journey",
    description: "Progressive body scan meditation for deep relaxation and body awareness",
    duration: 1500, // 25 minutes
    categories: ["Meditation", "Body Awareness", "Relaxation"],
    audioUrl: "/placeholder.mp3",
    isPremium: false,
    hasAccess: true,
    tags: ["body scan", "awareness", "relaxation", "mindfulness"],
  },
  {
    id: "7",
    title: "White Noise - Rain Forest",
    artist: "Ambient World",
    description: "Immersive rainforest sounds with gentle rain for focus and concentration",
    duration: 7200, // 2 hours
    categories: ["White Noise", "Nature", "Focus"],
    audioUrl: "/placeholder.mp3",
    isPremium: false,
    hasAccess: true,
    tags: ["white noise", "rain", "forest", "focus", "concentration"],
  },
  {
    id: "8",
    title: "Advanced Sleep Hypnosis",
    artist: "Sleep Specialists",
    description: "Professional hypnosis session for deep, restorative sleep and dream enhancement",
    duration: 3600, // 60 minutes
    categories: ["Hypnosis", "Sleep", "Dreams"],
    audioUrl: "/placeholder.mp3",
    isPremium: true,
    hasAccess: false,
    tags: ["hypnosis", "sleep", "dreams", "professional", "deep sleep"],
  },
]

export const playlistsData: Playlist[] = [
  {
    id: "1",
    name: "Morning Routine",
    description: "Perfect tracks to start your day mindfully",
    tracks: ["1", "4", "6"],
    isPublic: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Deep Work Session",
    description: "Focus-enhancing audio for productive work sessions",
    tracks: ["1", "7", "5"],
    isPublic: false,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Sleep & Recovery",
    description: "Relaxing sounds for better sleep quality",
    tracks: ["2", "8", "6"],
    isPublic: true,
    createdAt: "2024-01-05",
  },
]
