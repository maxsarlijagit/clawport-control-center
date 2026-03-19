// Role-based permissions system
// FrameLab Academy

export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'

export interface Permission {
  resource: string
  actions: string[]
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  STUDENT: [
    { resource: 'courses', actions: ['view', 'enroll'] },
    { resource: 'lessons', actions: ['view', 'submit'] },
    { resource: 'own-submissions', actions: ['view', 'create', 'update'] },
    { resource: 'own-feedback', actions: ['view'] },
    { resource: 'own-certificates', actions: ['view', 'download'] },
    { resource: 'profile', actions: ['view', 'update'] },
    { resource: 'dashboard', actions: ['view'] },
  ],
  INSTRUCTOR: [
    { resource: 'courses', actions: ['view', 'create', 'update'] },
    { resource: 'lessons', actions: ['view', 'create', 'update', 'delete'] },
    { resource: 'students', actions: ['view', 'message'] },
    { resource: 'submissions', actions: ['view', 'grade', 'feedback'] },
    { resource: 'own-courses', actions: ['view', 'update', 'delete', 'manage'] },
    { resource: 'analytics', actions: ['view'] },
    { resource: 'dashboard', actions: ['view'] },
  ],
  ADMIN: [
    { resource: 'users', actions: ['view', 'create', 'update', 'delete', 'manage'] },
    { resource: 'courses', actions: ['view', 'create', 'update', 'delete', 'manage'] },
    { resource: 'programs', actions: ['view', 'create', 'update', 'delete', 'manage'] },
    { resource: 'cohorts', actions: ['view', 'create', 'update', 'delete', 'manage'] },
    { resource: 'submissions', actions: ['view', 'grade', 'feedback', 'delete'] },
    { resource: 'feedback', actions: ['view', 'create', 'update', 'delete'] },
    { resource: 'certificates', actions: ['view', 'create', 'delete'] },
    { resource: 'analytics', actions: ['view', 'export'] },
    { resource: 'settings', actions: ['view', 'update'] },
    { resource: 'dashboard', actions: ['view'] },
  ],
}

export function hasPermission(role: UserRole, resource: string, action: string): boolean {
  const permissions = ROLE_PERMISSIONS[role]
  return permissions.some(
    perm => perm.resource === resource && perm.actions.includes(action)
  )
}

export function hasAnyPermission(role: UserRole, resource: string, actions: string[]): boolean {
  const permissions = ROLE_PERMISSIONS[role]
  const perm = permissions.find(p => p.resource === resource)
  if (!perm) return false
  return actions.some(action => perm.actions.includes(action))
}

export function hasAllPermissions(role: UserRole, resource: string, actions: string[]): boolean {
  const permissions = ROLE_PERMISSIONS[role]
  const perm = permissions.find(p => p.resource === resource)
  if (!perm) return false
  return actions.every(action => perm.actions.includes(action))
}

export function canAccessResource(role: UserRole, resource: string): boolean {
  const permissions = ROLE_PERMISSIONS[role]
  return permissions.some(perm => perm.resource === resource)
}

// Helper functions for common checks
export const canManageCourses = (role: UserRole) => 
  hasPermission(role, 'courses', 'manage') || hasPermission(role, 'courses', 'create')

export const canGradeSubmissions = (role: UserRole) =>
  hasPermission(role, 'submissions', 'grade')

export const canManageUsers = (role: UserRole) =>
  hasPermission(role, 'users', 'manage')

export const canViewAnalytics = (role: UserRole) =>
  hasPermission(role, 'analytics', 'view')

export const isAdmin = (role: UserRole) => role === 'ADMIN'
export const isInstructor = (role: UserRole) => role === 'INSTRUCTOR' || role === 'ADMIN'
export const isStudent = (role: UserRole) => role === 'STUDENT'
