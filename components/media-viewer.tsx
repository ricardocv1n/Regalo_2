"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Heart, Calendar, ChevronLeft, ChevronRight, Share2, Download } from "lucide-react"

interface MediaItem {
  id: number
  title: string
  date: string
  description: string
  src: string
  thumbnail?: string
  type: "photo" | "video"
  category: "momentos" | "viajes" | "celebraciones" | "aventuras" | "cotidiano"
  likes: number
  aspectRatio?: "square" | "portrait" | "landscape"
  duration?: string
}

interface MediaViewerProps {
  isOpen: boolean
  onClose: () => void
  item: MediaItem | null
  onLike: () => void
  isLiked: boolean
  onNavigate: (direction: "prev" | "next") => void
  canNavigate: { prev: boolean; next: boolean }
  showDuration?: boolean
  autoPlay?: boolean
  controls?: boolean
}

export default function MediaViewer({
  isOpen,
  onClose,
  item,
  onLike,
  isLiked,
  onNavigate,
  canNavigate,
  showDuration = true,
  autoPlay = true,
  controls = true,
}: MediaViewerProps) {
  const [showRomanticMessage, setShowRomanticMessage] = useState(false)
  const [likeAnimation, setLikeAnimation] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const romanticMessages = [
    "Este momento siempre vivirá en nuestro corazón 💕",
    "Qué hermoso recuerdo de nuestro amor 🌹",
    "Cada imagen cuenta nuestra historia de amor ✨",
    "Momentos como estos hacen que nuestro amor sea eterno 💖",
    "Gracias por crear recuerdos tan hermosos conmigo 🥰",
  ]

  useEffect(() => {
    if (item?.type === "video" && videoRef.current) {
      const video = videoRef.current

      const handleVideoEnd = () => {
        const randomMessage = romanticMessages[Math.floor(Math.random() * romanticMessages.length)]
        setShowRomanticMessage(true)

        // Auto-hide message after 4 seconds
        setTimeout(() => {
          setShowRomanticMessage(false)
        }, 4000)
      }

      video.addEventListener("ended", handleVideoEnd)
      return () => video.removeEventListener("ended", handleVideoEnd)
    }
  }, [item])

  const handleLike = () => {
    setLikeAnimation(true)
    setTimeout(() => setLikeAnimation(false), 600)
    onLike()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowLeft":
        if (canNavigate.prev) onNavigate("prev")
        break
      case "ArrowRight":
        if (canNavigate.next) onNavigate("next")
        break
      case "Escape":
        onClose()
        break
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, canNavigate])

  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
        </DialogHeader>
        {/* Header visual personalizado */}
        <div className="relative bg-gradient-to-r from-pink-50 to-rose-100 p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full hover:rotate-90 transition-transform duration-300"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="pr-12">
            <h2 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(item.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {item.type === "video" && showDuration && item.duration && (
                <span className="ml-4 flex items-center">
                  <span className="mr-1">⏱️</span>
                  {item.duration}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Media content */}
        <div className="relative bg-black flex items-center justify-center min-h-[400px]">
          {item.type === "photo" ? (
            <div className="relative w-full h-full max-h-[60vh]">
              <Image
                src={item.src || "/placeholder.svg?height=600&width=800"}
                alt={item.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <video 
              ref={videoRef} 
              src={item.src} 
              controls={controls}
              autoPlay={autoPlay}
              className="max-w-full max-h-[60vh] w-full h-full object-contain"
              poster={item.thumbnail}
            >
              Tu navegador no soporta el elemento de video.
            </video>
          )}

          {/* Navigation arrows */}
          {canNavigate.prev && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => onNavigate("prev")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          {canNavigate.next && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => onNavigate("next")}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          {/* Romantic message overlay */}
          {showRomanticMessage && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-pink-500/90 text-white px-6 py-3 rounded-full animate-fade-in-up">
              {romanticMessages[Math.floor(Math.random() * romanticMessages.length)]}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white">
          <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={`
                  flex items-center gap-2 transition-all duration-200
                  ${isLiked ? "border-pink-300 text-pink-600 bg-pink-50" : "border-gray-300"}
                  ${likeAnimation ? "animate-bounce" : ""}
                `}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-pink-500 text-pink-500" : ""}`} />
                {item.likes} Me gusta
              </Button>

              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Compartir
              </Button>

              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Descargar
              </Button>
            </div>

            <div className="text-sm text-gray-500">
              {item.type === "photo" ? "📸" : "🎥"} {item.category}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
