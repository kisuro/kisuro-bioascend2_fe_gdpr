"use client"

import { motion } from "framer-motion"
import { LoginCard } from "@/components/auth/login-card"

const LoginBackground = () => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Security Shield Animation */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 3, delay: 1 }}
      >
        <motion.svg
          className="w-full h-full text-primary/20"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <motion.path
            d="M50 10 L75 25 L75 60 Q75 75 50 85 Q25 75 25 60 L25 25 Z"
            fill="currentColor"
            opacity="0.3"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.path
            d="M50 20 L65 30 L65 55 Q65 65 50 72 Q35 65 35 55 L35 30 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.circle
            cx="50"
            cy="45"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
        </motion.svg>
      </motion.div>

      {/* Authentication Flow Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-accent/40 rounded-full"
          style={{
            left: `${10 + i * 7}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [-15, -40, -15],
            x: [-8, 15, -8],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 6 + i * 0.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Login Key Animation */}
      <motion.div
        className="absolute bottom-32 left-16 w-48 h-48"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3, delay: 2 }}
      >
        <motion.svg
          className="w-full h-full text-accent/15"
          viewBox="0 0 100 100"
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <motion.circle
            cx="30"
            cy="50"
            r="15"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            animate={{
              strokeDasharray: [0, 94, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.rect
            x="45"
            y="47"
            width="25"
            height="6"
            fill="currentColor"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
          <motion.rect
            x="60"
            y="44"
            width="3"
            height="3"
            fill="currentColor"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.rect
            x="60"
            y="53"
            width="3"
            height="3"
            fill="currentColor"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2.5 }}
          />
        </motion.svg>
      </motion.div>

      {/* Security Network Grid */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 4, delay: 3 }}
      >
        <motion.svg
          className="w-full h-full text-primary/10"
          viewBox="0 0 100 100"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <motion.line
            x1="20"
            y1="20"
            x2="80"
            y2="20"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.line
            x1="20"
            y1="50"
            x2="80"
            y2="50"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.line
            x1="20"
            y1="80"
            x2="80"
            y2="80"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
          />
          <motion.line
            x1="20"
            y1="20"
            x2="20"
            y2="80"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
          <motion.line
            x1="50"
            y1="20"
            x2="50"
            y2="80"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
          />
          <motion.line
            x1="80"
            y1="20"
            x2="80"
            y2="80"
            stroke="currentColor"
            strokeWidth="0.5"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 5 }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen relative">
      <LoginBackground />
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <LoginCard />
      </div>
    </div>
  )
}
