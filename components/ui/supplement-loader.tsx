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
        className="flex flex-col items-center space-y-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* DNA Helix Animation */}
        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0"
            animate={{ rotateY: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {/* DNA Strands */}
            <div className="relative w-full h-full">
              {/* Left Strand */}
              <motion.div
                className="absolute left-2 top-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full"
                animate={{
                  scaleY: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              {/* Right Strand */}
              <motion.div
                className="absolute right-2 top-0 w-1 h-full bg-gradient-to-b from-accent via-primary to-accent rounded-full"
                animate={{
                  scaleY: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              />

              {/* DNA Base Pairs */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ top: `${15 + i * 12}%` }}
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
              ))}
            </div>
          </motion.div>
        </div>

        {/* Molecular Orbit Animation */}
        <div className="relative w-32 h-32">
          {/* Central Molecule */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 bg-primary rounded-full shadow-lg"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 10px rgba(var(--primary), 0.4)",
                "0 0 20px rgba(var(--primary), 0.8)",
                "0 0 10px rgba(var(--primary), 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Orbiting Atoms */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.5,
              }}
            >
              <motion.div
                className={`w-2 h-2 rounded-full ${i === 0 ? "bg-accent" : i === 1 ? "bg-primary" : "bg-chart-3"}`}
                style={{
                  transformOrigin: `${16 + i * 8}px center`,
                  transform: `translateX(${16 + i * 8}px)`,
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

        {/* Vitamin Capsules Animation */}
        <div className="relative w-40 h-8 flex items-center justify-center space-x-2">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="relative"
              animate={{
                y: [0, -8, 0],
                rotateZ: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              {/* Capsule */}
              <div className="w-6 h-3 rounded-full bg-gradient-to-r from-primary to-accent opacity-80 shadow-sm" />
              {/* Capsule Highlight */}
              <motion.div
                className="absolute top-0 left-1 w-1 h-1 bg-white/60 rounded-full"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.h3
            className="text-lg font-semibold text-foreground"
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
                className="w-2 h-2 bg-primary rounded-full"
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

        {/* Hexagonal Pattern Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 border border-primary/20 transform rotate-45"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [45, 225, 405],
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
