'use client'

import { useState } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ExperienceCard } from '../ui/ExperienceCard'
import { CircularGoldenButton } from '../ui/GoldenButtons'
import experiences from '@/constants/experience.json'

export { ExperienceSection }
export default ExperienceSection

function ExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextExperience = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length)
  }

  const prevExperience = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
  }

  return (
    <section
      id="experience"
      className="min-h-svh flex items-center justify-center py-20 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto h-full w-full flex flex-col">
        <div className="text-center flex-shrink-0 mb-8 md:mb-14">
          <h2 className="flex flex-col items-center justify-center gap-1 md:gap-2 leading-none text-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">My</span>
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] whitespace-nowrap">
              Experience
            </span>
          </h2>
        </div>
        <div className="relative flex-1 flex flex-col">
          <div className="flex-1 flex flex-col justify-center">
            <div className="relative">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {experiences.map((experience) => (
                  <div key={experience.title} className="w-full flex-shrink-0 px-2 md:px-0">
                    <ExperienceCard experience={experience} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 flex-shrink-0">
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
                  onClick={() => setCurrentIndex(index)}
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
