import { z } from 'zod'
import { TracksSchema } from './track.schema'

export const SongSchema = z.object({
  id: z.number(),
  name: z.string(),
  artist: z.string(),
  album: z.string(),
  duration: z.string(),
})

export const PlaylistSchema = z.object({
  id: z.string(),
  external_urls: z.object({
    spotify: z.url(),
  }),
  name: z.string(),
  images: z.array(
    z.object({
      url: z.url(),
    }),
  ),
  tracks: z.object({
    total: z.number().int(),
  }),
})

export const PlaylistOwnerSchema = z.object({
  display_name: z.string(),
})

export const PlaylistsSchema = z.array(PlaylistSchema)
export const PlaylistTracksSchema = z.object({
  playlist: PlaylistSchema,
  tracks: TracksSchema,
})

export type TSong = z.infer<typeof SongSchema>
export type TPlaylist = z.infer<typeof PlaylistSchema>
export type TPlaylistOwner = z.infer<typeof PlaylistOwnerSchema>
export type TPlaylistTracks = z.infer<typeof PlaylistTracksSchema>
