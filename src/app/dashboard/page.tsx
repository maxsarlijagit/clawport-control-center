import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Mock data - will be replaced with real data from database
  const stats = [
    { icon: BookOpen, label: "Cursos en Progreso", value: "2", color: "text-metrix-purple" },
    { icon: Clock, label: "Horas Completadas", value: "24", color: "text-metrix-amber" },
    { icon: Award, label: "Certificados", value: "1", color: "text-metrix-green-bright" },
    { icon: TrendingUp, label: "Progreso Total", value: "35%", color: "text-metrix-pink" },
  ]

  const courses = [
    {
      id: 1,
      name: "Marketing Digital Avanzado",
      progress: 65,
      nextLesson: "Módulo 3: Facebook Ads",
      image: "📱",
    },
    {
      id: 2,
      name: "Desarrollo Web con Next.js",
      progress: 30,
      nextLesson: "Módulo 2: React Hooks",
      image: "💻",
    },
  ]

  const upcomingClasses = [
    {
      id: 1,
      title: "Live Q&A: Estrategias de Growth",
      date: "Hoy, 19:00 ART",
      instructor: "Martín González",
      type: "live",
    },
    {
      id: 2,
      title: "Workshop: Portfolio Profesional",
      date: "Mañana, 18:00 ART",
      instructor: "Sofía Rodríguez",
      type: "workshop",
    },
    {
      id: 3,
      title: "Clase: Advanced SEO Techniques",
      date: "Viernes, 20:00 ART",
      instructor: "Lucas Fernández",
      type: "class",
    },
  ]

  return (
    <div className="p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          ¡Hola, {session.user?.name || "Estudiante"}! 👋
        </h1>
        <p className="text-metrix-muted">
          Acá tenés un resumen de tu progreso. ¡Seguí así!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card">
            <div className="flex items-center gap-3 mb-3">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <span className="text-metrix-muted text-sm">{stat.label}</span>
            </div>
            <div className={`text-3xl font-display font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Courses in Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-white">
              Cursos en Progreso
            </h2>
            <a href="/dashboard/courses" className="text-sm text-metrix-purple hover:text-metrix-purple-light">
              Ver todos →
            </a>
          </div>

          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="glass-card hover:bg-white/5 transition">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-metrix-purple/20 to-metrix-pink/20 flex items-center justify-center text-3xl">
                    {course.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">{course.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-metrix-muted mb-3">
                      <span>Progreso: {course.progress}%</span>
                      <span>•</span>
                      <span>Próxima: {course.nextLesson}</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-metrix-purple to-metrix-pink rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="space-y-6">
          <h2 className="text-xl font-display font-bold text-white">
            Próximas Clases
          </h2>

          <div className="space-y-3">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="glass-card hover:bg-white/5 transition">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    classItem.type === 'live' ? 'bg-red-500' :
                    classItem.type === 'workshop' ? 'bg-metrix-amber' :
                    'bg-metrix-purple'
                  }`} />
                  <div className="flex-1">
                    <h3 className="text-white text-sm font-medium mb-1">
                      {classItem.title}
                    </h3>
                    <p className="text-metrix-muted text-xs mb-1">
                      {classItem.date}
                    </p>
                    <p className="text-metrix-muted text-xs">
                      con {classItem.instructor}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="/dashboard/calendar"
            className="block w-full text-center py-3 border border-white/10 rounded-xl text-metrix-muted hover:text-white hover:bg-white/5 transition text-sm"
          >
            Ver calendario completo →
          </a>
        </div>
      </div>
    </div>
  )
}
