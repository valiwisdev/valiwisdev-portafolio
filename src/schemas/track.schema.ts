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

export type TTrack = z.infer<typeof TrackSchema>
