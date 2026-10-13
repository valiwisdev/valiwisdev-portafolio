'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function MusicPopupOverlay({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const body = document.body
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `calc(${window.getComputedStyle(body).paddingRight} + ${scrollbarWidth}px)`
    }

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
    }
  }, [])

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-[2px] sm:p-4"
      role="dialog"
      aria-label="Music player"
      aria-modal="true"
    >
      {children}
    </div>,
    document.body,
  )
}
