"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import PageHeader from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import AnniversaryCounter from "@/components/anniversary-counter"
import EnhancedCarousel from "@/components/enhanced-carousel"

interface CarouselItem {
  id: number
  image: string
  title: string
  description: string
  alt: string
}

export default function InicioPage() {
  const router = useRouter()
  const [anniversaryDate, setAnniversaryDate] = useState<Date | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [userName, setUserName] = useState("Mi Amor")
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Lista de canciones de la carpeta music
  const allSongs = [
    { title: "Eres todo", artist: "Iván Villazón & Iván Zuleta", url: "/assets/music/iván villazón -- iván zuleta- eres todo.mp3" },
    { title: "Lo Mejor Que Hay En Mi Vida", artist: "Andrés Cepeda", url: "/assets/music/Andrés Cepeda - Lo Mejor Que Hay En Mi Vida - Sal De La Tierra.mp3" },
    { title: "Eres Mi Sueño", artist: "Fonseca", url: "/assets/music/Fonseca - Eres Mi Sueño.mp3" },
    { title: "Único", artist: "Joey Montana", url: "/assets/music/Joey Montana - Unico.mp3" },
    { title: "Para Siempre", artist: "Kany García", url: "/assets/music/Kany García - Para Siempre.mp3" },
    { title: "Llegaste Tú", artist: "Luis Fonsi", url: "/assets/music/Luis Fonsi - Llegaste Tú.mp3" },
    { title: "Ejemplo de Amor", artist: "Luister La Voz", url: "/assets/music/Luister La Voz - Ejemplo de Amor.mp3" },
    { title: "Nuestra Canción", artist: "Luister La Voz", url: "/assets/music/Luister La Voz - Nuestra Cancion.mp3" },
    { title: "Por Ti Seré", artist: "Luister La Voz", url: "/assets/music/Luister la voz- por-ti-seré-video-oficial.mp3" },
    { title: "Te Cuidaré", artist: "Luister La Voz", url: "/assets/music/luister-la-voz--Te cuidare.mp3" },
    { title: "Tu Amor Me Hace Bien", artist: "Marc Anthony", url: "/assets/music/Marc Anthony - Tu Amor Me Hace Bien (Audio).mp3" },
    { title: "Tu Vida en la Mía", artist: "Marc Anthony", url: "/assets/music/Marc Anthony - Tu Vida en la Mía (Official Video).mp3" },
    { title: "Como Tu No Hay Dos", artist: "Mc Car, Maikol el Insoportable", url: "/assets/music/Mc Car, Maikol el Insoportable - Como Tu No Hay Dos (Video Oficial).mp3" },
    { title: "Por Eso Te Amo", artist: "Río Roma", url: "/assets/music/Río Roma - Por Eso Te Amo.mp3" },
    { title: "Sabrás", artist: "Herencia de Timbiquí", url: "/assets/music/Sabrás, Herencia de Timbiquí.mp3" },
  ];

  // Función para obtener la canción del día
  function getSongOfTheDay() {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return allSongs[dayOfYear % allSongs.length];
  }

  const songOfTheDay = getSongOfTheDay();

  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      image: "/assets/img/55.jpg",
      title: "Nuestro primer diciembre juntos",
      description: "Inaugurando una hermosa tradición de amor y felicidad. ¡Que se repitan muchos más!",
      alt: "Foto de la pareja en su primer diciembre juntos"
    },
    {
      id: 2,
      image: "/assets/img/57.jpg",
      title: "Unidos por la emoción y el amor",
      description: "Compartiendo la pasión del deporte, pero lo más emocionante siempre es tenerte a mi lado. Cada instante contigo es una victoria en mi corazón.",
      alt: "Foto de la pareja viendo un partido en el estadio"
    },
    {
      id: 3,
      image: "/assets/img/59.jpg",
      title: "Nuestra paz juntos",
      description: "Encontrando la calma y la felicidad en la simple compañía del otro, junto al agua.",
      alt: "Foto de la pareja sentada frente al agua"
    },
    {
      id: 4,
      image: "/assets/img/63.jpg",
      title: "Sonrisas que enamoran",
      description: "Cada momento contigo es una aventura llena de risas y miradas cómplices.",
      alt: "Selfie de la pareja con expresiones divertidas"
    },
    {
      id: 5,
      image: "/assets/img/74.jpg",
      title: "Juntos en cada camino",
      description: "Explorando el mundo y construyendo nuestra historia, paso a paso, con la misma alegría que el primer día.",
      alt: "Foto de la pareja en una pasarela al aire libre"
    },
    {
      id: 6,
      image: "/assets/img/75.jpg",
      title: "La magia de tu mirada",
      description: "En cada día, en cada sonrisa, encuentro la razón para amarte más. Contigo, todo es extraordinario.",
      alt: "Selfie de la pareja al aire libre"
    },
    {
      id: 7,
      image: "/assets/img/09.jpg",
      title: "Nuestras sonrisas, nuestra historia",
      description: "Cada instante, por sencillo que parezca, se convierte en un tesoro cuando lo comparto contigo.",
      alt: "Selfie de la pareja sentada contra una pared"
    },
    {
      id: 8,
      image: "/assets/img/60.jpg",
      title: "Si las miradas hablaran",
      description: "Solo dire que la misma foto habla por si sola AJAJAJA.",
      alt: "Foto de la pareja en un puente sobre el agua"
    },
    {
      id: 9,
      image: "/assets/img/24.jpeg",
      title: "Nuestra dulce Navidad",
      description: "La magia de las fiestas se multiplica cuando la celebramos juntos. ¡Feliz de tenerte en mi vida!",
      alt: "Foto de la pareja celebrando la Navidad"
    },
  ];

  useEffect(() => {
    try {
    // Check if anniversary date exists in localStorage
    const storedDate = localStorage.getItem("anniversaryDate")
    if (!storedDate) {
      router.push("/")
      return
    }

    setAnniversaryDate(new Date(storedDate))

    // Get user name if stored
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
      }
    } catch (err) {
      setError("Error al cargar los datos. Por favor, intenta de nuevo.")
      console.error("Error loading data:", err)
    }
  }, [router])

  if (error) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          {error}
        </div>
      </div>
    )
  }

  if (!anniversaryDate) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <PageHeader title={`¡Bienvenida ${userName}!`} />

      <div className="mb-10 flex flex-col items-center">
        <div className="max-w-3xl w-full mb-8">
          <Card className="bg-gradient-to-r from-pink-50 to-pink-100 border-none shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-pink-600 text-center mb-6">Nuestro Tiempo Juntos</h2>
              <AnniversaryCounter anniversaryDate={anniversaryDate} />
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl w-full">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Así comenzó todo:</h2>
          <EnhancedCarousel items={carouselItems} autoPlayInterval={6000} />
        </div>
      </div>

      <div className="mt-12 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">Nuestro Rincón de Amor</h2>
        <p className="text-center mb-6">
          Este es nuestro espacio especial para guardar y revivir todos los momentos mágicos que hemos compartido
          juntos. Cada foto, cada mensaje y cada canción es un tesoro que nos recuerda lo especial que es nuestro amor.
        </p>
        <blockquote className="border-l-4 border-pink-400 pl-4 italic text-gray-600 my-4">
          "El amor no se mide por cuánto tiempo lo has esperado, sino por cuánto estás dispuesto a esperar por él."
        </blockquote>
      </div>

      <Card className="w-full max-w-xl mx-auto mt-8">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <div className="text-center">
            <div className="text-lg font-bold text-pink-700">Canción del día</div>
            <div className="text-xl font-semibold">{songOfTheDay.title}</div>
            <div className="text-md text-gray-600">{songOfTheDay.artist}</div>
          </div>
          <audio ref={audioRef} src={songOfTheDay.url} preload="metadata" controls className="w-full" />
          <Button onClick={() => {
            if (audioRef.current) {
              if (audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
              } else {
                audioRef.current.pause();
                setIsPlaying(false);
              }
            }
          }} className="bg-pink-600 hover:bg-pink-700 text-white w-32">
            {isPlaying ? <Pause className="inline mr-2" /> : <Play className="inline mr-2" />}
            {isPlaying ? "Pausar" : "Reproducir"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
