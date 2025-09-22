"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "strong" | "subtle" | "liquid"
  hover?: boolean
  animate?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = false, animate = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-white/12 backdrop-blur-lg border border-white/25 shadow-xl dark:bg-white/6 dark:border-white/15",
      strong: "bg-white/20 backdrop-blur-xl border border-white/35 shadow-2xl dark:bg-white/12 dark:border-white/25",
      subtle: "bg-white/8 backdrop-blur-md border border-white/15 shadow-lg dark:bg-white/4 dark:border-white/8",
      liquid:
        "bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border border-white/30 shadow-2xl dark:from-white/8 dark:via-white/4 dark:to-white/2 dark:border-white/20",
    }

    const hoverClasses = hover
      ? // Enhanced hover effects with more fluid transformations and glass morphing
        "transition-all duration-700 ease-out hover:bg-gradient-to-br hover:from-white/25 hover:via-white/15 hover:to-white/8 hover:backdrop-blur-3xl hover:border-white/40 hover:shadow-3xl hover:scale-[1.02] hover:-translate-y-2 dark:hover:from-white/12 dark:hover:via-white/8 dark:hover:to-white/4 dark:hover:border-white/30 cursor-pointer group hover:shadow-primary/20"
      : ""

    const cardContent = (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl shadow-2xl backdrop-blur-2xl border-white/20 dark:border-white/15 relative overflow-hidden",
          "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-white/5 before:pointer-events-none",
          variants[variant],
          hoverClasses,
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
        <div className="relative z-10">{children}</div>
      </div>
    )

    if (animate) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94], // More organic easing curve
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
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
