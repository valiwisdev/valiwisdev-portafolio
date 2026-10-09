'use client'

import { useState } from 'react'
import { SkillsExplorer } from '@/components/ui/Skills/SkillsExplorer'
import { SkillsInfoPanel } from '@/components/ui/Skills/SkillsInfoPanel'
import type { SkillCategory } from '@/schemas/skill.schema'

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null)

  return (
    <section
      id="skills"
      className="relative min-h-svh overflow-hidden px-3 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.04] blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="mx-auto mb-6 max-w-2xl text-center sm:mb-8">
          <h2 className="text-3xl font-bold leading-none text-white sm:text-5xl md:text-6xl">
            My{' '}
            <span className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.55)]">
              Skills
            </span>
          </h2>
        </header>

        <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(20rem,2fr)] lg:gap-5">
          <SkillsExplorer
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
            onBack={() => setSelectedCategory(null)}
          />
          <SkillsInfoPanel selectedCategory={selectedCategory} />
        </div>
      </div>
    </section>
  )
}
