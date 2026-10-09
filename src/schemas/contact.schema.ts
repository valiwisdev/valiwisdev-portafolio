import { z } from 'zod'

export const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
})

export type TContact = z.infer<typeof ContactSchema>
