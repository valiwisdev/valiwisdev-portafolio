import { resume } from '@/data/resume'

export type ResumeLocale = 'en' | 'es'

const labels = {
  en: {
    summary: 'Summary',
    experience: 'Experience',
    skills: 'Skills',
    programmingLanguages: 'Programming Languages',
    interests: 'Interests',
  },
  es: {
    summary: 'Resumen',
    experience: 'Experiencia',
    skills: 'Habilidades',
    programmingLanguages: 'Lenguajes de programación',
    interests: 'Intereses',
  },
} satisfies Record<ResumeLocale, Record<string, string>>

const spanishWork = [
  {
    position: 'Asistente de investigación - Desarrollo del módulo de EduEx',
    period: 'Septiembre 2025 - Junio 2026',
    highlights: [
      'Apoyé el diseño y la implementación del módulo de inventario de EduEx',
      'Mejoré los flujos para registrar, consultar y reservar materiales',
      'Implementé funcionalidades backend con Django, Docker y SQL',
    ],
  },
  {
    position: 'Asistente de docencia - Arquitectura y Diseño de Software',
    period: 'Septiembre 2023 - Diciembre 2024',
    highlights: [
      'Evalué laboratorios y proyectos semestrales de más de 30 estudiantes',
      'Guié sesiones de preguntas y respuestas sobre despliegues en Google Cloud',
      'Acompañé a estudiantes en la aplicación de patrones de diseño y principios SOLID',
    ],
  },
  {
    position: 'Líder de Stanford CS Bridge',
    period: 'Junio-Julio 2023 y Junio-Julio 2024',
    highlights: [
      'Guié grupos de 8 a 10 estudiantes de secundaria de colegios colombianos',
      'Enseñé fundamentos de Python, como variables, ciclos y funciones',
      'Usé la biblioteca gráfica de Stanford para explicar programación de forma visual',
    ],
  },
]

const spanishCategoryNames: Record<string, string> = {
  Data: 'Datos',
  Cloud: 'Nube',
  Tools: 'Herramientas',
  'Operating Systems': 'Sistemas operativos',
}

export const resumeLocaleLabels = labels

export function getLocalizedResume(locale: ResumeLocale) {
  if (locale === 'en') return resume

  return {
    ...resume,
    basics: {
      ...resume.basics,
      label: 'Desarrolladora Full Stack',
      summary:
        'Me atraen los proyectos full stack porque me permiten crear herramientas que ayudan a otras personas a resolver problemas reales. Disfruto trabajar tanto en la interfaz como en la lógica que hay detrás, y también me interesa cómo la IA puede hacer que estas herramientas sean más útiles.',
      profiles: resume.basics.profiles.map((profile) =>
        profile.network === 'Portfolio' ? { ...profile, network: 'Portafolio' } : profile,
      ),
    },
    education: resume.education.map((item) => ({
      ...item,
      studyType: 'pregrado en',
      area: 'Ingeniería de Sistemas y Computación',
    })),
    work: resume.work.map((role, index) => ({ ...role, ...spanishWork[index] })),
    skills: resume.skills.map((skill) => ({
      ...skill,
      name: spanishCategoryNames[skill.name] ?? skill.name,
    })),
    interests: [
      {
        name: 'Automatización',
        summary:
          'Me gusta cómo la automatización puede reducir tareas repetitivas y facilitar el trabajo diario. He probado n8n para conectar servicios y crear flujos de trabajo.',
      },
      {
        name: 'DevOps',
        summary:
          'Me interesa entender cómo el software pasa de la planificación y el desarrollo a las pruebas y el lanzamiento, y luego al despliegue y el monitoreo. Cursé una electiva de pruebas automatizadas de software y me gusta explorar pruebas de reconocimiento, de extremo a extremo y de regresión visual. He estado aprendiendo a apoyar el despliegue y el monitoreo con Google Cloud, Terraform y los flujos de trabajo de GitHub Actions.',
      },
      {
        name: 'Inteligencia artificial',
        summary:
          'Me interesa cómo los agentes de IA pueden usar modelos de lenguaje y conocimiento externo para resolver problemas. En la universidad cursé una electiva sobre construcción de aplicaciones basadas en LLMs, donde estudié LLMs, RAG y agentes; por mi cuenta, he experimentado con LangChain, Pydantic AI y el Agent Development Kit (ADK) de Google.',
      },
      {
        name: 'Tecnologías emergentes',
        summary:
          'En mi tiempo libre, me gusta crear proyectos con tecnologías emergentes para aprender cómo funcionan y en qué podrían ser útiles.',
      },
    ],
  }
}
