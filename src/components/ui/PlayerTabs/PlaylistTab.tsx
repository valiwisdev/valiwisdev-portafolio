import { ExternalLink, ArrowLeft, ChevronRight } from 'lucide-react'
import useSWR, { preload } from 'swr'
import { fetcher } from '@/lib/fetcher'
import { MusicLoader } from '../Loader'
import type { TPlaylist } from '@/schemas/playlist.schema'
import type { TTrack } from '@/schemas/track.schema'
import { CircularGoldenButton, RoundedGoldenLink } from '../GoldenButtons'

function formatDuration(durationMs: number | undefined | null) {
  if (!durationMs || Number.isNaN(durationMs)) return '0:00'
  const totalSeconds = Math.floor(durationMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function useMyPlaylists() {
  return useSWR<TPlaylist[] | null>('/api/get-my-playlists', fetcher, {
    refreshInterval: 3600000,
    revalidateOnFocus: false,
  })
}

function usePlaylistTracks(playlistId: string | null) {
  const key = playlistId ? `/api/playlists/${encodeURIComponent(playlistId)}/tracks` : null

  return useSWR<TTrack[] | null>(key, fetcher, {
    refreshInterval: 3600000,
    revalidateOnFocus: false,
  })
}

function preloadPlaylistTracks(playlistId: string) {
  const key = `/api/playlists/${encodeURIComponent(playlistId)}/tracks`
  void preload(key, fetcher)
}

export function PlaylistTab({
  selectedPlaylist,
  onSelectPlaylist,
  onBackToPlaylists,
}: Readonly<{
  selectedPlaylist: TPlaylist | null
  onSelectPlaylist: (playlist: TPlaylist) => void
  onBackToPlaylists: () => void
}>) {
  const { data: playlists, isLoading } = useMyPlaylists()
  const {
    data: selectedTracks,
    isLoading: isLoadingTracks,
    error: tracksError,
    mutate: retryTracks,
  } = usePlaylistTracks(selectedPlaylist?.id ?? null)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <MusicLoader text="Loading playlists..." />
      </div>
    )
  }

  if (selectedPlaylist) {
    const selectedCover = selectedPlaylist.images?.[0]?.url

    return (
      <div className="flex h-full min-h-0 w-full min-w-0 flex-col gap-2">
        <div className="flex h-12 min-w-0 shrink-0 items-center gap-2">
          <CircularGoldenButton
            onClick={onBackToPlaylists}
            ariaLabel="Back to playlists"
            title="Back to playlists"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </CircularGoldenButton>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div
              className={`h-12 w-12 shrink-0 rounded-lg bg-center bg-cover ${!selectedCover ? 'bg-gradient-to-br from-amber-400/20 to-amber-600/20' : ''}`}
              style={selectedCover ? { backgroundImage: `url(${selectedCover})` } : undefined}
            />
            <div className="flex h-full min-w-0 flex-1 flex-col justify-center">
              <h3 className="truncate text-base font-semibold text-white">{selectedPlaylist.name}</h3>
              <p className="text-sm text-slate-400">{selectedPlaylist.tracks.total} tracks</p>
            </div>
          </div>
        </div>

        {isLoadingTracks ? (
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <MusicLoader text="Loading tracks..." />
          </div>
        ) : tracksError ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center text-sm text-slate-400" role="status">
            <p>Could not load tracks.</p>
            <button
              type="button"
              onClick={() => void retryTracks()}
              className="mt-2 rounded-lg border border-amber-400/70 px-3 py-1.5 font-semibold text-amber-400 transition-colors hover:bg-amber-400 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              Try again
            </button>
          </div>
        ) : selectedTracks?.length ? (
          <div className="min-h-0 min-w-0 flex-1 divide-y divide-white/10 overflow-y-auto px-1 custom-scrollbar">
            {selectedTracks.map((track, index) => (
              <div
                key={track.id}
                className="flex min-w-0 items-center gap-2 py-2"
              >
                <div className="flex-shrink-0 relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5">
                    <span className="text-sm font-semibold text-slate-300">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {track.name}
                  </p>
                  <p className="text-xs text-slate-400/80 truncate">
                    <span className="text-slate-400">{track.artists[0].name}</span>
                    <span className="mx-1 text-slate-500">•</span>
                    <span>{track.album.name}</span>
                  </p>
                </div>

                <div className="shrink-0 pl-1 text-xs text-slate-400">
                  {formatDuration(track.duration_ms)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="flex min-h-0 flex-1 items-center justify-center text-center text-sm text-slate-400">No tracks available.</p>
        )}

        <div className="w-full shrink-0 border-t border-amber-400/20 pt-3">
          <RoundedGoldenLink
            href={selectedPlaylist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="flex w-full items-center justify-center gap-2 text-center"
          >
            <span>Listen on Spotify</span>
            <ExternalLink className="h-4 w-4" />
          </RoundedGoldenLink>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 custom-scrollbar">
      {playlists?.map((playlist) => (
        <button
          key={playlist.id}
          type="button"
          onClick={() => onSelectPlaylist(playlist)}
          onPointerEnter={() => preloadPlaylistTracks(playlist.id)}
          onFocus={() => preloadPlaylistTracks(playlist.id)}
          className="group flex min-h-16 flex-1 cursor-pointer items-center gap-3 border-b border-white/10 py-3 text-left last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        >
          <div
            className={`h-12 w-12 shrink-0 rounded-lg bg-center bg-cover ${!playlist.images?.[0]?.url ? 'bg-gradient-to-br from-amber-400/20 to-amber-600/20' : ''}`}
            style={
              playlist.images?.[0]?.url
                ? { backgroundImage: `url(${playlist.images[0].url})` }
                : undefined
            }
          />

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-white transition-colors group-hover:text-orange-400 group-focus-visible:text-orange-400">
              {playlist.name}
            </h3>
            <p className="mt-1 text-xs text-slate-400">{playlist.tracks.total} tracks</p>
          </div>
          <ChevronRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-orange-400 group-focus-visible:text-orange-400"
          />
        </button>
      ))}
    </div>
  )
}
