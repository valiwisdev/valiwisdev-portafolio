'use client'

import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Suspense } from 'react'

import { skillCategories } from './skills-data'
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
      <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-full border border-slate-700/30 bg-slate-900/30 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-amber-400/70 backdrop-blur-xl sm:right-4 sm:top-4">
        Live orbit
      </div>
      <AnimatePresence>
        {selectedCategory && (
          <motion.button
            type="button"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            onClick={onBack}
            className="absolute left-3 top-3 z-20 inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm font-medium text-amber-400 backdrop-blur transition hover:border-amber-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:left-4 sm:top-4"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All skills
          </motion.button>
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

      <p className="pointer-events-none absolute bottom-[8.25rem] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-[0.6875rem] text-slate-300 backdrop-blur sm:bottom-36 sm:text-xs">
        <span className="sm:hidden">Drag, tap, or choose an orbit</span>
        <span className="hidden sm:inline">Drag to rotate · Choose an orbit to inspect</span>
      </p>

      <OrbitIndex selectedCategory={selectedCategory} onSelect={onSelect} />
    </div>
  )
}

function OrbitIndex({
  selectedCategory,
  onSelect,
}: Readonly<Pick<SkillsExplorerProps, 'selectedCategory' | 'onSelect'>>) {
  const selectedIndex = skillCategories.findIndex(
    (category) => category.name === selectedCategory?.name,
  )
  const categoryCount = skillCategories.length
  const totalOrbits = String(categoryCount).padStart(2, '0')
  const currentOrbit = selectedIndex >= 0 ? String(selectedIndex + 1).padStart(2, '0') : 'All'
  const orbitGridStyle = {
    gridTemplateColumns: `repeat(${categoryCount}, minmax(4rem, 1fr))`,
    minWidth: `${categoryCount * 4}rem`,
  }

  return (
    <nav
      aria-label="Skill constellation selector"
      className="absolute inset-x-3 bottom-3 z-20 rounded-lg border border-slate-700/30 bg-slate-900/30 p-2.5 backdrop-blur-xl sm:left-1/2 sm:right-auto sm:w-[calc(100%-2rem)] sm:max-w-xl sm:-translate-x-1/2 sm:p-3"
    >
      <div className="mb-2 flex items-center justify-between px-1 font-mono text-[0.625rem] uppercase tracking-[0.16em]">
        <span className="text-amber-400/70">Orbital index</span>
        <span className="text-white/45">
          {currentOrbit} / {totalOrbits}
        </span>
      </div>

      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="relative grid gap-1" style={orbitGridStyle}>
          {categoryCount > 1 && (
            <div
              aria-hidden="true"
              className="absolute top-5 grid sm:top-[1.375rem]"
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
                onClick={() => onSelect(category)}
                aria-pressed={isSelected}
                className={`group relative z-10 flex min-h-12 flex-col items-center justify-center gap-1 rounded-md px-1 py-1.5 font-mono text-[0.625rem] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:text-xs ${
                  isSelected ? 'text-amber-400' : 'text-white/60 hover:text-amber-400'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-7 place-items-center rounded-full border text-xs transition sm:size-8 sm:text-sm ${
                    isSelected
                      ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                      : 'border-white/15 bg-slate-950 text-white/75 group-hover:border-amber-400/40'
                  }`}
                >
                  {category.icon}
                </span>
                <span className="max-w-full truncate">{category.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
