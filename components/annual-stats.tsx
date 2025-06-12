"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Clock, TrendingUp } from "lucide-react"
import { type AnnualPlan } from "./annual-plans"

interface AnnualStatsProps {
  plans: AnnualPlan[]
}

export function AnnualStats({ plans }: AnnualStatsProps) {
  const totalPlans = plans.length
  const completedPlans = plans.filter((plan) => plan.completed).length
  const inProgressPlans = plans.filter((plan) => !plan.completed && plan.progress > 0).length
  const notStartedPlans = plans.filter((plan) => !plan.completed && plan.progress === 0).length

  const averageProgress = plans.length > 0
    ? Math.round(plans.reduce((acc, plan) => acc + plan.progress, 0) / plans.length)
    : 0

  const highPriorityPlans = plans.filter((plan) => plan.priority === "alta")
  const highPriorityProgress = highPriorityPlans.length > 0
    ? Math.round(highPriorityPlans.reduce((acc, plan) => acc + plan.progress, 0) / highPriorityPlans.length)
    : 0

  const stats = [
    {
      title: "Planes Completados",
      value: completedPlans,
      total: totalPlans,
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      title: "En Progreso",
      value: inProgressPlans,
      total: totalPlans,
      icon: Clock,
      color: "text-blue-500",
    },
    {
      title: "Sin Iniciar",
      value: notStartedPlans,
      total: totalPlans,
      icon: Target,
      color: "text-gray-500",
    },
    {
      title: "Progreso General",
      value: averageProgress,
      total: 100,
      icon: TrendingUp,
      color: "text-green-500",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Estadísticas de Cumplimiento</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="font-medium">{stat.title}</span>
              </div>
              <span className="text-lg font-semibold">
                {stat.value}
                {stat.total !== 100 && `/${stat.total}`}
                {stat.total === 100 && "%"}
              </span>
            </div>
            <Progress
              value={(stat.value / stat.total) * 100}
              className="h-2"
            />
          </Card>
        ))}
      </div>

      {highPriorityPlans.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-red-50 to-pink-50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              <span className="font-medium">Progreso de Planes Prioritarios</span>
            </div>
            <span className="text-lg font-semibold">{highPriorityProgress}%</span>
          </div>
          <Progress
            value={highPriorityProgress}
            className="h-2 bg-red-100"
          />
          <p className="text-sm text-gray-600 mt-2">
            {highPriorityPlans.length} {highPriorityPlans.length === 1 ? "plan" : "planes"} de alta prioridad
          </p>
        </Card>
      )}
    </div>
  )
} 