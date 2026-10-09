import { SkillCategoriesSchema } from '@/schemas/skill.schema'

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
    ],
  },
  {
    name: 'Backend',
    icon: '⭐',
    color: '#fbbf24',
    description: 'Designing scalable server-side applications and RESTful APIs.',
    skills: [
      { name: 'Node.js', color: '#5fa04e', languages: ['JavaScript'] },
      { name: 'REST APIs', color: '#fbbf24', languages: ['Python'] },
    ],
  },
  {
    name: 'Databases',
    icon: '🌌',
    color: '#a78bfa',
    description: 'Managing and querying data with relational and document-based databases.',
    skills: [
      { name: 'PostgreSQL', color: '#4169e1' },
      { name: 'MongoDB', color: '#47a248' },
    ],
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
])

export const skillsSummary = {
  categories: skillCategories.length,
  skills: skillCategories.reduce((sum, category) => sum + category.skills.length, 0),
  languages: new Set(
    skillCategories.flatMap((category) =>
      category.skills.flatMap((skill) => skill.languages ?? []),
    ),
  ).size,
}
