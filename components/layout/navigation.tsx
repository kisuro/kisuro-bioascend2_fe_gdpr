"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { journalFeatureEnabled } from "@/lib/features"
import { GlassCard } from "@/components/ui/glass-card"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { BioAionicsIcon } from "@/components/ui/bioaionics-icon" // updated import to use BioAionics
import { Activity, Brain, BookOpen, Zap, User, Sparkles, Menu, X, FileText } from "lucide-react"

const baseNavigation = [
  { name: "Biorhythms", href: "/biorhythms", icon: Activity },
  { name: "Supplements", href: "/supplements", icon: Zap },
  { name: "Articles", href: "/articles", icon: FileText }, // Added Articles navigation item
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "AudioMind", href: "/mind", icon: Brain },
  { name: "AI Guidance", href: "/assistant", icon: Sparkles },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigation = journalFeatureEnabled ? baseNavigation : baseNavigation.filter((item) => item.href !== "/journal")

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-navigation safe-top p-4"
      >
        <GlassCard
          variant="strong"
          className="max-w-7xl mx-auto px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border-white/30 dark:border-white/20"
        >
          <nav className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="flex items-center gap-2 font-bold text-primary">
                <BioAionicsIcon size={28} variant="color" />
                <span className="hidden sm:block font-heading text-lg text-primary font-bold">BioAionics</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                        "hover:bg-white/10 hover:backdrop-blur-lg hover:scale-105 hover:shadow-lg",
                        isActive
                          ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-lg backdrop-blur-lg"
                          : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-lg hover:scale-105 hover:shadow-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-white/10 hover:backdrop-blur-lg transition-all duration-300 text-gray-700 dark:text-gray-300"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </nav>
        </GlassCard>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-dropdown md:hidden"
          >
            <GlassCard variant="strong" className="p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
              <div className="space-y-2">
                {navigation.map((item, index) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full",
                          "hover:bg-white/10 hover:backdrop-blur-lg hover:scale-105",
                          isActive
                            ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-lg"
                            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (navigation.length + 1) * 0.1 }}
                >
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full",
                      "hover:bg-white/10 hover:backdrop-blur-lg hover:scale-105",
                      pathname === "/profile"
                        ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
                    )}
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
