"use client"

import { useState, useEffect } from "react"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PenTool, Search, X, Shuffle, BookOpen, Heart, ImageIcon, Calendar, Gift, MessageSquare } from "lucide-react"
import MessageCard from "@/components/message-card"
import MessageViewer from "@/components/message-viewer"
import MessageEditor from "@/components/message-editor"

interface Message {
  id: number
  title: string
  content: string
  date: string
  category: "amor" | "motivacion" | "recuerdo" | "futuro" | "especial"
  isRead: boolean
  isFavorite: boolean
}

export default function MensajesPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('messages')
      if (savedMessages) {
        return JSON.parse(savedMessages)
      }
    }
    return [
    {
      id: 1,
      title: "Para mi amor eterno",
      content: `Mi querido amor,

Cada día que pasa a tu lado es un regalo que atesoro con todo mi corazón. Desde el momento en que nuestros ojos se encontraron por primera vez, supe que mi vida había cambiado para siempre.

Eres la melodía que alegra mis mañanas, la luz que ilumina mis días más oscuros y la paz que abraza mis noches. En tus brazos he encontrado mi hogar, en tu sonrisa mi felicidad, y en tu amor mi razón de ser.

Gracias por ser mi compañera, mi confidente, mi mejor amiga y el amor de mi vida. Cada momento contigo es una página hermosa en el libro de nuestra historia.

Te amo más de lo que las palabras pueden expresar, más de lo que el tiempo puede medir, y más de lo que mi corazón puede contener.

Para siempre tuya,
Con todo mi amor`,
      date: "2024-01-15",
      category: "amor",
      isRead: true,
        isFavorite: true,
    },
    {
      id: 2,
      title: "Recordando nuestro primer beso",
      content: `¿Recuerdas ese momento mágico bajo las estrellas?

Era una noche perfecta, la brisa suave acariciaba nuestros rostros mientras caminábamos por el parque. De repente, te detuviste y me miraste con esos ojos que me robaron el aliento desde el primer día.

El tiempo se detuvo cuando nuestros labios se encontraron por primera vez. Fue como si todo el universo hubiera conspirado para crear ese momento perfecto, solo para nosotros.

Ese beso selló nuestro destino y marcó el inicio de la aventura más hermosa de nuestras vidas. Cada vez que lo recuerdo, mi corazón se llena de la misma emoción que sentí esa noche.

Gracias por darme el beso más perfecto del mundo.`,
      date: "2024-02-14",
      category: "recuerdo",
      isRead: false,
        isFavorite: false,
    },
    {
      id: 3,
      title: "Nuestros sueños por cumplir",
      content: `Mi amor, tengo tantos sueños que quiero cumplir contigo...

Quiero viajar por el mundo tomados de la mano, descubrir nuevos lugares y crear recuerdos inolvidables en cada rincón del planeta. Quiero construir nuestro hogar perfecto, donde cada habitación esté llena de amor y risas.

Sueño con las mañanas perezosas en las que despertemos abrazados, con las tardes de lluvia leyendo juntos, y con las noches estrelladas planeando nuestro futuro.

Quiero envejecer a tu lado, ver cómo nuestro amor se fortalece con cada año que pase, y crear una familia hermosa llena de amor y felicidad.

Todos estos sueños son posibles porque los compartiré contigo, mi amor eterno.`,
      date: "2024-03-10",
      category: "futuro",
      isRead: true,
        isFavorite: false,
    },
    ]
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('messages', JSON.stringify(messages))
    }
  }, [messages])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todas")
  const [showViewer, setShowViewer] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentMessageId, setCurrentMessageId] = useState<number | null>(null)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [deleteMessageId, setDeleteMessageId] = useState<number | null>(null)

  const categories = [
    { value: "todas", label: "Todas", emoji: "📝" },
    { value: "amor", label: "Amor", emoji: "💕" },
    { value: "motivacion", label: "Motivación", emoji: "⭐" },
    { value: "recuerdo", label: "Recuerdos", emoji: "📸" },
    { value: "futuro", label: "Futuro", emoji: "🌟" },
    { value: "especial", label: "Especiales", emoji: "✨" },
  ]

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "todas" || message.category === selectedCategory

    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) {
      return a.isFavorite ? -1 : 1
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const unreadCount = messages.filter((m) => !m.isRead).length

  const handleOpenMessage = (messageId: number) => {
    setCurrentMessageId(messageId)
    setShowViewer(true)
  }

  const handleNavigateMessage = (direction: "prev" | "next") => {
    const currentIndex = filteredMessages.findIndex((m) => m.id === currentMessageId)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredMessages.length - 1
    } else {
      newIndex = currentIndex < filteredMessages.length - 1 ? currentIndex + 1 : 0
    }

    setCurrentMessageId(filteredMessages[newIndex].id)
  }

  const handleRandomMessage = () => {
    if (filteredMessages.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMessages.length)
      setCurrentMessageId(filteredMessages[randomIndex].id)
      setShowViewer(true)
    }
  }

  const handleSaveMessage = (messageData: Omit<Message, "id" | "isRead" | "isFavorite">) => {
    if (editingMessage) {
      setMessages(messages.map((m) => (m.id === editingMessage.id ? { ...m, ...messageData } : m)))
    } else {
      const newMessage: Message = {
        id: Date.now(),
        ...messageData,
        isRead: false,
        isFavorite: false,
      }
      setMessages([newMessage, ...messages])
    }
    setEditingMessage(null)
  }

  const handleEditMessage = (message: Message) => {
    setEditingMessage(message)
    setShowEditor(true)
  }

  const handleDeleteMessage = (messageId: number) => {
    setDeleteMessageId(messageId)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (deleteMessageId) {
      setMessages(messages.filter((m) => m.id !== deleteMessageId))
      setDeleteMessageId(null)
      setShowDeleteModal(false)
    }
  }

  const handleMarkAsRead = (messageId: number) => {
    setMessages(messages.map((m) => (m.id === messageId ? { ...m, isRead: true } : m)))
  }

  const handleToggleFavorite = (messageId: number) => {
    setMessages(messages.map((m) => 
      m.id === messageId ? { ...m, isFavorite: !m.isFavorite } : m
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ec4899' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <PageHeader
          title="Mensajes"
          description="Comparte tus pensamientos, deseos y sentimientos más profundos."
          relatedLinks={[
            {
              label: "Fotos",
              href: "/fotos",
              icon: <ImageIcon className="h-4 w-4" />
            },
            {
              label: "Recuerdos",
              href: "/recuerdos",
              icon: <Heart className="h-4 w-4" />
            },
            {
              label: "Planes",
              href: "/planes",
              icon: <Calendar className="h-4 w-4" />
            },
            {
              label: "Sorpresas",
              href: "/sorpresas",
              icon: <Gift className="h-4 w-4" />
            }
          ]}
        />

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-pink-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{mounted ? messages.length : 0}</div>
                <div className="text-sm text-gray-600">Mensajes totales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
                <div className="text-sm text-gray-600">Sin leer</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{messages.length - unreadCount}</div>
                <div className="text-sm text-gray-600">Leídos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {messages.filter(m => m.isFavorite).length}
                </div>
                <div className="text-sm text-gray-600">Favoritos</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleRandomMessage}
                variant="outline"
                className="border-pink-300 text-pink-600 hover:bg-pink-50"
                disabled={filteredMessages.length === 0}
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Mensaje Aleatorio
              </Button>
              <Button onClick={() => setShowEditor(true)} className="bg-pink-600 hover:bg-pink-700">
                <PenTool className="h-4 w-4 mr-2" />
                Escribir Mensaje
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-pink-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar en mensajes..."
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

            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className={
                    selectedCategory === category.value
                      ? "bg-pink-600 hover:bg-pink-700"
                      : "border-pink-300 text-pink-600 hover:bg-pink-50"
                  }
                >
                  <span className="mr-1">{category.emoji}</span>
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {filteredMessages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMessages.map((message, index) => (
              <MessageCard
                key={message.id}
                message={message}
                index={index}
                onClick={() => handleOpenMessage(message.id)}
                onEdit={() => handleEditMessage(message)}
                onDelete={() => handleDeleteMessage(message.id)}
                onToggleFavorite={() => handleToggleFavorite(message.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              {searchQuery || selectedCategory !== "todas" ? "No se encontraron mensajes" : "Aún no hay mensajes"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || selectedCategory !== "todas"
                ? "Intenta cambiar los filtros de búsqueda"
                : "Comienza escribiendo tu primer mensaje especial"}
            </p>
            {!searchQuery && selectedCategory === "todas" && (
              <Button onClick={() => setShowEditor(true)} className="bg-pink-600 hover:bg-pink-700">
                <PenTool className="h-4 w-4 mr-2" />
                Escribir Primer Mensaje
              </Button>
            )}
          </div>
        )}

        <MessageViewer
          isOpen={showViewer}
          onClose={() => setShowViewer(false)}
          messages={filteredMessages}
          currentMessageId={currentMessageId}
          onNavigate={handleNavigateMessage}
          onMarkAsRead={handleMarkAsRead}
          onToggleFavorite={handleToggleFavorite}
        />

        <MessageEditor
          isOpen={showEditor}
          onClose={() => {
            setShowEditor(false)
            setEditingMessage(null)
          }}
          onSave={handleSaveMessage}
          editingMessage={editingMessage}
        />

        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que quieres eliminar este mensaje? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
