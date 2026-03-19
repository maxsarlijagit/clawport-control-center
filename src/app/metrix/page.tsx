"use client"

import { useEffect, useState } from "react"

interface Campaign {
  id: string
  name: string
  platform: "facebook" | "instagram"
  spend: number
  cpc: number
  ctr: number
  conversions: number
  status: "good" | "warning" | "danger"
}

export default function MetrixPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch campaign data from API
    fetch("/api/metrix/campaigns")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data.campaigns || [])
        setLoading(false)
      })
      .catch(() => {
        // Mock data for demo
        setCampaigns([
          {
            id: "1",
            name: "Campaña Conversión Q1 2026",
            platform: "facebook",
            spend: 1250.50,
            cpc: 0.85,
            ctr: 2.3,
            conversions: 147,
            status: "good"
          },
          {
            id: "2",
            name: "Brand Awareness Instagram",
            platform: "instagram",
            spend: 890.00,
            cpc: 1.20,
            ctr: 1.8,
            conversions: 74,
            status: "warning"
          },
          {
            id: "3",
            name: "Retargeting Carrito",
            platform: "facebook",
            spend: 2100.75,
            cpc: 2.50,
            ctr: 0.9,
            conversions: 84,
            status: "danger"
          }
        ])
        setLoading(false)
      })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-emerald-500"
      case "warning": return "bg-amber-500"
      case "danger": return "bg-red-500"
      default: return "bg-slate-500"
    }
  }

  const getPlatformIcon = (platform: string) => {
    return platform === "facebook" ? "📘" : "📷"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-800 rounded w-1/3"></div>
          <div className="h-64 bg-slate-800 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">📊 Metrix Analytics</h1>
            <p className="text-slate-400 mt-1">Performance de campañas Meta Ads</p>
          </div>
          <a
            href="/dashboard"
            className="px-4 py-2 glass-card hover:bg-white/10 transition text-sm"
          >
            ← Volver al Dashboard
          </a>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="text-slate-400 text-sm mb-2">Total Spend</div>
          <div className="text-2xl font-bold">
            ${campaigns.reduce((sum, c) => sum + c.spend, 0).toFixed(2)}
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="text-slate-400 text-sm mb-2">Campañas Activas</div>
          <div className="text-2xl font-bold">{campaigns.length}</div>
        </div>
        <div className="glass-card p-6">
          <div className="text-slate-400 text-sm mb-2">Conversiones</div>
          <div className="text-2xl font-bold">
            {campaigns.reduce((sum, c) => sum + c.conversions, 0)}
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="text-slate-400 text-sm mb-2">CTR Promedio</div>
          <div className="text-2xl font-bold">
            {(campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold">Performance por Plataforma</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Plataforma</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Campaña</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Consumo</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">CPC</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">CTR</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Conversiones</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <span className="text-2xl">{getPlatformIcon(campaign.platform)}</span>
                  </td>
                  <td className="px-6 py-4 font-medium">{campaign.name}</td>
                  <td className="px-6 py-4 text-right font-mono">
                    ${campaign.spend.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono">
                    ${campaign.cpc.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono">
                    {campaign.ctr.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 text-right font-mono">
                    {campaign.conversions}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`}
                      title={campaign.status === "good" ? "OK" : campaign.status === "warning" ? "Atención" : "Crítico"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {campaigns.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            No hay campañas para mostrar
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-6 text-sm text-slate-400">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          OK - Sin alertas
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          Atención - Valores cerca de límites
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          Crítico - Desvíos importantes
        </span>
      </div>
    </div>
  )
}
