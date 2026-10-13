import type { Metadata } from 'next'
import { JetBrains_Mono, Sora } from 'next/font/google'
import { MotionConfig } from 'framer-motion'
import '@/styles/globals.css'

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-sora',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
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
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  )
}
