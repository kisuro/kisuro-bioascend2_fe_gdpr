"use client"

import { motion } from "framer-motion"

interface SupplementLoaderProps {
  isVisible: boolean
  message?: string
}

export function SupplementLoader({ isVisible, message = "Loading supplements..." }: SupplementLoaderProps) {
  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex flex-col items-center space-y-4" // reduced space-y from 8 to 4
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* DNA Helix Animation - Compact */}
        <div className="relative w-16 h-16">
          {" "}
          {/* reduced from w-24 h-24 to w-16 h-16 */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotateY: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {/* DNA Strands */}
            <div className="relative w-full h-full">
              {/* Left Strand */}
              <motion.div
                className="absolute left-1 top-0 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full" // reduced left-2 to left-1 and w-1 to w-0.5
                animate={{
                  scaleY: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              {/* Right Strand */}
              <motion.div
                className="absolute right-1 top-0 w-0.5 h-full bg-gradient-to-b from-accent via-primary to-accent rounded-full" // reduced right-2 to right-1 and w-1 to w-0.5
                animate={{
                  scaleY: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              />

              {/* DNA Base Pairs - Reduced count */}
              {[...Array(4)].map(
                (
                  _,
                  i, // reduced from 6 to 4 base pairs
                ) => (
                  <motion.div
                    key={i}
                    className="absolute left-1 right-1 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" // reduced left-2 right-2 to left-1 right-1
                    style={{ top: `${20 + i * 15}%` }} // adjusted spacing
                    animate={{
                      rotateZ: [0, 180, 360],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ),
              )}
            </div>
          </motion.div>
        </div>

        {/* Molecular Orbit Animation - Compact */}
        <div className="relative w-20 h-20">
          {" "}
          {/* reduced from w-32 h-32 to w-20 h-20 */}
          {/* Central Molecule */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5 bg-primary rounded-full shadow-lg" // reduced from w-4 h-4 to w-3 h-3
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 8px rgba(var(--primary), 0.4)", // reduced shadow size
                "0 0 16px rgba(var(--primary), 0.8)",
                "0 0 8px rgba(var(--primary), 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          {/* Orbiting Atoms - Reduced count */}
          {[...Array(2)].map(
            (
              _,
              i, // reduced from 3 to 2 orbiting atoms
            ) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -mt-0.5 -ml-0.5" // reduced size
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              >
                <motion.div
                  className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-accent" : "bg-primary"}`} // reduced size and simplified colors
                  style={{
                    transformOrigin: `${12 + i * 6}px center`, // reduced orbit radius
                    transform: `translateX(${12 + i * 6}px)`,
                  }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              </motion.div>
            ),
          )}
        </div>

        {/* Loading Text - Compact */}
        <motion.div
          className="text-center space-y-1" // reduced space-y from 2 to 1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.h3
            className="text-sm font-medium text-foreground" // reduced from text-lg to text-sm and font-semibold to font-medium
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            {message}
          </motion.h3>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-primary rounded-full" // reduced from w-2 h-2 to w-1.5 h-1.5
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Hexagonal Pattern Background - Simplified */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(6)].map(
            (
              _,
              i, // reduced from 12 to 6 hexagons
            ) => (
              <motion.div
                key={i}
                className="absolute w-6 h-6 border border-primary/15 transform rotate-45" // reduced from w-8 h-8 and lower opacity
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  rotate: [45, 225, 405],
                  opacity: [0.05, 0.2, 0.05], // reduced opacity range
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ),
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
