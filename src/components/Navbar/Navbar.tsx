'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NavbarItemsDesktop, NavbarItemsMobile } from './NavbarItems'
import { handleSmoothScroll, handleToggleMenu } from './NavbarUtils'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    handleToggleMenu(isMenuOpen, setIsMenuOpen, setIsAnimating)
  }

  useEffect(() => {
    setIsScrolled(window.scrollY > 50)
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
        setIsAnimating(false)
      }
    }
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-[rgba(15,15,64,0.8)] to-[rgba(38,11,112,0.8)] backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={() => handleSmoothScroll({ href: '#home' })}
            className="text-white font-mono  text-lg  md:text-2xl font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:text-amber-400 transition-colors duration-300 cursor-pointer"
          >
            Valiwis
          </button>

          <div className="hidden md:block">
            <NavbarItemsDesktop />
          </div>

          <button
            onClick={toggleMenu}
            className={`md:hidden text-white hover:text-amber-400 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Open Menu"
            title="Open Menu"
            type="button"
          >
            <Menu size={24} />
          </button>
        </div>

        {(isMenuOpen || isAnimating) && (
          <div
            className={`md:hidden fixed top-0 left-0 w-full h-full z-[9999] bg-gray-900 transition-opacity duration-300 ${
              isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
            }}
          >
            <div
              className={`relative h-full flex items-center justify-center pb-16 transform transition-all duration-500 ${
                isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <button
                onClick={toggleMenu}
                className={`absolute top-4 right-4 text-white hover:text-amber-400 transition-all duration-300 z-10 ${
                  isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <X size={32} />
              </button>
              <div
                className={`flex items-center justify-center w-full transform transition-all duration-500 delay-100 ${
                  isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <NavbarItemsMobile onItemClick={toggleMenu} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
