'use client'

import { useEffect, useCallback } from 'react'

interface MusicPopupOverlayProps {
  onClose: () => void
  children: React.ReactNode
}

export default function MusicPopupOverlay({ onClose, children }: Readonly<MusicPopupOverlayProps>) {
  const handleResize = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const navbar = document.querySelector('nav')
    if (navbar) {
      navbar.style.pointerEvents = 'none'
      navbar.style.filter = 'blur(2px)'
      navbar.style.transition = 'filter 0.3s ease'
    }

    window.addEventListener('resize', handleResize)

    return () => {
      document.body.style.overflow = 'unset'

      const navbar = document.querySelector('nav')
      if (navbar) {
        navbar.style.pointerEvents = 'auto'
        navbar.style.filter = 'none'
      }

      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 flex items-center justify-center">
      {children}
    </div>
  )
}
