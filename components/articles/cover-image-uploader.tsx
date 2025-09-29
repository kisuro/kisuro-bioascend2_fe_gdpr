"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { uploadCoverImage } from "@/lib/services/upload"

interface CoverImageUploaderProps {
  currentImageUrl?: string
  onImageUrlChange: (url: string) => void
  className?: string
}

export function CoverImageUploader({ 
  currentImageUrl, 
  onImageUrlChange, 
  className 
}: CoverImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [manualUrl, setManualUrl] = useState(currentImageUrl || "")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert("File too large. Maximum size is 10MB")
      return
    }

    setIsUploading(true)
    try {
      const url = await uploadCoverImage(file)
      if (url) {
        onImageUrlChange(url)
        setManualUrl(url)
      } else {
        alert("Failed to upload image. Please try again.")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await handleFileUpload(file)
    }
  }

  const handleManualUrlChange = (url: string) => {
    setManualUrl(url)
    onImageUrlChange(url)
  }

  const clearImage = () => {
    setManualUrl("")
    onImageUrlChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={className}>
      <Label className="text-base font-semibold mb-3 block">
        Cover Image
      </Label>
      
      {/* Current Image Preview */}
      {manualUrl && (
        <div className="relative mb-4 rounded-lg overflow-hidden bg-muted">
          <img
            src={manualUrl}
            alt="Cover preview"
            className="w-full h-48 object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Upload Section */}
      <div className="space-y-4">
        {/* File Upload */}
        <div>
          <Label className="text-sm font-medium">Upload Image</Label>
          <div className="mt-2 flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Choose File
                </>
              )}
            </Button>
            <span className="text-sm text-muted-foreground">
              Max 10MB • JPG, PNG, WebP
            </span>
          </div>
        </div>

        {/* Manual URL Input */}
        <div>
          <Label className="text-sm font-medium">Or Enter Image URL</Label>
          <Input
            type="url"
            value={manualUrl}
            onChange={(e) => handleManualUrlChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="mt-2"
          />
        </div>
      </div>
    </div>
  )
}