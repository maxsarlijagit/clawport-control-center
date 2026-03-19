import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Award, 
  MessageSquare,
  Settings,
  LogOut,
  User
} from "lucide-react"

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/courses", icon: BookOpen, label: "Mis Cursos" },
  { href: "/dashboard/calendar", icon: Calendar, label: "Calendario" },
  { href: "/dashboard/certificates", icon: Award, label: "Certificados" },
  { href: "/dashboard/community", icon: MessageSquare, label: "Comunidad" },
  { href: "/dashboard/profile", icon: User, label: "Perfil" },
  { href: "/dashboard/settings", icon: Settings, label: "Configuración" },
]

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-metrix-bg flex">
      {/* Sidebar */}
      <aside className="w-64 glass-sidebar min-h-screen fixed left-0 top-0 flex flex-col z-30">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-metrix-purple to-metrix-pink">
              <span className="text-white font-display font-bold text-lg">F</span>
            </div>
            <div>
              <span className="text-white font-display font-bold text-sm block leading-none">FrameLab</span>
              <span className="text-metrix-muted text-xs">Academy</span>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-metrix-purple to-metrix-pink flex items-center justify-center text-white font-bold">
              {session.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {session.user?.name || "Usuario"}
              </p>
              <p className="text-metrix-muted text-xs truncate">
                {session.user?.email || ""}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-metrix-muted hover:text-white hover:bg-white/5 transition"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-metrix-muted hover:text-amber-500 hover:bg-amber-500/10 transition"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {children}
      </main>
    </div>
  )
}
