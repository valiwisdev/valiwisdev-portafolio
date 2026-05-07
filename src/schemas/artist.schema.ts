import { z } from 'zod'

export const ArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
})
