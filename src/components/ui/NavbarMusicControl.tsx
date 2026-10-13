'use client'

import { Music } from 'lucide-react'
import { useState } from 'react'
import MusicPopupOverlay from './MusicPopupOverlay'
import { MusicPlayer } from './Player'

export default function NavbarMusicControl() {
  const [showMusicPopup, setShowMusicPopup] = useState(false)

  return (
    <div className="relative z-30 shrink-0">
      <button
        onClick={() => setShowMusicPopup(true)}
        type="button"
        className={`grid size-8 place-items-center rounded-full transition-colors hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${showMusicPopup ? 'text-amber-400' : 'text-white'}`}
        aria-label="Open music player"
        title="Open music player"
      >
        <Music aria-hidden="true" className="size-6" />
      </button>

      {showMusicPopup && (
        <MusicPopupOverlay onClose={() => setShowMusicPopup(false)}>
          <MusicPlayer onClose={() => setShowMusicPopup(false)} />
        </MusicPopupOverlay>
      )}
    </div>
  )
}
