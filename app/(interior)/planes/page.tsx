"use client"

import { useState, useEffect } from "react"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Plus, Search, X, CalendarIcon, ListFilter, Target, Heart, ImageIcon, Calendar, Gift, MessageSquare } from "lucide-react"
import PlanCard, { type Plan } from "@/components/plan-card"
import PlanForm from "@/components/plan-form"
import PlanCalendar from "@/components/plan-calendar"
import Achievements from "@/components/achievements"
import ConfirmDelete from "@/components/confirm-delete"
import { AnnualPlans } from "@/components/annual-plans"
import { AnnualPlanForm } from "@/components/annual-plan-form"
import { type AnnualPlan } from "@/components/annual-plans"
import { AnnualStats } from "@/components/annual-stats"
import { AnnualReminders } from "@/components/annual-reminders"

export default function PlanesPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [annualPlans, setAnnualPlans] = useState<AnnualPlan[]>([])
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([])
  const [activeTab, setActiveTab] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPlanForm, setShowPlanForm] = useState(false)
  const [showAnnualPlanForm, setShowAnnualPlanForm] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [editingAnnualPlan, setEditingAnnualPlan] = useState<AnnualPlan | null>(null)
  const [planToDelete, setPlanToDelete] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  // Load plans from localStorage
  useEffect(() => {
    const savedPlans = localStorage.getItem("plans")
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans))
    }

    const savedAnnualPlans = localStorage.getItem("annualPlans")
    if (savedAnnualPlans) {
      setAnnualPlans(JSON.parse(savedAnnualPlans))
    }
  }, [])

  // Save plans to localStorage
  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans))
  }, [plans])

  useEffect(() => {
    localStorage.setItem("annualPlans", JSON.stringify(annualPlans))
  }, [annualPlans])

  // Filter plans based on search query and active tab
  useEffect(() => {
    let filtered = plans

    if (searchQuery) {
      filtered = filtered.filter(
        (plan) =>
          plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plan.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (activeTab === "pendientes") {
      filtered = filtered.filter((plan) => !plan.completed)
    } else if (activeTab === "completados") {
      filtered = filtered.filter((plan) => plan.completed)
    }

    setFilteredPlans(filtered)
  }, [plans, searchQuery, activeTab])

  const clearSearch = () => {
    setSearchQuery("")
  }

  const handleAddPlan = (newPlan: Omit<Plan, "id" | "order" | "completed">) => {
    setPlans([...plans, { ...newPlan, id: Date.now(), order: plans.length, completed: false }])
    setShowPlanForm(false)
  }

  const handleUpdatePlan = (updatedPlan: Omit<Plan, "id" | "order" | "completed">) => {
    setPlans(plans.map((plan) => 
      plan.id === editingPlan?.id 
        ? { ...plan, ...updatedPlan }
        : plan
    ))
    setShowPlanForm(false)
    setEditingPlan(null)
  }

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan)
    setShowPlanForm(true)
  }

  const handleDeletePlan = (planId: number) => {
    setPlanToDelete(planId)
  }

  const confirmDeletePlan = () => {
    if (planToDelete !== null) {
    setPlans(plans.filter((plan) => plan.id !== planToDelete))
    setPlanToDelete(null)
  }
  }

  const handleToggleComplete = (planId: number) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId ? { ...plan, completed: !plan.completed } : plan
      )
    )
  }

  const handleAddAnnualPlan = (newPlan: AnnualPlan) => {
    setAnnualPlans([...annualPlans, { ...newPlan, id: Date.now() }])
    setShowAnnualPlanForm(false)
  }

  const handleUpdateAnnualPlan = (updatedPlan: AnnualPlan) => {
    setAnnualPlans(annualPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan)))
    setShowAnnualPlanForm(false)
    setEditingAnnualPlan(null)
  }

  const handleEditAnnualPlan = (plan: AnnualPlan) => {
    setEditingAnnualPlan(plan)
    setShowAnnualPlanForm(true)
  }

  const handleDeleteAnnualPlan = (planId: number) => {
    setAnnualPlans(annualPlans.filter((plan) => plan.id !== planId))
  }

  const handleToggleAnnualPlanComplete = (planId: number) => {
    setAnnualPlans(
      annualPlans.map((plan) =>
        plan.id === planId ? { ...plan, completed: !plan.completed } : plan
      )
    )
  }

  const handleUpdateAnnualPlanProgress = (planId: number, progress: number) => {
    setAnnualPlans(
      annualPlans.map((plan) =>
        plan.id === planId ? { ...plan, progress } : plan
      )
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Nuestros Planes"
        description="Organiza y gestiona todos nuestros planes y momentos especiales juntos."
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
            label: "Mensajes",
            href: "/mensajes",
            icon: <MessageSquare className="h-4 w-4" />
          },
          {
            label: "Sorpresas",
            href: "/sorpresas",
            icon: <Gift className="h-4 w-4" />
          }
        ]}
      />

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full md:w-auto flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar planes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className={viewMode === "list" ? "rounded-none" : "rounded-none bg-transparent"}
              onClick={() => setViewMode("list")}
            >
              <ListFilter className="h-4 w-4 mr-2" />
              Lista
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              className={viewMode === "calendar" ? "rounded-none" : "rounded-none bg-transparent"}
              onClick={() => setViewMode("calendar")}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendario
            </Button>
          </div>

          <Button onClick={() => setShowPlanForm(true)} className="bg-pink-600 hover:bg-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2">
          {viewMode === "list" ? (
            <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
                <TabsTrigger value="completados">Completados</TabsTrigger>
              </TabsList>

              <TabsContent value="todos" className="space-y-4">
                {filteredPlans.length > 0 ? (
                  filteredPlans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      onToggleComplete={handleToggleComplete}
                      onEdit={handleEditPlan}
                      onDelete={handleDeletePlan}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-600 mb-1">No hay planes</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {searchQuery
                        ? "No se encontraron planes que coincidan con tu búsqueda"
                        : "Comienza creando tu primer plan juntos"}
                    </p>
                    {!searchQuery && (
                      <Button onClick={() => setShowPlanForm(true)} className="bg-pink-600 hover:bg-pink-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Crear Primer Plan
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pendientes" className="space-y-4">
                {filteredPlans.length > 0 ? (
                  filteredPlans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      onToggleComplete={handleToggleComplete}
                      onEdit={handleEditPlan}
                      onDelete={handleDeletePlan}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-600 mb-1">No hay planes pendientes</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {searchQuery
                        ? "No se encontraron planes pendientes que coincidan con tu búsqueda"
                        : "¡Excelente! No tienes planes pendientes"}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completados" className="space-y-4">
                {filteredPlans.length > 0 ? (
                  filteredPlans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      onToggleComplete={handleToggleComplete}
                      onEdit={handleEditPlan}
                      onDelete={handleDeletePlan}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-600 mb-1">No hay planes completados</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {searchQuery
                        ? "No se encontraron planes completados que coincidan con tu búsqueda"
                        : "Aún no has completado ningún plan"}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <PlanCalendar plans={plans} onSelectPlan={handleEditPlan} />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Annual Plans Section */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-pink-500" />
                Planes Anuales
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAnnualPlanForm(true)}
                className="text-pink-600 hover:text-pink-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <AnnualPlans
              plans={annualPlans}
              onEdit={handleEditAnnualPlan}
              onDelete={handleDeleteAnnualPlan}
              onToggleComplete={handleToggleAnnualPlanComplete}
              onUpdateProgress={handleUpdateAnnualPlanProgress}
            />
          </div>

          {/* Annual Stats Section */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <AnnualStats plans={annualPlans} />
          </div>

          {/* Annual Reminders Section */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <AnnualReminders plans={annualPlans} />
          </div>

          {/* Achievements Section */}
          <Achievements plans={plans} />
        </div>
      </div>

      {/* Plan form modal */}
      <PlanForm
        isOpen={showPlanForm}
        onClose={() => {
          setShowPlanForm(false)
          setEditingPlan(null)
        }}
        onSave={editingPlan ? handleUpdatePlan : handleAddPlan}
        editingPlan={editingPlan}
      />

      {/* Annual plan form modal */}
      <AnnualPlanForm
        isOpen={showAnnualPlanForm}
        onClose={() => {
          setShowAnnualPlanForm(false)
          setEditingAnnualPlan(null)
        }}
        onSave={editingAnnualPlan ? handleUpdateAnnualPlan : handleAddAnnualPlan}
        editingPlan={editingAnnualPlan}
      />

      {/* Confirm delete modal */}
      <ConfirmDelete
        isOpen={planToDelete !== null}
        onClose={() => setPlanToDelete(null)}
        onConfirm={confirmDeletePlan}
      />
    </div>
  )
}
