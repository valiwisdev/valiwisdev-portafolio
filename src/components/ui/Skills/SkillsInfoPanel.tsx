'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Code2, Compass, Orbit, Sparkles } from 'lucide-react'

import { skillsSummary } from '@/data/skills'
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
    <aside className="relative isolate h-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/75 via-indigo-950/65 to-violet-950/60 p-4 shadow-2xl backdrop-blur-xl sm:p-6 lg:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-cyan-300/[0.05] blur-3xl"
      />
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
  const metrics = [
    { label: 'Categories', value: skillsSummary.categories, Icon: Orbit },
    { label: 'Skills', value: skillsSummary.skills, Icon: Sparkles },
    { label: 'Languages', value: skillsSummary.languages, Icon: Code2 },
  ]

  return (
    <motion.div
      {...panelMotion}
      className="relative flex h-full min-h-[25rem] flex-col overflow-hidden"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 520 190"
        preserveAspectRatio="xMidYMax slice"
        className="pointer-events-none absolute -bottom-5 -right-8 h-48 w-[120%] text-cyan-200/[0.18] sm:h-56"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <ellipse cx="300" cy="142" rx="235" ry="66" transform="rotate(-9 300 142)" />
          <ellipse cx="300" cy="142" rx="174" ry="47" transform="rotate(-9 300 142)" />
          <ellipse cx="300" cy="142" rx="112" ry="29" transform="rotate(-9 300 142)" />
          <path d="M83 113 178 68l101 24 95-35 62 28" strokeDasharray="3 7" />
        </g>
        <g fill="currentColor">
          <circle cx="83" cy="113" r="3" />
          <circle cx="178" cy="68" r="4" />
          <circle cx="279" cy="92" r="3" />
          <circle cx="436" cy="85" r="3" />
        </g>
      </svg>

      <div className="relative z-10 flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-lg border border-amber-400/25 bg-amber-400/10 text-amber-300">
          <Orbit aria-hidden="true" className="size-4" />
        </span>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Constellation overview
        </p>
      </div>
      <h3 className="relative z-10 mt-3 text-xl font-bold tracking-tight text-white sm:text-3xl">
        Skills galaxy
      </h3>
      <p className="relative z-10 mt-2 max-w-prose text-sm leading-6 text-slate-300 sm:mt-3 sm:text-base">
        Choose a planet to explore the skills and programming languages in each domain.
      </p>

      <dl className="relative z-10 mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
        {metrics.map(({ label, value, Icon }, index) => (
          <div
            key={label}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/45 px-2 py-3 text-center shadow-inner shadow-white/[0.02] sm:px-3 sm:py-3.5"
          >
            <span className="absolute right-2 top-2 text-amber-300/50">
              <Icon aria-hidden="true" className="size-3.5" />
            </span>
            <dd className="text-xl font-bold tabular-nums text-amber-300 sm:text-2xl">{value}</dd>
            <dt className="mt-1 text-[0.6875rem] capitalize text-slate-400 sm:text-xs">{label}</dt>
            <span
              aria-hidden="true"
              className={`mx-auto mt-2 block h-0.5 rounded-full bg-amber-300/60 ${
                index === 1 ? 'w-8' : 'w-5'
              }`}
            />
          </div>
        ))}
      </dl>

      <div className="relative z-10 mt-6 rounded-xl border border-white/10 bg-slate-950/35 p-3.5 sm:mt-8 sm:p-4">
        <div className="flex items-center gap-2">
          <Compass aria-hidden="true" className="size-3.5 text-amber-400/80" />
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-amber-400/80">
            Navigation protocol
          </p>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-300/75 sm:text-sm sm:leading-6">
          Use the Orbital Index or select a planet to inspect its technology constellation.
        </p>
      </div>
    </motion.div>
  )
}

function CategoryDetails({ category }: Readonly<{ category: SkillCategory }>) {
  const languages = Array.from(new Set(category.skills.flatMap((skill) => skill.languages ?? [])))

  return (
    <motion.div
      {...panelMotion}
      className="relative isolate flex h-full min-h-[25rem] flex-col overflow-hidden"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 520 190"
        preserveAspectRatio="xMidYMax slice"
        className="pointer-events-none absolute -bottom-5 -right-8 h-48 w-[120%] opacity-25 sm:h-56"
        style={{ color: category.color }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <ellipse cx="300" cy="142" rx="235" ry="66" transform="rotate(-9 300 142)" />
          <ellipse cx="300" cy="142" rx="174" ry="47" transform="rotate(-9 300 142)" />
          <ellipse cx="300" cy="142" rx="112" ry="29" transform="rotate(-9 300 142)" />
          <path d="M83 113 178 68l101 24 95-35 62 28" strokeDasharray="3 7" />
        </g>
        <g fill="currentColor">
          <circle cx="83" cy="113" r="3" />
          <circle cx="178" cy="68" r="4" />
          <circle cx="279" cy="92" r="3" />
          <circle cx="374" cy="57" r="5" />
          <circle cx="436" cy="85" r="3" />
        </g>
      </svg>

      <div className="relative z-10 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-10 place-items-center rounded-xl border bg-slate-950/60 text-lg"
          style={{ borderColor: `${category.color}66`, color: category.color }}
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

      <h3 className="relative z-10 mt-4 text-2xl font-bold text-white sm:mt-5 sm:text-3xl">
        {category.name}
      </h3>
      <div
        aria-hidden="true"
        className="relative z-10 mt-3 h-px w-full"
        style={{ background: `linear-gradient(90deg, ${category.color}99, transparent 72%)` }}
      />
      <p className="relative z-10 mt-3 text-sm leading-6 text-slate-300 sm:text-base">
        {category.description}
      </p>

      <div className="relative z-10 mt-5 sm:mt-7">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            Skill nodes
          </h4>
          <span
            className="rounded-full border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-wider"
            style={{
              borderColor: `${category.color}55`,
              backgroundColor: `${category.color}12`,
              color: category.color,
            }}
          >
            {String(category.skills.length).padStart(2, '0')} mapped
          </span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${category.name} skills`}>
          {category.skills.map((skill) => (
            <li
              key={skill.name}
              className="inline-flex items-center gap-2 rounded-lg border bg-slate-950/45 px-2.5 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm"
              style={{
                borderColor: `${skill.color}50`,
              }}
            >
              <span
                aria-hidden="true"
                className="grid size-3 shrink-0 place-items-center rounded-full border"
                style={{ borderColor: `${skill.color}99` }}
              />
              <span
                aria-hidden="true"
                className="-ml-[18px] size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: skill.color }}
              />
              {skill.name}
            </li>
          ))}
        </ul>
      </div>

      {languages.length > 0 && (
        <div className="relative z-10 mt-5 sm:mt-7">
          <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            <Code2 aria-hidden="true" className="size-3.5 text-amber-300/80" />
            Languages
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${category.name} languages`}>
            {languages.map((language) => (
              <li
                key={language}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-xs font-medium text-slate-200"
              >
                {language}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative z-10 mt-auto pt-6 text-xs leading-5 text-slate-400 sm:pt-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-3 py-1.5">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          Each orbiting moon is a skill in this constellation
        </span>
      </div>
    </motion.div>
  )
}
