"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, X, Navigation, Eye, Edit, Trash2, Heart, ImageIcon, Calendar, Gift } from "lucide-react"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Timeline from "@/components/timeline"
import GoogleMap from "@/components/google-map"
import FunFacts from "@/components/fun-facts"
import { Label } from "@/components/ui/label"

interface Milestone {
  id: number
  title: string
  date: string
  description: string
  fullDescription?: string
  image: string
  category: "aniversario" | "viaje" | "hogar" | "evento" | "otro"
}

interface Place {
  id: number
  name: string
  address: string
  date: string
  description: string
  type: "visitado" | "planeado" | "evento"
  lat: number
  lng: number
}

export default function RecuerdosPage() {
  const router = useRouter()
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      title: "Nuestro primer encuentro",
      date: "15 de marzo de 2020",
      description: "El día que cambió nuestras vidas para siempre",
      fullDescription:
        "Fue en el parque central, un día soleado de primavera. Nunca imaginé que una simple conversación se convertiría en el inicio de la historia más hermosa de mi vida.",
      image: "/assets/img/30.jpg",
      category: "aniversario",
    },
    {
      id: 2,
      title: "Nuestro primer viaje juntos en familia",
      date: "20 de junio de 2020",
      description: "Paseo por coveñas",
      fullDescription:
        "Gracias por haber hecho que este viaje sea tan especial, y por haber sido parte de mi vida.",
      image: "/assets/img/12.jpg",
      category: "viaje",
    },
    {
      id: 3,
      title: "PRimera vez de mi amorcito en tuis tuis",
      date: "10 de enero de 2021",
      description: "El día que casi se nos va jaja",
      fullDescription:
        "la pasamos increiblemente bien, aunque se sudo y se sufrio mucho la pasabamos muy bien.",
      image: "/assets/img/30.jpg",
      category: "hogar",
    },
    {
      id: 4,
      title: "Nuestra primera Navidad juntos",
      date: "25 de diciembre de 2024",
      description: "Una celebración llena de amor y tradiciones",
      fullDescription:
        " intercambiamos regalos especiales y creamos nuevas tradiciones que mantendremos por siempre.",
      image: "/assets/img/22.jpeg",
      category: "evento",
    },
    {
      id: 5,
      title: "Día de compras especial",
      date: "15 de febrero de 2022",
      description: "Un día de compras que se convirtió en asare para encontrar ropa",
      fullDescription:
        "Lo que comenzó como un simple día de compras se convirtió en una aventura llena de risas, descubrimientos y momentos inolvidables juntos.",
      image: "/assets/img/21.jpeg",
      category: "otro",
    },
    {
      id: 6,
      title: "Paseo por el puente",
      date: "5 de marzo de 2022",
      description: "Un atardecer mágico sobre el río",
      fullDescription:
        "Caminamos por el puente mientras el sol se ponía, creando un momento perfecto que quedará grabado en nuestros corazones para siempre.",
      image: "/assets/img/25.jpeg",
      category: "otro",
    }
  ])

  const [places, setPlaces] = useState<Place[]>([
    {
      id: 1,
      name: "Parque Central",
      address: "Calle Principal 123, Ciudad",
      date: "15 de marzo de 2020",
      description: "Donde todo comenzó",
      type: "visitado",
      lat: 4.6097,
      lng: -74.0817
    },
    {
      id: 2,
      name: "Playa del Amor",
      address: "Costa del Sol, Ciudad",
      date: "20 de junio de 2020",
      description: "Nuestro primer viaje juntos",
      type: "visitado",
      lat: 4.5709,
      lng: -74.2973
    },
    {
      id: 3,
      name: "Nuestro Hogar",
      address: "Calle de los Recuerdos 456, Ciudad",
      date: "10 de enero de 2021",
      description: "Donde construimos nuestro nido de amor",
      type: "visitado",
      lat: 4.6097,
      lng: -74.0817
    }
  ])

  const [milestoneFilter, setMilestoneFilter] = useState("todos")
  const [placeFilter, setPlaceFilter] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ type: "milestone" | "place"; id: number } | null>(null)
  const [editPlace, setEditPlace] = useState<Place | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const milestoneFilters = [
    { key: "todos", label: "Todos" },
    { key: "aniversario", label: "Aniversario" },
    { key: "viaje", label: "Viaje" },
    { key: "hogar", label: "Hogar" },
    { key: "evento", label: "Evento" },
    { key: "otro", label: "Otro" },
  ]

  const placeFilters = [
    { key: "todos", label: "Todos" },
    { key: "visitado", label: "Visitados" },
    { key: "planeado", label: "Planeados" },
    { key: "evento", label: "Eventos" },
  ]

  const handlePlaceSelect = (lat: number, lng: number, address: string, name: string) => {
    const newPlace: Place = {
      id: places.length + 1,
      name,
      address,
      date: new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      description: "Un lugar especial para nosotros",
      type: "visitado",
      lat,
      lng
    }
    setPlaces([...places, newPlace])
  }

  const handlePlaceAction = (action: string, place: Place) => {
    if (action === "route") {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`, '_blank')
    } else if (action === "gallery") {
      setSelectedPlace(place)
      setShowGalleryModal(true)
    }
  }

  const handleEditMilestone = (milestone: Milestone) => {
    // Implementar edición de hito si es necesario
  }

  const handleDeleteMilestone = (id: number) => {
    setDeleteTarget({ type: "milestone", id })
    setShowDeleteModal(true)
  }

  const handleEditPlace = (place: Place) => {
    setEditPlace(place)
    setShowEditModal(true)
  }

  const handleSaveEditPlace = () => {
    if (!editPlace) return
    setPlaces((prev) => prev.map((p) => p.id === editPlace.id ? editPlace : p))
    setShowEditModal(false)
    setEditPlace(null)
  }

  const handleDeletePlace = (id: number) => {
    setDeleteTarget({ type: "place", id })
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return

    if (deleteTarget.type === "milestone") {
      setMilestones(milestones.filter((m) => m.id !== deleteTarget.id))
    } else {
      setPlaces(places.filter((p) => p.id !== deleteTarget.id))
    }

    setShowDeleteModal(false)
    setDeleteTarget(null)
  }

  const filteredPlaces = places.filter((place) => {
    const matchesFilter = placeFilter === "todos" || place.type === placeFilter
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Persistencia de lugares en localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recuerdos-places");
    if (saved) {
      setPlaces(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recuerdos-places", JSON.stringify(places));
  }, [places]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PageHeader
        title="Nuestros Recuerdos"
        description="Cada momento especial, cada aventura, cada sonrisa compartida forma parte de nuestra historia de amor."
        relatedLinks={[
          {
            label: "Fotos",
            href: "/fotos",
            icon: <ImageIcon className="h-4 w-4" />
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

      {/* Fun Facts Section */}
      <div className="mb-12">
        <FunFacts />
      </div>

      {/* Timeline Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-4 md:mb-0">Hitos de Nuestro Amor</h2>
          <div className="flex flex-wrap gap-2">
            {milestoneFilters.map((filter) => (
              <Button
                key={filter.key}
                variant={milestoneFilter === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setMilestoneFilter(filter.key)}
                className={
                  milestoneFilter === filter.key
                    ? "bg-pink-600 hover:bg-pink-700"
                    : "border-pink-300 text-pink-600 hover:bg-pink-50"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <Timeline
          milestones={milestones}
          onEdit={handleEditMilestone}
          onDelete={handleDeleteMilestone}
          selectedFilter={milestoneFilter}
        />
      </div>

      {/* Map Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">Mapa de Lugares Especiales</h2>
        <GoogleMap
          places={places}
          onPlaceSelect={handlePlaceSelect}
          onPlaceAction={handlePlaceAction}
          selectedFilter={placeFilter}
        />
      </div>

      {/* Places List Section */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600 mb-4 md:mb-0">Lista de Lugares Guardados</h2>
          <div className="flex flex-wrap gap-2">
            {placeFilters.map((filter) => (
              <Button
                key={filter.key}
                variant={placeFilter === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setPlaceFilter(filter.key)}
                className={
                  placeFilter === filter.key
                    ? "bg-pink-600 hover:bg-pink-700"
                    : "border-pink-300 text-pink-600 hover:bg-pink-50"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar lugares..."
              className="pl-10"
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
        </div>

        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {filteredPlaces.map((place) => (
            <Card key={place.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{place.name}</h3>
                    <p className="text-sm text-muted-foreground">{place.date}</p>
                    <p className="text-sm text-gray-600 mb-2">{place.description}</p>
                    <p className="text-xs text-gray-500">{place.address}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ml-4 ${
                      place.type === "visitado"
                        ? "bg-green-100 text-green-800"
                        : place.type === "planeado"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {place.type === "visitado" ? "Visitado" : place.type === "planeado" ? "Planeado" : "Evento"}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePlaceAction("route", place)}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Cómo llegar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePlaceAction("gallery", place)}
                    className="text-green-600 border-green-300 hover:bg-green-50"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Galería
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditPlace(place)}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeletePlace(place.id)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal de edición de lugar */}
        {showEditModal && editPlace && (
          <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Lugar</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Label htmlFor="edit-place-name">Nombre</Label>
                <Input
                  id="edit-place-name"
                  value={editPlace.name}
                  onChange={e => setEditPlace({ ...editPlace, name: e.target.value })}
                  placeholder="Nombre del lugar"
                />
                <Label htmlFor="edit-place-address">Dirección</Label>
                <Input
                  id="edit-place-address"
                  value={editPlace.address}
                  onChange={e => setEditPlace({ ...editPlace, address: e.target.value })}
                  placeholder="Dirección"
                />
                <Label htmlFor="edit-place-date">Fecha</Label>
                <Input
                  id="edit-place-date"
                  value={editPlace.date}
                  onChange={e => setEditPlace({ ...editPlace, date: e.target.value })}
                  placeholder="Fecha"
                />
                <Label htmlFor="edit-place-description">Descripción</Label>
                <Input
                  id="edit-place-description"
                  value={editPlace.description}
                  onChange={e => setEditPlace({ ...editPlace, description: e.target.value })}
                  placeholder="Descripción"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditModal(false)}>Cancelar</Button>
                <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleSaveEditPlace}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar este {deleteTarget?.type === "milestone" ? "hito" : "lugar"}? Esta
              acción no se puede deshacer.
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

      {/* Gallery Modal */}
      <Dialog open={showGalleryModal} onOpenChange={setShowGalleryModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedPlace?.name}</DialogTitle>
            <DialogDescription>{selectedPlace?.address}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <p className="text-gray-500">Galería de imágenes del lugar</p>
            </div>
            <p className="text-gray-700">{selectedPlace?.description}</p>
            <p className="text-sm text-gray-500 mt-2">Visitado el: {selectedPlace?.date}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGalleryModal(false)}>
              Cerrar
            </Button>
            <Button className="bg-pink-600 hover:bg-pink-700">Compartir ubicación</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
