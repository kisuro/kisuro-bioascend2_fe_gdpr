import { getAuthToken } from '@/lib/contexts/user-context'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export async function uploadCoverImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData()
    formData.append("file", file)
    
    const token = getAuthToken()
    const headers: Record<string, string> = {}
    
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE}/v1/articles/upload-cover-image`, {
      method: "POST",
      headers,
      credentials: 'include',
      body: formData,
    })
    
    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `Upload failed: ${response.status}`)
    }
    
    const data = await response.json()
    return data.url
  } catch (error) {
    console.error("Cover image upload failed:", error)
    return null
  }
}