import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"
import { BookOpen, Clock, Award, Users } from "lucide-react"

// Mock data - will be replaced with real API calls
const availableCourses = [
  {
    id: 1,
    name: "Marketing Digital Avanzado",
    slug: "marketing-digital-avanzado",
    description: "Dominá las estrategias de marketing digital más efectivas. Desde SEO hasta Facebook Ads.",
    thumbnail: "📱",
    level: "INTERMEDIATE" as const,
    duration: 40, // hours
    price: 299,
    students: 156,
    modules: 8,
    lessons: 45,
  },
  {
    id: 2,
    name: "Desarrollo Web con Next.js",
    slug: "desarrollo-web-nextjs",
    description: "Aprendé a crear aplicaciones web modernas con Next.js 14, React y TypeScript.",
    thumbnail: "💻",
    level: "INTERMEDIATE" as const,
    duration: 60,
    price: 399,
    students: 203,
    modules: 12,
    lessons: 68,
  },
  {
    id: 3,
    name: "Data Science con Python",
    slug: "data-science-python",
    description: "Analizá datos, creá modelos predictivos y convertite en Data Scientist.",
    thumbnail: "📊",
    level: "BEGINNER" as const,
    duration: 80,
    price: 449,
    students: 178,
    modules: 14,
    lessons: 82,
  },
  {
    id: 4,
    name: "UX/UI Design Profesional",
    slug: "ux-ui-design",
    description: "Diseñá experiencias de usuario excepcionales. De la teoría a la práctica.",
    thumbnail: "🎨",
    level: "BEGINNER" as const,
    duration: 50,
    price: 349,
    students: 145,
    modules: 10,
    lessons: 55,
  },
  {
    id: 5,
    name: "AI & Automation",
    slug: "ai-automation",
    description: "Automatizá procesos y potenciá tu productividad con Inteligencia Artificial.",
    thumbnail: "🤖",
    level: "ADVANCED" as const,
    duration: 35,
    price: 379,
    students: 189,
    modules: 7,
    lessons: 38,
  },
  {
    id: 6,
    name: "Growth Marketing",
    slug: "growth-marketing",
    description: "Estrategias de crecimiento acelerado para startups y empresas digitales.",
    thumbnail: "📈",
    level: "ADVANCED" as const,
    duration: 45,
    price: 399,
    students: 134,
    modules: 9,
    lessons: 50,
  },
]

export default async function CoursesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Explorar Cursos
        </h1>
        <p className="text-metrix-muted">
          Encontrá el curso perfecto para alcanzar tus objetivos
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <BookOpen className="w-4 h-4 text-metrix-purple" />
          <span className="text-sm text-metrix-muted">Todos los niveles</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <Clock className="w-4 h-4 text-metrix-amber" />
          <span className="text-sm text-metrix-muted">Cualquier duración</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <Award className="w-4 h-4 text-metrix-green-bright" />
          <span className="text-sm text-metrix-muted">Con certificado</span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableCourses.map((course) => (
          <Link
            key={course.id}
            href={`/dashboard/courses/${course.slug}`}
            className="glass-card hover:bg-white/10 transition group"
          >
            {/* Thumbnail */}
            <div className="w-full h-40 rounded-xl bg-gradient-to-br from-metrix-purple/20 to-metrix-pink/20 flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition">
              {course.thumbnail}
            </div>

            {/* Level Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                course.level === 'BEGINNER' ? 'bg-green-500/20 text-green-400' :
                course.level === 'INTERMEDIATE' ? 'bg-amber-500/20 text-amber-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {course.level === 'BEGINNER' ? 'Principiante' :
                 course.level === 'INTERMEDIATE' ? 'Intermedio' :
                 'Avanzado'}
              </span>
              <span className="text-xs text-metrix-muted">
                {course.duration}h
              </span>
            </div>

            {/* Course Info */}
            <h3 className="text-white font-medium mb-2 line-clamp-2">
              {course.name}
            </h3>
            <p className="text-metrix-muted text-sm mb-4 line-clamp-2">
              {course.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-metrix-muted">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{course.students} estudiantes</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>{course.modules} módulos</span>
              </div>
            </div>

            {/* Price */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-white font-bold text-lg">
                ${course.price}
              </span>
              <span className="text-metrix-purple text-sm font-medium group-hover:underline">
                Ver detalles →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
