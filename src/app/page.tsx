import Header from "@/components/Header"
import Testimonials from "@/components/Testimonials"

export default function Home() {
  return (
    <main className="min-h-screen bg-metrix-bg">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-metrix-purple/20 via-transparent to-metrix-pink/20" />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-metrix-purple/10 border border-metrix-purple/30 text-metrix-purple-light text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-metrix-green-bright animate-pulse" />
            Inscripciones Abiertas 2026
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight">
            Aprendé las habilidades
            <br />
            <span className="gradient-text">del futuro</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-metrix-muted max-w-2xl mx-auto mb-10">
            Plataforma educativa de próxima generación. Cursos de tecnología, 
            marketing digital e IA con mentoría personalizada.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary min-w-[200px]">
              Empezar Ahora
            </button>
            <button className="btn-secondary min-w-[200px]">
              Ver Cursos
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-white/10">
            <div>
              <div className="text-3xl font-display font-bold text-white">500+</div>
              <div className="text-sm text-metrix-muted mt-1">Estudiantes</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white">20+</div>
              <div className="text-sm text-metrix-muted mt-1">Cursos</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white">95%</div>
              <div className="text-sm text-metrix-muted mt-1">Satisfacción</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-metrix-purple/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-metrix-pink/20 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-4">
            ¿Por qué FrameLab?
          </h2>
          <p className="text-metrix-muted text-center max-w-2xl mx-auto mb-16">
            Una experiencia educativa diseñada para el mundo real
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎯',
                title: 'Proyectos Reales',
                description: 'Trabajá en casos reales de empresas. Portfolio listo para mostrar.'
              },
              {
                icon: '👨‍🏫',
                title: 'Mentoría 1 a 1',
                description: 'Seguimiento personalizado con profesionales en actividad.'
              },
              {
                icon: '⚡',
                title: 'Actualización Constante',
                description: 'Contenido actualizado mensualmente con las últimas tendencias.'
              },
              {
                icon: '🌐',
                title: 'Comunidad Global',
                description: 'Conectá con estudiantes y profesionales de toda Latinoamérica.'
              },
              {
                icon: '💼',
                title: 'Bolsa de Trabajo',
                description: 'Acceso exclusivo a oportunidades laborales de nuestras empresas partner.'
              },
              {
                icon: '📜',
                title: 'Certificación',
                description: 'Certificados validados por la industria al completar cada curso.'
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card hover:bg-white/5 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-metrix-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="text-metrix-muted text-lg mb-10 max-w-2xl mx-auto">
            Uníte a más de 500 estudiantes que ya están transformando su carrera con FrameLab Academy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary min-w-[200px] text-lg">
              Empezar Ahora
            </button>
            <button className="btn-secondary min-w-[200px] text-lg">
              Hablar con un asesor
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-display font-bold mb-4">FrameLab Academy</h3>
              <p className="text-metrix-muted text-sm">
                Plataforma educativa de próxima generación para aprendizaje de tecnología y marketing digital.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Cursos</h4>
              <ul className="space-y-2 text-sm text-metrix-muted">
                <li><a href="#" className="hover:text-white transition">Marketing Digital</a></li>
                <li><a href="#" className="hover:text-white transition">Desarrollo Web</a></li>
                <li><a href="#" className="hover:text-white transition">Data Science</a></li>
                <li><a href="#" className="hover:text-white transition">AI & Automation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Compañía</h4>
              <ul className="space-y-2 text-sm text-metrix-muted">
                <li><a href="#" className="hover:text-white transition">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition">Carreras</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-metrix-muted">
                <li><a href="#" className="hover:text-white transition">Términos</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-metrix-muted text-sm">
            © 2026 FrameLab Academy. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </main>
  )
}
