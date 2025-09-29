interface BioAionicsIconProps {
  // updated interface name from BioAscendIconProps
  size?: number
  variant?: "color" | "monochrome"
  className?: string
}

export function BioAionicsIcon({ size = 32, variant = "color", className = "" }: BioAionicsIconProps) {
  // updated function name from BioAscendIcon
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradient для основного круга */}
        <linearGradient id="bioaionics-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={variant === "color" ? "#3B82F6" : "currentColor"} />
          <stop offset="50%" stopColor={variant === "color" ? "#8B5CF6" : "currentColor"} />
          <stop offset="100%" stopColor={variant === "color" ? "#06B6D4" : "currentColor"} />
        </linearGradient>
        
        {/* Gradient для внутренних элементов */}
        <linearGradient id="inner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={variant === "color" ? "#FFFFFF" : "currentColor"} stopOpacity="0.9" />
          <stop offset="100%" stopColor={variant === "color" ? "#F3F4F6" : "currentColor"} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      
      {/* Основной круг */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill="none" 
        stroke={variant === "color" ? "url(#bioaionics-gradient)" : "currentColor"}
        strokeWidth="3"
      />
      
      {/* DNA спираль - левая */}
      <path 
        d="M 30 25 Q 35 35, 30 45 Q 25 55, 30 65 Q 35 75, 30 85" 
        fill="none" 
        stroke={variant === "color" ? "url(#inner-gradient)" : "currentColor"}
        strokeWidth="2.5" 
        strokeLinecap="round" 
        opacity="0.8"
      />
      
      {/* DNA спираль - правая */}
      <path 
        d="M 70 25 Q 65 35, 70 45 Q 75 55, 70 65 Q 65 75, 70 85" 
        fill="none" 
        stroke={variant === "color" ? "url(#inner-gradient)" : "currentColor"}
        strokeWidth="2.5" 
        strokeLinecap="round" 
        opacity="0.8"
      />
      
      {/* Соединительные перекладины DNA */}
      <line 
        x1="30" y1="30" x2="70" y2="30" 
        stroke={variant === "color" ? "url(#inner-gradient)" : "currentColor"}
        strokeWidth="1.5" 
        opacity="0.6"
      />
      <line 
        x1="30" y1="45" x2="70" y2="45" 
        stroke={variant === "color" ? "url(#inner-gradient)" : "currentColor"}
        strokeWidth="1.5" 
        opacity="0.6"
      />
      <line 
        x1="30" y1="60" x2="70" y2="60" 
        stroke={variant === "color" ? "url(#inner-gradient)" : "currentColor"}
        strokeWidth="1.5" 
        opacity="0.6"
      />
      <line 
        x1="30" y1="75" x2="70" y2="75" 
        stroke={variant === "color" ? "url(#inner-gradient)" : "currentColor"}
        strokeWidth="1.5" 
        opacity="0.6"
      />
      
      {/* Центральная молекулярная структура */}
      <circle 
        cx="50" cy="40" r="3" 
        fill={variant === "color" ? "url(#inner-gradient)" : "currentColor"}
        opacity="0.8"
      />
      <circle 
        cx="50" cy="50" r="4" 
        fill={variant === "color" ? "url(#inner-gradient)" : "currentColor"}
        opacity="0.9"
      />
      <circle 
        cx="50" cy="60" r="3" 
        fill={variant === "color" ? "url(#inner-gradient)" : "currentColor"}
        opacity="0.8"
      />
      
      {/* Соединительные линии между молекулами */}
      <line 
        x1="50" y1="43" x2="50" y2="46" 
        stroke={variant === "color" ? "url(#inner-gradient)" : "currentColor"}
        strokeWidth="2" 
        opacity="0.7"
      />
      <line 
        x1="50" y1="54" x2="50" y2="57" 
        stroke={variant === "color" ? "url(#inner-gradient)" : "currentColor"}
        strokeWidth="2" 
        opacity="0.7"
      />
    </svg>
  )
}
