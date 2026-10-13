import { ExternalLink, ArrowLeft, ChevronRight, Music2 } from 'lucide-react'
import useSWR, { preload } from 'swr'
import { fetcher } from '@/lib/fetcher'
import { MusicLoader } from '../Loader'
import type { TPlaylist } from '@/schemas/playlist.schema'
import type { TTrack } from '@/schemas/track.schema'
import { CircularGoldenButton, RoundedGoldenLink } from '../GoldenButtons'

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
      <div className="flex h-full min-h-0 w-full items-center justify-center">
        <MusicLoader text="Loading playlists..." />
      </div>
    )
  }

  if (selectedPlaylist) {
    const selectedCover = selectedPlaylist.images?.[0]?.url

    return (
      <div className="flex h-full min-h-0 w-full min-w-0 flex-col gap-1.5 sm:gap-2">
        <div className="flex h-10 min-w-0 shrink-0 items-center gap-2 sm:h-12">
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
              className={`size-10 shrink-0 rounded-lg bg-center bg-cover sm:size-12 ${!selectedCover ? 'bg-gradient-to-br from-amber-400/20 to-amber-600/20' : ''}`}
              style={selectedCover ? { backgroundImage: `url(${selectedCover})` } : undefined}
            />
            <div className="flex h-full min-w-0 flex-1 flex-col justify-center">
              <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                {selectedPlaylist.name}
              </h3>
              <p className="text-xs text-slate-400 sm:text-sm">
                {selectedPlaylist.tracks.total} tracks
              </p>
            </div>
          </div>
        </div>

        {isLoadingTracks ? (
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <MusicLoader text="Loading tracks..." />
          </div>
        ) : tracksError ? (
          <div
            className="flex min-h-0 flex-1 flex-col items-center justify-center text-center text-sm text-slate-400"
            role="status"
          >
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
          <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-1 custom-scrollbar">
            <div className="grid grid-cols-3 gap-2 py-2">
              {selectedTracks.map((track) => {
                const cover = track.album.images[0]?.url

                return (
                  <div key={track.id} className="min-w-0">
                    <div
                      role="img"
                      aria-label={`${track.album.name} cover art`}
                      className="grid aspect-square w-full place-items-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-amber-400/25 via-violet-500/25 to-cyan-400/20 bg-cover bg-center"
                      style={cover ? { backgroundImage: `url(${cover})` } : undefined}
                    >
                      {!cover && <Music2 aria-hidden="true" className="size-5 text-amber-300/80" />}
                    </div>
                    <p className="mt-1.5 truncate text-[0.6875rem] font-semibold leading-tight text-white">
                      {track.name}
                    </p>
                    <p className="mt-0.5 truncate text-[0.625rem] leading-tight text-slate-400">
                      {track.artists.map((artist) => artist.name).join(', ')}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <p className="flex min-h-0 flex-1 items-center justify-center text-center text-sm text-slate-400">
            No tracks available.
          </p>
        )}

        <div className="w-full shrink-0 border-t border-amber-400/20 pt-2 sm:pt-3">
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
