import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Clawport Control Center - AI Operations',
  description: 'Dashboard de operaciones AI con Metrix Analytics, ClickUp Monitor y Meta Ads',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} font-sans bg-slate-900 text-white`}>
        {children}
      </body>
    </html>
  )
}
