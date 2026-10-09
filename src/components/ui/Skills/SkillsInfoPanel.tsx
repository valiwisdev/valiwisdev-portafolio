'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { skillsSummary } from './skills-data'
import type { SkillCategory } from '@/schemas/skill.schema'

interface SkillsInfoPanelProps {
  selectedCategory: SkillCategory | null
}

const panelMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.25, ease: 'easeInOut' as const },
}

export function SkillsInfoPanel({ selectedCategory }: Readonly<SkillsInfoPanelProps>) {
  return (
    <aside className="h-full rounded-xl border border-slate-700/30 bg-slate-900/30 p-4 shadow-2xl backdrop-blur-xl sm:p-6 lg:p-7">
      <AnimatePresence mode="wait">
        {selectedCategory ? (
          <CategoryDetails key={selectedCategory.name} category={selectedCategory} />
        ) : (
          <SkillsOverview key="overview" />
        )}
      </AnimatePresence>
    </aside>
  )
}

function SkillsOverview() {
  return (
    <motion.div {...panelMotion} className="flex h-full flex-col">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
        Constellation overview
      </p>
      <h3 className="mt-2 text-xl font-bold text-white sm:text-3xl">Skills galaxy</h3>
      <p className="mt-2 max-w-prose text-sm leading-6 text-slate-300 sm:mt-3 sm:text-base">
        Choose a planet to explore the skills and programming languages in each domain.
      </p>

      <dl className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
        {Object.entries(skillsSummary).map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-slate-900/55 px-2 py-3 text-center sm:px-3"
          >
            <dd className="text-xl font-bold text-amber-400">{value}</dd>
            <dt className="mt-1 text-[0.6875rem] capitalize text-slate-400 sm:text-xs">{label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6 lg:mt-10">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-amber-400/70">
          Navigation protocol
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
          Use the Orbital Index or select a planet to inspect its technology constellation.
        </p>
      </div>
    </motion.div>
  )
}

function CategoryDetails({ category }: Readonly<{ category: SkillCategory }>) {
  const languages = Array.from(new Set(category.skills.flatMap((skill) => skill.languages ?? [])))

  return (
    <motion.div {...panelMotion} className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-10 place-items-center rounded-full border border-white/10 bg-slate-950/60 text-lg"
        >
          {category.icon}
        </span>
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: category.color }}
        >
          Skill constellation
        </p>
      </div>

      <h3 className="mt-4 text-2xl font-bold text-white sm:mt-5 sm:text-3xl">{category.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300 sm:mt-3 sm:text-base">
        {category.description}
      </p>

      <div className="mt-5 sm:mt-7">
        <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Skills · {category.skills.length}
        </h4>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${category.name} skills`}>
          {category.skills.map((skill) => (
            <li
              key={skill.name}
              className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm font-medium text-white"
              style={{
                borderColor: `${skill.color}55`,
                backgroundColor: `${skill.color}18`,
              }}
            >
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: skill.color }}
              />
              {skill.name}
            </li>
          ))}
        </ul>
      </div>

      {languages.length > 0 && (
        <div className="mt-5 sm:mt-7">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Languages
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${category.name} languages`}>
            {languages.map((language) => (
              <li
                key={language}
                className="rounded-md border border-amber-400/20 bg-amber-400/10 px-2.5 py-1.5 text-sm font-medium text-amber-100"
              >
                {language}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 text-xs leading-5 text-slate-500 sm:mt-8">
        The orbiting moons represent the individual skills in this category.
      </div>
    </motion.div>
  )
}
