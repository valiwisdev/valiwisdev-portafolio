import { z } from 'zod'
import { ArtistSchema } from './artist.schema'
import { AlbumSchema } from './album.schema'

export const TrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  external_urls: z.object({
    spotify: z.url(),
  }),
  artists: z.array(ArtistSchema),
  album: AlbumSchema,
  duration_ms: z.number().int(),
})

export const TracksSchema = z.array(TrackSchema)

export const SpotifyCurrentlyPlayingSchema = z.object({
  is_playing: z.boolean(),
  item: TrackSchema,
})

export const CurrentTrackResponseSchema = z.object({
  track: TrackSchema,
  isPlaying: z.boolean(),
})

export const SpotifyPlaylistItemsSchema = z.object({
  items: z.array(
    z.object({
      item: z.unknown().optional(),
      track: z.unknown().optional(),
    }),
  ),
})

export type TTrack = z.infer<typeof TrackSchema>
export type TCurrentTrack = z.infer<typeof CurrentTrackResponseSchema>
