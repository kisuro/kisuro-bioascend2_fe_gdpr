"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "strong" | "subtle"
  hover?: boolean
  animate?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = false, animate = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-white/20 backdrop-blur-xl border border-white/35 shadow-2xl dark:bg-white/12 dark:border-white/25",
      strong: "bg-white/20 backdrop-blur-xl border border-white/35 shadow-2xl dark:bg-white/12 dark:border-white/25",
      subtle: "bg-white/8 backdrop-blur-md border border-white/15 shadow-lg dark:bg-white/4 dark:border-white/8",
    }

    const hoverClasses = hover
      ? // Enhanced hover effects with scale and glow
        "transition-all duration-500 hover:bg-white/18 hover:backdrop-blur-xl hover:border-white/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 dark:hover:bg-white/10 dark:hover:border-white/20 cursor-pointer group"
      : ""

    const cardContent = (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl shadow-xl backdrop-blur-lg border-white/20 dark:border-white/15",
          variants[variant],
          hoverClasses,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )

    if (animate) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {cardContent}
        </motion.div>
      )
    }

    return cardContent
  },
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
