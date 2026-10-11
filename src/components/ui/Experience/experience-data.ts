import { resume } from '@/data/resume'
import { ExperiencesSchema } from '@/schemas/experience.schema'

export const experiences = ExperiencesSchema.parse(
  resume.work.map((work) => ({
    title: work.position,
    company: work.name,
    period: work.period,
    location: work.location,
    description: work.summary,
    technologies: work.keywords,
    achievements: work.highlights,
  })),
)
