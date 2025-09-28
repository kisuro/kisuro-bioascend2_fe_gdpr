import { notFound } from "next/navigation"
import { ArticleDetailClient } from "./article-detail-client"
import type { Metadata } from "next"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!

type ArticleFromAPI = {
  id: string
  slug: string
  title: string
  excerpt?: string
  content: string
  isPremium: boolean
  publishedAt: string
  tags: string[]
  sources?: Array<{ label: string; url: string }>
  coverImageUrl?: string
  author?: {
    name: string
    bio?: string
    avatar?: string
  }
  readingTime?: number
  meta?: Record<string, any>
}

// Mock data for development - will be replaced with real API calls
const mockArticles: Record<string, ArticleFromAPI> = {
  "understanding-circadian-rhythms": {
    id: "1",
    slug: "understanding-circadian-rhythms",
    title: "Understanding Circadian Rhythms: The Science Behind Your Body Clock",
    excerpt:
      "Explore how your internal biological clock affects sleep, metabolism, and overall health. Learn practical strategies to optimize your circadian rhythm for better wellness.",
    content: `# Understanding Circadian Rhythms: The Science Behind Your Body Clock

Your circadian rhythm is one of the most fundamental biological processes governing your health and well-being. This internal clock, running on approximately a 24-hour cycle, influences everything from when you feel sleepy to how your body processes food.

## What Are Circadian Rhythms?

Circadian rhythms are physical, mental, and behavioral changes that follow a 24-hour cycle. These natural processes respond primarily to light and dark and affect most living things, including animals, plants, and microbes.

### The Master Clock

Located in the suprachiasmatic nucleus (SCN) of your brain's hypothalamus, your master clock coordinates all the peripheral clocks throughout your body. This remarkable system:

- Regulates sleep-wake cycles
- Controls hormone production
- Influences body temperature
- Affects metabolism and digestion
- Modulates immune function

## The Science Behind Sleep-Wake Cycles

Your circadian rhythm doesn't just tell you when to sleep—it orchestrates a complex symphony of biological processes:

### Morning (6 AM - 12 PM)
- Cortisol peaks to promote wakefulness
- Body temperature begins to rise
- Alertness increases
- Metabolism ramps up

### Afternoon (12 PM - 6 PM)
- Peak alertness and cognitive performance
- Optimal time for physical activity
- Digestive system is most active

### Evening (6 PM - 12 AM)
- Melatonin production begins
- Body temperature starts to drop
- Parasympathetic nervous system activation
- Preparation for sleep

### Night (12 AM - 6 AM)
- Deep sleep phases
- Growth hormone release
- Memory consolidation
- Cellular repair processes

## Factors That Disrupt Circadian Rhythms

Modern life presents numerous challenges to maintaining healthy circadian rhythms:

### Light Exposure
- Blue light from screens
- Insufficient natural light during the day
- Artificial lighting at night

### Lifestyle Factors
- Irregular sleep schedules
- Shift work
- Jet lag
- Late-night eating

### Environmental Disruptions
- Noise pollution
- Temperature fluctuations
- Social obligations

## Optimizing Your Circadian Rhythm

### Light Management
**Morning Light Exposure:**
- Get 10-30 minutes of bright light within the first hour of waking
- Use a light therapy box if natural light isn't available
- Consider a dawn simulation alarm clock

**Evening Light Reduction:**
- Dim lights 2-3 hours before bedtime
- Use blue light blocking glasses
- Install f.lux or similar software on devices

### Sleep Hygiene
- Maintain consistent sleep and wake times
- Create a cool, dark sleeping environment
- Avoid caffeine 6-8 hours before bed
- Limit alcohol consumption

### Meal Timing
- Eat your largest meal during daylight hours
- Avoid large meals 3 hours before bedtime
- Consider time-restricted eating (intermittent fasting)

### Exercise Timing
- Morning or afternoon exercise can strengthen circadian rhythms
- Avoid intense exercise 3-4 hours before bedtime
- Light evening walks can be beneficial

## The Health Impact of Disrupted Circadian Rhythms

Research has linked circadian rhythm disruption to numerous health issues:

### Metabolic Consequences
- Increased risk of obesity
- Type 2 diabetes
- Metabolic syndrome
- Insulin resistance

### Mental Health Effects
- Depression and anxiety
- Mood disorders
- Cognitive impairment
- Reduced stress resilience

### Physical Health Impacts
- Weakened immune system
- Increased inflammation
- Cardiovascular disease risk
- Accelerated aging

## Advanced Optimization Strategies

### Chronotype Awareness
Understanding whether you're naturally a morning lark or night owl can help you:
- Schedule important tasks during peak performance times
- Adjust light exposure timing
- Optimize meal and exercise timing

### Temperature Regulation
- Keep your bedroom cool (65-68°F)
- Take a warm bath before bed to trigger temperature drop
- Use cooling mattress pads or weighted blankets

### Supplement Support
While lifestyle changes are primary, certain supplements may help:
- Melatonin (0.5-3mg, 30-60 minutes before desired sleep time)
- Magnesium glycinate
- L-theanine
- Valerian root

*Always consult with a healthcare provider before starting any supplement regimen.*

## Measuring Your Circadian Health

### Subjective Measures
- Sleep quality ratings
- Energy levels throughout the day
- Mood stability
- Cognitive performance

### Objective Measures
- Sleep tracking devices
- Heart rate variability
- Core body temperature monitoring
- Cortisol testing

## The Future of Circadian Medicine

Emerging research in chronobiology is revealing new applications:

### Personalized Medicine
- Timing medications based on circadian rhythms
- Optimizing treatment schedules
- Reducing side effects through chronotherapy

### Workplace Applications
- Shift work optimization
- Productivity enhancement
- Reducing workplace accidents

## Conclusion

Your circadian rhythm is a powerful biological system that, when properly maintained, can significantly enhance your health, performance, and quality of life. By understanding and respecting these natural cycles, you can work with your biology rather than against it.

The key is consistency and patience—it typically takes 2-4 weeks to establish new circadian patterns. Start with one or two changes and gradually build a comprehensive approach to circadian health.

Remember, small adjustments to your daily routine can yield profound improvements in sleep quality, energy levels, and overall well-being. Your body clock is always ticking—make sure it's keeping the right time.`,
    isPremium: false,
    publishedAt: "2024-01-15T10:00:00Z",
    tags: ["Sleep", "Circadian", "Health", "Science"],
    sources: [
      { label: "Nature Sleep Research", url: "https://nature.com/sleep" },
      { label: "Harvard Medical School", url: "https://harvard.edu/sleep" },
      { label: "National Sleep Foundation", url: "https://sleepfoundation.org" },
    ],
    coverImageUrl: "/circadian-rhythm-sleep-cycle.jpg",
    author: {
      name: "Dr. Sarah Chen",
      bio: "Sleep researcher and circadian biology expert with over 15 years of experience in chronobiology.",
      avatar: "/authors/dr-sarah-chen.jpg",
    },
    readingTime: 12,
  },
  "advanced-biohacking-techniques": {
    id: "2",
    slug: "advanced-biohacking-techniques",
    title: "Advanced Biohacking Techniques for Cognitive Enhancement",
    excerpt:
      "Discover cutting-edge biohacking methods to boost cognitive performance, including nootropics, neurofeedback, and lifestyle optimization strategies.",
    content: `# Advanced Biohacking Techniques for Cognitive Enhancement

*This is premium content. The full article contains detailed protocols, dosage recommendations, and advanced techniques for cognitive optimization.*

## Introduction

Cognitive enhancement through biohacking represents the cutting edge of human performance optimization. This comprehensive guide explores evidence-based techniques that can significantly improve memory, focus, creativity, and overall brain function.

## Preview: What You'll Learn

- **Nootropic Stacking Protocols**: Advanced combinations for synergistic effects
- **Neurofeedback Training**: Real-time brain optimization techniques  
- **Transcranial Stimulation**: Safe DIY protocols for cognitive enhancement
- **Advanced Sleep Hacking**: Polyphasic sleep and recovery optimization
- **Metabolic Brain Optimization**: Ketosis, fasting, and nutrient timing

---

*The complete article includes detailed implementation guides, safety protocols, and personalized optimization strategies. Upgrade to premium to access the full content.*`,
    isPremium: true,
    publishedAt: "2024-01-10T14:30:00Z",
    tags: ["Biohacking", "Cognitive", "Nootropics", "Performance"],
    sources: [
      { label: "Journal of Cognitive Enhancement", url: "https://example.com/cognitive" },
      { label: "Biohacker's Handbook", url: "https://example.com/biohacking" },
    ],
    coverImageUrl: "/brain-enhancement-biohacking.jpg",
    author: {
      name: "Marcus Rodriguez",
      bio: "Biohacking researcher and cognitive performance specialist.",
      avatar: "/authors/marcus-rodriguez.jpg",
    },
    readingTime: 18,
  },
}

// Fetch article data (mock implementation)
async function getArticleFromAPI(slug: string): Promise<ArticleFromAPI | null> {
  // In production, this would be a real API call
  // const res = await fetch(`${API_BASE}/v1/articles/${slug}`, { cache: "no-store" })
  // if (!res.ok) return null
  // return res.json()

  // Mock implementation
  return mockArticles[slug] || null
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleFromAPI(slug)

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    }
  }

  return {
    title: `${article.title} | BioAscend Articles`,
    description: article.excerpt,
    keywords: article.tags.join(", "),
    authors: article.author ? [{ name: article.author.name }] : undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      tags: article.tags,
      images: article.coverImageUrl ? [{ url: article.coverImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    },
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleFromAPI(slug)

  if (!article) {
    notFound()
  }

  return <ArticleDetailClient article={article} />
}
