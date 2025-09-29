"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import Typography from "@tiptap/extension-typography"
import { useState, useCallback } from "react"
import { Bold, Italic, Underline, LinkIcon, Heading2, Heading3, ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ArticleEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
  className?: string
  articleSlug?: string  // Нужен для загрузки изображений
}

export function ArticleEditor({
  content = "",
  onChange,
  placeholder = "Start writing your article...",
  className,
  articleSlug,
}: ArticleEditorProps) {
  const [linkUrl, setLinkUrl] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        link: false, // Отключаем встроенный Link из StarterKit
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2 hover:text-primary/80",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Typography,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground focus:outline-none min-h-[400px] p-4",
      },
    },
  })

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes("link").href
    let url = linkUrl || previousUrl

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    // Ensure URL has protocol - add https:// if missing
    if (url && !url.match(/^https?:\/\//)) {
      url = `https://${url}`
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    setLinkUrl("")
    setShowLinkInput(false)
  }, [editor, linkUrl])

  const addLink = useCallback(() => {
    if (!editor) return

    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to, "")

    if (text) {
      setShowLinkInput(true)
    }
  }, [editor])

  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    if (!articleSlug) {
      alert("Article must be saved before uploading images")
      return null
    }
    
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      
      const token = typeof window !== 'undefined' ? localStorage.getItem('bioaionics_access_token') : null
      const headers: Record<string, string> = {}
      
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
      const response = await fetch(`${API_BASE}/v1/articles/${articleSlug}/upload-image`, {
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
      console.error("Upload failed:", error)
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return null
    } finally {
      setIsUploading(false)
    }
  }, [articleSlug])

  const addImage = useCallback(async () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.multiple = false
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          alert("File too large. Maximum size is 5MB")
          return
        }
        
        const url = await uploadImage(file)
        if (url && editor) {
          editor.chain().focus().setImage({ src: url }).run()
        }
      }
    }
    
    input.click()
  }, [editor, uploadImage])

  if (!editor) {
    return null
  }

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      {/* Toolbar */}
      <div
        className="flex items-center gap-1 p-2 border-b bg-muted/30"
        role="toolbar"
        aria-label="Text formatting toolbar"
      >
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Underline"
        >
          <Underline className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aria-label="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          aria-label="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Toggle size="sm" pressed={editor.isActive("link")} onPressedChange={addLink} aria-label="Add link">
          <LinkIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={addImage}
          disabled={!articleSlug || isUploading}
          aria-label="Add image"
        >
          {isUploading ? <Upload className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
        </Toggle>

        {showLinkInput && (
          <div className="flex items-center gap-2 ml-2">
            <Input
              type="url"
              placeholder="example.com or https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="h-8 w-48"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  setLink()
                }
                if (e.key === "Escape") {
                  setShowLinkInput(false)
                  setLinkUrl("")
                }
              }}
              autoFocus
            />
            <Button size="sm" onClick={setLink}>
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowLinkInput(false)
                setLinkUrl("")
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
