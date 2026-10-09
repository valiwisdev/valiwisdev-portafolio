'use client'

import { Settings2, Music, Sparkles, X } from 'lucide-react'
import { useSocialMediaIcons } from '@/context/SocialMediaIconsContext'
import MusicPopupOverlay from './MusicPopupOverlay'
import { MusicPlayer } from './Player'
import { useState } from 'react'
import { CircularGoldenButton } from './GoldenButtons'

export default function HomeControls() {
  const { showSocialIcons, toggleSocialIcons } = useSocialMediaIcons()
  const [showMusicPopup, setShowMusicPopup] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const handleMusicClick = () => {
    setShowActions(false)
    setShowMusicPopup(true)
  }

  const handleSocialClick = () => {
    setShowActions(false)
    toggleSocialIcons()
  }

  return (
    <div className="absolute top-16 md:top-20 right-2 md:right-6 z-30 flex flex-col items-center gap-3">
      <CircularGoldenButton
        onClick={() => setShowActions((currentValue) => !currentValue)}
        ariaLabel={showActions ? 'Hide quick actions' : 'Show quick actions'}
        title={showActions ? 'Hide quick actions' : 'Show quick actions'}
        size="md"
      >
        {showActions ? <X className="h-4 w-4" /> : <Settings2 className="h-4 w-4" />}
      </CircularGoldenButton>

      {showMusicPopup && (
        <MusicPopupOverlay onClose={() => setShowMusicPopup(false)}>
          <MusicPlayer onClose={() => setShowMusicPopup(false)} />
        </MusicPopupOverlay>
      )}

      <div
        className={`flex flex-col items-center gap-2 rounded-full border border-amber-400/15 bg-black/15 p-2 backdrop-blur-sm transition-all duration-300 origin-top shadow-lg shadow-black/30 ${
          showActions
            ? 'pointer-events-auto translate-y-0 opacity-100 scale-100'
            : 'pointer-events-none -translate-y-2 opacity-0 scale-95'
        }`}
      >
        <CircularGoldenButton
          onClick={handleMusicClick}
          isActive={showMusicPopup}
          ariaLabel="Open music player"
        >
          <Music className="w-4 h-4" />
        </CircularGoldenButton>

        <CircularGoldenButton
          onClick={handleSocialClick}
          isActive={showSocialIcons}
          ariaLabel={showSocialIcons ? 'Hide social media icons' : 'Show social media icons'}
          title={showSocialIcons ? 'Hide Social Media Icons' : 'Show Social Media Icons'}
        >
          {showSocialIcons ? (
            <X className="w-4 h-4 text-white/90 cursor-pointer" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-400 cursor-pointer" />
          )}
        </CircularGoldenButton>
      </div>
    </div>
  )
}
