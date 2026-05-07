'use client'

import { ChevronDown } from 'lucide-react'
import { handleSmoothScroll } from '../Navbar/NavbarUtils'

export default function ScrollButton() {
  return (
    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:bottom-0 z-20">
      <div
        className="text-amber-400 animate-bounce flex flex-col items-center cursor-pointer"
        onClick={() => {
          handleSmoothScroll({ href: '#skills' })
        }}
      >
        <ChevronDown className="w-8 h-8 md:w-6 md:h-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
      </div>
    </div>
  )
}
