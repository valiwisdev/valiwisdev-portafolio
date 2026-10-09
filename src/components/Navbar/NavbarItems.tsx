'use client'
import React from 'react'
import { handleSmoothScroll, navbarItems } from './NavbarUtils'

export function NavbarItemsDesktop() {
  return (
    <div className="flex items-center space-x-8">
      {navbarItems.map((item, index) => (
        <React.Fragment key={item.label}>
          <button
            onClick={() => handleSmoothScroll({ href: item.href })}
            className="text-white font-mono font-semibold hover:text-amber-300 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            {item.label}
          </button>
          {index < navbarItems.length - 1 && (
            <div className="w-px h-5 bg-gradient-to-b from-transparent via-amber-400/60 to-transparent"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export function NavbarItemsMobile({ onItemClick }: { onItemClick: () => void }) {
  const handleMobileClick = (href: string) => {
    handleSmoothScroll({ href })
    onItemClick()
  }

  return (
    <div className="flex flex-col space-y-12 text-center">
      {navbarItems.map((item, index, array) => (
        <div key={item.label} className="flex flex-col items-center">
          <button
            onClick={() => handleMobileClick(item.href)}
            className="text-white font-mono  text-2xl font-semibold hover:text-amber-300 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] text-center cursor-pointer py-2"
          >
            {item.label}
          </button>
          {index < array.length - 1 && (
            <div className="mt-6 w-40 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto"></div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function NavbarItems() {
  return <NavbarItemsDesktop />
}
