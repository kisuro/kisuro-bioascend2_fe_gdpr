interface BioAscendIconProps {
  size?: number
  variant?: "color" | "monochrome"
  className?: string
}

export function BioAscendIcon({ size = 32, variant = "color", className = "" }: BioAscendIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="biorhythm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E57373" />
          <stop offset="50%" stopColor="#64B5F6" />
          <stop offset="100%" stopColor="#81C784" />
        </linearGradient>
      </defs>

      {/* Base circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={variant === "color" ? "url(#biorhythm-gradient)" : "currentColor"}
        strokeWidth="3"
      />

      {/* Three biorhythm waves */}
      <path
        d="M 20 50 Q 30 30, 40 50 T 60 50 T 80 50"
        fill="none"
        stroke={variant === "color" ? "#E57373" : "currentColor"}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={variant === "color" ? "0.8" : "1"}
      />

      <path
        d="M 20 45 Q 30 25, 40 45 T 60 45 T 80 45"
        fill="none"
        stroke={variant === "color" ? "#64B5F6" : "currentColor"}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={variant === "color" ? "0.8" : "1"}
      />

      <path
        d="M 20 55 Q 30 35, 40 55 T 60 55 T 80 55"
        fill="none"
        stroke={variant === "color" ? "#81C784" : "currentColor"}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={variant === "color" ? "0.8" : "1"}
      />
    </svg>
  )
}
