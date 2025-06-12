"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, BellOff, Settings } from "lucide-react"
import { type AnnualPlan } from "./annual-plans"

interface AnnualRemindersProps {
  plans: AnnualPlan[]
}

interface ReminderSettings {
  showCompleted: boolean
  sortBy: string
  filterCategory: string
}

export function AnnualReminders({ plans }: AnnualRemindersProps) {
  const [settings, setSettings] = useState<ReminderSettings>({
    showCompleted: true,
    sortBy: "date",
    filterCategory: "all"
  })

  const [upcomingReminders, setUpcomingReminders] = useState<Array<{
    plan: AnnualPlan
    daysLeft: number
  }>>([])

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("annualReminderSettings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        // Si hay error, ignora y usa el valor por defecto
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("annualReminderSettings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (!settings.showCompleted) {
      setUpcomingReminders([])
      return
    }

    const today = new Date()
    const reminders = plans
      .filter((plan) => !plan.completed)
      .map((plan) => {
        const targetDate = new Date(plan.targetDate)
        const diffTime = targetDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return { plan, daysLeft: diffDays }
      })
      .filter((reminder) => reminder.daysLeft <= 7 && reminder.daysLeft > 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)

    setUpcomingReminders(reminders)

    // Configurar notificaciones
    if (settings.showCompleted && "Notification" in window) {
      if (Notification.permission === "granted") {
        scheduleNotifications(reminders)
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            scheduleNotifications(reminders)
          }
        })
      }
    }
  }, [plans, settings])

  const scheduleNotifications = (reminders: Array<{ plan: AnnualPlan; daysLeft: number }>) => {
    reminders.forEach(({ plan, daysLeft }) => {
      const notificationTime = new Date()
      notificationTime.setDate(notificationTime.getDate() + daysLeft - 1)

      const timeUntilNotification = notificationTime.getTime() - Date.now()
      if (timeUntilNotification > 0) {
        setTimeout(() => {
          new Notification("Recordatorio de Plan Anual", {
            body: `¡Quedan ${daysLeft} días para completar "${plan.title}"!`,
            icon: "/favicon.svg",
          })
        }, timeUntilNotification)
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5 text-pink-500" />
          Recordatorios
        </h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="reminders-enabled" className="text-sm">
            {settings.showCompleted ? "Activados" : "Desactivados"}
          </Label>
          <Switch
            id="reminders-enabled"
            checked={settings.showCompleted}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, showCompleted: checked }))
            }
          />
        </div>
      </div>

      {settings.showCompleted && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="days-before">Días de anticipación</Label>
              <select
                id="days-before"
                value={7}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    daysBefore: Number(e.target.value),
                  }))
                }
                className="border rounded-md px-2 py-1"
              >
                <option value="1">1 día antes</option>
                <option value="3">3 días antes</option>
                <option value="7">7 días antes</option>
                <option value="14">14 días antes</option>
                <option value="30">30 días antes</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reminder-time">Hora del recordatorio</Label>
              <input
                id="reminder-time"
                type="time"
                value="09:00"
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, time: e.target.value }))
                }
                className="border rounded-md px-2 py-1"
              />
            </div>
          </div>
        </Card>
      )}

      {settings.showCompleted && upcomingReminders.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-600">Próximos recordatorios</h4>
          {upcomingReminders.map(({ plan, daysLeft }) => (
            <Card key={plan.id} className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{plan.title}</p>
                  <p className="text-sm text-gray-500">
                    {daysLeft} {daysLeft === 1 ? "día" : "días"} restantes
                  </p>
                </div>
                <Bell className="h-5 w-5 text-pink-500" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {settings.showCompleted && upcomingReminders.length === 0 && (
        <Card className="p-4 text-center">
          <BellOff className="h-8 w-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">
            No hay recordatorios programados para los próximos 7 días
          </p>
        </Card>
      )}
    </div>
  )
} 