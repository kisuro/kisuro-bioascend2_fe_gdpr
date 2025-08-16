import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const liquidButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-lg hover:shadow-2xl active:scale-95 transform-gpu",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary/90 via-accent/70 to-primary/95 text-primary-foreground hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 active:scale-95 backdrop-blur-lg border border-white/20 shadow-xl",
        primary:
          "bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 active:scale-95",
        secondary:
          "bg-white/15 backdrop-blur-lg border border-white/25 shadow-xl dark:bg-white/8 dark:border-white/15 text-secondary-foreground hover:scale-105 hover:shadow-2xl hover:bg-white/20 active:scale-95",
        ghost:
          "hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/15 hover:shadow-lg dark:hover:bg-white/5 dark:hover:border-white/10 hover:text-accent-foreground hover:scale-105 active:scale-95 transition-all duration-300",
        outline:
          "border-2 border-primary/60 bg-white/8 backdrop-blur-md hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 hover:backdrop-blur-lg hover:border-primary/80 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-2xl px-10 text-base font-semibold",
        icon: "h-11 w-11",
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
