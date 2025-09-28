"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { ArrowLeft, Save } from "lucide-react"
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

export default function NewArticlePage() {
  const router = useRouter()
  const { toast } = useToast()
  const user = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [sources, setSources] = useState<Source[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  // Check permissions
  const canCreateArticles = user.role === "owner" || user.role === "moderator"

  const isPremium = watch("isPremium")

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true)

    try {
      // Create slug from title
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const articleData = {
        ...data,
        slug,
        content,
        tags,
        sources: sources.filter((s) => s.label && s.url),
        publishedAt: new Date().toISOString(),
        author: {
          name: user.name || user.email?.split("@")[0] || "Anonymous",
          bio: "Content creator and health optimization expert.",
          avatar: "/authors/default-avatar.jpg",
        },
        readingTime: Math.ceil(content.split(" ").length / 200), // Estimate reading time
      }

      // In a real app, this would be an API call
      console.log("Creating article:", articleData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Article created!",
        description: "Your article has been published successfully.",
      })

      router.push(`/articles/${slug}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!canCreateArticles) {
    return (
      <div className="min-h-screen pt-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don't have permission to create articles.</p>
          <Button asChild>
            <Link href="/articles">Back to Articles</Link>
          </Button>
        </div>
      </div>
    )
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
            <Link href="/articles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">Create New Article</h1>
          <p className="text-muted-foreground">Share your knowledge and insights with the community.</p>
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
              <Button type="button" variant="outline" asChild>
                <Link href="/articles">Cancel</Link>
              </Button>

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Publish Article
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
