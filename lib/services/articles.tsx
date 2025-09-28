export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  readTime: number
  tags: string[]
  category: string
  isPremium: boolean
  image?: string
  sources?: Array<{
    title: string
    url: string
    type: "study" | "article" | "book" | "website"
  }>
  views: number
  likes: number
}

// Mock articles data
const mockArticles: Article[] = [
  {
    id: "1",
    slug: "circadian-rhythm-optimization",
    title: "Circadian Rhythm Optimization: The Science of Better Sleep",
    excerpt:
      "Discover how to align your biological clock with modern life for improved energy, mood, and cognitive performance.",
    content: `
      <h2>Understanding Your Internal Clock</h2>
      <p>Your circadian rhythm is a 24-hour internal clock that regulates sleep-wake cycles, hormone production, and cellular repair processes. This biological timekeeper is primarily controlled by the suprachiasmatic nucleus (SCN) in your brain, which responds to light and darkness signals.</p>
      
      <h3>The Science Behind Circadian Rhythms</h3>
      <p>Research shows that circadian disruption is linked to numerous health issues including metabolic disorders, cardiovascular disease, and cognitive decline. By optimizing your circadian rhythm, you can enhance sleep quality, boost immune function, and improve overall well-being.</p>
      
      <h3>Practical Optimization Strategies</h3>
      <p>1. <strong>Light Exposure:</strong> Get 10-15 minutes of bright light within 30 minutes of waking</p>
      <p>2. <strong>Meal Timing:</strong> Eat your largest meal during daylight hours</p>
      <p>3. <strong>Temperature Regulation:</strong> Keep your bedroom cool (65-68°F) for optimal sleep</p>
      <p>4. <strong>Blue Light Management:</strong> Limit screen exposure 2 hours before bedtime</p>
      
      <h3>Advanced Techniques</h3>
      <p>For those looking to take their circadian optimization further, consider implementing time-restricted eating, strategic caffeine timing, and consistent sleep-wake schedules even on weekends.</p>
    `,
    author: {
      name: "Dr. Sarah Chen",
      avatar: "/professional-woman-doctor.png",
    },
    publishedAt: "2024-01-15",
    readTime: 8,
    tags: ["Sleep", "Circadian Rhythm", "Biohacking"],
    category: "Sleep Optimization",
    isPremium: false,
    image: "/circadian-rhythm-sleep-cycle.jpg",
    sources: [
      {
        title: "Circadian Rhythms and Sleep",
        url: "https://pubmed.ncbi.nlm.nih.gov/example1",
        type: "study",
      },
      {
        title: "Light Therapy for Sleep Disorders",
        url: "https://pubmed.ncbi.nlm.nih.gov/example2",
        type: "study",
      },
    ],
    views: 2847,
    likes: 156,
  },
  {
    id: "2",
    slug: "cognitive-enhancement-nootropics",
    title: "Cognitive Enhancement: A Scientific Approach to Nootropics",
    excerpt:
      "Explore evidence-based cognitive enhancers and their mechanisms for improving memory, focus, and mental clarity.",
    content: `
      <h2>The Science of Cognitive Enhancement</h2>
      <p>Nootropics, also known as "smart drugs" or cognitive enhancers, are substances that may improve cognitive function, particularly executive functions, memory, creativity, or motivation in healthy individuals.</p>
      
      <h3>Natural Nootropics</h3>
      <p>Several natural compounds have shown promise in clinical studies:</p>
      <p>• <strong>Lion's Mane Mushroom:</strong> Supports neurogenesis and cognitive function</p>
      <p>• <strong>Bacopa Monnieri:</strong> Enhances memory formation and recall</p>
      <p>• <strong>Rhodiola Rosea:</strong> Reduces mental fatigue and improves focus</p>
      
      <h3>Synthetic Options</h3>
      <p>For premium members, we explore advanced synthetic nootropics including racetams, modafinil analogs, and novel cognitive enhancers currently in clinical trials.</p>
    `,
    author: {
      name: "Dr. Michael Rodriguez",
      avatar: "/professional-scientist.png",
    },
    publishedAt: "2024-01-12",
    readTime: 12,
    tags: ["Nootropics", "Cognitive Enhancement", "Brain Health"],
    category: "Cognitive Enhancement",
    isPremium: true,
    image: "/brain-enhancement-biohacking.jpg",
    sources: [
      {
        title: "Nootropics: A Review of Cognitive Enhancers",
        url: "https://pubmed.ncbi.nlm.nih.gov/example3",
        type: "study",
      },
    ],
    views: 1923,
    likes: 89,
  },
  {
    id: "3",
    slug: "longevity-nutrition-guide",
    title: "Longevity Nutrition: Foods That Extend Healthspan",
    excerpt:
      "Discover the nutritional strategies used by the world's longest-living populations and how to implement them.",
    content: `
      <h2>The Blue Zone Diet Principles</h2>
      <p>Blue Zones are regions where people live significantly longer than average. Their dietary patterns reveal key insights into longevity nutrition.</p>
      
      <h3>Core Principles</h3>
      <p>1. <strong>Plant-Forward Diet:</strong> 90-95% of calories from plants</p>
      <p>2. <strong>Moderate Caloric Restriction:</strong> Eating until 80% full</p>
      <p>3. <strong>Minimal Processing:</strong> Whole foods over processed alternatives</p>
      
      <h3>Longevity Superfoods</h3>
      <p>• Legumes (beans, lentils, chickpeas)</p>
      <p>• Leafy greens and cruciferous vegetables</p>
      <p>• Nuts and seeds</p>
      <p>• Fatty fish (for non-vegetarian populations)</p>
      <p>• Fermented foods for gut health</p>
    `,
    author: {
      name: "Dr. Elena Vasquez",
      avatar: "/professional-nutritionist.png",
    },
    publishedAt: "2024-01-10",
    readTime: 10,
    tags: ["Nutrition", "Longevity", "Blue Zones"],
    category: "Nutrition",
    isPremium: false,
    image: "/healthy-nutrition-longevity-food.jpg",
    views: 3156,
    likes: 203,
  },
  {
    id: "4",
    slug: "meditation-neuroplasticity",
    title: "Meditation and Neuroplasticity: Rewiring Your Brain",
    excerpt: "Learn how meditation practices create measurable changes in brain structure and function.",
    content: `
      <h2>The Neuroscience of Meditation</h2>
      <p>Modern neuroscience has revealed that meditation creates profound changes in brain structure and function through neuroplasticity - the brain's ability to reorganize and form new neural connections.</p>
      
      <h3>Structural Brain Changes</h3>
      <p>Regular meditation practice has been shown to:</p>
      <p>• Increase cortical thickness in attention-related areas</p>
      <p>• Reduce amygdala reactivity to stress</p>
      <p>• Strengthen the prefrontal cortex</p>
      <p>• Enhance connectivity between brain regions</p>
      
      <h3>Practical Implementation</h3>
      <p>Start with just 10 minutes daily of focused attention meditation. Consistency is more important than duration for creating lasting neuroplastic changes.</p>
    `,
    author: {
      name: "Dr. James Park",
      avatar: "/professional-man-meditation-teacher.jpg",
    },
    publishedAt: "2024-01-08",
    readTime: 7,
    tags: ["Meditation", "Neuroplasticity", "Brain Training"],
    category: "Mental Training",
    isPremium: false,
    image: "/meditation-brain-neuroplasticity.jpg",
    views: 2234,
    likes: 134,
  },
  {
    id: "5",
    slug: "exercise-molecular-adaptations",
    title: "Exercise-Induced Molecular Adaptations: Beyond Fitness",
    excerpt: "Explore the cellular and molecular changes that occur with different types of exercise training.",
    content: `
      <h2>Molecular Exercise Physiology</h2>
      <p>Exercise triggers a cascade of molecular adaptations that extend far beyond improved fitness, influencing gene expression, mitochondrial biogenesis, and cellular repair mechanisms.</p>
      
      <h3>Mitochondrial Adaptations</h3>
      <p>Aerobic exercise stimulates mitochondrial biogenesis through the PGC-1α pathway, leading to:</p>
      <p>• Increased mitochondrial density</p>
      <p>• Enhanced oxidative capacity</p>
      <p>• Improved cellular energy production</p>
      
      <h3>Resistance Training Adaptations</h3>
      <p>Strength training activates mTOR signaling pathways, promoting:</p>
      <p>• Protein synthesis</p>
      <p>• Muscle fiber hypertrophy</p>
      <p>• Improved insulin sensitivity</p>
      
      <h3>Premium Content: Advanced Training Protocols</h3>
      <p>For premium members, we detail specific training protocols that maximize these molecular adaptations, including periodization strategies and recovery optimization techniques.</p>
    `,
    author: {
      name: "Dr. Amanda Foster",
      avatar: "/professional-woman-exercise-physiologist.jpg",
    },
    publishedAt: "2024-01-05",
    readTime: 15,
    tags: ["Exercise", "Molecular Biology", "Fitness"],
    category: "Exercise Science",
    isPremium: true,
    image: "/exercise-molecular-cellular-adaptation.jpg",
    views: 1876,
    likes: 97,
  },
  {
    id: "6",
    slug: "stress-hormones-management",
    title: "Stress Hormones and Recovery: A Biohacker's Guide",
    excerpt: "Master your stress response system through evidence-based interventions and monitoring techniques.",
    content: `
      <h2>Understanding the Stress Response</h2>
      <p>The hypothalamic-pituitary-adrenal (HPA) axis orchestrates your body's response to stress through the release of cortisol and other stress hormones. While acute stress can be beneficial, chronic elevation leads to numerous health issues.</p>
      
      <h3>Cortisol Optimization Strategies</h3>
      <p>1. <strong>Morning Light Exposure:</strong> Helps establish healthy cortisol rhythm</p>
      <p>2. <strong>Adaptogenic Herbs:</strong> Ashwagandha, rhodiola, and holy basil</p>
      <p>3. <strong>Breathing Techniques:</strong> 4-7-8 breathing and box breathing</p>
      <p>4. <strong>Cold Exposure:</strong> Controlled stress to improve stress resilience</p>
      
      <h3>Monitoring and Tracking</h3>
      <p>Use salivary cortisol testing and HRV monitoring to track your stress response and recovery patterns. Premium members get access to detailed protocols for interpreting these biomarkers.</p>
    `,
    author: {
      name: "Dr. Robert Kim",
      avatar: "/professional-man-stress-researcher.jpg",
    },
    publishedAt: "2024-01-03",
    readTime: 11,
    tags: ["Stress Management", "Hormones", "Recovery"],
    category: "Stress Management",
    isPremium: true,
    image: "/stress-hormones-cortisol-management.jpg",
    views: 2567,
    likes: 178,
  },
]

// Mock API functions
export async function getArticles(params?: {
  search?: string
  category?: string
  tags?: string[]
  isPremium?: boolean
  limit?: number
  offset?: number
}): Promise<{ articles: Article[]; total: number }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filteredArticles = [...mockArticles]

  // Apply filters
  if (params?.search) {
    const searchLower = params.search.toLowerCase()
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    )
  }

  if (params?.category && params.category !== "all") {
    filteredArticles = filteredArticles.filter(
      (article) => article.category.toLowerCase() === params.category?.toLowerCase(),
    )
  }

  if (params?.tags && params.tags.length > 0) {
    filteredArticles = filteredArticles.filter((article) => params.tags!.some((tag) => article.tags.includes(tag)))
  }

  if (params?.isPremium !== undefined) {
    filteredArticles = filteredArticles.filter((article) => article.isPremium === params.isPremium)
  }

  // Sort by published date (newest first)
  filteredArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  // Apply pagination
  const limit = params?.limit || 10
  const offset = params?.offset || 0
  const paginatedArticles = filteredArticles.slice(offset, offset + limit)

  return {
    articles: paginatedArticles,
    total: filteredArticles.length,
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const article = mockArticles.find((article) => article.slug === slug)
  return article || null
}

export async function getArticleCategories(): Promise<string[]> {
  const categories = [...new Set(mockArticles.map((article) => article.category))]
  return categories.sort()
}

export async function getArticleTags(): Promise<string[]> {
  const allTags = mockArticles.flatMap((article) => article.tags)
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags.sort()
}

export async function createArticle(articleData: Omit<Article, "id" | "views" | "likes">): Promise<Article> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newArticle: Article = {
    ...articleData,
    id: Date.now().toString(),
    views: 0,
    likes: 0,
  }

  mockArticles.unshift(newArticle)
  return newArticle
}

export async function updateArticle(id: string, articleData: Partial<Article>): Promise<Article | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = mockArticles.findIndex((article) => article.id === id)
  if (index === -1) return null

  mockArticles[index] = { ...mockArticles[index], ...articleData }
  return mockArticles[index]
}

export async function deleteArticle(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const index = mockArticles.findIndex((article) => article.id === id)
  if (index === -1) return false

  mockArticles.splice(index, 1)
  return true
}
