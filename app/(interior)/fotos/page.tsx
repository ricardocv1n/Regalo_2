"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X, Upload, Grid, List, Heart, ImageIcon, Calendar } from "lucide-react"
import { PhotoHeader } from "@/components/photo-header"
import MediaCard from "@/components/media-card"
import MediaViewer from "@/components/media-viewer"
import RomanticMessage from "@/components/romantic-message"
import PageHeader from "@/components/page-header"
import Masonry from 'react-masonry-css'

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
  duration?: string // Duración del video en formato MM:SS
}

// Archivos de imágenes y videos (listados manualmente por ahora)
const imageFiles = [
  "01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg","21.jpeg","22.jpeg","23.jpeg","24.jpeg","25.jpeg","26.jpeg","27.jpg","28.jpeg","29.jpg","30.jpg","31.webp","32.jpg","33.jpg","34.jpg","35.jpg","36.jpg","37.jpg","38.jpg","39.jpg","40.jpg","41.jpg","42.jpg","43.jpg","44.jpg","45.jpg","46.jpg","47.jpg","48.jpg","49.jpg","50.jpg","51.jpg","52.jpg","53.jpg","54.jpg","55.jpg","56.jpg","57.jpg","58.jpg","59.jpg","60.jpg","61.jpg","62.jpg","63.jpg","64.jpg","65.jpg","66.jpg","67.jpg","68.jpg","69.jpg","70.jpg","71.jpg","72.jpg","73.jpg","74.jpg","75.jpg","76.jpg","77.jpg","78.jpg","79.jpg","80.jpg","81.jpg","82.jpg","83.jpg","84.jpg"
]
const videoFiles = [
  "WhatsApp Video 2025-06-11 at 6.09.50 PM.mp4",
  "VID-20240203-WA0036.mp4",
  "VID-20241217-WA0009.mp4",
  "VID-20240203-WA0039.mp4",
  "VID_20240914_080457.mp4",
  "VID_20240914_080611.mp4",
  "VID_20241207_173621_179.mp4",
  "VID_20241225_173418.mp4",
  "VID_20241231_201155_295.mp4"
]
const categories = ["momentos","viajes","celebraciones","aventuras","cotidiano"];

function getAspectRatio(idx:number) {
  const ratios = ["square","portrait","landscape"];
  return ratios[idx % ratios.length] as "square"|"portrait"|"landscape";
}

const allMedia: MediaItem[] = [
  ...imageFiles.map((file, idx) => ({
    id: idx+1,
    title: `Foto ${idx+1}`,
    date: `2024-01-${(idx%28+1).toString().padStart(2,"0")}`,
    description: `Un recuerdo especial capturado en la foto ${idx+1}.`,
    src: `/assets/img/${file}`,
    type: "photo" as const,
    category: categories[idx%categories.length] as MediaItem["category"],
    likes: 0,
    aspectRatio: getAspectRatio(idx)
  })),
  ...videoFiles.map((file, idx) => ({
    id: imageFiles.length+idx+1,
    title: `Video ${idx+1}`,
    date: `2024-02-${(idx%28+1).toString().padStart(2,"0")}`,
    description: `Un video especial para recordar el momento ${idx+1}.`,
    src: `/assets/videos/${file}`,
    type: "video" as const,
    category: categories[idx%categories.length] as MediaItem["category"],
    likes: 0,
    aspectRatio: getAspectRatio(idx),
    duration: undefined // Si quieres puedes calcularlo dinámicamente
  }))
];

export default function FotosPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(allMedia)

  const [selectedCategory, setSelectedCategory] = useState("todas")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry")
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [showViewer, setShowViewer] = useState(false)
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set())
  const [romanticMessage, setRomanticMessage] = useState("")
  const [showRomanticMessage, setShowRomanticMessage] = useState(false)

  const categories = [
    { key: "todas", label: "Todos", emoji: "📷", count: mediaItems.length },
    { key: "fotos", label: "Fotos", emoji: "📸", count: mediaItems.filter((item) => item.type === "photo").length },
    { key: "videos", label: "Videos", emoji: "🎥", count: mediaItems.filter((item) => item.type === "video").length },
    { key: "viajes", label: "Viajes", emoji: "✈️", count: mediaItems.filter((item) => item.category === "viajes").length },
    { key: "celebraciones", label: "Celebraciones", emoji: "🎉", count: mediaItems.filter((item) => item.category === "celebraciones").length },
    { key: "aventuras", label: "Aventuras", emoji: "🏔️", count: mediaItems.filter((item) => item.category === "aventuras").length },
  ]

  // Load likes from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem("photo-likes")
    if (savedLikes) {
      setLikedItems(new Set(JSON.parse(savedLikes)))
    }
  }, [])

  // Save likes to localStorage
  useEffect(() => {
    localStorage.setItem("photo-likes", JSON.stringify([...likedItems]))
  }, [likedItems])

  // Update media items with current likes
  useEffect(() => {
    setMediaItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        likes: likedItems.has(item.id) ? Math.max(1, item.likes) : Math.max(0, item.likes),
      })),
    )
  }, [likedItems])

  const filteredItems = mediaItems.filter((item) => {
    const matchesCategory = 
      selectedCategory === "todas" || 
      (selectedCategory === "fotos" && item.type === "photo") ||
      (selectedCategory === "videos" && item.type === "video") ||
      item.category === selectedCategory

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const totalPhotos = mediaItems.filter((item) => item.type === "photo").length
  const totalVideos = mediaItems.filter((item) => item.type === "video").length

  const handleOpenViewer = (item: MediaItem) => {
    setSelectedItem(item)
    setShowViewer(true)
  }

  const handleLike = (itemId: number) => {
    setLikedItems((prev) => {
      const newLikes = new Set(prev)
      if (newLikes.has(itemId)) {
        newLikes.delete(itemId)
      } else {
        newLikes.add(itemId)
        // Show romantic message when liking
        const messages = [
          "¡Me encanta que te guste este recuerdo! 💕",
          "Este momento también es especial para mí ✨",
          "Qué hermoso que compartamos los mismos recuerdos favoritos 🥰",
          "Tu corazón y el mío laten al mismo ritmo 💖",
        ]
        setRomanticMessage(messages[Math.floor(Math.random() * messages.length)])
        setShowRomanticMessage(true)
      }
      return newLikes
    })
  }

  const handleNavigateViewer = (direction: "prev" | "next") => {
    if (!selectedItem) return

    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedItem(filteredItems[newIndex])
  }

  const getNavigationState = () => {
    if (!selectedItem) return { prev: false, next: false }

    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id)
    return {
      prev: filteredItems.length > 1,
      next: filteredItems.length > 1,
    }
  }

  // Configuración de columnas responsivas para Masonry
  const breakpointColumnsObj = {
    default: 5,
    1600: 4,
    1200: 3,
    800: 2,
    500: 1
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ec4899' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <div className="space-y-8">
          <PageHeader
            title="Nuestras Fotos"
            description="Cada imagen cuenta una historia, cada momento capturado es un tesoro que guardamos en nuestro corazón."
            relatedLinks={[
              {
                label: "Recuerdos",
                href: "/recuerdos",
                icon: <Heart className="h-4 w-4" />
              },
              {
                label: "Planes",
                href: "/planes",
                icon: <Calendar className="h-4 w-4" />
              }
            ]}
          />

          {/* Controls */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg border border-pink-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar en nuestros recuerdos..."
                  className="pl-10 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-pink-600 hover:bg-pink-700"
                      : "border-pink-300 text-pink-600 hover:bg-pink-50"
                  }
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Cuadrícula
                </Button>
                <Button
                  variant={viewMode === "masonry" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("masonry")}
                  className={
                    viewMode === "masonry"
                      ? "bg-pink-600 hover:bg-pink-700"
                      : "border-pink-300 text-pink-600 hover:bg-pink-50"
                  }
                >
                  <List className="h-4 w-4 mr-2" />
                  Pinterest
                </Button>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg border border-pink-100">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.key)}
                  className={`
                    transition-all duration-200 hover:scale-105
                    ${
                      selectedCategory === category.key
                        ? "bg-pink-600 hover:bg-pink-700 shadow-lg"
                        : "border-pink-300 text-pink-600 hover:bg-pink-50 hover:shadow-md"
                    }
                  `}
                >
                  <span className="mr-2">{category.emoji}</span>
                  {category.label}
                  <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">{category.count}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Media Grid */}
          {filteredItems.length > 0 ? (
            viewMode === "masonry" ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="mb-6"
                  >
                    <MediaCard
                      item={item}
                      onOpen={() => handleOpenViewer(item)}
                      onLike={() => handleLike(item.id)}
                      isLiked={likedItems.has(item.id)}
                    />
                  </div>
                ))}
              </Masonry>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="animate-fade-in-up" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <MediaCard
                      item={item}
                      onOpen={() => handleOpenViewer(item)}
                      onLike={() => handleLike(item.id)}
                      isLiked={likedItems.has(item.id)}
                    />
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {searchQuery || selectedCategory !== "todas" ? "No se encontraron recuerdos" : "Aún no hay recuerdos"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || selectedCategory !== "todas"
                  ? "Intenta cambiar los filtros de búsqueda"
                  : "Los recuerdos se cargarán próximamente"}
              </p>
            </div>
          )}

          {/* Media Viewer */}
          <MediaViewer
            isOpen={showViewer}
            onClose={() => setShowViewer(false)}
            item={selectedItem}
            onLike={() => selectedItem && handleLike(selectedItem.id)}
            isLiked={selectedItem ? likedItems.has(selectedItem.id) : false}
            onNavigate={handleNavigateViewer}
            canNavigate={getNavigationState()}
            showDuration={true}
            autoPlay={true}
            controls={true}
          />

          {/* Romantic Message */}
          <RomanticMessage
            message={romanticMessage}
            isVisible={showRomanticMessage}
            onClose={() => setShowRomanticMessage(false)}
          />
        </div>
      </div>
    </div>
  )
}
