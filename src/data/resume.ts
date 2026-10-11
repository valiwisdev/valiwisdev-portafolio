import jsonResumeSchema from '@jsonresume/schema'
import { programmingLanguages, resumeSkills } from '@/data/skills'

export type PortfolioWork = {
  name: string
  position: string
  location: string
  startDate: string
  endDate: string
  period: string
  summary: string
  highlights: string[]
  keywords: string[]
}

export type PortfolioResume = {
  $schema: string
  basics: {
    name: string
    label: string
    email: string
    summary: string
    location: { city: string; countryCode: string; region: string }
    profiles: Array<{ network: string; username: string; url: string }>
  }
  work: PortfolioWork[]
  education: Array<{ institution: string; studyType: string; area: string; url: string }>
  skills: Array<{ name: string; keywords: string[] }>
  programmingLanguages: string[]
  interests: Array<{ name: string; summary: string }>
  meta: { version: string; lastModified: string }
}

export const resume = {
  $schema: 'https://jsonresume.org/schema.json',
  basics: {
    name: 'Valeria Caro Ramírez',
    label: 'Full Stack Developer',
    email: 'valiwisdev@outlook.com',
    summary:
      'I’m drawn to full-stack projects because they let me build tools that help people solve real problems. I enjoy working on both the interface and the logic behind them.',
    location: { city: 'Bogotá', countryCode: 'CO', region: 'Colombia' },
    profiles: [
      { network: 'GitHub', username: 'valiwisdev', url: 'https://github.com/valiwisdev' },
      {
        network: 'LinkedIn',
        username: 'valiwisdev',
        url: 'https://www.linkedin.com/in/valiwisdev/',
      },
      { network: 'Portfolio', username: 'valiwisdev', url: 'https://valiwis.dev/' },
    ],
  },
  work: [
    {
      name: 'Universidad de los Andes',
      position: 'Research Monitor - Module Development for EduEx',
      location: 'Colombia',
      startDate: '2025-09',
      endDate: '2026-06',
      period: 'September 2025 - June 2026',
      summary:
        'Developed an inventory management module for the EduEx platform, supporting its design and implementation to optimize material registration, tracking, and reservation.',
      highlights: [
        'Supported the design and implementation of the EduEx inventory module',
        'Optimized workflows for registering, tracking, and reserving materials',
        'Implemented backend functionality with Django, Docker, and SQL',
      ],
      keywords: ['Django', 'Docker', 'SQL'],
    },
    {
      name: 'Universidad de los Andes',
      position: 'Undergraduate Teaching Assistant - Software Architecture & Design',
      location: 'Bogotá, Colombia',
      startDate: '2023-09',
      endDate: '2024-12',
      period: 'September 2023 - December 2024',
      summary:
        'Assessed lab assignments and semester-long projects for 30+ students, delivering detailed architectural feedback and guiding them in weekly labs to apply design patterns and SOLID principles to their software.',
      highlights: [
        'Assessed lab assignments and semester-long projects for 30+ students',
        'Facilitated Q&A sessions to troubleshoot Google Cloud deployments',
        'Guided students in applying design patterns and SOLID principles',
      ],
      keywords: ['Django', 'Google Cloud', 'Microservices', 'Software Architecture'],
    },
    {
      name: 'Universidad de los Andes',
      position: 'Stanford CS Bridge Leader',
      location: 'Bogotá, Colombia',
      startDate: '2023-06',
      endDate: '2024-07',
      period: 'June-July 2023 and June-July 2024',
      summary:
        'Guided cohorts of 8-10 high-school students from Colombian schools through daily coding exercises and a culminating project, providing individualized assistance.',
      highlights: [
        'Guided cohorts of 8-10 high-school students from Colombian schools',
        'Taught Python fundamentals including variables, loops, and functions',
        "Used Stanford's graphics library to make programming concepts visual and engaging",
      ],
      keywords: ['Python', 'Stanford Graphics Library', 'Teaching', 'Mentoring'],
    },
  ],
  education: [
    {
      institution: 'Universidad de los Andes',
      studyType: 'Undergraduate program in',
      area: 'Systems and Computing Engineering',
      url: 'https://www.uniandes.edu.co/es/programas/ingenieria-de-sistemas-y-computacion',
    },
  ],
  skills: resumeSkills,
  programmingLanguages,
  interests: [
    {
      name: 'DevOps',
      summary:
        'I like learning how automation, CI/CD, and cloud infrastructure help software teams ship and maintain apps.',
    },
    {
      name: 'Artificial intelligence',
      summary:
        'Lately, I’ve been learning about AI, especially agents, and exploring what they can do.',
    },
    {
      name: 'Emerging technologies',
      summary:
        'I enjoy keeping up with new technologies and trying them out to see where they might be useful.',
    },
  ],
  meta: { version: '1.0.0', lastModified: '2026-10-11T00:00:00' },
} satisfies PortfolioResume

jsonResumeSchema.validate(resume, (errors, valid) => {
  if (!valid) {
    throw new Error(`Invalid JSON Resume data: ${errors?.map((error) => error.stack).join('; ')}`)
  }
})
