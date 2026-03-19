import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Clock, Play, CheckCircle, Lock, BookOpen, FileText, HelpCircle, Download, Link as LinkIcon } from "lucide-react"

// Mock data - will be replaced with real API calls
const courseDetail = {
  id: 1,
  name: "Marketing Digital Avanzado",
  slug: "marketing-digital-avanzado",
  description: "Dominá las estrategias de marketing digital más efectivas. Desde SEO hasta Facebook Ads.",
  thumbnail: "📱",
  level: "INTERMEDIATE" as const,
  duration: 40,
  price: 299,
  students: 156,
  instructor: {
    name: "Martín González",
    avatar: "👨‍💼",
    bio: "Marketing Manager con 10+ años de experiencia",
  },
  modules: [
    {
      id: 1,
      title: "Fundamentos de Marketing Digital",
      description: "Bases esenciales para entender el ecosistema digital",
      order: 1,
      duration: 5, // hours
      lessons: [
        { id: 1, title: "Introducción al Marketing Digital", type: "VIDEO", duration: 15, completed: true },
        { id: 2, title: "El Customer Journey", type: "VIDEO", duration: 20, completed: true },
        { id: 3, title: "KPIs y Métricas Clave", type: "TEXT", duration: 10, completed: false },
        { id: 4, title: "Quiz: Fundamentos", type: "QUIZ", duration: 15, completed: false },
      ],
    },
    {
      id: 2,
      title: "SEO - Posicionamiento Orgánico",
      description: "Aprendé a posicionar tu sitio en los primeros lugares de Google",
      order: 2,
      duration: 8,
      lessons: [
        { id: 5, title: "¿Cómo funciona Google?", type: "VIDEO", duration: 18, completed: false },
        { id: 6, title: "Keyword Research", type: "VIDEO", duration: 25, completed: false },
        { id: 7, title: "On-Page SEO", type: "VIDEO", duration: 30, completed: false },
        { id: 8, title: "Off-Page SEO y Link Building", type: "VIDEO", duration: 22, completed: false },
        { id: 9, title: "Herramientas de SEO", type: "DOWNLOAD", duration: 10, completed: false },
      ],
    },
    {
      id: 3,
      title: "Facebook & Instagram Ads",
      description: "Creá y optimizá campañas publicitarias que convierten",
      order: 3,
      duration: 10,
      lessons: [
        { id: 10, title: "Estructura de Facebook Ads", type: "VIDEO", duration: 20, completed: false },
        { id: 11, title: "Segmentación Avanzada", type: "VIDEO", duration: 25, completed: false },
        { id: 12, title: "Creación de Creativos", type: "VIDEO", duration: 30, completed: false },
        { id: 13, title: "Optimización de Campañas", type: "VIDEO", duration: 28, completed: false },
        { id: 14, title: "Plantilla de Campaign Setup", type: "DOWNLOAD", duration: 5, completed: false },
      ],
    },
    {
      id: 4,
      title: "Email Marketing",
      description: "Construí relaciones duraderas con tu audiencia",
      order: 4,
      duration: 6,
      lessons: [
        { id: 15, title: "Estrategias de Email Marketing", type: "VIDEO", duration: 20, completed: false },
        { id: 16, title: "Copywriting para Emails", type: "TEXT", duration: 15, completed: false },
        { id: 17, title: "Automatizaciones", type: "VIDEO", duration: 25, completed: false },
      ],
    },
  ],
}

const lessonTypeIcons: Record<string, any> = {
  VIDEO: Play,
  TEXT: FileText,
  QUIZ: HelpCircle,
  ASSIGNMENT: FileText,
  DOWNLOAD: Download,
  LINK: LinkIcon,
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Calculate progress
  const totalLessons = courseDetail.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = courseDetail.modules.reduce(
    (acc, module) => acc + module.lessons.filter((l) => l.completed).length,
    0
  )
  const progress = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="p-8">
      {/* Course Header */}
      <div className="glass-card mb-8">
        <div className="flex items-start gap-6">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-metrix-purple/20 to-metrix-pink/20 flex items-center justify-center text-6xl flex-shrink-0">
            {courseDetail.thumbnail}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">
                Intermedio
              </span>
              <span className="text-xs text-metrix-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {courseDetail.duration}h
              </span>
              <span className="text-xs text-metrix-muted flex items-center gap-1">
                {courseDetail.modules.length} módulos
              </span>
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-3">
              {courseDetail.name}
            </h1>
            <p className="text-metrix-muted mb-4">
              {courseDetail.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-metrix-purple to-metrix-pink flex items-center justify-center text-lg">
                  {courseDetail.instructor.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{courseDetail.instructor.name}</p>
                  <p className="text-metrix-muted text-xs">{courseDetail.instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-display font-bold text-white mb-2">
              {progress}%
            </div>
            <p className="text-metrix-muted text-sm mb-3">Completado</p>
            <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-metrix-purple to-metrix-pink rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-white mb-6">
          Contenido del Curso
        </h2>

        {courseDetail.modules.map((module, moduleIndex) => (
          <div key={module.id} className="glass-card overflow-hidden">
            {/* Module Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-metrix-purple/20 to-metrix-pink/20 flex items-center justify-center text-white font-display font-bold">
                    {module.order}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">
                      {module.title}
                    </h3>
                    <p className="text-metrix-muted text-sm">
                      {module.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    {module.lessons.length} lecciones
                  </p>
                  <p className="text-metrix-muted text-sm">
                    {module.duration}h
                  </p>
                </div>
              </div>
            </div>

            {/* Lessons */}
            <div className="divide-y divide-white/5">
              {module.lessons.map((lesson, lessonIndex) => {
                const Icon = lessonTypeIcons[lesson.type] || Play
                const isLocked = lessonIndex > 0 && !module.lessons[lessonIndex - 1].completed && !lesson.completed

                return (
                  <div
                    key={lesson.id}
                    className={`flex items-center gap-4 p-4 hover:bg-white/5 transition ${
                      isLocked ? 'opacity-50' : 'cursor-pointer'
                    }`}
                  >
                    {/* Status/Number */}
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      {lesson.completed ? (
                        <CheckCircle className="w-5 h-5 text-metrix-green-bright" />
                      ) : isLocked ? (
                        <Lock className="w-5 h-5 text-metrix-muted" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-metrix-purple/50" />
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium">
                        {lesson.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-metrix-muted flex items-center gap-1">
                          <Icon className="w-3 h-3" />
                          {lesson.type}
                        </span>
                        <span className="text-xs text-metrix-muted flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration} min
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    {!isLocked && !lesson.completed && (
                      <button className="px-4 py-2 bg-metrix-purple hover:bg-metrix-purple-dark text-white text-sm font-medium rounded-lg transition">
                        Comenzar
                      </button>
                    )}
                    {lesson.completed && (
                      <span className="text-metrix-green-bright text-sm font-medium">
                        Completado
                      </span>
                    )}
                    {isLocked && (
                      <span className="text-metrix-muted text-sm">
                        Bloqueado
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
