'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { Experience } from '@/schemas/experience.schema'

interface ExperienceCardProps {
  experience: Experience
  viewingIndex: number
  myIndex: number
}

export function ExperienceCard({ experience, viewingIndex, myIndex }: Readonly<ExperienceCardProps>) {
  const [expanded, setExpanded] = useState(false)
  const isExpanded = viewingIndex === myIndex && expanded

  return (
    <div className="group relative animate-fade-in">
      <div className="flex items-center justify-center px-4 md:px-2">
        <div className="w-full max-w-4xl relative">
          <div className="relative bg-slate-900/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-3 sm:p-4 md:p-6 transition-all duration-500 shadow-2xl">
            <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent transition-all duration-500" />

            <div className="relative z-10">
              {/* Header — always visible */}
              <div className="flex flex-col gap-3 md:gap-4 mb-3 md:mb-6">
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight text-balance">
                    {experience.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 rounded-full animate-pulse" />
                    <span className="text-sm sm:text-base font-semibold text-amber-400">
                      {experience.company}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium text-xs md:text-sm">{experience.location}</span>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg px-2 py-1 transition-all duration-300 self-start">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {experience.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop: full content always visible */}
              <div className="hidden md:block">
                <div className="mb-6">
                  <p className="text-slate-200 leading-relaxed text-sm font-light text-pretty">
                    {experience.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-white font-bold text-base flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-slate-900 rounded-full" />
                      </div>
                      Key Achievements
                    </h4>
                    <div className="space-y-2">
                      {experience.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2 p-1 rounded-lg">
                          <div className="w-1 h-1 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-slate-300 text-xs leading-relaxed flex-1">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-bold text-base flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-slate-900 rounded-full" />
                      </div>
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {experience.technologies.map((tech, i) => (
                        <Badge
                          key={i}
                          className="bg-slate-800/40 border border-slate-600/30 text-slate-200 px-1.5 py-0.5 text-xs font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:hidden">
                <div className="mb-3">
                  <p className="text-slate-200 leading-relaxed text-xs font-light text-pretty">
                    {experience.description}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold hover:bg-amber-400/20 hover:border-amber-400/50 transition-all duration-300 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Show less' : 'Show more'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {!isExpanded && (
                    <span className="text-[10px] text-amber-100/50">
                      Achievements & technologies
                    </span>
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-white font-bold text-sm flex items-center gap-2">
                            <div className="w-3 h-3 bg-amber-400 rounded-full flex items-center justify-center">
                              <div className="w-1 h-1 bg-slate-900 rounded-full" />
                            </div>
                            Key Achievements
                          </h4>
                          <div className="space-y-1.5">
                            {experience.achievements.map((achievement, i) => (
                              <div key={i} className="flex items-start gap-2 p-1 rounded-lg">
                                <div className="w-1 h-1 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                                <span className="text-slate-300 text-xs leading-relaxed flex-1">
                                  {achievement}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-white font-bold text-sm flex items-center gap-2">
                            <div className="w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center">
                              <div className="w-1 h-1 bg-slate-900 rounded-full" />
                            </div>
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {experience.technologies.map((tech, i) => (
                              <Badge
                                key={i}
                                className="bg-slate-800/40 border border-slate-600/30 text-slate-200 px-1.5 py-0.5 text-xs font-medium"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-slate-400/20 rounded-full animate-pulse"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${15 + i * 25}%`,
                    animationDelay: `${i * 1}s`,
                    animationDuration: `${2 + i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-amber-400/5 to-transparent opacity-30 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
