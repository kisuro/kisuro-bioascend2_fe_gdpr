import { notFound } from "next/navigation"
import { ArticleDetailClient } from "./article-detail-client"
import type { Metadata } from "next"
import { getArticleBySlug, type Article } from "@/lib/services/articles"

type ArticleFromAPI = Article

async function getArticleFromAPI(slug: string): Promise<ArticleFromAPI | null> {
  return await getArticleBySlug(slug)
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
      images: article.image ? [{ url: article.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : undefined,
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
