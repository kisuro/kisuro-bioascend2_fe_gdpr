"use client"

import * as React from "react"

type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }

export function ScrollArea({ children, className = "", ...rest }: ScrollAreaProps) {
  return (
    <div className={`overflow-auto ${className}`} {...rest}>
      {children}
    </div>
  )
}

export default ScrollArea
