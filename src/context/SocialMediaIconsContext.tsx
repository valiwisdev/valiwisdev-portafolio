'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type SocialMediaIconsContextValue = {
  showSocialIcons: boolean
  toggleSocialIcons: () => void
}

const SocialMediaIconsContext = createContext<SocialMediaIconsContextValue | undefined>(undefined)

export function SocialMediaIconsProvider({ children }: { children: ReactNode }) {
  const [showSocialIcons, setShowSocialIcons] = useState(false)

  const value = useMemo(
    () => ({
      showSocialIcons,
      toggleSocialIcons: () => setShowSocialIcons((prev) => !prev),
    }),
    [showSocialIcons],
  )

  return (
    <SocialMediaIconsContext.Provider value={value}>{children}</SocialMediaIconsContext.Provider>
  )
}

export function useSocialMediaIcons() {
  const context = useContext(SocialMediaIconsContext)

  if (!context) {
    throw new Error('useSocialMediaIcons must be used within SocialMediaIconsProvider')
  }

  return context
}
