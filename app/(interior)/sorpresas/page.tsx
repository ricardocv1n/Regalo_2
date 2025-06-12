"use client"

import { useState, useEffect } from "react"
import PageHeader from "@/components/page-header"
import { SurpriseCard } from "@/components/surprise-card"
import { SurpriseModal } from "@/components/surprise-modal"
import { Heart, Sparkles } from "lucide-react"

// Declaro la interfaz Surprise localmente
interface Surprise {
  id: number;
  title: string;
  description: string;
  type: string;
  icon: string;
  color: string;
  isUnlocked: boolean;
  unlockDate?: string;
  content: any;
}

export default function SorpresasPage() {
  const [surprises, setSurprises] = useState<Surprise[]>([
    {
      id: 1,
      title: "Mensaje Secreto",
      description: "Un mensaje especial lleno de amor y cariño",
      type: "message",
      icon: "💌",
      color: "pink",
      isUnlocked: true,
      unlockDate: "Disponible ahora",
      content: {
        title: "Para Mi Amor Eterno",
        message: `Mi querido amor,

Cada día que pasa a tu lado es un regalo que atesoro con todo mi corazón. Desde el momento en que nuestros ojos se encontraron por primera vez, supe que mi vida había cambiado para siempre.

Eres la melodía que alegra mis mañanas, la luz que ilumina mis días más oscuros y la paz que abraza mis noches. En tus brazos he encontrado mi hogar, en tu sonrisa mi felicidad, y en tu amor mi razón de ser.

Gracias por ser mi compañera, mi confidente, mi mejor amiga y el amor de mi vida. Cada momento contigo es una página hermosa en el libro de nuestra historia.

Te amo más de lo que las palabras pueden expresar, más de lo que el tiempo puede medir, y más de lo que mi corazón puede contener.`,
        author: "Tu amor eterno",
        date: "14 de febrero, 2024",
        image: "/placeholder.svg?height=300&width=400",
      },
    },
    {
      id: 2,
      title: "Video Recopilatorio",
      description: "Un video especial con nuestros mejores momentos",
      type: "video",
      icon: "🎬",
      color: "purple",
      isUnlocked: true,
      unlockDate: "Disponible ahora",
      content: {
        title: "Nuestros Momentos Mágicos",
        description: "Un recopilatorio de los momentos más especiales que hemos vivido juntos",
        videoUrl: "/assets/video/VID-20241217-WA0009.mp4", // Video de ejemplo
        thumbnail: "/placeholder.svg?height=400&width=600",
        duration: "3:45",
      },
  
    },
    {
      id: 3,
      title: "Nuestro Álbum de Recuerdos Románticos",
      description: "Una selección especial de las fotos que cuentan nuestra historia de amor.",
      type: "album",
      icon: "📸",
      color: "blue",
      isUnlocked: false,
      unlockDate: "16 de Febrero, 2024",
      content: {
        images: [
          "/assets/img/01.jpg",
          "/assets/img/02.jpg",
          "/assets/img/03.jpg",
          "/assets/img/04.jpg",
          "/assets/img/05.jpg",
          "/assets/img/06.jpg"
        ],
        message: "Cada una de estas fotos representa un capítulo de nuestra historia de amor. Gracias por regalarme tantos recuerdos hermosos. Te amo más de lo que las palabras pueden expresar."
      }
    },
    {
      id: 4,
      title: "Poema Personalizado",
      description: "Un poema romántico escrito especialmente para ti, para recordarte cuánto te amo.",
      type: "poem",
      icon: "📝",
      color: "pink",
      isUnlocked: false,
      unlockDate: "14 de febrero, 2025",
      content: {
        title: "Eres mi inspiración",
        poem: `En cada latido de mi corazón
te encuentro a ti, amor mío,
tu risa es mi melodía,
tu abrazo, mi mejor abrigo.

Tus ojos son mi refugio,
tu voz, mi paz y mi guía,
cada día a tu lado
es poesía que no termina.

Gracias por ser mi sueño,
mi alegría y mi razón,
por pintar de esperanza
cada rincón de mi canción.

Te amo más de lo que puedo decir,
y este poema es solo un intento
por recordarte, mi vida,
que eres mi mayor sentimiento.`,
        author: "Tu eterno enamorado",
        date: "14 de febrero, 2025",
        dedication: "Para la dueña de mi corazón"
      }
    },
    {
      id: 5,
      title: "Regalo Especial",
      description: "Una sorpresa material pensada especialmente para ti",
      type: "gift",
      icon: "🎁",
      color: "yellow",
      isUnlocked: false,
      unlockDate: "Próximamente",
      content: {
        title: "Cena Romántica Sorpresa",
        giftType: "experience",
        image: "/assets/img/06.jpg",
        description: "Una cena romántica en tu restaurante favorito, con velas, música suave y tu plato preferido. Todo preparado para una noche inolvidable.",
        value: "Una noche inolvidable",
        instructions: "Presenta este cupón en cualquier momento y yo me encargaré de organizar todo. Solo necesitas elegir la fecha perfecta.",
        button: "Reclamar Regalo",
        footer: "Hecho especialmente para ti"
      }
    },
    {
      id: 6,
      title: "Recuerdo Especial",
      description: "La historia de un momento que marcó nuestras vidas",
      type: "memory",
      icon: "💭",
      color: "red",
      isUnlocked: true,
      unlockDate: "Disponible ahora",
      content: {
        title: "Nuestro Primer Beso",
        description: "El momento que selló nuestro destino",
        date: "28 de marzo, 2020",
        location: "Parque Central, bajo las estrellas",
        images: [
          "/assets/img/12.jpg",
          "/assets/img/13.jpg"
        ],
        story: `Era una noche perfecta de primavera. Habíamos estado caminando por el parque después de nuestra tercera cita, hablando de todo y de nada, riendo como si nos conociéramos de toda la vida.\n\nDe repente, te detuviste cerca de la fuente iluminada y me miraste con esos ojos que me robaron el aliento desde el primer día. El tiempo se detuvo cuando nuestros labios se encontraron por primera vez.\n\nFue un beso suave, tierno, lleno de promesas no dichas y sueños compartidos. En ese momento supe que había encontrado a la persona con quien quería pasar el resto de mi vida.\n\nLas estrellas fueron testigos de nuestro primer beso, y desde entonces, cada vez que miro el cielo nocturno, recuerdo ese momento mágico que cambió nuestras vidas para siempre.`,
        significance: `Este momento marcó el inicio oficial de nuestro amor. Fue cuando pasamos de ser dos personas que se gustaban a ser una pareja que se amaba profundamente.`
      },
    },
    {
      id: 7,
      title: "Carta del Futuro",
      description: "Una carta romántica para leer juntos en nuestro aniversario 2026",
      type: "future-letter",
      icon: "📬",
      color: "teal",
      isUnlocked: false,
      unlockDate: "28 de marzo, 2026",
      content: {
        title: "Para Nosotros en Nuestro Aniversario 2026",
        date: "28 de marzo, 2026",
        message: `¡Feliz aniversario, amores del futuro!

Hoy celebramos otro año más de amor, aventuras y sueños compartidos. Espero que al leer esta carta estén abrazados, sonriendo y recordando todo lo que han vivido juntos.

Que cada día sigan eligiéndose, cuidándose y apoyándose como hasta ahora. Que nunca falten los besos, las risas y los planes para seguir creciendo juntos.

Gracias por construir este amor tan bonito. El futuro es maravilloso porque lo comparten de la mano.

Con todo mi amor, su yo del pasado ❤️` 
      }
    },
    {
      id: 8,
      title: "Juego de Preguntas",
      description: "Un mini-juego romántico para ver cuánto nos conocemos ❤️",
      type: "quiz",
      icon: "❓",
      color: "purple",
      isUnlocked: true,
      unlockDate: "Disponible ahora",
      content: {
        title: "¿Cuánto nos conocemos?",
        questions: [
          {
            question: "¿Recuerdas nuestra primera cita?",
            options: ["En el parque", "En el cine", "En un café", "En la playa"],
            answer: 2
          },
          {
            question: "¿Cuál es mi comida favorita?",
            options: ["Pizza", "Sushi", "Tacos", "Pasta"],
            answer: 0
          },
          {
            question: "¿Qué canción es 'nuestra canción'?",
            options: ["Perfect", "Thinking Out Loud", "All of Me", "Photograph"],
            answer: 1
          },
          {
            question: "¿En qué mes celebramos nuestro aniversario?",
            options: ["Enero", "Marzo", "Febrero", "Abril"],
            answer: 1
          },
          {
            question: "¿Cuál es mi color favorito?",
            options: ["Rojo", "Azul", "Rosa", "Verde"],
            answer: 2
          }
        ],
        romanticMessages: [
          "¡Eres mi cómplice perfecto! Sabes todo de nosotros ❤️",
          "¡Muy bien! Nos conocemos mucho, y eso me hace muy feliz 😘",
          "¡No importa el puntaje, lo importante es que nos amamos! 💖"
        ]
      }
    },
    {
      id: 9,
      title: "Sorpresa Digital",
      description: "Un cupón digital para un regalo especial (Netflix, cena, masaje, etc.)",
      type: "digital-gift",
      icon: "💳",
      color: "emerald",
      isUnlocked: true,
      unlockDate: "Disponible ahora",
      content: {
        title: "Cupón Digital: Noche de Pelis y Pizza",
        image: "/assets/images/image.png",
        code: "LOVE-NETFLIX-2024",
        instructions: "Presenta este cupón para disfrutar juntos de una noche de películas, pizza y abrazos ilimitados. ¡Válido cualquier día que quieras consentirte!",
        button: "Canjear Cupón"
      }
    },
  ])

  const [selectedSurprise, setSelectedSurprise] = useState<Surprise | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [accessModal, setAccessModal] = useState<{ open: boolean, idx: number | null }>({ open: false, idx: null });
  const [inputKey, setInputKey] = useState("");
  const [errorKey, setErrorKey] = useState("");
  const [unlockDates, setUnlockDates] = useState<{ [key: number]: string }>({});

  // Cargar sorpresas desbloqueadas del localStorage
  useEffect(() => {
    const saved = localStorage.getItem("unlocked-surprises")
    if (saved) {
      setSurprises((prev) =>
        prev.map((surprise) => ({
          ...surprise,
          isUnlocked: surprise.isUnlocked || JSON.parse(saved).includes(surprise.id),
        })),
      )
    }
  }, [])

  // Guardar sorpresas desbloqueadas en localStorage
  useEffect(() => {
    localStorage.setItem("unlocked-surprises", JSON.stringify(surprises.filter(s => s.isUnlocked).map(s => s.id)))
  }, [surprises])

  // Cargar fechas de desbloqueo del localStorage
  useEffect(() => {
    const saved = localStorage.getItem("surprise-unlock-dates");
    if (saved) setUnlockDates(JSON.parse(saved));
  }, []);

  // Guardar fechas de desbloqueo en localStorage
  useEffect(() => {
    localStorage.setItem("surprise-unlock-dates", JSON.stringify(unlockDates));
  }, [unlockDates]);

  // Determinar si una cajita está desbloqueada
  const isUnlocked = (idx: number) => {
    if (idx === 0) return true;
    const prevDate = unlockDates[idx - 1];
    if (!prevDate) return false;
    const prev = new Date(prevDate);
    const now = new Date();
    const diff = (now.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 15;
  };

  // Abrir modal de acceso para la siguiente cajita
  const handleTryUnlock = (idx: number) => {
    setAccessModal({ open: true, idx });
    setInputKey("");
    setErrorKey("");
  };

  // Validar clave y desbloquear
  const handleUnlock = () => {
    if (inputKey.trim() === "03/02/2023") {
      setUnlockDates((prev) => ({ ...prev, [accessModal.idx!]: new Date().toISOString() }));
      setAccessModal({ open: false, idx: null });
    } else {
      setErrorKey("Clave incorrecta. Intenta de nuevo.");
    }
  };

  const handleOpenSurprise = (surprise: Surprise) => {
    setSelectedSurprise(surprise)
    setShowModal(true)
  }

  const handleUnlockSurprise = (surprise: Surprise) => {
    // Simular proceso de desbloqueo
    setSurprises((prev) =>
      prev.map((s) =>
        s.id === surprise.id ? { ...s, isUnlocked: true } : s
      )
    )

    // Mostrar la sorpresa después de desbloquear
    setTimeout(() => {
      setSelectedSurprise({ ...surprise, isUnlocked: true })
      setShowModal(true)
    }, 500)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedSurprise(null)
  }

  // Cálculo automático de stats
  const unlockedCount = Object.keys(unlockDates).length > 0 ? Object.keys(unlockDates).length : 1;
  const totalCount = surprises.length;
  const lockedCount = totalCount - unlockedCount;
  const percent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PageHeader
        title="Nuestras Sorpresas"
        description="Pequeños gestos de amor que te harán sonreír y recordar lo especial que eres para mí"
      />

      {/* Stats */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg border border-pink-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">{unlockedCount}</div>
              <div className="text-sm text-gray-600">Desbloqueadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{lockedCount}</div>
              <div className="text-sm text-gray-600">Por descubrir</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{totalCount}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-pink-600">
            <Heart className="w-5 h-5" fill="currentColor" />
            <span className="font-medium">{percent}% completado</span>
          </div>
        </div>
      </div>

      {/* Surprises grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {surprises.map((surprise, idx) => {
          const unlocked = isUnlocked(idx);
          return (
            <div key={surprise.id} className={unlocked ? "" : "filter blur-sm grayscale relative pointer-events-none"}>
              <SurpriseCard
                title={surprise.title}
                description={surprise.description}
                date={surprise.unlockDate || ""}
                location={surprise.content?.location || ""}
                time={surprise.content?.time || ""}
                onAccept={() => {
                  if (unlocked) {
                    setSelectedSurprise(surprise);
                    setShowModal(true);
                    setUnlockDates((prev) => ({ ...prev, [idx]: new Date().toISOString() }));
                  } else {
                    handleTryUnlock(idx);
                  }
                }}
                onDecline={() => {}}
              />
              {!unlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="bg-white/80 text-gray-500 px-4 py-2 rounded-xl shadow mb-2">Bloqueada</span>
                  {idx > 0 && unlockDates[idx - 1] && (() => {
                    const prev = new Date(unlockDates[idx - 1]);
                    const now = new Date();
                    const diff = Math.ceil(15 - (now.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
                    return diff > 0 ? (
                      <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium shadow animate-pulse">
                        Disponible en {diff} día{diff === 1 ? "" : "s"}
                      </span>
                    ) : null;
                  })()}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info section */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-pink-100">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">El Poder de las Pequeñas Sorpresas</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Cada sorpresa en esta sección ha sido creada con amor y cuidado especial para ti. Algunas están disponibles
            inmediatamente, mientras que otras se desbloquearán en fechas especiales o momentos significativos de
            nuestra relación. Cada una representa un pequeño gesto de amor que quiero compartir contigo, porque los
            detalles más pequeños a menudo crean los recuerdos más grandes.
          </p>
        </div>
      </div>

      {/* Modal de clave de acceso */}
      {accessModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-xs w-full text-center">
            <h3 className="text-lg font-bold mb-4">Ingresa la clave de acceso</h3>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full text-center mb-2"
              placeholder="Fecha de aniversario (dd/mm/aaaa)"
              value={inputKey}
              onChange={e => setInputKey(e.target.value)}
            />
            {errorKey && <div className="text-red-500 text-sm mb-2">{errorKey}</div>}
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded w-full mt-2"
              onClick={handleUnlock}
            >
              Desbloquear
            </button>
            <button
              className="text-gray-500 text-xs mt-3 underline"
              onClick={() => setAccessModal({ open: false, idx: null })}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Surprise modal */}
      {showModal && selectedSurprise && (
        <SurpriseModal isOpen={showModal} onClose={closeModal} surprise={selectedSurprise} />
      )}
    </div>
  )
}