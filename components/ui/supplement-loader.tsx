"use client"

import { motion } from "framer-motion"

interface SupplementLoaderProps {
  isVisible: boolean
  message?: string
}

export function SupplementLoader({ isVisible, message = "Loading..." }: SupplementLoaderProps) {
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
        className="flex flex-col items-center space-y-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="relative">
          {/* Animated BioAscend Logo */}
          <motion.svg
            width="48"
            height="48"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <defs>
              <linearGradient id="biorhythm-gradient-loader" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E57373" />
                <stop offset="50%" stopColor="#64B5F6" />
                <stop offset="100%" stopColor="#81C784" />
              </linearGradient>
            </defs>

            {/* Animated base circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#biorhythm-gradient-loader)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            {/* Animated biorhythm waves */}
            <motion.path
              d="M 20 50 Q 30 30, 40 50 T 60 50 T 80 50"
              fill="none"
              stroke="#E57373"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
              animate={{
                d: [
                  "M 20 50 Q 30 30, 40 50 T 60 50 T 80 50",
                  "M 20 50 Q 30 70, 40 50 T 60 50 T 80 50",
                  "M 20 50 Q 30 30, 40 50 T 60 50 T 80 50",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            <motion.path
              d="M 20 45 Q 30 25, 40 45 T 60 45 T 80 45"
              fill="none"
              stroke="#64B5F6"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
              animate={{
                d: [
                  "M 20 45 Q 30 25, 40 45 T 60 45 T 80 45",
                  "M 20 45 Q 30 65, 40 45 T 60 45 T 80 45",
                  "M 20 45 Q 30 25, 40 45 T 60 45 T 80 45",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.3 }}
            />

            <motion.path
              d="M 20 55 Q 30 35, 40 55 T 60 55 T 80 55"
              fill="none"
              stroke="#81C784"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
              animate={{
                d: [
                  "M 20 55 Q 30 35, 40 55 T 60 55 T 80 55",
                  "M 20 55 Q 30 75, 40 55 T 60 55 T 80 55",
                  "M 20 55 Q 30 35, 40 55 T 60 55 T 80 55",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.6 }}
            />
          </motion.svg>

          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/20 via-blue-400/20 to-green-400/20 blur-md"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        <motion.p
          className="text-sm font-medium text-foreground/80"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          {message}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
