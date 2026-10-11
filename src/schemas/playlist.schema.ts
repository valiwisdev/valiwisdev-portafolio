import { z } from 'zod'

export const SongSchema = z.object({
  id: z.number(),
  name: z.string(),
  artist: z.string(),
  album: z.string(),
  duration: z.string(),
})

const PlaylistDetailsSchema = z.object({
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
})

export const PlaylistSchema = PlaylistDetailsSchema.extend({
  tracks: z.object({
    total: z.number().int(),
  }),
})

export const PlaylistOwnerSchema = z.object({
  display_name: z.string(),
})

const SpotifyPlaylistTotalSchema = z.object({
  total: z.number().int(),
})

export const PlaylistsSchema = z.array(PlaylistSchema)
export const SpotifyPlaylistsResponseSchema = z.object({
  items: z.array(
    PlaylistDetailsSchema.extend({
      items: SpotifyPlaylistTotalSchema.optional(),
      tracks: SpotifyPlaylistTotalSchema.optional(),
      owner: PlaylistOwnerSchema,
    }),
  ),
})

export type TSong = z.infer<typeof SongSchema>
export type TPlaylist = z.infer<typeof PlaylistSchema>
export type TPlaylistOwner = z.infer<typeof PlaylistOwnerSchema>
