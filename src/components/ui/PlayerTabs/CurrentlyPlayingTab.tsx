import { TTrack } from '@/schemas/track.schema'
import { Music, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export function CurrentlyPlayingTab({ track }: Readonly<{ track: TTrack | null }>) {
  if (!track) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-2xl flex items-center justify-center">
            <Music className="w-8 h-8 text-amber-400/60" />
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-2xl blur opacity-60 animate-pulse"></div>
        </div>
        <span className="text-sm text-amber-400/70 font-medium">Nothing playing right now</span>
        <span className="text-xs text-slate-400/60 mt-1">
          Start a song on Spotify to see it here
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-2">
      {track.album.images && track.album.images.length > 0 && (
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/30 to-amber-600/30 rounded-2xl blur-xl opacity-60"></div>
          <Image
            src={track.album.images[0].url}
            alt={`${track.album.name} cover`}
            width={160}
            height={160}
            className="relative w-40 h-40 rounded-2xl object-cover shadow-2xl shadow-black/60 border border-amber-400/20"
          />
        </div>
      )}

      <div className="space-y-4 w-full px-2">
        <div className="space-y-2">
          <h3 className="text-lg font-bold bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent leading-tight cursor-default break-words">
            {track.name}
          </h3>

          <p className="text-sm text-slate-300/90 font-medium cursor-default break-words">
            {track.artists?.map((a) => a.name).join(', ')}
          </p>

          <p className="text-xs text-slate-400/70 cursor-default break-words">{track.album.name}</p>
        </div>
      </div>

      <a
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-600/20 via-amber-500/25 to-amber-400/20 border border-amber-400/50 rounded-2xl cursor-pointer backdrop-blur-md text-sm hover:bg-amber-400/15 hover:border-amber-400/70 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300 w-full justify-center group"
      >
        <span className="text-amber-200 font-semibold group-hover:text-amber-100 transition-colors duration-200">
          Open in Spotify
        </span>
        <ExternalLink className="w-4 h-4 text-amber-200 group-hover:text-amber-100 group-hover:scale-110 transition-all duration-200" />
      </a>
    </div>
  )
}
