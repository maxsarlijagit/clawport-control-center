"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intentá de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-metrix-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold gradient-text">FrameLab Academy</h1>
          <p className="text-metrix-muted mt-2">Iniciá sesión para continuar</p>
        </div>

        {/* Login Form */}
        <div className="glass-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-metrix-red/10 border border-metrix-red rounded-lg text-metrix-red text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-metrix-muted mb-2">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-metrix-muted focus:outline-none focus:ring-2 focus:ring-metrix-purple"
                placeholder="admin"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-metrix-muted mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-metrix-muted focus:outline-none focus:ring-2 focus:ring-metrix-purple"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border-white/10 text-metrix-purple focus:ring-metrix-purple" />
                <span className="ml-2 text-sm text-metrix-muted">Recordarme</span>
              </label>
              <a href="/forgot-password" className="text-sm text-metrix-purple hover:text-metrix-purple-light">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-metrix-muted">
              ¿No tenés una cuenta?{" "}
              <a href="/register" className="text-metrix-purple hover:text-metrix-purple-light">
                Registrate
              </a>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-metrix-muted text-center mb-2">Credenciales Admin:</p>
          <p className="text-xs text-center text-metrix-muted">
            admin / admin123
          </p>
        </div>
      </div>
    </div>
  )
}
