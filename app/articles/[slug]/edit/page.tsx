"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { GlassCard } from "@/components/ui/glass-card"
import { ArticleEditor } from "@/components/articles/article-editor"
import { TagInput } from "@/components/articles/tag-input"
import { SourcesList, type Source } from "@/components/articles/sources-list"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/lib/contexts/user-context"
import Link from "next/link"
import { notFound } from "next/navigation"

const articleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  excerpt: z.string().min(1, "Excerpt is required").max(500, "Excerpt must be less than 500 characters"),
  content: z.string().min(1, "Content is required"),
  isPremium: z.boolean().default(false),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  sources: z
    .array(
      z.object({
        label: z.string().min(1, "Source label is required"),
        url: z.string().url("Invalid URL format"),
      }),
    )
    .default([]),
})

type ArticleFormData = z.infer<typeof articleSchema>

// Mock article data - in real app this would come from API
const mockArticleData = {
  "understanding-circadian-rhythms": {
    id: "1",
    slug: "understanding-circadian-rhythms",
    title: "Understanding Circadian Rhythms: The Science Behind Your Body Clock",
    excerpt:
      "Explore how your internal biological clock affects sleep, metabolism, and overall health. Learn practical strategies to optimize your circadian rhythm for better wellness.",
    content:
      "<h2>Understanding Circadian Rhythms</h2><p>Your circadian rhythm is one of the most fundamental biological processes governing your health and well-being...</p>",
    isPremium: false,
    tags: ["Sleep", "Circadian", "Health", "Science"],
    sources: [
      { label: "Nature Sleep Research", url: "https://nature.com/sleep" },
      { label: "Harvard Medical School", url: "https://harvard.edu/sleep" },
    ],
    coverImageUrl: "/circadian-rhythm-sleep-cycle.jpg",
  },
}

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const router = useRouter()
  const { toast } = useToast()
  const user = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [sources, setSources] = useState<Source[]>([])
  const [slug, setSlug] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // Check permissions
  const canEditArticles = user.role === "owner" || user.role === "moderator"

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      isPremium: false,
      tags: [],
      coverImageUrl: "",
      sources: [],
    },
  })

  const isPremium = watch("isPremium")

  // Load article data
  useEffect(() => {
    const loadArticle = async () => {
      const resolvedParams = await params
      const articleSlug = resolvedParams.slug
      setSlug(articleSlug)

      // In real app, this would be an API call
      const article = mockArticleData[articleSlug as keyof typeof mockArticleData]

      if (!article) {
        notFound()
      }

      // Populate form with existing data
      reset({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        isPremium: article.isPremium,
        tags: article.tags,
        coverImageUrl: article.coverImageUrl || "",
        sources: article.sources || [],
      })

      setContent(article.content)
      setTags(article.tags)
      setSources(article.sources || [])
      setIsLoading(false)
    }

    loadArticle()
  }, [params, reset])

  if (!canEditArticles) {
    return (
      <div className="min-h-screen pt-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don't have permission to edit articles.</p>
          <Button asChild>
            <Link href="/articles">Back to Articles</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true)

    try {
      const articleData = {
        ...data,
        slug,
        content,
        tags,
        sources: sources.filter((s) => s.label && s.url),
        updatedAt: new Date().toISOString(),
      }

      // In a real app, this would be an API call
      console.log("Updating article:", articleData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Article updated!",
        description: "Your changes have been saved successfully.",
      })

      router.push(`/articles/${slug}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      // In a real app, this would be an API call
      console.log("Deleting article:", slug)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Article deleted",
        description: "The article has been permanently removed.",
      })

      router.push("/articles")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen pt-8 px-4 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/articles/${slug}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Article
            </Link>
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">Edit Article</h1>
          <p className="text-muted-foreground">Make changes to your article and save them.</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <GlassCard className="p-6">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title" className="text-base font-semibold">
                    Title *
                  </Label>
                  <Input id="title" {...register("title")} placeholder="Enter article title..." className="mt-2" />
                  {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
                </div>

                {/* Excerpt */}
                <div>
                  <Label htmlFor="excerpt" className="text-base font-semibold">
                    Excerpt *
                  </Label>
                  <textarea
                    id="excerpt"
                    {...register("excerpt")}
                    placeholder="Brief description of your article..."
                    className="mt-2 w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                  {errors.excerpt && <p className="text-sm text-destructive mt-1">{errors.excerpt.message}</p>}
                </div>

                {/* Premium Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isPremium" className="text-base font-semibold">
                      Premium Content
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">Restrict access to premium subscribers only</p>
                  </div>
                  <Switch
                    id="isPremium"
                    checked={isPremium}
                    onCheckedChange={(checked) => setValue("isPremium", checked)}
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <Label htmlFor="coverImageUrl" className="text-base font-semibold">
                    Cover Image URL
                  </Label>
                  <Input
                    id="coverImageUrl"
                    type="url"
                    {...register("coverImageUrl")}
                    placeholder="https://example.com/image.jpg"
                    className="mt-2"
                  />
                  {errors.coverImageUrl && (
                    <p className="text-sm text-destructive mt-1">{errors.coverImageUrl.message}</p>
                  )}
                </div>

                {/* Tags */}
                <TagInput
                  tags={tags}
                  onChange={(newTags) => {
                    setTags(newTags)
                    setValue("tags", newTags)
                  }}
                  placeholder="Add tags (press Enter or comma to add)..."
                />
                {errors.tags && <p className="text-sm text-destructive">{errors.tags.message}</p>}
              </div>
            </GlassCard>

            {/* Content Editor */}
            <GlassCard className="p-6">
              <div>
                <Label className="text-base font-semibold mb-4 block">Content *</Label>
                <ArticleEditor
                  content={content}
                  onChange={(newContent) => {
                    setContent(newContent)
                    setValue("content", newContent)
                  }}
                  placeholder="Start writing your article..."
                />
                {errors.content && <p className="text-sm text-destructive mt-2">{errors.content.message}</p>}
              </div>
            </GlassCard>

            {/* Sources */}
            <GlassCard className="p-6">
              <SourcesList
                sources={sources}
                onChange={(newSources) => {
                  setSources(newSources)
                  setValue(
                    "sources",
                    newSources.filter((s) => s.label && s.url),
                  )
                }}
              />
              {errors.sources && <p className="text-sm text-destructive mt-2">{errors.sources.message}</p>}
            </GlassCard>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="min-w-[120px]"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Article
                  </>
                )}
              </Button>

              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" asChild>
                  <Link href={`/articles/${slug}`}>Cancel</Link>
                </Button>

                <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
