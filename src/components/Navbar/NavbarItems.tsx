'use client'
import React from 'react'
import Link from 'next/link'
import { navbarItems } from './NavbarUtils'

export function NavbarItemsDesktop() {
  return (
    <div className="flex items-center space-x-8">
      {navbarItems.map((item, index) => (
        <React.Fragment key={item.label}>
          <Link
            href={`/${item.href}`}
            className="text-white font-mono font-semibold hover:text-amber-300 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            {item.label}
          </Link>
          {index < navbarItems.length - 1 && (
            <div className="w-px h-5 bg-gradient-to-b from-transparent via-amber-400/60 to-transparent"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export function NavbarItemsMobile({ onItemClick }: Readonly<{ onItemClick: () => void }>) {
  return (
    <div className="flex w-full flex-col gap-1 text-center">
      {navbarItems.map((item) => (
        <div key={item.label}>
          <Link
            href={`/${item.href}`}
            onClick={onItemClick}
            className="flex min-h-12 items-center justify-center rounded-lg py-3 text-center font-mono text-base font-semibold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-colors duration-300 hover:bg-white/5 hover:text-amber-300 focus-visible:bg-white/5 focus-visible:text-amber-300 focus-visible:outline-none"
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default function NavbarItems() {
  return <NavbarItemsDesktop />
}
