"use client"

import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Eye,
  MousePointerClick,
  ShoppingBag
} from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: React.ReactNode
}

function MetricCard({ title, value, change, isPositive, icon }: MetricCardProps) {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-white/5">
          {icon}
        </div>
        <span className={`text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-metrix-muted text-sm">{title}</p>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-metrix-muted">Vista general del rendimiento de tus campañas</p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Spend"
          value="$4,241.25"
          change="12.5%"
          isPositive={false}
          icon={<DollarSign className="w-6 h-6 text-metrix-purple" />}
        />
        <MetricCard
          title="Conversiones"
          value="305"
          change="8.2%"
          isPositive={true}
          icon={<ShoppingBag className="w-6 h-6 text-metrix-pink" />}
        />
        <MetricCard
          title="CTR Promedio"
          value="1.67%"
          change="0.3%"
          isPositive={true}
          icon={<MousePointerClick className="w-6 h-6 text-emerald-400" />}
        />
        <MetricCard
          title="Impresiones"
          value="2.4M"
          change="15.7%"
          isPositive={true}
          icon={<Eye className="w-6 h-6 text-blue-400" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Spending Trend */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Tendencia de Gasto</h2>
            <select className="glass-input px-3 py-2 rounded-lg text-sm">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Últimos 90 días</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center text-metrix-muted">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Gráfico de tendencia (pendiente de implementación)</p>
            </div>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Distribución por Plataforma</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm text-metrix-muted">Facebook</div>
              <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-gradient-to-r from-metrix-purple to-metrix-pink rounded-full" />
              </div>
              <div className="w-16 text-right text-sm text-white">65%</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm text-metrix-muted">Instagram</div>
              <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[35%] bg-gradient-to-r from-metrix-pink to-metrix-purple rounded-full" />
              </div>
              <div className="w-16 text-right text-sm text-white">35%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Campañas Recientes</h2>
          <a href="/dashboard/campaigns" className="text-sm text-metrix-pink hover:text-metrix-purple transition">
            Ver todas →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-medium text-metrix-muted">Campaña</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-metrix-muted">Plataforma</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-metrix-muted">Spend</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-metrix-muted">Conversiones</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-metrix-muted">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition">
                <td className="py-3 px-4 text-white">Campaña Conversión Q1 2026</td>
                <td className="py-3 px-4 text-right text-metrix-muted">📘 Facebook</td>
                <td className="py-3 px-4 text-right text-white font-mono">$1,250.50</td>
                <td className="py-3 px-4 text-right text-white">147</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
                    Activa
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-white/5 transition">
                <td className="py-3 px-4 text-white">Brand Awareness Instagram</td>
                <td className="py-3 px-4 text-right text-metrix-muted">📷 Instagram</td>
                <td className="py-3 px-4 text-right text-white font-mono">$890.00</td>
                <td className="py-3 px-4 text-right text-white">74</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-amber-500/20 text-amber-400">
                    Atención
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-white/5 transition">
                <td className="py-3 px-4 text-white">Retargeting Carrito</td>
                <td className="py-3 px-4 text-right text-metrix-muted">📘 Facebook</td>
                <td className="py-3 px-4 text-right text-white font-mono">$2,100.75</td>
                <td className="py-3 px-4 text-right text-white">84</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
                    Crítico
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
