'use client'

import { useSocialMediaIcons } from '@/context/SocialMediaIconsContext'
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaDiscord,
} from 'react-icons/fa6'

export default function SocialMediaIcons() {
  const { showSocialIcons } = useSocialMediaIcons()

  return (
    <div
      className={`absolute inset-0 transition-all duration-300 ${
        showSocialIcons
          ? 'opacity-100 scale-100 animate-spin'
          : 'opacity-0 scale-95 pointer-events-none'
      }`}
      style={{
        animationDuration: showSocialIcons ? '120s' : undefined,
        animationDelay: showSocialIcons ? '300ms' : undefined,
      }}
    >
      <a
        href="https://github.com/valiwisdev"
        className="absolute top-1/2 -translate-y-1/2 -left-12 md:-left-20 bg-black/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-amber-400/20 transition-all duration-300 group transform hover:scale-110"
        aria-label="GitHub"
      >
        <FaGithub className="social-icon" />
      </a>

      <a
        href="https://www.linkedin.com/in/valeria-caro-ramirez/"
        className="absolute -top-8 md:-top-12 left-3 md:left-8 bg-black/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-amber-400/20 transition-all duration-300 group hover:scale-110"
        aria-label="LinkedIn"
      >
        <FaLinkedin className="social-icon" />
      </a>

      <a
        href="https://x.com/itsvaliwis"
        className="absolute -top-8 md:-top-12 right-3 md:right-8 bg-black/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-amber-400/20 transition-all duration-300 group hover:scale-110"
        aria-label="X"
      >
        <FaXTwitter className="social-icon" />
      </a>

      <a
        href="https://www.instagram.com/itsvaliwis"
        className="absolute top-1/2 -translate-y-1/2 -right-12 md:-right-20 bg-black/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-amber-400/20 transition-all duration-300 group transform hover:scale-110"
        aria-label="Instagram"
      >
        <FaInstagram className="social-icon" />
      </a>

      <a
        href="https://www.youtube.com/@valecodes"
        className="absolute -bottom-8 md:-bottom-12 left-3 md:left-8 bg-black/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-amber-400/20 transition-all duration-300 group hover:scale-110"
        aria-label="YouTube"
      >
        <FaYoutube className="social-icon" />
      </a>

      <a
        href="https://discord.com/users/itsvaliwis"
        className="absolute -bottom-8 md:-bottom-12 right-3 md:right-8 bg-black/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-amber-400/20 transition-all duration-300 group hover:scale-110"
        aria-label="Discord"
      >
        <FaDiscord className="social-icon" />
      </a>
    </div>
  )
}
