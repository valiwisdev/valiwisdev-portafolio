'use client'

import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion, useDragControls, useReducedMotion } from 'framer-motion'
import { ArrowLeft, LayoutGrid, Orbit, Pause, Play, X } from 'lucide-react'
import { Suspense, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { skillCategories } from '@/data/skills'
import { CircularGoldenButton, RoundedGoldenButton } from '@/components/ui/GoldenButtons'
import { SkillsScene } from './SkillsScene'
import type { SkillCategory } from '@/schemas/skill.schema'

const animationSpeeds = [0.25, 0.5, 1, 2] as const

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
  const prefersReducedMotion = useReducedMotion() ?? false
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null)
  const [speedIndex, setSpeedIndex] = useState(2)
  const motionEnabled = motionOverride ?? !prefersReducedMotion
  const animationSpeed = animationSpeeds[speedIndex]

  return (
    <div className="relative min-h-[25rem] overflow-hidden rounded-xl border border-slate-700/30 bg-slate-900/30 shadow-2xl backdrop-blur-xl sm:min-h-[30rem] lg:min-h-[34rem]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-slate-950/45 to-transparent" />
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 sm:right-4 sm:top-4">
        <CircularGoldenButton
          onClick={() => setMotionOverride(!motionEnabled)}
          ariaLabel={motionEnabled ? 'Pause planet motion' : 'Enable planet motion'}
          ariaPressed={motionEnabled}
          title={motionEnabled ? 'Pause planet motion' : 'Enable planet motion'}
          size="sm"
          className="inline-flex !h-8 !w-8 !p-0 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:!w-auto sm:!gap-1.5 sm:!px-2.5 sm:!py-1 sm:!font-mono sm:!text-[0.625rem] sm:!uppercase sm:!tracking-[0.12em]"
        >
          {motionEnabled ? (
            <Pause aria-hidden="true" className="size-3 text-amber-400" />
          ) : (
            <Play aria-hidden="true" className="size-3 fill-amber-400 text-amber-400" />
          )}
          <span className="hidden sm:inline">{motionEnabled ? 'Live orbit' : 'Motion paused'}</span>
        </CircularGoldenButton>
        <button
          type="button"
          onClick={() => setSpeedIndex((index) => (index + 1) % animationSpeeds.length)}
          aria-label={`Animation speed ${animationSpeed}x. Click to change speed.`}
          title="Change animation speed"
          className="inline-flex min-h-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-slate-950/40 px-2.5 py-1 font-mono text-[0.625rem] font-semibold tabular-nums text-white/75 backdrop-blur-xl transition-colors hover:border-amber-400/60 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          {animationSpeed}x
        </button>
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
              ariaLabel="All skills"
              title="All skills"
              size="sm"
              className="inline-flex !h-8 !w-[3.25rem] items-center justify-center gap-1 !px-1.5 !py-1 !text-[0.625rem] focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <ArrowLeft aria-hidden="true" className="size-3.5 shrink-0" />
              <span>All</span>
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
            reduceMotion={!motionEnabled}
            timeScale={animationSpeed}
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
  const pickerTriggerRef = useRef<HTMLButtonElement>(null)
  const pickerCloseRef = useRef<HTMLButtonElement>(null)
  const pickerDragControls = useDragControls()
  const selectedIndex = skillCategories.findIndex(
    (category) => category.name === selectedCategory?.name,
  )
  const categoryCount = skillCategories.length
  const totalOrbits = String(categoryCount).padStart(2, '0')
  const currentOrbit = selectedIndex >= 0 ? String(selectedIndex + 1).padStart(2, '0') : 'All'

  useEffect(() => {
    if (!isExpanded) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    pickerCloseRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false)
        pickerTriggerRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isExpanded])
  return (
    <nav
      aria-label="Skill constellation selector"
      className="absolute inset-x-3 bottom-3 z-20 rounded-lg border border-slate-700/30 bg-transparent p-2 sm:inset-x-4 sm:w-auto sm:translate-x-0 sm:p-3"
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
              <CircularGoldenButton
                buttonRef={pickerTriggerRef}
                ariaLabel="Open skill category picker"
                ariaExpanded={isExpanded}
                title="Change skill category"
                onClick={() => setIsExpanded(true)}
                size="sm"
                className="!shrink-0 !p-0 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Orbit className="size-4" />
              </CircularGoldenButton>
              <span className="truncate">{selectedCategory.name}</span>
            </>
          ) : (
            <span>Choose a category</span>
          )}
        </div>
        <CircularGoldenButton
          buttonRef={pickerTriggerRef}
          ariaLabel="Open skill category picker"
          ariaExpanded={isExpanded}
          ariaHasPopup="dialog"
          title="Choose a skill category"
          onClick={() => setIsExpanded(true)}
          size="sm"
          className="!shrink-0 !p-0 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <LayoutGrid aria-hidden="true" className="size-4" />
        </CircularGoldenButton>
      </div>

      <div className="relative hidden grid-cols-3 gap-1 sm:grid sm:grid-cols-6">
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

      {isExpanded &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-end sm:hidden">
            <button
              type="button"
              aria-label="Close skill category picker"
              onClick={() => setIsExpanded(false)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
            />
            <motion.section
              drag="y"
              dragControls={pickerDragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 500 }}
              dragElastic={0.08}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90 || info.velocity.y > 500) {
                  setIsExpanded(false)
                }
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="skill-picker-title"
              className="relative z-10 max-h-[78dvh] w-full overflow-y-auto rounded-t-2xl border border-b-0 border-slate-700/50 px-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-3 shadow-[0_-20px_60px_rgba(0,0,0,0.4)]"
              style={{ background: 'var(--background)' }}
            >
              <div
                className="mb-4 cursor-grab touch-none active:cursor-grabbing"
                onPointerDown={(event) => pickerDragControls.start(event)}
              >
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/25" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-amber-400/75">
                      Orbital index · {totalOrbits} categories
                    </p>
                    <h2 id="skill-picker-title" className="mt-1 text-lg font-semibold text-white">
                      Choose a category
                    </h2>
                  </div>
                  <button
                    ref={pickerCloseRef}
                    type="button"
                    aria-label="Close category picker"
                    onClick={() => setIsExpanded(false)}
                    className="grid size-10 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    <X aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {skillCategories.map((category, index) => {
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
                      className={`flex min-h-16 items-center gap-3 rounded-lg border px-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                        isSelected
                          ? 'border-amber-400/50 bg-amber-400/10 text-amber-300'
                          : 'border-white/10 bg-white/[0.03] text-white/80 hover:border-white/25 hover:bg-white/[0.07]'
                      }`}
                    >
                      <span aria-hidden="true" className="text-xl">
                        {category.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{category.name}</span>
                        <span className="mt-0.5 block font-mono text-[0.625rem] text-white/45">
                          {String(index + 1).padStart(2, '0')} / {totalOrbits}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.section>
          </div>,
          document.body,
        )}
    </nav>
  )
}
