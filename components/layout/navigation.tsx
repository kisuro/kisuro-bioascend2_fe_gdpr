"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Activity, Brain, BookOpen, Zap, User, Sparkles } from "lucide-react"

const navigation = [
  { name: "Biorhythms", href: "/biorhythms", icon: Activity },
  { name: "Supplements", href: "/supplements", icon: Zap },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Mind", href: "/mind", icon: Brain },
  { name: "Assistant", href: "/assistant", icon: Sparkles },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <GlassCard className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3">
      <nav className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <span className="hidden sm:block">Bioascend</span>
        </Link>

        <div className="flex items-center gap-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  "hover:glass-subtle hover:scale-105",
                  isActive ? "glass-strong text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:block">{item.name}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:glass-subtle hover:scale-105"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:block">Profile</span>
          </Link>
        </div>
      </nav>
    </GlassCard>
  )
}
