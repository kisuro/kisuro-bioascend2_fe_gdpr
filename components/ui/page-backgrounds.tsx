"use client"
import { motion } from "framer-motion"

// Biorhythms Page - Sine wave patterns and rhythm-based animations
export const BiorhythmsBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {/* Primary biorhythm wave */}
    <motion.svg
      className="absolute top-20 left-0 w-full h-32 text-[#E57373]/12"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <motion.path
        d="M0,50 Q300,20 600,50 Q900,80 1200,50"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        animate={{
          d: [
            "M0,50 Q300,20 600,50 Q900,80 1200,50",
            "M0,50 Q300,30 600,50 Q900,70 1200,50",
            "M0,50 Q300,20 600,50 Q900,80 1200,50",
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </motion.svg>

    {/* Secondary wave */}
    <motion.svg
      className="absolute bottom-20 left-0 w-full h-32 text-[#64B5F6]/8"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <motion.path
        d="M0,50 Q200,80 400,50 Q600,20 800,50 Q1000,80 1200,50"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        animate={{
          d: [
            "M0,50 Q200,80 400,50 Q600,20 800,50 Q1000,80 1200,50",
            "M0,50 Q200,70 400,50 Q600,30 800,50 Q1000,70 1200,50",
            "M0,50 Q200,80 400,50 Q600,20 800,50 Q1000,80 1200,50",
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
    </motion.svg>

    {/* Floating rhythm indicators */}
    <motion.div
      className="absolute top-1/3 right-20 w-3 h-3 bg-[#81C784]/30 rounded-full"
      animate={{
        y: [-10, 10, -10],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    />
  </div>
)

// Supplements Page - Molecular structures and gentle particle effects
export const SupplementsBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {/* Molecular structure */}
    <motion.svg
      className="absolute top-32 right-16 w-40 h-40 text-[#64B5F6]/15"
      viewBox="0 0 100 100"
      initial={{ opacity: 0, rotate: -30 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 3 }}
    >
      <motion.circle
        cx="30"
        cy="30"
        r="4"
        fill="currentColor"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.circle
        cx="70"
        cy="30"
        r="3"
        fill="currentColor"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.circle
        cx="50"
        cy="70"
        r="3.5"
        fill="currentColor"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
      <motion.line
        x1="30"
        y1="30"
        x2="70"
        y2="30"
        stroke="currentColor"
        strokeWidth="1"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.line
        x1="30"
        y1="30"
        x2="50"
        y2="70"
        stroke="currentColor"
        strokeWidth="1"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
    </motion.svg>

    {/* Floating particles */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-[#E57373]/25 rounded-full"
        style={{
          left: `${20 + i * 15}%`,
          top: `${30 + (i % 2) * 40}%`,
        }}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6 + i,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: i * 0.5,
        }}
      />
    ))}
  </div>
)

// Journal Page - Flowing lines and documentation-themed animations
export const JournalBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {/* Writing lines */}
    <motion.svg
      className="absolute top-40 left-10 w-80 h-60 text-[#81C784]/12"
      viewBox="0 0 300 200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {[...Array(8)].map((_, i) => (
        <motion.line
          key={i}
          x1="20"
          y1={30 + i * 20}
          x2="280"
          y2={30 + i * 20}
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.svg>

    {/* Flowing ink effect */}
    <motion.div
      className="absolute bottom-32 right-20 w-32 h-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, delay: 1 }}
    >
      <motion.div
        className="w-full h-full bg-gradient-to-br from-[#64B5F6]/20 to-transparent rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </motion.div>
  </div>
)

// Mind/Audio Page - Sound wave visualizations and meditation patterns
export const MindBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {/* Sound wave visualization */}
    <motion.svg
      className="absolute top-20 left-1/4 w-96 h-32 text-[#E57373]/15"
      viewBox="0 0 400 100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.rect
          key={i}
          x={i * 20}
          y="40"
          width="3"
          height="20"
          fill="currentColor"
          animate={{
            height: [20, 60, 20],
            y: [40, 20, 40],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </motion.svg>

    {/* Meditation circles */}
    <motion.svg
      className="absolute bottom-40 right-16 w-48 h-48 text-[#64B5F6]/12"
      viewBox="0 0 200 200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, delay: 1 }}
    >
      {[...Array(4)].map((_, i) => (
        <motion.circle
          key={i}
          cx="100"
          cy="100"
          r={30 + i * 20}
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          animate={{
            r: [30 + i * 20, 40 + i * 20, 30 + i * 20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.svg>
  </div>
)

// Assistant Page - AI/neural network patterns and data flow animations
export const AssistantBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {/* Neural network nodes */}
    <motion.svg
      className="absolute top-32 left-20 w-64 h-64 text-[#81C784]/15"
      viewBox="0 0 200 200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Nodes */}
      {[
        { x: 50, y: 50 },
        { x: 150, y: 50 },
        { x: 100, y: 100 },
        { x: 50, y: 150 },
        { x: 150, y: 150 },
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r="4"
          fill="currentColor"
          animate={{
            r: [4, 6, 4],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Connections */}
      <motion.line
        x1="50"
        y1="50"
        x2="100"
        y2="100"
        stroke="currentColor"
        strokeWidth="1"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.line
        x1="150"
        y1="50"
        x2="100"
        y2="100"
        stroke="currentColor"
        strokeWidth="1"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
    </motion.svg>

    {/* Data flow particles */}
    <motion.div
      className="absolute bottom-20 left-1/3 w-2 h-2 bg-[#64B5F6]/30 rounded-full"
      animate={{
        x: [0, 200, 0],
        y: [0, -50, 0],
        opacity: [0, 1, 0],
      }}
      transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    />
  </div>
)

// Profile Page - Personal/identity themed subtle animations
export const ProfileBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {/* Gentle geometric patterns */}
    <motion.svg
      className="absolute top-20 right-20 w-32 h-32 text-[#E57373]/12"
      viewBox="0 0 100 100"
      initial={{ opacity: 0, rotate: -45 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 4 }}
    >
      <motion.polygon
        points="50,20 80,40 80,60 50,80 20,60 20,40"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </motion.svg>

    {/* Subtle floating elements */}
    <motion.div
      className="absolute bottom-40 left-16 w-4 h-4 bg-[#81C784]/20 rounded-full"
      animate={{
        y: [-15, 15, -15],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    />
  </div>
)
