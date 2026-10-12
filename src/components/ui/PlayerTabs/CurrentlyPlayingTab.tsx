import { TTrack } from '@/schemas/track.schema'
import { Music, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { RoundedGoldenLink } from '../GoldenButtons'

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
    <div className="flex w-full flex-col items-center space-y-3 p-3 text-center">
      {track.album.images && track.album.images.length > 0 && (
        <Image
          src={track.album.images[0].url}
          alt={`${track.album.name} cover`}
          width={144}
          height={144}
          className="h-36 w-36 rounded-2xl object-cover"
        />
      )}

      <div className="space-y-4 w-full px-2">
        <div className="space-y-2">
          <h3 className="text-lg font-bold leading-tight text-slate-200 cursor-default break-words">
            {track.name}
          </h3>

          <p className="text-sm text-slate-300/90 font-medium cursor-default break-words">
            {track.artists?.map((a) => a.name).join(', ')}
          </p>

          <p className="text-xs text-slate-400/70 cursor-default break-words">{track.album.name}</p>
        </div>
      </div>

      <RoundedGoldenLink
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        size="sm"
        className="flex w-full items-center justify-center gap-2 text-center"
      >
        <span>Open in Spotify</span>
        <ExternalLink className="h-4 w-4" />
      </RoundedGoldenLink>
    </div>
  )
}
