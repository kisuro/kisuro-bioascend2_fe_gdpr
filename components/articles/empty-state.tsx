"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { FileText, Search, Plus } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  type: "no-articles" | "no-results" | "no-access"
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export function EmptyState({ type, title, description, actionLabel, actionHref, onAction }: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case "no-articles":
        return <FileText className="h-12 w-12 text-muted-foreground" />
      case "no-results":
        return <Search className="h-12 w-12 text-muted-foreground" />
      case "no-access":
        return <Plus className="h-12 w-12 text-muted-foreground" />
      default:
        return <FileText className="h-12 w-12 text-muted-foreground" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-[400px]"
    >
      <GlassCard variant="strong" className="p-12 text-center max-w-md rounded-2xl">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          {getIcon()}
        </motion.div>

        <h3 className="text-xl font-semibold font-heading mb-3">{title}</h3>

        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

        {actionLabel && (actionHref || onAction) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            {actionHref ? (
              <Button asChild>
                <Link href={actionHref}>{actionLabel}</Link>
              </Button>
            ) : (
              <Button onClick={onAction}>{actionLabel}</Button>
            )}
          </motion.div>
        )}
      </GlassCard>
    </motion.div>
  )
}
