"use client"

import { CheckCircle, Clock, Send, RotateCcw } from "lucide-react"
import { SubmissionStatus, STATUS_COLORS, STATUS_LABELS } from "@/types/submission"

interface StatusBadgeProps {
  status: SubmissionStatus
  size?: 'sm' | 'md' | 'lg'
}

const statusIcons: Record<SubmissionStatus, any> = {
  PENDING: Clock,
  SUBMITTED: Send,
  REVIEWED: CheckCircle,
  REVISION_REQUESTED: RotateCcw,
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const Icon = statusIcons[status]
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${STATUS_COLORS[status]} ${sizeClasses[size]}`}>
      <Icon className="w-3.5 h-3.5" />
      {STATUS_LABELS[status]}
    </span>
  )
}
