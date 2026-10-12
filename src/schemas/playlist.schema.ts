import { z } from 'zod'

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

export type TPlaylist = z.infer<typeof PlaylistSchema>
