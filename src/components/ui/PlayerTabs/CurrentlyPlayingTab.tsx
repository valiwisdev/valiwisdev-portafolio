import { TTrack } from '@/schemas/track.schema'
import { ExternalLink, Music, Radio } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { RoundedGoldenLink } from '../GoldenButtons'
import { MusicLoader } from '../Loader'

export function CurrentlyPlayingTab({
  track,
  isPlaying = false,
  isLoading = false,
}: Readonly<{ track: TTrack | null; isPlaying?: boolean; isLoading?: boolean }>) {
  const prefersReducedMotion = useReducedMotion() ?? false
  const animatePlayback = isPlaying && !prefersReducedMotion

  if (isLoading) {
    return (
      <div className="flex h-full min-h-0 w-full items-center justify-center">
        <MusicLoader text="Looking for music..." />
      </div>
    )
  }

  if (!track) {
    return (
      <div className="flex h-full min-h-0 w-full flex-col items-center justify-center px-4 py-8 text-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-2xl flex items-center justify-center">
            <Music className="w-8 h-8 text-amber-400/60" />
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-2xl blur opacity-60 animate-pulse"></div>
        </div>
        <span className="text-sm text-amber-400/70 font-medium">Nothing playing right now</span>
        <span className="mt-1 text-xs text-slate-400/60">
          Start a song on Spotify to see it here
        </span>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-2 p-2">
      <div className="flex shrink-0 items-center justify-between px-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em]">
        <span className="inline-flex items-center gap-1.5 leading-none text-amber-300/80">
          <Radio aria-hidden="true" className="size-3.5 shrink-0" />
          Track signal
        </span>
        <span className="inline-flex items-center gap-1.5 leading-none text-slate-400">
          <span
            aria-hidden="true"
            className={`size-1.5 shrink-0 self-center rounded-full ${isPlaying ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-slate-500'}`}
          />
          {isPlaying ? 'On air' : 'Standby'}
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-slate-950/20">
        <span
          aria-hidden="true"
          className="absolute h-24 w-[88%] rotate-[-18deg] rounded-[50%] border border-white/10"
        />
        <span
          aria-hidden="true"
          className={`absolute h-24 w-[88%] rotate-[18deg] rounded-[50%] border border-amber-400/35 ${animatePlayback ? 'animate-[spin_14s_linear_infinite]' : ''}`}
        >
          <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.75)] ring-2 ring-violet-950" />
        </span>
        {isPlaying && (
          <span
            aria-hidden="true"
            className={`absolute size-32 rounded-full bg-amber-400/15 blur-2xl ${animatePlayback ? 'animate-pulse' : ''}`}
          />
        )}
        <div className="relative z-10 grid size-36 shrink-0 place-items-center">
          {track.album.images[0]?.url ? (
            <Image
              src={track.album.images[0].url}
              alt={`${track.album.name} cover`}
              width={128}
              height={128}
              className="size-32 rounded-xl border border-white/10 object-cover shadow-xl shadow-black/30"
            />
          ) : (
            <div className="grid size-32 place-items-center rounded-xl border border-white/10 bg-slate-900 text-amber-400">
              <Music aria-hidden="true" className="size-10" />
            </div>
          )}
        </div>
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-4 size-1 rounded-full bg-cyan-200/70"
        />
        <span
          aria-hidden="true"
          className="absolute left-5 top-4 size-1 rounded-full bg-amber-200/70"
        />
      </div>

      <div className="shrink-0 rounded-lg border border-white/10 bg-slate-950/25 px-3 py-2 text-left">
        <p className="mb-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-amber-400/70">
          Current transmission
        </p>
        <h3 className="line-clamp-2 text-base font-bold leading-tight text-slate-100">
          {track.name}
        </h3>
        <p className="mt-1 truncate text-sm font-medium text-slate-300/90">
          {track.artists?.map((artist) => artist.name).join(', ')}
        </p>
        <p className="truncate text-xs text-slate-400/70">{track.album.name}</p>
      </div>

      <RoundedGoldenLink
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        size="sm"
        className="flex w-full shrink-0 items-center justify-center gap-2 text-center"
      >
        <span>Open in Spotify</span>
        <ExternalLink className="h-4 w-4" />
      </RoundedGoldenLink>
    </div>
  )
}
