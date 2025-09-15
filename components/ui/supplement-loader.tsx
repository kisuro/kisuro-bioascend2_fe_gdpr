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
        className="flex items-center space-x-3" // changed from flex-col to flex items-center and reduced space-x
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* DNA Helix Animation - Compact and Square */}
        <div className="relative w-12 h-12">
          {" "}
          {/* reduced size from w-16 h-16 to w-12 h-12 */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotateY: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {/* DNA Strands - Square shape */}
            <div className="relative w-full h-full">
              {/* Left Strand - Square */}
              <motion.div
                className="absolute left-1 top-0 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary" // removed rounded-full to make it square
                animate={{
                  scaleY: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              {/* Right Strand - Square */}
              <motion.div
                className="absolute right-1 top-0 w-0.5 h-full bg-gradient-to-b from-accent via-primary to-accent" // removed rounded-full to make it square
                animate={{
                  scaleY: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              />

              {/* DNA Base Pairs - Square */}
              {[...Array(3)].map(
                (
                  _,
                  i, // reduced from 4 to 3 base pairs
                ) => (
                  <motion.div
                    key={i}
                    className="absolute left-1 right-1 h-0.5 bg-gradient-to-r from-primary to-accent" // removed rounded-full to make it square
                    style={{ top: `${25 + i * 20}%` }}
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

        {/* Molecular Orbit Animation - Square */}
        <div className="relative w-16 h-16">
          {" "}
          {/* reduced from w-20 h-20 to w-16 h-16 */}
          {/* Central Molecule - Square */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2.5 h-2.5 -mt-1.25 -ml-1.25 bg-primary shadow-lg" // removed rounded-full to make it square
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 6px rgba(var(--primary), 0.4)",
                "0 0 12px rgba(var(--primary), 0.8)",
                "0 0 6px rgba(var(--primary), 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          {/* Orbiting Atoms - Square */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -mt-0.75 -ml-0.75"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.5,
              }}
            >
              <motion.div
                className={`w-1.5 h-1.5 ${i === 0 ? "bg-accent" : "bg-primary"}`} // removed rounded-full to make it square
                style={{
                  transformOrigin: `${10 + i * 5}px center`,
                  transform: `translateX(${10 + i * 5}px)`,
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
          ))}
        </div>

        {/* Loading Text - No dots */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, x: -10 }} // changed from y: 10 to x: -10 for horizontal layout
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.h3
            className="text-sm font-medium text-foreground"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            {message}
          </motion.h3>
        </motion.div>

        {/* Hexagonal Pattern Background - Simplified and Square */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(4)].map(
            (
              _,
              i, // reduced from 6 to 4 hexagons
            ) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 border border-primary/10 transform rotate-45" // reduced size and opacity, kept square shape
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  rotate: [45, 225, 405],
                  opacity: [0.03, 0.15, 0.03],
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
