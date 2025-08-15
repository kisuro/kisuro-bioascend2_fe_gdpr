import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const liquidButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg dark:bg-white/10 dark:border-white/20 text-primary-foreground hover:scale-105 hover:shadow-xl bg-gradient-to-br from-primary/80 via-accent/60 to-primary/90",
        primary: "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 hover:shadow-xl",
        secondary:
          "bg-white/10 backdrop-blur-md border border-white/20 dark:bg-white/5 dark:border-white/10 text-secondary-foreground hover:scale-105 hover:shadow-lg",
        ghost:
          "hover:bg-white/5 hover:backdrop-blur-sm hover:border hover:border-white/10 dark:hover:bg-white/3 dark:hover:border-white/5 hover:text-accent-foreground hover:scale-105",
        outline:
          "border-2 border-primary/50 bg-white/5 backdrop-blur-sm border border-white/10 dark:bg-white/3 dark:border-white/5 hover:bg-white/20 hover:backdrop-blur-lg hover:border-white/30 hover:scale-105",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(liquidButtonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
LiquidButton.displayName = "LiquidButton"

export { LiquidButton, liquidButtonVariants }
