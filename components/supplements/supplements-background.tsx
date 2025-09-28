"use client"

import { motion } from "framer-motion"

export const SupplementBackground = () => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Enhanced Molecular Structure Animation - larger and more complex */}
      <motion.div
        className="absolute top-10 right-10 w-80 h-80"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 3, delay: 1 }}
      >
        <motion.svg
          className="w-full h-full text-primary/15"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <circle cx="25" cy="25" r="2.5" fill="currentColor" />
          <circle cx="75" cy="25" r="2.5" fill="currentColor" />
          <circle cx="25" cy="75" r="2.5" fill="currentColor" />
          <circle cx="75" cy="75" r="2.5" fill="currentColor" />
          <circle cx="15" cy="50" r="2" fill="currentColor" />
          <circle cx="85" cy="50" r="2" fill="currentColor" />
          <circle cx="50" cy="15" r="2" fill="currentColor" />
          <circle cx="50" cy="85" r="2" fill="currentColor" />

          <motion.line
            x1="50"
            y1="50"
            x2="25"
            y2="25"
            stroke="currentColor"
            strokeWidth="1"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.line
            x1="50"
            y1="50"
            x2="75"
            y2="25"
            stroke="currentColor"
            strokeWidth="1"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
          <motion.line
            x1="50"
            y1="50"
            x2="25"
            y2="75"
            stroke="currentColor"
            strokeWidth="1"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.line
            x1="50"
            y1="50"
            x2="75"
            y2="75"
            stroke="currentColor"
            strokeWidth="1"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
          />
        </motion.svg>
      </motion.div>

      {/* Enhanced Vitamin Particles - more particles across full screen */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-accent/30 rounded-full"
          style={{
            left: `${5 + i * 4.5}%`,
            top: `${15 + (i % 6) * 12}%`,
          }}
          animate={{
            y: [-25, -60, -25],
            x: [-15, 25, -15],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 180, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 10 + i * 0.3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* New: Supplement Formula Chains */}
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3, delay: 2 }}
      >
        <motion.svg
          className="w-full h-full text-accent/20"
          viewBox="0 0 100 60"
          animate={{ rotateX: [0, 360] }}
          transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <motion.path
            d="M10,30 Q30,10 50,30 Q70,50 90,30"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.path
            d="M10,40 Q30,20 50,40 Q70,60 90,40"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            animate={{
              pathLength: [1, 0, 1],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
        </motion.svg>
      </motion.div>

      {/* New: Floating Supplement Icons */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-16 h-16"
        animate={{
          y: [-10, -30, -10],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-primary/40 rounded-sm" />
        </div>
      </motion.div>
    </motion.div>
  )
}
