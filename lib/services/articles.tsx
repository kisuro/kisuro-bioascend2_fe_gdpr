export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  publishedAt: string
  updatedAt: string
  readTime: number
  tags: string[]
  category?: string
  isPremium: boolean
  useSiteAuthor?: boolean
  imageUrl?: string
  sources?: Array<{
    label: string
    url: string
  }>
  views: number
  likes: number
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('bioaionics_access_token') : null
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Include cookies
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response
}

// API functions
export async function getArticles(params?: {
  search?: string
  category?: string
  tags?: string[]
  isPremium?: boolean
  page?: number
  limit?: number
}): Promise<{ articles: Article[]; total: number }> {
  const searchParams = new URLSearchParams()
  
  if (params?.search) searchParams.set('search', params.search)
  if (params?.category) searchParams.set('category', params.category)
  if (params?.tags && params.tags.length > 0) searchParams.set('tags', params.tags.join(','))
  if (params?.isPremium !== undefined) searchParams.set('is_premium', params.isPremium.toString())
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())

  const response = await fetchWithAuth(`${API_BASE}/v1/articles?${searchParams.toString()}`)
  const data = await response.json()
  
  // Transform API response to match frontend interface
  const articles: Article[] = data.articles.map((article: any) => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: '', // Not included in list response
    author: article.author,
    publishedAt: article.published_at,
    updatedAt: article.published_at, // Use published_at for list
    readTime: article.read_time || 5,
    tags: article.tags || [],
    category: article.category,
    isPremium: article.is_premium,
    useSiteAuthor: article.use_site_author,
    imageUrl: article.image_url,
    views: article.views,
    likes: article.likes,
    sources: []
  }))

  return {
    articles,
    total: data.total,
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetchWithAuth(`${API_BASE}/v1/articles/${slug}`)
    const data = await response.json()
    
    // Transform API response to match frontend interface
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      author: data.author,
      publishedAt: data.published_at,
      updatedAt: data.updated_at,
      readTime: data.read_time || 5,
      tags: data.tags || [],
      category: data.category,
      isPremium: data.is_premium,
      useSiteAuthor: data.use_site_author,
      imageUrl: data.image_url,
      views: data.views,
      likes: data.likes,
      sources: data.sources || []
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

export async function getArticleCategories(): Promise<string[]> {
  try {
    const response = await fetchWithAuth(`${API_BASE}/v1/articles/categories`)
    const data = await response.json()
    return data.categories || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getArticleTags(): Promise<string[]> {
  try {
    const response = await fetchWithAuth(`${API_BASE}/v1/articles/tags`)
    const data = await response.json()
    return data.tags || []
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

export async function createArticle(articleData: {
  title: string
  excerpt: string
  content: string
  isPremium: boolean
  useSiteAuthor: boolean
  tags: string[]
  category?: string
  imageUrl?: string
  sources?: Array<{ label: string; url: string }>
}): Promise<Article> {
  const requestData = {
    title: articleData.title,
    excerpt: articleData.excerpt,
    content: articleData.content,
    is_premium: articleData.isPremium,
    use_site_author: articleData.useSiteAuthor,
    tags: articleData.tags,
    category: articleData.category,
    image_url: articleData.imageUrl,
    sources: articleData.sources || []
  }

  const response = await fetchWithAuth(`${API_BASE}/v1/articles`, {
    method: 'POST',
    body: JSON.stringify(requestData)
  })
  
  const data = await response.json()
  
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    readTime: data.read_time || 5,
    tags: data.tags || [],
    category: data.category,
    isPremium: data.is_premium,
    useSiteAuthor: data.use_site_author,
    imageUrl: data.image_url,
    views: data.views,
    likes: data.likes,
    sources: data.sources || []
  }
}

export async function updateArticle(slug: string, articleData: Partial<{
  title: string
  excerpt: string
  content: string
  isPremium: boolean
  useSiteAuthor: boolean
  tags: string[]
  category: string
  imageUrl: string
  sources: Array<{ label: string; url: string }>
}>): Promise<Article | null> {
  try {
    const requestData: any = {}
    
    if (articleData.title) requestData.title = articleData.title
    if (articleData.excerpt) requestData.excerpt = articleData.excerpt
    if (articleData.content) requestData.content = articleData.content
    if (articleData.isPremium !== undefined) requestData.is_premium = articleData.isPremium
    if (articleData.useSiteAuthor !== undefined) requestData.use_site_author = articleData.useSiteAuthor
    if (articleData.tags) requestData.tags = articleData.tags
    if (articleData.category) requestData.category = articleData.category
    if (articleData.imageUrl) requestData.image_url = articleData.imageUrl
    if (articleData.sources) requestData.sources = articleData.sources

    const response = await fetchWithAuth(`${API_BASE}/v1/articles/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(requestData)
    })
    
    const data = await response.json()
    
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      author: data.author,
      publishedAt: data.published_at,
      updatedAt: data.updated_at,
      readTime: data.read_time || 5,
      tags: data.tags || [],
      category: data.category,
      isPremium: data.is_premium,
      useSiteAuthor: data.use_site_author,
      imageUrl: data.image_url,
      views: data.views,
      likes: data.likes,
      sources: data.sources || []
    }
  } catch (error) {
    console.error('Error updating article:', error)
    return null
  }
}

export async function deleteArticle(slug: string): Promise<boolean> {
  try {
    await fetchWithAuth(`${API_BASE}/v1/articles/${slug}`, {
      method: 'DELETE'
    })
    return true
  } catch (error) {
    console.error('Error deleting article:', error)
    return false
  }
}
