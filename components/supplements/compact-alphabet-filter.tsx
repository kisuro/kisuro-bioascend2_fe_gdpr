"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Hash } from "lucide-react"

interface CompactAlphabetFilterProps {
  selectedLetter: string | null
  onLetterSelect: (letter: string | null) => void
  availableLetters: Set<string>
}

const NUMBERS = Array.from({ length: 10 }, (_, i) => i.toString())
const ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

export function CompactAlphabetFilter({ selectedLetter, onLetterSelect, availableLetters }: CompactAlphabetFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => setIsExpanded(!isExpanded)

  const handleLetterSelect = (letter: string | null) => {
    onLetterSelect(letter)
  }

  return (
    <div className="mb-3">
      {/* Ultra-compact collapsed state - just a badge-like element */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <Badge 
            variant={selectedLetter ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/80 transition-colors px-3 py-1.5"
            onClick={toggleExpanded}
          >
            <Hash className="h-3 w-3 mr-1" />
            {selectedLetter ? `${selectedLetter}` : "A-Z"}
            <ChevronDown className="h-3 w-3 ml-1" />
          </Badge>
          
          {selectedLetter && (
            <LiquidButton
              variant="ghost"
              size="sm"
              onClick={() => handleLetterSelect(null)}
              className="h-6 px-2 text-xs"
            >
              ✕
            </LiquidButton>
          )}
        </motion.div>
      )}

      {/* Expanded state */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-1">
                <Hash className="h-4 w-4" />
                Filter by first character
              </span>
              <LiquidButton
                variant="ghost"
                size="sm"
                onClick={toggleExpanded}
                className="h-6 w-6 p-0"
              >
                <ChevronUp className="h-4 w-4" />
              </LiquidButton>
            </div>

            {/* Filter buttons */}
            <div className="space-y-2">
              {/* All button */}
              <div className="flex justify-center">
                <LiquidButton
                  variant={selectedLetter === null ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleLetterSelect(null)}
                  className="min-w-[3rem] h-7 text-xs"
                >
                  All
                </LiquidButton>
              </div>
              
              {/* Numbers row */}
              <div className="flex justify-center">
                <div className="flex gap-0.5">
                  {NUMBERS.map((number) => {
                    const isAvailable = availableLetters.has(number)
                    const isSelected = selectedLetter === number
                    
                    return (
                      <LiquidButton
                        key={number}
                        variant={isSelected ? "default" : "ghost"}
                        size="sm"
                        onClick={() => isAvailable ? handleLetterSelect(number) : undefined}
                        disabled={!isAvailable}
                        className={`
                          w-7 h-7 text-xs p-0
                          ${!isAvailable ? 'opacity-30' : ''}
                        `}
                      >
                        {number}
                      </LiquidButton>
                    )
                  })}
                </div>
              </div>
              
              {/* Letters in rows */}
              <div className="space-y-1">
                {/* First row: A-M */}
                <div className="flex justify-center">
                  <div className="flex gap-0.5">
                    {ALPHABET.slice(0, 13).map((letter) => {
                      const isAvailable = availableLetters.has(letter)
                      const isSelected = selectedLetter === letter
                      
                      return (
                        <LiquidButton
                          key={letter}
                          variant={isSelected ? "default" : "ghost"}
                          size="sm"
                          onClick={() => isAvailable ? handleLetterSelect(letter) : undefined}
                          disabled={!isAvailable}
                          className={`
                            w-7 h-7 text-xs p-0
                            ${!isAvailable ? 'opacity-30' : ''}
                          `}
                        >
                          {letter}
                        </LiquidButton>
                      )
                    })}
                  </div>
                </div>
                
                {/* Second row: N-Z */}
                <div className="flex justify-center">
                  <div className="flex gap-0.5">
                    {ALPHABET.slice(13).map((letter) => {
                      const isAvailable = availableLetters.has(letter)
                      const isSelected = selectedLetter === letter
                      
                      return (
                        <LiquidButton
                          key={letter}
                          variant={isSelected ? "default" : "ghost"}
                          size="sm"
                          onClick={() => isAvailable ? handleLetterSelect(letter) : undefined}
                          disabled={!isAvailable}
                          className={`
                            w-7 h-7 text-xs p-0
                            ${!isAvailable ? 'opacity-30' : ''}
                          `}
                        >
                          {letter}
                        </LiquidButton>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {selectedLetter && (
              <div className="mt-2 text-center text-xs text-muted-foreground">
                Filtering by "{selectedLetter}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}