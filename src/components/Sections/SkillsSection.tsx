const skillCategories = [
  {
    name: 'Frontend',
    icon: '🚀',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'TailwindCSS'],
  },
  {
    name: 'Backend',
    icon: '⭐',
    skills: ['Node.js', 'Next.js', 'REST API', 'Python'],
  },
  {
    name: 'Databases',
    icon: '🌌',
    skills: ['PostgreSQL', 'MongoDB'],
  },
  {
    name: 'Tools & Other',
    icon: '🛸',
    skills: ['Git'],
  },
]

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="min-h-svh flex items-center justify-center px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
            My{' '}
            <span className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]">
              Skills
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="group relative bg-slate-900/30 backdrop-blur-xl border border-slate-700/30 rounded-lg md:rounded-lg lg:rounded-xl p-5 md:p-4 lg:p-8 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              {/* Animated glow effect */}
              <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent group-hover:via-amber-400/50 transition-all duration-500" />

              {/* Category header with icon */}
              <div className="relative z-10 mb-5 md:mb-4 lg:mb-6 flex items-center gap-3">
                <span className="text-3xl md:text-2xl lg:text-4xl">{category.icon}</span>
                <h3 className="text-lg md:text-base lg:text-xl font-bold text-amber-300 group-hover:text-amber-200 transition-colors duration-300">
                  {category.name}
                </h3>
              </div>

              {/* Skills list */}
              <div className="relative z-10 space-y-2 md:space-y-2 lg:space-y-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 text-amber-50 group-hover:text-amber-100 transition-colors duration-300"
                  >
                    <span className="text-amber-400 text-base md:text-sm lg:text-lg">✦</span>
                    <span className="text-xs md:text-sm lg:text-base font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
