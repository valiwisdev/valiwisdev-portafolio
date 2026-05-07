import type { Metadata } from 'next'
import { JetBrains_Mono, Sora } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Stars from '@/components/ui/Stars'

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Valiwis',
  description: 'Portfolio of Valiwis',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Navbar />

        <div
          className="fixed inset-0 -z-20 pointer-events-none"
          style={{ transform: 'translateY(10vh)' }}
        >
          <Stars />
        </div>

        {children}

      </body>
    </html>
  )
}
