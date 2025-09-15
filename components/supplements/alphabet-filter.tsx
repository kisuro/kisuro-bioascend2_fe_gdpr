"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LiquidButton } from "@/components/ui/liquid-button"
import { GlassCard } from "@/components/ui/glass-card"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"

interface AlphabetFilterProps {
  selectedLetter: string | null
  onLetterSelect: (letter: string | null) => void
  availableLetters: Set<string>
}

const NUMBERS = Array.from({ length: 10 }, (_, i) => i.toString())
const ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

export function AlphabetFilter({ selectedLetter, onLetterSelect, availableLetters }: AlphabetFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => setIsExpanded(!isExpanded)

  const handleLetterSelect = (letter: string | null) => {
    onLetterSelect(letter)
    // Optionally collapse after selection - uncomment if desired
    // if (letter !== null) setIsExpanded(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <GlassCard className="glass-strong">
        {/* Collapsed State - Toggle Button */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <LiquidButton
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="flex items-center gap-2 text-sm"
            >
              <Filter className="h-4 w-4" />
              <span>
                {selectedLetter 
                  ? `Filtered by: ${selectedLetter}`
                  : "Use alphabet filter"
                }
              </span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </LiquidButton>
            
            {/* Show active filter and clear option when collapsed */}
            {selectedLetter && !isExpanded && (
              <LiquidButton
                variant="ghost"
                size="sm"
                onClick={() => handleLetterSelect(null)}
                className="text-xs px-2 py-1 opacity-70 hover:opacity-100"
              >
                Clear
              </LiquidButton>
            )}
          </div>
          
          {/* Quick access to "All" when collapsed */}
          {!isExpanded && selectedLetter && (
            <LiquidButton
              variant="outline"
              size="sm"
              onClick={() => handleLetterSelect(null)}
              className="text-xs"
            >
              Show All
            </LiquidButton>
          )}
        </div>

        {/* Expanded State - Full Alphabet Filter */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-3 pb-3 border-t border-border/20">
                <div className="flex flex-wrap gap-1 justify-center items-center mt-3">
                  <LiquidButton
                    variant={selectedLetter === null ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleLetterSelect(null)}
                    className="min-w-[2rem] h-8 text-xs px-2"
                  >
                    All
                  </LiquidButton>
                  
                  {/* Numbers 0-9 */}
                  <div className="flex gap-1">
                    {NUMBERS.map((number) => {
                      const isAvailable = availableLetters.has(number)
                      const isSelected = selectedLetter === number
                      
                      return (
                        <motion.div
                          key={number}
                          whileHover={isAvailable ? { scale: 1.05 } : undefined}
                          whileTap={isAvailable ? { scale: 0.95 } : undefined}
                        >
                          <LiquidButton
                            variant={isSelected ? "default" : "ghost"}
                            size="sm"
                            onClick={() => isAvailable ? handleLetterSelect(number) : undefined}
                            disabled={!isAvailable}
                            className={`
                              min-w-[2rem] h-8 text-xs px-2 relative
                              ${!isAvailable ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                              ${isSelected ? 'ring-1 ring-primary/50' : ''}
                            `}
                          >
                            {number}
                            {isAvailable && !isSelected && (
                              <motion.div
                                className="absolute inset-0 bg-primary/10 rounded-md"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </LiquidButton>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Separator */}
                  <div className="w-px h-6 bg-border/50 mx-1" />

                  {/* Letters A-Z */}
                  <div className="flex flex-wrap gap-1">
                    {ALPHABET.map((letter) => {
                      const isAvailable = availableLetters.has(letter)
                      const isSelected = selectedLetter === letter
                      
                      return (
                        <motion.div
                          key={letter}
                          whileHover={isAvailable ? { scale: 1.05 } : undefined}
                          whileTap={isAvailable ? { scale: 0.95 } : undefined}
                        >
                          <LiquidButton
                            variant={isSelected ? "default" : "ghost"}
                            size="sm"
                            onClick={() => isAvailable ? handleLetterSelect(letter) : undefined}
                            disabled={!isAvailable}
                            className={`
                              min-w-[2rem] h-8 text-xs px-2 relative
                              ${!isAvailable ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                              ${isSelected ? 'ring-1 ring-primary/50' : ''}
                            `}
                          >
                            {letter}
                            {isAvailable && !isSelected && (
                              <motion.div
                                className="absolute inset-0 bg-primary/10 rounded-md"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </LiquidButton>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
                
                {selectedLetter && (
                  <motion.div 
                    className="mt-2 text-center text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Showing supplements starting with "{selectedLetter}"
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  )
}