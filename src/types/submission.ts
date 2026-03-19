// Submission & Status Tracking Types
// FrameLab Academy

export type SubmissionStatus = 'PENDING' | 'SUBMITTED' | 'REVIEWED' | 'REVISION_REQUESTED'
export type FeedbackStatus = 'PENDING' | 'COMPLETED'

export interface Submission {
  id: string
  lessonId: string
  lesson?: Lesson
  userId: string
  user?: User
  content?: string
  files?: string[]
  status: SubmissionStatus
  submittedAt: Date
  gradedAt?: Date
  feedbacks?: Feedback[]
}

export interface Feedback {
  id: string
  submissionId: string
  submission?: Submission
  userId: string
  user?: User
  comment: string
  grade?: number // 0-100
  rubricScores?: Record<string, number>
  createdAt: Date
}

export interface SubmissionCreateInput {
  lessonId: string
  content?: string
  files?: string[]
}

export interface SubmissionUpdateInput {
  status: SubmissionStatus
  content?: string
  files?: string[]
}

export interface FeedbackCreateInput {
  submissionId: string
  comment: string
  grade?: number
  rubricScores?: Record<string, number>
}

// Status badge colors
export const STATUS_COLORS: Record<SubmissionStatus, string> = {
  PENDING: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  SUBMITTED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  REVIEWED: 'bg-green-500/20 text-green-400 border-green-500/30',
  REVISION_REQUESTED: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export const STATUS_LABELS: Record<SubmissionStatus, string> = {
  PENDING: 'Pendiente',
  SUBMITTED: 'Enviado',
  REVIEWED: 'Revisado',
  REVISION_REQUESTED: 'Revisión Solicitada',
}
