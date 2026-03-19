// Course System Types
// FrameLab Academy

import type { Submission } from './submission'

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
export type LessonType = 'VIDEO' | 'TEXT' | 'QUIZ' | 'ASSIGNMENT' | 'DOWNLOAD' | 'LINK'
export type EnrollmentStatus = 'ACTIVE' | 'COMPLETED' | 'DROPPED' | 'PENDING'

export interface Program {
  id: string
  name: string
  slug: string
  description?: string
  thumbnail?: string
  duration?: number // weeks
  level: CourseLevel
  active: boolean
  createdAt: Date
  updatedAt: Date
  courses?: Course[]
  cohorts?: Cohort[]
}

export interface Course {
  id: string
  name: string
  slug: string
  description?: string
  thumbnail?: string
  duration?: number // hours
  level: CourseLevel
  price?: number
  active: boolean
  programId?: string
  program?: Program
  createdAt: Date
  updatedAt: Date
  modules?: Module[]
  enrollments?: Enrollment[]
}

export interface Module {
  id: string
  title: string
  description?: string
  order: number
  courseId: string
  course?: Course
  createdAt: Date
  updatedAt: Date
  lessons?: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  description?: string
  type: LessonType
  order: number
  duration?: number // minutes
  videoUrl?: string
  content?: string // markdown
  resources?: string[] // download URLs
  moduleId: string
  module?: Module
  createdAt: Date
  updatedAt: Date
  submissions?: Submission[]
}

export interface Cohort {
  id: string
  name: string
  programId: string
  program?: Program
  startDate: Date
  endDate?: Date
  maxStudents: number
  active: boolean
  createdAt: Date
  updatedAt: Date
  enrollments?: Enrollment[]
}

export interface Enrollment {
  id: string
  userId: string
  user?: User
  courseId: string
  course?: Course
  cohortId?: string
  cohort?: Cohort
  status: EnrollmentStatus
  progress: number // 0-100
  enrolledAt: Date
  completedAt?: Date
}

export interface User {
  id: string
  email: string
  name?: string
  avatarUrl?: string
  avatarKey?: string
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
  enrollments?: Enrollment[]
}

// API Response Types
export interface CourseListResponse {
  courses: Course[]
  total: number
  page: number
  pageSize: number
}

export interface CourseDetailResponse {
  course: Course
  modules: Module[]
  enrollment?: Enrollment
}

export interface EnrollmentCreateInput {
  userId: string
  courseId: string
  cohortId?: string
}

export interface ProgressUpdateInput {
  enrollmentId: string
  progress: number
  completedLessonId?: string
}
