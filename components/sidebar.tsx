"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Heart, MessageSquareText, ImageIcon, Music, Gift, Calendar, Users, LogOut, Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Cargar estado del sidebar del localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState) {
      setIsCollapsed(JSON.parse(savedState))
    }
  }, [])

  // Guardar estado del sidebar en localStorage
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed))
  }, [isCollapsed])

  const menuItems = [
    { name: "Inicio", href: "/inicio", icon: Home },
    { name: "Nuestros Recuerdos", href: "/recuerdos", icon: Heart },
    { name: "Mensajes Especiales", href: "/mensajes", icon: MessageSquareText },
    { name: "Nuestras Fotos", href: "/fotos", icon: ImageIcon },
    { name: "Nuestras Canciones", href: "/musicas", icon: Music },
    { name: "Sorpresas", href: "/sorpresas", icon: Gift },
    { name: "Nuestros Planes", href: "/planes", icon: Calendar },
  ]

  const handleLogout = () => {
    // Clear localStorage data
    localStorage.removeItem("anniversaryDate")
    localStorage.removeItem("userName")

    // Redirect to login page
    router.push("/")
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative z-40 bg-pink-600 text-white flex flex-col min-h-screen transition-all duration-300",
          isCollapsed ? "w-[80px]" : "w-[200px]",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
      <div className="p-4 flex items-center gap-2 border-b border-pink-500">
          <Users className="h-6 w-6 shrink-0" />
          {!isCollapsed && <h1 className="text-xl font-bold">Mi Amor</h1>}
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      isActive ? "bg-white text-pink-600" : "hover:bg-pink-500",
                      isCollapsed && "justify-center"
                    )}
                >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            )
          })}

            {/* Logout button */}
          <li className="mt-auto">
            <button
              onClick={handleLogout}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-pink-500",
                  isCollapsed && "justify-center"
                )}
            >
                <LogOut className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>Cerrar Sesión</span>}
            </button>
          </li>
        </ul>
      </nav>

        {/* Collapse button - only visible on desktop */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute -right-4 top-4 bg-pink-600 hover:bg-pink-500 text-white rounded-full h-8 w-8"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </Button>
    </aside>
    </>
  )
}
