import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "strong" | "subtle"
  hover?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = false, ...props }, ref) => {
    const variants = {
      default: "bg-white/10 backdrop-blur-md border border-white/20 dark:bg-white/5 dark:border-white/10",
      strong: "bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg dark:bg-white/10 dark:border-white/20",
      subtle: "bg-white/5 backdrop-blur-sm border border-white/10 dark:bg-white/3 dark:border-white/5",
    }

    const hoverClasses = hover
      ? "transition-all duration-300 hover:bg-white/15 hover:backdrop-blur-lg hover:border-white/25 hover:shadow-xl dark:hover:bg-white/8 dark:hover:border-white/15 cursor-pointer"
      : ""

    return (
      <div ref={ref} className={cn("rounded-lg shadow-lg", variants[variant], hoverClasses, className)} {...props} />
    )
  },
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
