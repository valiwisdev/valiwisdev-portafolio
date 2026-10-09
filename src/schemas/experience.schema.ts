import { z } from 'zod'

export const ExperienceSchema = z.strictObject({
  title: z.string().min(1),
  company: z.string().min(1),
  period: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
  technologies: z.array(z.string().min(1)).min(1),
  achievements: z.array(z.string().min(1)).min(1),
})

export const ExperiencesSchema = z.array(ExperienceSchema).min(1)

export type Experience = z.infer<typeof ExperienceSchema>
