import type { Metadata } from 'next'
import { Inter, Barlow_Condensed } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const barlow = Barlow_Condensed({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  title: 'FrameLab Academy - Digital Campus',
  description: 'Plataforma educativa de próxima generación para aprendizaje de tecnología y marketing digital',
  keywords: ['educación', 'tecnología', 'marketing digital', 'cursos online', 'IA'],
  authors: [{ name: 'FrameLab Academy' }],
  openGraph: {
    title: 'FrameLab Academy',
    description: 'Digital Campus - Aprendé las habilidades del futuro',
    type: 'website',
    locale: 'es_AR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${barlow.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
