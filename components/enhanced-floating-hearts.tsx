"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { useTheme } from "next-themes"

interface HeartProps {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
  speed: number
  amplitude: number
  frequency: number
  depth: number
  color: string
  pulse: boolean
  glow: boolean
}

interface EnhancedFloatingHeartsProps {
  count?: number
  minSize?: number
  maxSize?: number
  minSpeed?: number
  maxSpeed?: number
  interactive?: boolean
  colors?: string[]
  density?: "low" | "medium" | "high"
  effects?: {
    pulse?: boolean
    glow?: boolean
    swirl?: boolean
    parallax?: boolean
  }
}

let heartIdCounter = 0

export default function EnhancedFloatingHearts({
  count = 30,
  minSize = 10,
  maxSize = 30,
  minSpeed = 1,
  maxSpeed = 3,
  interactive = true,
  colors = ["#ff80ab", "#ff4081", "#e91e63", "#f8bbd0", "#fce4ec"],
  density = "medium",
  effects = {
    pulse: true,
    glow: true,
    swirl: true,
    parallax: true,
  },
}: EnhancedFloatingHeartsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hearts, setHearts] = useState<HeartProps[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const { theme } = useTheme()

  // Adjust count based on density
  const actualCount = useMemo(() => {
    const densityMultiplier = {
      low: 0.5,
      medium: 1,
      high: 2,
    }
    return Math.floor(count * densityMultiplier[density])
  }, [count, density])

  // Update heart positions
  useEffect(() => {
    if (hearts.length === 0 || dimensions.width === 0) return

    let animationFrameId: number
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000 // Convert to seconds
      lastTime = currentTime

      setHearts((prevHearts) => {
        return prevHearts
          .map((heart) => {
            // Basic upward movement with delta time
            let newY = heart.y - heart.speed * deltaTime * 60

            // Add horizontal oscillation (swirl effect)
            let newX = heart.x
            if (effects.swirl) {
              newX = heart.x + Math.sin(newY * heart.frequency) * heart.amplitude * deltaTime * 60
            }

            // Interactive effect - hearts move away from cursor with smooth easing
            if (interactive && isHovering) {
              const dx = newX - mousePosition.x
              const dy = newY - mousePosition.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              const maxDistance = 150

              if (distance < maxDistance) {
                const force = Math.pow(1 - distance / maxDistance, 2) * 3
                newX += (dx / distance) * force * deltaTime * 60
                newY += (dy / distance) * force * deltaTime * 60
              }
            }

            // Reset position if heart goes out of bounds
            if (newY < -heart.size) {
              newY = dimensions.height + heart.size
              newX = Math.random() * dimensions.width
            }

            // Keep hearts within horizontal bounds with smooth wrapping
            if (newX < -heart.size) newX = dimensions.width + heart.size
            if (newX > dimensions.width + heart.size) newX = -heart.size

            return {
              ...heart,
              x: newX,
              y: newY,
            }
          })
          .filter((heart) => heart.y < dimensions.height + heart.size * 2) // Remove hearts that are too far up
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [hearts, dimensions, mousePosition, isHovering, interactive, effects.swirl])

  // Initialize hearts with better distribution
  useEffect(() => {
    if (!containerRef.current) return

    const { clientWidth, clientHeight } = containerRef.current
    setDimensions({ width: clientWidth, height: clientHeight })

    const newHearts = Array.from({ length: actualCount }, (_, i) =>
      createHeart(i, clientWidth, clientHeight, colors, minSize, maxSize, minSpeed, maxSpeed, effects),
    )
    setHearts(newHearts)

    // Add new hearts periodically with better control
    const interval = setInterval(() => {
      setHearts((prev) => {
        const maxHearts = actualCount * 1.2 // Limit maximum hearts
        if (prev.length >= maxHearts) {
          return prev.slice(5).concat(
            createHeart(0, clientWidth, clientHeight, colors, minSize, maxSize, minSpeed, maxSpeed, effects),
          )
        }
        return [
          ...prev,
          createHeart(0, clientWidth, clientHeight, colors, minSize, maxSize, minSpeed, maxSpeed, effects),
        ]
      })
    }, 2000)

    // Handle window resize with debounce
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      if (!containerRef.current) return
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const container = containerRef.current
        if (!container) return
        const { clientWidth, clientHeight } = container
      setDimensions({ width: clientWidth, height: clientHeight })
      }, 100)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      clearTimeout(resizeTimeout)
      window.removeEventListener("resize", handleResize)
    }
  }, [actualCount, colors, effects, maxSize, maxSpeed, minSize, minSpeed])

  // Handle mouse interaction
  useEffect(() => {
    if (!interactive || !containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x, y })
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    containerRef.current.addEventListener("mousemove", handleMouseMove)
    containerRef.current.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove)
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [interactive])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${effects.pulse ? "animate-pulse-slow" : ""} ${effects.glow ? "heart-glow" : ""}`}
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity,
            transform: `rotate(${heart.rotation}deg) scale(${effects.parallax ? 1 - heart.depth * 0.3 : 1})`,
            zIndex: effects.parallax ? Math.floor((1 - heart.depth) * 10) : 0,
            filter: effects.glow ? `drop-shadow(0 0 ${heart.size / 4}px ${heart.color})` : "none",
            transition: "transform 0.3s ease-out",
          }}
        >
          <svg viewBox="0 0 24 24" fill={heart.color} className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  )
}

// Helper function to create a heart
function createHeart(
  id: number,
  width: number,
  height: number,
  colors: string[],
  minSize: number,
  maxSize: number,
  minSpeed: number,
  maxSpeed: number,
  effects: {
    pulse?: boolean
    glow?: boolean
    swirl?: boolean
    parallax?: boolean
  },
): HeartProps {
  const size = Math.random() * (maxSize - minSize) + minSize
  const depth = Math.random()
  const actualSize = effects.parallax ? size * (1 - depth * 0.3) : size

  return {
    id: heartIdCounter++,
    x: Math.random() * width,
    y: Math.random() * height,
    size: actualSize,
    opacity: Math.random() * 0.6 + 0.2,
    rotation: Math.random() * 360,
    speed: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (effects.parallax ? 1 - depth * 0.5 : 1),
    amplitude: Math.random() * 3 + 1,
    frequency: Math.random() * 0.02 + 0.01,
    depth: depth,
    color: colors[Math.floor(Math.random() * colors.length)],
    pulse: Math.random() > 0.7,
    glow: Math.random() > 0.5,
  }
}
