'use client'

import { TTrack } from '@/schemas/track.schema'
import { MusicLoader } from './Loader'
import { X } from 'lucide-react'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'
import { useState } from 'react'
import { CurrentlyPlayingTab, PlaylistTab, playerTabs } from './PlayerTabs'
import { TPlaylist as Playlist } from '@/schemas/playlist.schema'

function useCurrentTrack() {
  return useSWR<TTrack | null>('/api/get-current-track', fetcher, {
    refreshInterval: 3600000,
    revalidateOnFocus: false,
  })
}

export function MusicPlayer({ onClose }: Readonly<{ onClose?: () => void }>) {
  const { data: track, isLoading } = useCurrentTrack()
  const [activeTab, setActiveTab] = useState('currently-playing')
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)

  const handleBackToPlaylists = () => {
    setSelectedPlaylist(null)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setSelectedPlaylist(null)
  }

  if (isLoading) {
    return (
      <div
        className="backdrop-blur-md rounded-2xl border border-amber-400/30 p-6 w-80 min-h-[400px]"
        style={{
          background:
            'linear-gradient(135deg, rgba(15, 15, 64, 0.95) 0%, rgba(38, 11, 112, 0.95) 100%)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="text-amber-400/60 hover:text-amber-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-center py-16">
          <MusicLoader text="Looking for music..." />
        </div>
      </div>
    )
  }

  return (
    <div
      className="backdrop-blur-md rounded-2xl border border-amber-400/30 p-6 w-80 min-h-[500px] max-h-[600px]"
      style={{
        background:
          'linear-gradient(135deg, rgba(15, 15, 64, 0.95) 0%, rgba(38, 11, 112, 0.95) 100%)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          </div>
          <span className="text-amber-300 font-semibold text-sm tracking-wider">MUSIC PLAYER</span>
        </div>
        <button
          onClick={onClose}
          className="text-amber-400/60 hover:text-amber-400 transition-colors p-1 rounded-full hover:bg-amber-400/10"
        >
          <X className="w-5 h-5 cursor-pointer" />
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1">
        <TabsList className="grid w-full grid-cols-2 mb-4 bg-transparent p-0 h-auto gap-2">
          {playerTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className={tab.style}>
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent
          value="currently-playing"
          className="flex-1 m-0 animate-in fade-in duration-300"
        >
          <CurrentlyPlayingTab track={track ?? null} />
        </TabsContent>

        <TabsContent value="playlist" className="flex-1 m-0 animate-in fade-in duration-300">
          <PlaylistTab
            selectedPlaylist={selectedPlaylist}
            onSelectPlaylist={setSelectedPlaylist}
            onBackToPlaylists={handleBackToPlaylists}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
