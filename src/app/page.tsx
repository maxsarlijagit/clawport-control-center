export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                🐾 Clawport Control Center
              </h1>
              <p className="text-sm text-slate-400 mt-1">AI Operations Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">Admin</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="text-slate-400 text-sm mb-2">Total Tasks</div>
            <div className="text-3xl font-bold text-white">79</div>
            <div className="text-emerald-400 text-sm mt-2">↑ 12% vs ayer</div>
          </div>
          <div className="glass-card p-6">
            <div className="text-slate-400 text-sm mb-2">Active Campaigns</div>
            <div className="text-3xl font-bold text-white">3</div>
            <div className="text-slate-400 text-sm mt-2">Meta Ads</div>
          </div>
          <div className="glass-card p-6">
            <div className="text-slate-400 text-sm mb-2">System Status</div>
            <div className="text-3xl font-bold text-emerald-400">●</div>
            <div className="text-emerald-400 text-sm mt-2">All systems operational</div>
          </div>
          <div className="glass-card p-6">
            <div className="text-slate-400 text-sm mb-2">Alerts Today</div>
            <div className="text-3xl font-bold text-white">0</div>
            <div className="text-slate-400 text-sm mt-2">No issues</div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/metrix" className="glass-card p-6 hover:bg-white/10 transition">
            <h3 className="text-lg font-semibold mb-2">📊 Metrix Analytics</h3>
            <p className="text-slate-400 text-sm">Tabla de performance con semáforo</p>
          </a>
          <a href="/clickup" className="glass-card p-6 hover:bg-white/10 transition">
            <h3 className="text-lg font-semibold mb-2">✅ ClickUp Monitor</h3>
            <p className="text-slate-400 text-sm">71 tareas monitoreadas en tiempo real</p>
          </a>
          <a href="/health" className="glass-card p-6 hover:bg-white/10 transition">
            <h3 className="text-lg font-semibold mb-2">💚 System Health</h3>
            <p className="text-slate-400 text-sm">Estado de servicios y contenedores</p>
          </a>
        </div>
      </main>
    </div>
  )
}
