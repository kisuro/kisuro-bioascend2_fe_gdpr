"use client"

import { useState, useCallback, useRef } from "react"
import { Bold, Italic, Underline, LinkIcon, Heading2, Heading3, List, ListOrdered, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface ArticleEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
  className?: string
}

export function ArticleEditor({
  content = "",
  onChange,
  placeholder = "Start writing your article...",
  className,
}: ArticleEditorProps) {
  const [editorContent, setEditorContent] = useState(content)
  const [linkUrl, setLinkUrl] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleContentChange = (value: string) => {
    setEditorContent(value)
    onChange?.(value)
  }

  const insertText = useCallback(
    (before: string, after = "") => {
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = editorContent.substring(start, end)

      const newText = editorContent.substring(0, start) + before + selectedText + after + editorContent.substring(end)

      handleContentChange(newText)

      // Restore cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
      }, 0)
    },
    [editorContent],
  )

  const insertAtCursor = useCallback(
    (text: string) => {
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const newText = editorContent.substring(0, start) + text + editorContent.substring(end)

      handleContentChange(newText)

      // Restore cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + text.length, start + text.length)
      }, 0)
    },
    [editorContent],
  )

  const addLink = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = editorContent.substring(start, end)

    if (selectedText) {
      setShowLinkInput(true)
    }
  }, [editorContent])

  const insertLink = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea || !linkUrl) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = editorContent.substring(start, end)

    const linkText = selectedText || linkUrl
    const markdownLink = `[${linkText}](${linkUrl})`

    const newText = editorContent.substring(0, start) + markdownLink + editorContent.substring(end)

    handleContentChange(newText)
    setLinkUrl("")
    setShowLinkInput(false)

    // Restore focus
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + markdownLink.length, start + markdownLink.length)
    }, 0)
  }, [editorContent, linkUrl])

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      {/* Toolbar */}
      <div
        className="flex items-center gap-1 p-2 border-b bg-muted/30 flex-wrap"
        role="toolbar"
        aria-label="Text formatting toolbar"
      >
        <Toggle size="sm" onPressedChange={() => insertText("**", "**")} aria-label="Bold">
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle size="sm" onPressedChange={() => insertText("*", "*")} aria-label="Italic">
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle size="sm" onPressedChange={() => insertText("~~", "~~")} aria-label="Strikethrough">
          <Underline className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Toggle size="sm" onPressedChange={() => insertAtCursor("## ")} aria-label="Heading 2">
          <Heading2 className="h-4 w-4" />
        </Toggle>

        <Toggle size="sm" onPressedChange={() => insertAtCursor("### ")} aria-label="Heading 3">
          <Heading3 className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Toggle size="sm" onPressedChange={() => insertAtCursor("- ")} aria-label="Bullet list">
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle size="sm" onPressedChange={() => insertAtCursor("1. ")} aria-label="Numbered list">
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Toggle size="sm" onPressedChange={() => insertAtCursor("> ")} aria-label="Quote">
          <Quote className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1" />

        <Toggle size="sm" onPressedChange={addLink} aria-label="Add link">
          <LinkIcon className="h-4 w-4" />
        </Toggle>

        {showLinkInput && (
          <div className="flex items-center gap-2 ml-2">
            <Input
              type="url"
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="h-8 w-48"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  insertLink()
                }
                if (e.key === "Escape") {
                  setShowLinkInput(false)
                  setLinkUrl("")
                }
              }}
              autoFocus
            />
            <Button size="sm" onClick={insertLink}>
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
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={editorContent}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[400px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm leading-relaxed"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          }}
        />
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          Markdown supported
        </div>
      </div>
    </div>
  )
}
