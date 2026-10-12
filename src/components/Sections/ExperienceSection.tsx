'use client'

import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ExperienceCard } from '../ui/ExperienceCard'
import { CircularGoldenButton } from '../ui/GoldenButtons'
import { experiences } from '@/components/ui/Experience/experience-data'

export default ExperienceSection

function ExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)

  const nextExperience = () => {
    setSlideDirection(1)
    setCurrentIndex((prev) => (prev + 1) % experiences.length)
  }

  const prevExperience = () => {
    setSlideDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
  }

  const selectExperience = (index: number) => {
    setSlideDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <section
      id="experience"
      className="flex items-start justify-center overflow-hidden px-3 pb-10 pt-6 sm:px-6 md:min-h-svh md:px-8 md:pb-12 md:pt-10 lg:pb-16 lg:pt-8 xl:pb-20 xl:pt-10"
    >
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col">
        <div className="mb-8 flex-shrink-0 text-center md:mb-10 lg:mb-8 xl:mb-10">
          <h2 className="flex flex-col items-center justify-center gap-1 text-center leading-none md:gap-2">
            <span className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">My</span>
            <span className="text-4xl font-bold text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] md:text-5xl lg:text-6xl">
              Experience
            </span>
          </h2>
        </div>
        <div className="relative flex-1 flex flex-col">
          <div className="flex-1 flex flex-col justify-center">
            <div className="relative w-full overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
                <motion.div
                  key={experiences[currentIndex].title}
                  custom={slideDirection}
                  variants={{
                    enter: (direction: number) => ({
                      x: direction * 40,
                      opacity: 0,
                      transition: {
                        x: { type: 'spring', stiffness: 260, damping: 30 },
                        opacity: { duration: 0.16, ease: 'easeOut' },
                      },
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        x: { type: 'spring', stiffness: 260, damping: 30 },
                        opacity: { duration: 0.24, ease: 'easeOut' },
                      },
                    },
                    exit: (direction: number) => ({
                      x: direction * -40,
                      opacity: 0,
                      transition: {
                        x: { duration: 0.2, ease: 'easeIn' },
                        opacity: { duration: 0.16, ease: 'easeIn' },
                      },
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <ExperienceCard
                    experience={experiences[currentIndex]}
                    viewingIndex={currentIndex}
                    myIndex={currentIndex}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex flex-shrink-0 items-center justify-center gap-5 sm:gap-8 md:mt-8">
            <CircularGoldenButton
              onClick={prevExperience}
              disabled={currentIndex === 0}
              size="md"
              ariaLabel="Previous experience"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </CircularGoldenButton>

            <div className="flex justify-center gap-3">
              {experiences.map((experience, index) => (
                <button
                  key={experience.title}
                  onClick={() => selectExperience(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-3 h-3 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                      : 'w-2 h-2 bg-gray-500 hover:bg-amber-400 hover:w-2.5 hover:h-2.5 hover:shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                  }`}
                />
              ))}
            </div>

            <CircularGoldenButton
              onClick={nextExperience}
              disabled={currentIndex === experiences.length - 1}
              size="md"
              ariaLabel="Next experience"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </CircularGoldenButton>
          </div>
        </div>
      </div>
    </section>
  )
}
