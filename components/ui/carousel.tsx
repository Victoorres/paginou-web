"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  items: {
    id: number
    image: string
    title: string
    description: string
    url?: string
  }[]
  autoPlay?: boolean
  interval?: number
}

export function Carousel({ items, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }, [items.length])

  const handlePrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }, [items.length])

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!autoPlay || isPaused) return

    const timer = setInterval(() => {
      handleNext()
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, currentIndex, handleNext, interval, isPaused])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
              <img
                src={items[currentIndex].image || "/placeholder.svg"}
                alt={items[currentIndex].title}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <h3 className="text-xl font-bold mb-2">{items[currentIndex].title}</h3>
                <p className="text-sm text-white/80 mb-4">{items[currentIndex].description}</p>
                {/* {items[currentIndex].url && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/20 hover:text-white"
                    onClick={() => window.open(items[currentIndex].url, "_blank")}
                  >
                    Visitar site
                  </Button>
                )} */}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        size="icon"
        variant="outline"
        className="absolute left-4 top-1/2 z-30 h-8 w-8 -translate-y-1/2 rounded-full border-white/30 bg-black/30 text-white hover:bg-black/50 hover:text-white"
        onClick={handlePrevious}
        aria-label="Anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="absolute right-4 top-1/2 z-30 h-8 w-8 -translate-y-1/2 rounded-full border-white/30 bg-black/30 text-white hover:bg-black/50 hover:text-white"
        onClick={handleNext}
        aria-label="Próximo"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-2 left-0 right-0 z-30 flex justify-center space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-4" : "bg-white/50"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
