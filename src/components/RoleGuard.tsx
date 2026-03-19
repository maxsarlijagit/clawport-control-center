"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { UserRole, hasPermission } from "@/lib/permissions"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallback?: React.ReactNode
  resource?: string
  action?: string
}

export default function RoleGuard({
  children,
  allowedRoles,
  fallback = null,
  resource,
  action,
}: RoleGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-metrix-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metrix-purple" />
      </div>
    )
  }

  // Not authenticated
  if (!session) {
    router.push("/login")
    return null
  }

  const userRole = session.user.role as UserRole

  // Check if role is allowed
  if (!allowedRoles.includes(userRole)) {
    if (fallback) {
      return <>{fallback}</>
    }
    router.push("/unauthorized")
    return null
  }

  // Check specific permission if provided
  if (resource && action && !hasPermission(userRole, resource, action)) {
    if (fallback) {
      return <>{fallback}</>
    }
    router.push("/unauthorized")
    return null
  }

  return <>{children}</>
}

// Convenience components for common role checks
export function StudentGuard({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={["STUDENT"]}>{children}</RoleGuard>
}

export function InstructorGuard({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={["INSTRUCTOR", "ADMIN"]}>{children}</RoleGuard>
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={["ADMIN"]}>{children}</RoleGuard>
}
