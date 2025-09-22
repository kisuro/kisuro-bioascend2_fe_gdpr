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
      default: "bg-white/12 backdrop-blur-xl border border-white/25 shadow-2xl dark:bg-white/8 dark:border-white/20",
      strong: "bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl dark:bg-white/10 dark:border-white/22",
      subtle: "bg-white/5 backdrop-blur-md border border-white/12 shadow-lg dark:bg-white/3 dark:border-white/6",
    }

    const hoverClasses = hover
      ? "transition-all duration-500 hover:bg-white/15 hover:backdrop-blur-xl hover:border-white/28 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 dark:hover:bg-white/8 dark:hover:border-white/18 cursor-pointer group"
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
