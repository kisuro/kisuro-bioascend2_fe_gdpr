"use client"

import type React from "react"
import { AssistantBackground } from "@/components/ui/page-backgrounds"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI biohacking assistant. I can help you with supplement advice, wellness optimization, biorhythm insights, and answer questions about your health journey. What would you like to know?",
    role: "assistant",
    timestamp: new Date(),
  },
]

const sampleResponses = [
  "Based on your biorhythm data, your physical cycle is at a peak today. This would be an excellent time for intense workouts or physical challenges.",
  "For cognitive enhancement, consider starting with foundational supplements like Omega-3, Magnesium, and B-complex vitamins before exploring nootropics.",
  "Your sleep optimization could benefit from establishing a consistent circadian rhythm. Try morning light exposure and avoiding blue light 2 hours before bed.",
  "Intermittent fasting can be powerful, but start gradually. Begin with a 12-hour window and slowly extend to 16:8 as your body adapts.",
  "Stress management is crucial for longevity. Consider incorporating meditation, breathwork, or adaptogenic herbs like Ashwagandha into your routine.",
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative">
      <AssistantBackground />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Header */}
        <div className="glass-morph p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-primary/20 glass-subtle">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold liquid-text">AI Biohacking Assistant</h1>
          </div>
          <p className="text-muted-foreground">Your personal guide to optimized health and performance</p>
        </div>

        {/* Chat Container */}
        <div className="glass-morph h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 glass-subtle flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}

                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "glass-subtle"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 glass-subtle flex items-center justify-center">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 glass-subtle flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="glass-subtle p-4 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about supplements, biorhythms, wellness optimization..."
                className="flex-1 glass-subtle border-white/20 focus:border-primary/50"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="glass-hover bg-primary/80 hover:bg-primary"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI responses are simulated for demonstration purposes
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Analyze my biorhythms", "Recommend supplements for focus", "Create a morning routine"].map(
            (action, index) => (
              <Button
                key={index}
                variant="outline"
                className="glass-subtle glass-hover border-white/20 justify-start bg-transparent"
                onClick={() => setInput(action)}
              >
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                {action}
              </Button>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
