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
    {/* DNA Helix Structure */}
    <motion.svg
      className="absolute top-20 right-20 w-32 h-64 text-primary/15"
      viewBox="0 0 100 200"
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 3 }}
    >
      {/* DNA Backbone */}
      <motion.path
        d="M20,20 Q30,50 20,80 Q10,110 20,140 Q30,170 20,200"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="dna-helix"
      />
      <motion.path
        d="M80,20 Q70,50 80,80 Q90,110 80,140 Q70,170 80,200"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="dna-helix"
        style={{ animationDelay: "0.5s" }}
      />

      {/* DNA Base Pairs */}
      {[...Array(8)].map((_, i) => (
        <motion.line
          key={i}
          x1="20"
          y1={30 + i * 20}
          x2="80"
          y2={30 + i * 20}
          stroke="currentColor"
          strokeWidth="1"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            strokeWidth: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.svg>

    {/* Complex Molecular Structure */}
    <motion.svg
      className="absolute top-40 left-16 w-48 h-48 text-accent/20"
      viewBox="0 0 120 120"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      {/* Central molecule */}
      <motion.circle cx="60" cy="60" r="8" fill="currentColor" className="health-pulse" />

      {/* Orbiting atoms */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <g key={i}>
          <motion.circle
            cx="60"
            cy="60"
            r="3"
            fill="currentColor"
            className="molecular-orbit"
            style={{
              transformOrigin: "60px 60px",
              animationDelay: `${i * 0.3}s`,
            }}
            transform={`rotate(${angle} 60 60) translate(25 0)`}
          />
          <motion.line
            x1="60"
            y1="60"
            x2="85"
            y2="60"
            stroke="currentColor"
            strokeWidth="1"
            transform={`rotate(${angle} 60 60)`}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        </g>
      ))}
    </motion.svg>

    {/* Vitamin Molecules */}
    {[
      { x: "70%", y: "20%", size: "w-6 h-6", color: "bg-primary/30", delay: 0 },
      { x: "15%", y: "60%", size: "w-4 h-4", color: "bg-accent/40", delay: 1 },
      { x: "85%", y: "70%", size: "w-5 h-5", color: "bg-chart-2/35", delay: 2 },
      { x: "25%", y: "25%", size: "w-3 h-3", color: "bg-chart-3/45", delay: 0.5 },
      { x: "60%", y: "85%", size: "w-4 h-4", color: "bg-primary/25", delay: 1.5 },
    ].map((vitamin, i) => (
      <motion.div
        key={i}
        className={`absolute ${vitamin.size} ${vitamin.color} rounded-full vitamin-float`}
        style={{
          left: vitamin.x,
          top: vitamin.y,
          animationDelay: `${vitamin.delay}s`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: vitamin.delay }}
      />
    ))}

    {/* Geometric Health Patterns */}
    <motion.svg
      className="absolute bottom-32 right-32 w-40 h-40 text-muted/10"
      viewBox="0 0 100 100"
      initial={{ opacity: 0, rotate: 45 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 4, delay: 1 }}
    >
      {/* Hexagonal pattern representing cellular structure */}
      {[0, 1, 2].map((ring) => (
        <g key={ring}>
          {[...Array(6)].map((_, i) => (
            <motion.polygon
              key={i}
              points="50,35 65,42.5 65,57.5 50,65 35,57.5 35,42.5"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              transform={`translate(${ring * 15 * Math.cos((i * 60 * Math.PI) / 180)}, ${ring * 15 * Math.sin((i * 60 * Math.PI) / 180)})`}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: ring * 0.5 + i * 0.1,
              }}
            />
          ))}
        </g>
      ))}
    </motion.svg>

    {/* Flowing Supplement Particles */}
    <motion.div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: `${10 + ((i * 7) % 80)}%`,
            top: `${20 + ((i * 11) % 60)}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 8 + (i % 3),
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </motion.div>

    {/* Subtle Molecular Bonds */}
    <motion.svg
      className="absolute top-60 left-1/2 w-64 h-32 text-border/30 -translate-x-1/2"
      viewBox="0 0 200 100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, delay: 2 }}
    >
      <motion.path
        d="M20,50 Q60,20 100,50 Q140,80 180,50"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        animate={{
          d: [
            "M20,50 Q60,20 100,50 Q140,80 180,50",
            "M20,50 Q60,30 100,50 Q140,70 180,50",
            "M20,50 Q60,20 100,50 Q140,80 180,50",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
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
