"use client"

import { useState } from "react"
import { Star, Send } from "lucide-react"

interface FeedbackFormProps {
  submissionId: string
  onSubmit: (data: FeedbackCreateInput) => Promise<void>
  onSuccess?: () => void
}

interface FeedbackCreateInput {
  submissionId: string
  comment: string
  grade?: number
  rubricScores?: Record<string, number>
}

export default function FeedbackForm({ submissionId, onSubmit, onSuccess }: FeedbackFormProps) {
  const [comment, setComment] = useState("")
  const [grade, setGrade] = useState<number | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit({
        submissionId,
        comment,
        grade,
      })
      setComment("")
      setGrade(undefined)
      onSuccess?.()
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Grade */}
      <div>
        <label className="block text-sm font-medium text-metrix-muted mb-2">
          Calificación (0-100)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="0"
            max="100"
            value={grade || ""}
            onChange={(e) => setGrade(e.target.value ? Number(e.target.value) : undefined)}
            className="w-24 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-metrix-purple"
            placeholder="0-100"
          />
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-metrix-purple to-metrix-pink rounded-full transition-all"
              style={{ width: `${grade || 0}%` }}
            />
          </div>
          <span className="text-white font-medium w-12 text-right">
            {grade || 0}%
          </span>
        </div>
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-metrix-muted mb-2">
          Comentarios
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-metrix-muted focus:outline-none focus:ring-2 focus:ring-metrix-purple resize-none"
          placeholder="Escribí tu feedback para el estudiante..."
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || !comment.trim()}
        className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? "Enviando..." : "Enviar Feedback"}
      </button>
    </form>
  )
}

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

export function StarRating({ value, onChange, max = 5 }: StarRatingProps) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex gap-2">
      {[...Array(max)].map((_, i) => {
        const rating = i + 1
        return (
          <button
            key={i}
            type="button"
            className="transition transform hover:scale-110"
            onClick={() => onChange(rating)}
            onMouseEnter={() => setHover(rating)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className={`w-8 h-8 ${
                rating <= (hover || value)
                  ? "fill-metrix-amber text-metrix-amber"
                  : "text-metrix-muted"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
