"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, Star, Share2, MessageCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import confetti from "canvas-confetti"
import useSound from "use-sound"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { SurpriseVideo } from "./surprise-video"
import SurpriseAlbum from "./surprise-album"
import { Confetti } from "./confetti"
import SurpriseGift from "./surprise-gift"
import SurpriseMemory from "./surprise-memory"

interface SurpriseModalProps {
  isOpen: boolean
  onClose: () => void
  surprise: {
    id: number
    title: string
    description: string
    type: string
    color: string
    content: any
  }
  onConfirm?: () => void
}

export function SurpriseModal({ isOpen, onClose, surprise, onConfirm }: SurpriseModalProps) {
  const renderContent = () => {
    switch (surprise.type) {
      case "video":
        // Estado para la duración real del video
        const [realDuration, setRealDuration] = useState<string>("");
        const videoRef = useRef<HTMLVideoElement>(null);
        // Función para formatear segundos a mm:ss
        function formatDuration(seconds: number) {
          const m = Math.floor(seconds / 60);
          const s = Math.floor(seconds % 60);
          return `${m}:${s.toString().padStart(2, "0")}`;
        }
        return (
          <div className="flex flex-col items-center w-full">
            {/* Mensaje superior */}
            <div className="text-center mt-4 mb-2">
              <div className="text-lg font-medium text-gray-700">{surprise.content.message}</div>
              <div className="text-sm text-gray-500 mt-1">
                Duración: {realDuration || surprise.content.duration || "-"}
              </div>
            </div>
            {/* Video */}
            <video
              ref={videoRef}
              src={surprise.content.videoUrl}
              poster={surprise.content.thumbnail}
              controls
              className="w-full max-w-2xl aspect-video rounded-xl bg-gray-200 mb-4"
              onLoadedMetadata={e => {
                const dur = e.currentTarget.duration;
                setRealDuration(formatDuration(dur));
              }}
            >
              Tu navegador no soporta el elemento de video.
            </video>
            {/* Mensaje romántico */}
            {surprise.content.romanticNote && (
              <div className="text-center text-gray-700 mb-4">
                {surprise.content.romanticNote}
              </div>
            )}
            {/* Pie de modal */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full border-t pt-4 mt-2 gap-2">
              <div className="flex items-center gap-2 text-pink-600 text-base">
                <Heart className="w-5 h-5" />
                <span>{surprise.content.footer || "Con todo mi amor"}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: surprise.title,
                        text: surprise.content.message,
                        url: window.location.href
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                      alert("¡Enlace copiado para compartir!")
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-1" /> Compartir
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = surprise.content.videoUrl;
                    a.download = surprise.content.videoUrl.split('/').pop() || 'video.mp4';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                >
                  <Download className="w-4 h-4 mr-1" /> Guardar
                </Button>
              </div>
            </div>
          </div>
        )
      case "album": {
        const images: string[] = surprise.content.images || [];
        const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
        return (
          <div className="flex flex-col items-center w-full">
            {/* Título y subtítulo */}
            <div className="text-center mt-4 mb-6">
              <div className="text-2xl font-bold text-gray-800 mb-1">Nuestros Recuerdos en Imágenes</div>
              <div className="text-gray-600">Una selección especial de las fotos que cuentan nuestra historia de amor</div>
            </div>
            {/* Grid de imágenes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6 w-full max-w-3xl">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-gray-100 rounded-xl shadow-md overflow-hidden cursor-pointer flex items-center justify-center hover:ring-4 hover:ring-pink-200 transition"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <img
                    src={img}
                    alt={`Recuerdo ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            {/* Lightbox simple */}
            {lightboxIndex !== null && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setLightboxIndex(null)}>
                <img
                  src={images[lightboxIndex]}
                  alt={`Recuerdo ampliado ${lightboxIndex + 1}`}
                  className="max-w-3xl max-h-[80vh] rounded-xl shadow-2xl border-4 border-white"
                  onClick={e => e.stopPropagation()}
                />
              </div>
            )}
            {/* Pie de modal */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full border-t pt-4 mt-2 gap-2">
              <div className="flex items-center gap-2 text-pink-600 text-base">
                <Heart className="w-5 h-5" />
                <span>{surprise.content.footer || "Con todo mi amor"}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: surprise.title,
                        text: "Mira nuestro álbum de recuerdos románticos!",
                        url: window.location.href
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                      alert("¡Enlace copiado para compartir!")
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-1" /> Compartir
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    images.forEach((img, i) => {
                      const a = document.createElement('a');
                      a.href = img;
                      a.download = `recuerdo_${i + 1}.jpg`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    });
                  }}
                >
                  <Download className="w-4 h-4 mr-1" /> Guardar
                </Button>
              </div>
            </div>
          </div>
        )
      }
      case "message":
        return (
          <div className="text-center">
            <p className="text-lg text-gray-700">{surprise.content.message}</p>
            <p className="text-sm text-gray-500 mt-2">
              {surprise.content.date} - {surprise.content.time}
            </p>
          </div>
        )
      case "poem": {
        const { title, poem, author, date, dedication } = surprise.content;
        return (
          <div className="flex flex-col items-center w-full">
            <div className="bg-pink-50 rounded-2xl shadow-md p-8 max-w-2xl w-full text-center relative">
              <span className="absolute left-6 top-6 text-pink-300 text-3xl animate-pulse select-none">💖</span>
              <span className="absolute right-10 top-10 text-pink-200 text-2xl animate-pulse select-none">💕</span>
              <h2 className="text-2xl font-bold text-pink-700 mb-2 flex items-center justify-center gap-2">
                <span> {title} </span> <span className="text-pink-400">❤️</span>
              </h2>
              <div className="italic text-lg text-gray-700 whitespace-pre-line leading-relaxed mb-4">
                {poem}
              </div>
              <div className="text-pink-600 font-semibold mb-1">{dedication}</div>
              <div className="text-gray-500 text-sm mb-2">{author} &middot; {date}</div>
              <span className="absolute left-10 bottom-10 text-pink-200 text-2xl animate-pulse select-none">💞</span>
              <span className="absolute right-6 bottom-6 text-pink-300 text-3xl animate-pulse select-none">💗</span>
            </div>
          </div>
        )
      }
      case "gift":
        return <SurpriseGift content={surprise.content} />
      case "memory":
        return <SurpriseMemory content={surprise.content} />
      case "future-letter":
        return (
          <div className="flex flex-col items-center w-full">
            <div className="relative flex flex-col items-center w-full max-w-xl mx-auto">
              {/* Animación de sobre */}
              <div className="w-28 h-20 mb-4 relative animate-bounce">
                <span className="absolute inset-0 bg-gradient-to-br from-teal-100 to-teal-300 rounded-b-2xl shadow-lg border border-teal-200" />
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-24 h-8 bg-white rounded-t-2xl border-t-4 border-teal-300" />
                <span className="absolute left-1/2 top-0 -translate-x-1/2 w-20 h-4 bg-teal-200 rounded-b-full opacity-60" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">📬</span>
              </div>
              <h3 className="text-2xl font-bold text-teal-800 mb-2 text-center">{surprise.content.title}</h3>
              <p className="text-sm text-teal-600 mb-4">{surprise.content.date}</p>
              <div className="bg-white/80 rounded-xl p-6 shadow-md border border-teal-100 text-center">
                <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed font-serif">{surprise.content.message}</p>
              </div>
            </div>
          </div>
        )
      case "quiz": {
        // Mini-juego de preguntas románticas
        const [step, setStep] = useState(0);
        const [score, setScore] = useState(0);
        const [finished, setFinished] = useState(false);
        const { questions, romanticMessages, title } = surprise.content;
        const [showConfetti, setShowConfetti] = useState(false);
        const handleOption = (idx: number) => {
          if (idx === questions[step].answer) setScore(score + 1);
          if (step + 1 < questions.length) setStep(step + 1);
          else {
            setFinished(true);
            if (score + (idx === questions[step].answer ? 1 : 0) === questions.length) {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 3000);
            }
          }
        };
        let finalMsg = romanticMessages[2];
        if (score === questions.length) finalMsg = romanticMessages[0];
        else if (score >= Math.ceil(questions.length * 0.7)) finalMsg = romanticMessages[1];
        return (
          <div className="flex flex-col items-center w-full max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-purple-800 mb-4 text-center">{title}</h3>
            {showConfetti && <Confetti />}
            <AnimatePresence mode="wait">
              {!finished ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="w-full bg-white/80 rounded-xl p-6 shadow-md border border-purple-100 text-center">
                    <p className="text-lg font-medium text-gray-700 mb-6">{questions[step].question}</p>
                    <div className="grid grid-cols-1 gap-3">
                      {questions[step].options.map((opt: string, idx: number) => (
                        <motion.button
                          key={idx}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-2 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-200 text-purple-800 font-semibold transition"
                          onClick={() => handleOption(idx)}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-500">Pregunta {step + 1} de {questions.length}</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="final"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="w-full"
                >
                  <div className="w-full bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-md border border-purple-100 text-center">
                    <div className="text-4xl mb-4 animate-bounce">💖</div>
                    <div className="text-2xl font-bold text-purple-700 mb-2">¡Juego terminado!</div>
                    <div className="text-lg text-gray-700 mb-4">Puntaje: {score} de {questions.length}</div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 180, damping: 10, delay: 0.2 }}
                      className="text-pink-600 text-lg font-medium mb-2"
                    >
                      {finalMsg}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      }
      case "digital-gift": {
        const [claimed, setClaimed] = useState(false);
        const [showConfetti, setShowConfetti] = useState(false);
        const [copied, setCopied] = useState(false);
        const { title, image, code, instructions, button } = surprise.content;
        const handleClaim = () => {
          setClaimed(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2500);
        };
        const handleCopy = () => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        };
        return (
          <div className="flex flex-col items-center w-full max-w-md mx-auto">
            {showConfetti && <Confetti />}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 shadow-lg border border-emerald-200 w-full">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">💳</div>
                <h3 className="text-2xl font-bold text-emerald-800 mb-1">{title}</h3>
              </div>
              {image && (
                <div className="mb-4 text-center">
                  <img src={image} alt="Cupón" className="rounded-lg shadow-md mx-auto max-h-40 object-cover" />
                </div>
              )}
              <div className="text-center mb-4 flex flex-col items-center gap-2">
                <div className="inline-block bg-emerald-200 text-emerald-800 px-4 py-2 rounded-lg font-mono text-lg tracking-widest shadow select-all cursor-pointer" onClick={handleCopy}>
                  {code}
                </div>
                <button
                  className="text-xs text-emerald-600 hover:underline focus:outline-none"
                  onClick={handleCopy}
                  style={{marginTop: '-6px'}}>
                  {copied ? "¡Copiado!" : "Copiar código"}
                </button>
              </div>
              {!claimed ? (
                <div className="text-center">
                  <button
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                    onClick={handleClaim}
                  >
                    {button || "Canjear Cupón"}
                  </button>
                </div>
              ) : (
                <div className="bg-white/80 rounded-lg p-4 mt-4 text-center border border-emerald-100 animate-pulse">
                  <div className="text-emerald-700 font-medium mb-2">{instructions}</div>
                  <div className="text-2xl">🎬🍕❤️</div>
                </div>
              )}
            </div>
          </div>
        );
      }
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full p-4 sm:p-6 md:p-8">
        <DialogTitle asChild>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            {surprise.title}
          </h2>
        </DialogTitle>
        <div className="relative">
          <Confetti />
          <div className="text-center mb-6">
            <p className="text-gray-600">{surprise.description}</p>
          </div>
          <div className="mt-4">{renderContent()}</div>
          {onConfirm && (
            <div className="mt-8 flex justify-center">
              <Button className="bg-pink-500 text-white rounded-full px-8 py-2 text-lg" onClick={onConfirm}>
                Confirmar y desbloquear la siguiente
          </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
