"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Wallet, 
  Image, 
  FileText, 
  Settings,
  LogOut,
  User,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", description: "Vista general" },
  { href: "/dashboard/campaigns", icon: BarChart3, label: "Campañas", description: "Meta Ads" },
  { href: "/dashboard/audiences", icon: Users, label: "Audiencias", description: "Segmentos" },
  { href: "/dashboard/budgets", icon: Wallet, label: "Presupuestos", description: "Spending" },
  { href: "/dashboard/creatives", icon: Image, label: "Creativos", description: "Biblioteca" },
  { href: "/dashboard/reports", icon: FileText, label: "Reportes", description: "Análisis" },
  { href: "/dashboard/settings", icon: Settings, label: "Configuración", description: "Ajustes" },
]

interface SidebarProps {
  userName?: string
  userEmail?: string
  userAvatar?: string
}

export function Sidebar({ userName = "Usuario", userEmail = "", userAvatar }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 glass-card rounded-xl text-white hover:bg-white/10 transition"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 min-h-screen z-40
          w-72 glass-sidebar flex flex-col
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-metrix-purple to-metrix-pink">
              <span className="text-white font-display font-bold text-lg">M</span>
            </div>
            <div>
              <span className="text-white font-display font-bold text-sm block leading-none">Metrix</span>
              <span className="text-metrix-muted text-xs">Analytics</span>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-metrix-purple to-metrix-pink flex items-center justify-center text-white font-bold">
                {userName[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{userName}</p>
              <p className="text-metrix-muted text-xs truncate">{userEmail}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
                  ${isActive 
                    ? "bg-white/10 text-white" 
                    : "text-metrix-muted hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-metrix-pink" : ""}`} />
                <div className="flex-1">
                  <span className="block font-medium">{link.label}</span>
                  <span className="block text-xs text-metrix-muted">{link.description}</span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-metrix-pink" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-metrix-muted hover:text-amber-500 hover:bg-amber-500/10 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}
