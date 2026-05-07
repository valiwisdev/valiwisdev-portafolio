import { ExternalLink, ArrowLeft } from 'lucide-react'
import { TPlaylist, TPlaylistTracks } from '@/schemas/playlist.schema'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { MusicLoader } from '../Loader'

function formatDuration(durationMs: number | undefined | null) {
  if (!durationMs || Number.isNaN(durationMs)) return '0:00'
  const totalSeconds = Math.floor(durationMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function useMyPlaylists() {
  return useSWR<TPlaylistTracks[] | null>('/api/get-my-playlists', fetcher, {
    refreshInterval: 3600000,
    revalidateOnFocus: false,
  })
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
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBackToPlaylists}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 text-amber-300" />
          </button>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-center bg-cover ${!selectedCover ? 'bg-gradient-to-br from-amber-400/20 to-amber-600/20' : ''}`}
              style={selectedCover ? { backgroundImage: `url(${selectedCover})` } : undefined}
            />
            <div>
              <h3 className="text-sm font-semibold text-white">{selectedPlaylist.name}</h3>
              <p className="text-xs text-slate-400">{selectedPlaylist.tracks.total} tracks</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar px-2">
          {playlists
            ?.find((pl) => pl.playlist.id === selectedPlaylist.id)
            ?.tracks.map((track, index) => (
              <div
                key={track.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white/5 to-white/2 hover:from-white/10 hover:to-white/5 border border-transparent hover:border-amber-400/20 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex-shrink-0 relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400/30 to-amber-600/20 rounded-lg flex items-center justify-center border border-amber-400/20 group-hover:border-amber-400/40 transition-all duration-300">
                    <span className="text-xs font-bold text-amber-200 group-hover:text-amber-100 transition-colors">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-amber-200 truncate group-hover:text-amber-100 transition-colors">
                    {track.name}
                  </p>
                  <p className="text-xs text-slate-400/80 truncate">
                    <span className="text-amber-300/70">{track.artists[0].name}</span>
                    <span className="mx-1 text-slate-500">•</span>
                    <span>{track.album.name}</span>
                  </p>
                </div>

                <div className="flex-shrink-0 text-xs text-slate-500 mr-2">
                  {formatDuration(track.duration_ms)}
                </div>
              </div>
            ))}
        </div>

        <div className="mt-4 mb-3">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
        </div>

        <div>
          <a
            href={selectedPlaylist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600/20 via-amber-500/25 to-amber-400/20 border border-amber-400/50 rounded-xl cursor-pointer backdrop-blur-md text-xs hover:bg-amber-400/15 hover:border-amber-400/70 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300 w-full justify-center group"
          >
            <span className="text-amber-200 font-semibold group-hover:text-amber-100 transition-colors duration-200">
              Listen on Spotify
            </span>
            <ExternalLink className="w-3 h-3 text-amber-200 group-hover:text-amber-100 group-hover:scale-110 transition-all duration-200" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar px-2">
        {playlists?.map(({ playlist }) => (
          <button
            key={playlist.id}
            onClick={() => onSelectPlaylist(playlist)}
            className="group relative p-4 rounded-2xl bg-gradient-to-r from-white/5 to-white/2 hover:from-white/10 hover:to-white/5 border border-white/10 hover:border-amber-400/30 transition-all duration-300 cursor-pointer w-full text-left"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-center bg-cover ${!playlist.images?.[0]?.url ? 'bg-gradient-to-br from-amber-400/20 to-amber-600/20' : ''}`}
                style={
                  playlist.images?.[0]?.url
                    ? { backgroundImage: `url(${playlist.images[0].url})` }
                    : undefined
                }
              />

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white group-hover:text-amber-100 transition-colors truncate">
                  {playlist.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{playlist.tracks.total} tracks</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
