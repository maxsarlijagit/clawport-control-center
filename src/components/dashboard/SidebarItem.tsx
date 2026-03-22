"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"

interface SidebarItemProps {
  href: string
  icon: LucideIcon
  label: string
  description?: string
  badge?: string | number
}

export function SidebarItem({ href, icon: Icon, label, description, badge }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`
        group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all
        ${isActive 
          ? "bg-white/10 text-white shadow-lg shadow-black/20" 
          : "text-metrix-muted hover:text-white hover:bg-white/5"
        }
      `}
    >
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-metrix-purple to-metrix-pink" />
      )}
      
      <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-metrix-pink" : ""}`} />
      
      <div className="flex-1 min-w-0">
        {label && <span className="block font-medium truncate">{label}</span>}
        {description && (
          <span className="block text-xs text-metrix-muted truncate">{description}</span>
        )}
      </div>
      
      {/* Badge */}
      {badge !== undefined && (
        <span className={`
          px-2 py-0.5 rounded-full text-xs font-medium
          ${typeof badge === "number" && badge > 0 
            ? "bg-metrix-pink text-white" 
            : "bg-white/10 text-metrix-muted"
          }
        `}>
          {badge}
        </span>
      )}
      
      {/* Active Dot */}
      {isActive && (
        <div className="w-1.5 h-1.5 rounded-full bg-metrix-pink shadow-lg shadow-metrix-pink/50" />
      )}
    </Link>
  )
}
