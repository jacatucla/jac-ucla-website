'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { type CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface CarouselDotsProps {
  api: CarouselApi | undefined
}

export function CarouselDots({ api }: CarouselDotsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!api) return
    setSelectedIndex(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return

    setScrollSnaps(api.scrollSnapList())
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <div className="flex justify-center gap-2 mt-6">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            selectedIndex === index 
              ? "bg-pink-600 w-2" 
              : "bg-pink-200 w-2 hover:bg-pink-300"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}