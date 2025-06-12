"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { type AnnualPlan } from "./annual-plans"

interface AnnualPlanFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (plan: AnnualPlan) => void
  editingPlan: AnnualPlan | null
}

export function AnnualPlanForm({
  isOpen,
  onClose,
  onSave,
  editingPlan,
}: AnnualPlanFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [targetDate, setTargetDate] = useState<Date | undefined>(new Date())
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState<"alta" | "media" | "baja">("media")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (editingPlan) {
      setTitle(editingPlan.title)
      setDescription(editingPlan.description)
      setTargetDate(new Date(editingPlan.targetDate))
      setCategory(editingPlan.category)
      setPriority(editingPlan.priority)
      setProgress(editingPlan.progress)
    } else {
      setTitle("")
      setDescription("")
      setTargetDate(new Date())
      setCategory("")
      setPriority("media")
      setProgress(0)
    }
  }, [editingPlan])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!targetDate) return

    const plan: AnnualPlan = {
      id: editingPlan?.id ?? Date.now(),
      title,
      description,
      targetDate: targetDate.toISOString(),
      completed: editingPlan?.completed ?? false,
      category,
      priority,
      progress,
    }

    onSave(plan)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingPlan ? "Editar Plan Anual" : "Nuevo Plan Anual"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ingresa el título del plan"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu plan"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Fecha objetivo</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {targetDate ? (
                    format(targetDate, "PPP", { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={targetDate}
                  onSelect={setTargetDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="pareja">Pareja</SelectItem>
                <SelectItem value="viaje">Viaje</SelectItem>
                <SelectItem value="meta">Meta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Prioridad</Label>
            <Select value={priority} onValueChange={(value: "alta" | "media" | "baja") => setPriority(value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress">Progreso inicial</Label>
            <Input
              id="progress"
              type="number"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
              {editingPlan ? "Guardar cambios" : "Crear plan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 