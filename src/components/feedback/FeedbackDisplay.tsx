"use client"

import { Feedback } from "@/types/submission"
import { Star, User, Calendar } from "lucide-react"

interface FeedbackDisplayProps {
  feedback: Feedback
  showGrade?: boolean
}

export default function FeedbackDisplay({ feedback, showGrade = true }: FeedbackDisplayProps) {
  return (
    <div className="glass-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-metrix-purple to-metrix-pink flex items-center justify-center text-white font-bold">
            {feedback.user?.name?.[0]?.toUpperCase() || "I"}
          </div>
          <div>
            <p className="text-white font-medium">{feedback.user?.name || "Instructor"}</p>
            <div className="flex items-center gap-2 text-xs text-metrix-muted">
              <Calendar className="w-3 h-3" />
              {new Date(feedback.createdAt).toLocaleDateString('es-AR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
        {showGrade && feedback.grade !== undefined && (
          <div className="text-right">
            <div className="text-3xl font-display font-bold text-metrix-purple mb-1">
              {feedback.grade}
            </div>
            <p className="text-xs text-metrix-muted">sobre 100</p>
          </div>
        )}
      </div>

      {/* Comment */}
      <div className="bg-white/5 rounded-xl p-4 mb-4">
        <p className="text-metrix-muted whitespace-pre-wrap leading-relaxed">
          {feedback.comment}
        </p>
      </div>

      {/* Rubric Scores */}
      {feedback.rubricScores && Object.keys(feedback.rubricScores).length > 0 && (
        <div>
          <h4 className="text-white font-medium mb-3 text-sm">Rúbrica de Evaluación</h4>
          <div className="space-y-2">
            {Object.entries(feedback.rubricScores).map(([criterion, score]) => (
              <div key={criterion} className="flex items-center justify-between">
                <span className="text-metrix-muted text-sm">{criterion}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-metrix-purple to-metrix-pink rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="text-white text-sm font-medium w-12 text-right">
                    {score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface FeedbackListProps {
  feedbacks: Feedback[]
}

export function FeedbackList({ feedbacks }: FeedbackListProps) {
  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-metrix-muted" />
        </div>
        <p className="text-metrix-muted">Aún no hay feedback</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <FeedbackDisplay key={feedback.id} feedback={feedback} />
      ))}
    </div>
  )
}
