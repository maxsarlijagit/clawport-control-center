import { ReactNode } from "react"
import { Sidebar } from "@/components/dashboard"

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // TODO: Implement authentication check
  // const session = await getServerSession(authOptions)
  // if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-metrix-bg">
      {/* Sidebar de Navegación */}
      <Sidebar 
        userName="Usuario" 
        userEmail="usuario@metrix.io"
      />
      
      {/* Main Content */}
      <main className="ml-72">
        {children}
      </main>
    </div>
  )
}
