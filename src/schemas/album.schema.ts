import { z } from 'zod'

export const CoverSchema = z.object({
  url: z.url(),
  height: z.number().int(),
  width: z.number().int(),
})

export const AlbumSchema = z.object({
  name: z.string(),
  images: z.array(CoverSchema),
})
