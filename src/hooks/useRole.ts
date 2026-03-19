"use client"

import { useSession } from "next-auth/react"
import { UserRole, hasPermission, canAccessResource } from "@/lib/permissions"

export function useRole() {
  const { data: session, status } = useSession()

  const role = (session?.user?.role as UserRole) || null
  const isAuthenticated = !!session
  const isLoading = status === "loading"

  const hasRole = (allowedRoles: UserRole[]) => {
    if (!role) return false
    return allowedRoles.includes(role)
  }

  const can = (resource: string, action: string) => {
    if (!role) return false
    return hasPermission(role, resource, action)
  }

  const canAccess = (resource: string) => {
    if (!role) return false
    return canAccessResource(role, resource)
  }

  const isStudent = role === "STUDENT"
  const isInstructor = role === "INSTRUCTOR" || role === "ADMIN"
  const isAdmin = role === "ADMIN"

  return {
    role,
    isAuthenticated,
    isLoading,
    hasRole,
    can,
    canAccess,
    isStudent,
    isInstructor,
    isAdmin,
  }
}

// Convenience hooks
export function useStudent() {
  const role = useRole()
  return { ...role, isStudent: role.isStudent }
}

export function useInstructor() {
  const role = useRole()
  return { ...role, isInstructor: role.isInstructor }
}

export function useAdmin() {
  const role = useRole()
  return { ...role, isAdmin: role.isAdmin }
}
