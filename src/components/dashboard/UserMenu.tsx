"use client"

import { useState } from "react"
import { LogOut, User, Settings as SettingsIcon, ChevronDown } from "lucide-react"

interface UserMenuProps {
  userName?: string
  userEmail?: string
  userAvatar?: string
  onLogout?: () => void
}

export function UserMenu({ 
  userName = "Usuario", 
  userEmail = "", 
  userAvatar,
  onLogout 
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 border-t border-white/10 hover:bg-white/5 transition"
      >
        {userAvatar ? (
          <img src={userAvatar} alt={userName} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-metrix-purple to-metrix-pink flex items-center justify-center text-white font-bold">
            {userName[0]?.toUpperCase() || "U"}
          </div>
        )}
        
        <div className="flex-1 min-w-0 text-left">
          <p className="text-white text-sm font-medium truncate">{userName}</p>
          <p className="text-metrix-muted text-xs truncate">{userEmail}</p>
        </div>
        
        <ChevronDown className={`w-4 h-4 text-metrix-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full left-4 right-4 mb-2 glass-card rounded-xl p-2 z-50 shadow-xl">
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-metrix-muted hover:text-white hover:bg-white/5 transition">
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-metrix-muted hover:text-white hover:bg-white/5 transition">
                <SettingsIcon className="w-4 h-4" />
                <span>Configuración</span>
              </button>
              <div className="border-t border-white/10 my-1" />
              <button 
                onClick={() => {
                  onLogout?.()
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-amber-500 hover:bg-amber-500/10 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
