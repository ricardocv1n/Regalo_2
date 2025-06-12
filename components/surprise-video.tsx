"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface SurpriseVideoProps {
    videoUrl: string
    thumbnail?: string
}

export function SurpriseVideo({ videoUrl, thumbnail }: SurpriseVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handlePlayPause = () => {
    const video = document.getElementById("surprise-video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    const video = document.getElementById("surprise-video") as HTMLVideoElement
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/10">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      )}
      <video
        id="surprise-video"
        className="w-full h-full object-cover"
        poster={thumbnail ? `/assets/images/surprises/${thumbnail}` : undefined}
        onLoadedData={() => setIsLoading(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={`/assets/videos/${videoUrl}`} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePlayPause}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
        ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
          
          <button
            onClick={handleMute}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
        )}
          </button>
      </div>
      </div>
    </div>
  )
}
