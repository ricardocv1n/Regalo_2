"use client"

import { useEffect, useState, useRef, useMemo } from "react"

interface WaveVisualizerProps {
  audioData: number[]
  isPlaying: boolean
}

export default function WaveVisualizer({ audioData, isPlaying }: WaveVisualizerProps) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Ensure client-side only rendering for dynamic values
  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate static bars for initial render
  const staticBars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      height: 20,
      delay: `${i * 0.1}s`
    }))
  }, [])

  // Generate dynamic bars based on audio data
  const dynamicBars = useMemo(() => {
    if (!mounted || !isPlaying) return staticBars

    return audioData.map((value, i) => ({
      height: Math.max(5, Math.min(30, value * 30)),
      delay: `${i * 0.1}s`
    }))
  }, [audioData, isPlaying, mounted, staticBars])

  // Use static bars for server-side rendering and initial client render
  const bars = mounted ? dynamicBars : staticBars

  return (
    <div ref={containerRef} className="flex items-center justify-center h-full">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="w-1 mx-0.5 rounded-full bg-white/50 transition-all duration-300"
          style={{
            height: `${bar.height}px`,
            animationDelay: bar.delay
          }}
        />
      ))}
    </div>
  )
}
