'use client'

import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { Suspense, useState } from 'react'

import { skillCategories } from '@/data/skills'
import { RoundedGoldenButton } from '@/components/ui/GoldenButtons'
import { SkillsScene } from './SkillsScene'
import type { SkillCategory } from '@/schemas/skill.schema'

interface SkillsExplorerProps {
  selectedCategory: SkillCategory | null
  onSelect: (category: SkillCategory) => void
  onBack: () => void
}

export function SkillsExplorer({
  selectedCategory,
  onSelect,
  onBack,
}: Readonly<SkillsExplorerProps>) {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <div className="relative min-h-[25rem] overflow-hidden rounded-xl border border-slate-700/30 bg-slate-900/30 shadow-2xl backdrop-blur-xl sm:min-h-[30rem] lg:min-h-[34rem]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-slate-950/45 to-transparent" />
      <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-full border border-amber-400 bg-transparent px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-amber-400 shadow-sm shadow-amber-400/10 backdrop-blur-xl sm:right-4 sm:top-4">
        Live orbit
      </div>
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 top-3 z-20 sm:left-4 sm:top-4"
          >
            <RoundedGoldenButton
              type="button"
              onClick={onBack}
              size="sm"
              className="inline-flex min-h-11 items-center gap-2 !px-3 !py-2 !text-xs focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All skills
            </RoundedGoldenButton>
          </motion.div>
        )}
      </AnimatePresence>

      <Canvas
        className="touch-pan-y"
        camera={{ position: [0, 7, 20], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        aria-label="Interactive 3D model of skill categories orbiting a central star"
        role="img"
      >
        <Suspense fallback={null}>
          <SkillsScene
            selectedCategory={selectedCategory}
            onSelect={onSelect}
            reduceMotion={reduceMotion}
          />
        </Suspense>
      </Canvas>

      <OrbitIndex selectedCategory={selectedCategory} onSelect={onSelect} />
    </div>
  )
}

function OrbitIndex({
  selectedCategory,
  onSelect,
}: Readonly<Pick<SkillsExplorerProps, 'selectedCategory' | 'onSelect'>>) {
  const [isExpanded, setIsExpanded] = useState(false)
  const selectedIndex = skillCategories.findIndex(
    (category) => category.name === selectedCategory?.name,
  )
  const categoryCount = skillCategories.length
  const totalOrbits = String(categoryCount).padStart(2, '0')
  const currentOrbit = selectedIndex >= 0 ? String(selectedIndex + 1).padStart(2, '0') : 'All'
  return (
    <nav
      aria-label="Skill constellation selector"
      className="absolute inset-x-3 bottom-3 z-20 rounded-lg border border-slate-700/30 bg-slate-900/30 p-2 backdrop-blur-xl sm:inset-x-4 sm:w-auto sm:translate-x-0 sm:p-3 lg:bg-transparent lg:backdrop-blur-none"
    >
      <div className="mb-1 flex items-center justify-between px-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] sm:mb-2">
        <span className="text-amber-400/70">Orbital index</span>
        <span className="text-white/45">
          {currentOrbit} / {totalOrbits}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 px-1 pb-1 sm:hidden">
        <div className="flex min-w-0 items-center gap-2 text-base font-medium text-white/75">
          {selectedCategory ? (
            <>
              <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-amber-400/50 bg-amber-400/10 text-base">
                {selectedCategory.icon}
              </span>
              <span className="truncate">{selectedCategory.name}</span>
            </>
          ) : (
            <span>Choose a category</span>
          )}
        </div>
        <RoundedGoldenButton
          type="button"
          ariaLabel={isExpanded ? 'Show fewer skill categories' : 'Show more skill categories'}
          ariaExpanded={isExpanded}
          onClick={() => setIsExpanded((expanded) => !expanded)}
          size="sm"
          className="inline-flex min-h-9 shrink-0 items-center gap-1 !rounded-md !px-2 !py-1 !text-xs focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          {isExpanded ? 'Show less' : 'Show more'}
          <ChevronDown aria-hidden="true" className={`size-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </RoundedGoldenButton>
      </div>

      <div className={`${isExpanded ? 'grid' : 'hidden'} relative grid-cols-3 gap-1 sm:grid sm:grid-cols-6`}>
          {categoryCount > 1 && (
            <div
              aria-hidden="true"
              className="absolute top-5 hidden sm:grid sm:top-[1.375rem]"
              style={{
                left: `${50 / categoryCount}%`,
                right: `${50 / categoryCount}%`,
                gridTemplateColumns: `repeat(${categoryCount - 1}, minmax(0, 1fr))`,
              }}
            >
              {skillCategories.slice(0, -1).map((category) => (
                <span
                  key={`${category.name}-connector`}
                  className="mx-3 h-px bg-gradient-to-r from-amber-400/5 via-amber-400/35 to-amber-400/5 sm:mx-4"
                />
              ))}
            </div>
          )}
          {skillCategories.map((category) => {
            const isSelected = category.name === selectedCategory?.name

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => {
                  onSelect(category)
                  setIsExpanded(false)
                }}
                aria-pressed={isSelected}
                className={`group relative z-10 flex min-h-14 w-full flex-col items-center justify-center gap-1 rounded-md px-1 py-1 font-mono text-sm leading-tight transition focus-visible:outline-none sm:py-1.5 sm:text-xs ${
                  isSelected ? 'text-amber-400' : 'text-white/60 hover:text-amber-400'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-8 place-items-center rounded-full border text-base transition group-hover:scale-105 group-hover:border-amber-400 group-hover:bg-transparent group-hover:text-amber-400 group-hover:shadow-md group-hover:shadow-amber-400/20 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-amber-400 sm:size-8 sm:text-sm ${
                    isSelected
                      ? 'border-2 border-amber-400 bg-transparent text-amber-400 shadow-md shadow-amber-400/20'
                      : 'border-white/15 bg-slate-950 text-white/75'
                  }`}
                >
                  {category.icon}
                </span>
                <span className="max-w-full text-center sm:whitespace-nowrap sm:font-sans sm:text-[0.6875rem] lg:text-xs">
                  {category.name}
                </span>
              </button>
            )
          })}
      </div>
    </nav>
  )
}
