'use client'

import { TCurrentTrack } from '@/schemas/track.schema'
import { X } from 'lucide-react'
import { CircularGoldenButton } from './GoldenButtons'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'
import { useState } from 'react'
import { CurrentlyPlayingTab, PlaylistTab, playerTabs } from './PlayerTabs'
import { TPlaylist as Playlist } from '@/schemas/playlist.schema'

function useCurrentTrack() {
  return useSWR<TCurrentTrack | null>('/api/get-current-track', fetcher, {
    refreshInterval: 3600000,
    revalidateOnFocus: false,
  })
}

export function MusicPlayer({ onClose }: Readonly<{ onClose?: () => void }>) {
  const { data: currentTrack, isLoading } = useCurrentTrack()
  const [activeTab, setActiveTab] = useState('currently-playing')
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)

  const handleBackToPlaylists = () => {
    setSelectedPlaylist(null)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setSelectedPlaylist(null)
  }

  return (
    <div
      className="backdrop-blur-md flex h-[min(28rem,calc(100dvh-2rem))] w-full max-w-[20rem] min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 p-4 sm:h-[min(32rem,calc(100dvh-2rem))] sm:max-w-[20rem] sm:p-6"
      style={{
        background:
          'linear-gradient(135deg, rgba(15, 15, 64, 0.95) 0%, rgba(38, 11, 112, 0.95) 100%)',
      }}
    >
      {/* Header */}
      <div className="mb-3 flex shrink-0 items-center justify-between sm:mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          </div>
          <span className="text-orange-400 font-semibold text-sm tracking-wider">MUSIC PLAYER</span>
        </div>
        <CircularGoldenButton
          type="button"
          onClick={onClose}
          ariaLabel="Close music player"
          title="Close music player"
          size="sm"
        >
          <X className="h-4 w-4" />
        </CircularGoldenButton>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex min-h-0 flex-1 flex-col"
      >
        <TabsList className="mb-3 grid h-auto w-full grid-cols-2 gap-2 bg-transparent p-0 sm:mb-4">
          {playerTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className={tab.style}>
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent
          value="currently-playing"
          className="m-0 flex min-h-0 flex-1 animate-in fade-in duration-300"
        >
          <CurrentlyPlayingTab
            track={currentTrack?.track ?? null}
            isPlaying={currentTrack?.isPlaying ?? false}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent
          value="playlist"
          className="m-0 flex min-h-0 flex-1 animate-in fade-in duration-300"
        >
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
