import { SkillCategoriesSchema } from '@/schemas/skill.schema'

export const programmingLanguages = ['JavaScript', 'TypeScript', 'Dart', 'Python']

export const skillCategories = SkillCategoriesSchema.parse([
  {
    name: 'Frontend',
    icon: '🚀',
    color: '#38bdf8',
    description:
      'Building responsive and interactive user interfaces with modern frameworks and tools.',
    skills: [
      { name: 'React', color: '#61dafb', languages: ['JavaScript', 'TypeScript'] },
      { name: 'HTML/CSS', color: '#e34f26' },
      { name: 'Tailwind CSS', color: '#06b6d4' },
      { name: 'Next.js', color: '#ffffff' },
      { name: 'Svelte', color: '#ff3e00' },
      { name: 'Flutter', color: '#02569b', languages: ['Dart'] },
      { name: 'Angular', color: '#dd0031', languages: ['TypeScript'] },
    ],
  },
  {
    name: 'Backend',
    icon: '⭐',
    color: '#fbbf24',
    description: 'Designing scalable server-side applications and RESTful APIs.',
    skills: [
      { name: 'FastAPI', color: '#009688', languages: ['Python'] },
      { name: 'NestJS', color: '#e0234e', languages: ['TypeScript'] },
      { name: 'Django', color: '#092e20', languages: ['Python'] },
    ],
  },
  {
    name: 'Data',
    icon: '🌌',
    color: '#a78bfa',
    description: 'Managing and querying data with relational and document-based databases.',
    skills: [
      { name: 'PostgreSQL', color: '#4169e1' },
      { name: 'MongoDB', color: '#47a248' },
    ],
  },
  {
    name: 'Cloud',
    icon: '☁️',
    color: '#60a5fa',
    description: 'Deploying and managing applications with cloud platforms.',
    skills: [{ name: 'Google Cloud', color: '#4285f4' }],
  },
  {
    name: 'Tools',
    icon: '🛸',
    color: '#34d399',
    description: 'Version control, containerization, and development workflow tools.',
    skills: [
      { name: 'Git', color: '#f03c2e' },
      { name: 'Docker', color: '#2496ed' },
    ],
  },
  {
    name: 'Operating Systems',
    icon: '💻',
    color: '#cbd5e1',
    description: 'Working across Linux, Windows, and macOS environments.',
    skills: [
      { name: 'Linux', color: '#fcc624' },
      { name: 'Windows', color: '#00a4ef' },
      { name: 'macOS', color: '#a2aaad' },
    ],
  },
])

export const resumeSkills = skillCategories.map((category) => ({
  name: category.name,
  keywords: category.skills.map((skill) => skill.name),
}))

export const skillsSummary = {
  categories: skillCategories.length,
  skills: skillCategories.reduce((sum, category) => sum + category.skills.length, 0),
  languages: new Set(
    skillCategories.flatMap((category) =>
      category.skills.flatMap((skill) => skill.languages ?? []),
    ),
  ).size,
}
