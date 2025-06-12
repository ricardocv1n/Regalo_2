"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit2, Trash2, CheckCircle2, Target } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export interface AnnualPlan {
  id: number
  title: string
  description: string
  targetDate: string
  completed: boolean
  category: string
  priority: "alta" | "media" | "baja"
  progress: number
}

interface AnnualPlansProps {
  plans: AnnualPlan[]
  onEdit: (plan: AnnualPlan) => void
  onDelete: (planId: number) => void
  onToggleComplete: (planId: number) => void
  onUpdateProgress: (planId: number, progress: number) => void
}

export function AnnualPlans({
  plans,
  onEdit,
  onDelete,
  onToggleComplete,
  onUpdateProgress,
}: AnnualPlansProps) {
  const [daysLeft, setDaysLeft] = useState(0)

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date()
      const endOfYear = new Date(today.getFullYear(), 11, 31)
      const diffTime = endOfYear.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysLeft(diffDays)
    }

    calculateDaysLeft()
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60) // Update every hour
    return () => clearInterval(interval)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "personal":
        return "bg-blue-100 text-blue-800"
      case "pareja":
        return "bg-pink-100 text-pink-800"
      case "viaje":
        return "bg-green-100 text-green-800"
      case "meta":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "baja":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {/* Countdown Card */}
      <Card className="p-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Días restantes del año</h3>
            <p className="text-3xl font-bold text-pink-600">{daysLeft}</p>
          </div>
          <Target className="h-12 w-12 text-pink-500" />
        </div>
      </Card>

      {/* Plans List */}
      <AnimatePresence>
        {plans.length > 0 ? (
          plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{plan.title}</h3>
                      <Badge className={getCategoryColor(plan.category)}>
                        {plan.category}
                      </Badge>
                      <Badge className={getPriorityColor(plan.priority)}>
                        {plan.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{plan.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(new Date(plan.targetDate), "d 'de' MMMM", { locale: es })}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-medium">{plan.progress}%</span>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleComplete(plan.id)}
                      className={plan.completed ? "text-green-600" : "text-gray-400"}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(plan)}
                      className="text-blue-600"
                    >
                      <Edit2 className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(plan.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Target className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-gray-600 mb-1">No hay planes anuales</h3>
            <p className="text-sm text-gray-500">
              Comienza creando tus metas para este año
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
} 