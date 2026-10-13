'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import NavbarMusicControl from '@/components/ui/NavbarMusicControl'
import { NavbarItemsDesktop, NavbarItemsMobile } from './NavbarItems'
import { handleToggleMenu } from './NavbarUtils'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    handleToggleMenu(isMenuOpen, setIsMenuOpen, setIsAnimating)
  }

  const closeMenu = () => {
    setIsAnimating(false)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const frame = window.requestAnimationFrame(handleScroll)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
        setIsAnimating(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMenuOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 print:hidden ${
        isScrolled
          ? 'bg-gradient-to-r from-[rgba(15,15,64,0.8)] to-[rgba(38,11,112,0.8)] backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative z-[100] grid grid-cols-[1fr_auto] items-center gap-3 py-4 md:grid-cols-[auto_1fr_auto] md:gap-6">
          <Link
            href="/#home"
            className="text-white font-mono  text-lg  md:text-2xl font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:text-amber-400 transition-colors duration-300 cursor-pointer"
          >
            Valiwis
          </Link>

          <div className="hidden justify-self-center md:block">
            <NavbarItemsDesktop />
          </div>

          <div
            aria-label="Quick controls"
            className="flex items-center gap-2 justify-self-end"
            role="group"
          >
            <NavbarMusicControl />
            <button
              onClick={toggleMenu}
              className="grid size-8 place-items-center rounded-full text-white transition-colors hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 md:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navbar-menu"
              title={isMenuOpen ? 'Close menu' : 'Open menu'}
              type="button"
            >
              {isMenuOpen ? (
                <X aria-hidden="true" className="size-6" />
              ) : (
                <Menu aria-hidden="true" className="size-6" />
              )}
            </button>
          </div>
        </div>

        {(isMenuOpen || isAnimating) && (
          <div
            id="mobile-navbar-menu"
            className={`absolute left-0 right-0 top-full z-[99] rounded-b-xl bg-gradient-to-r from-[rgb(15,15,64)] to-[rgb(38,11,112)] px-4 py-2 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-200 md:hidden ${
              isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
            }`}
          >
            <NavbarItemsMobile onItemClick={closeMenu} />
          </div>
        )}
      </div>
    </nav>
  )
}
