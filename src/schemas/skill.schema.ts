import { z } from 'zod'

export const SkillSchema = z.strictObject({
  name: z.string().min(1),
  color: z.string().regex(/^#[0-9a-f]{6}$/i),
  languages: z.array(z.string().min(1)).min(1).optional(),
})

export const SkillCategorySchema = z.strictObject({
  name: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().regex(/^#[0-9a-f]{6}$/i),
  description: z.string().min(1),
  skills: z.array(SkillSchema).min(1),
})

export const SkillCategoriesSchema = z.array(SkillCategorySchema).min(1)

export type Skill = z.infer<typeof SkillSchema>
export type SkillCategory = z.infer<typeof SkillCategorySchema>
