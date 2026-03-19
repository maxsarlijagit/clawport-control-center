"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Martín González",
    role: "Student - Marketing Digital",
    image: "👨‍💼",
    content: "FrameLab cambió mi carrera completamente. En 6 meses conseguí trabajo como Marketing Manager gracias a las habilidades que aprendí acá.",
    rating: 5,
  },
  {
    name: "Sofía Rodríguez",
    role: "Student - Desarrollo Web",
    image: "👩‍💻",
    content: "La mejor inversión que hice. Los proyectos son reales y el portfolio que armé me abrió puertas que nunca imaginé.",
    rating: 5,
  },
  {
    name: "Lucas Fernández",
    role: "Student - Data Science",
    image: "👨‍🔬",
    content: "Lo que más valoro es la mentoría 1 a 1. Tener profesionales en actividad guiándote marca una diferencia enorme.",
    rating: 5,
  },
  {
    name: "Valentina López",
    role: "Student - UX/UI Design",
    image: "👩‍🎨",
    content: "Pasé de cero conocimiento a trabajar en una startup como diseñadora. El contenido está siempre actualizado con lo último del mercado.",
    rating: 5,
  },
  {
    name: "Mateo Silva",
    role: "Student - AI & Automation",
    image: "🤖",
    content: "Los cursos de IA son increíbles. Aprendí a automatizar procesos en mi trabajo y ahora soy referente en mi empresa.",
    rating: 5,
  },
  {
    name: "Camila Torres",
    role: "Student - Growth Marketing",
    image: "📈",
    content: "La comunidad es espectacular. Conecté con profesionales de toda Latinoamérica y armamos proyectos juntos.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-transparent to-metrix-purple/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Lo que dicen nuestros estudiantes
          </h2>
          <p className="text-metrix-muted text-center max-w-2xl mx-auto">
            Historias reales de transformación profesional
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card hover:bg-white/5 transition"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-metrix-purple/30 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-metrix-amber text-metrix-amber" />
                ))}
              </div>

              {/* Content */}
              <p className="text-metrix-muted mb-6 line-clamp-4">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-metrix-purple to-metrix-pink flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{testimonial.name}</p>
                  <p className="text-metrix-muted text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
          <div className="text-center">
            <div className="text-3xl font-display font-bold gradient-text mb-1">500+</div>
            <div className="text-sm text-metrix-muted">Estudiantes activos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold gradient-text mb-1">95%</div>
            <div className="text-sm text-metrix-muted">Tasa de satisfacción</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold gradient-text mb-1">85%</div>
            <div className="text-sm text-metrix-muted">Consiguen trabajo en 3 meses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold gradient-text mb-1">20+</div>
            <div className="text-sm text-metrix-muted">Cursos disponibles</div>
          </div>
        </div>
      </div>
    </section>
  )
}
