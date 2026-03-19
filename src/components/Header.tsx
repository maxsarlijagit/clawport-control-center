"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/#features", label: "Características" },
  { href: "/courses", label: "Cursos" },
  { href: "/#testimonials", label: "Testimonios" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass bg-metrix-bg/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-metrix-purple to-metrix-pink">
              <span className="text-white font-display font-bold text-lg">F</span>
            </div>
            <div>
              <span className="text-white font-display font-bold text-lg block leading-none">FrameLab</span>
              <span className="text-metrix-muted text-xs">Academy</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-metrix-muted hover:text-white transition text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-metrix-muted hover:text-white transition text-sm">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="btn-secondary px-5 py-2.5 text-sm"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-metrix-muted hover:text-white transition text-sm font-medium">
                  Iniciar sesión
                </Link>
                <Link href="/register" className="btn-primary px-5 py-2.5 text-sm">
                  Empezar Gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass rounded-xl mb-4 p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-metrix-muted hover:text-white transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-center text-metrix-muted hover:text-white transition py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full btn-secondary"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block text-center text-metrix-muted hover:text-white transition py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full btn-primary text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Empezar Gratis
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
