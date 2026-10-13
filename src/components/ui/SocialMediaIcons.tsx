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

const socialLinks = [
  {
    href: 'https://github.com/valiwisdev',
    label: 'GitHub',
    Icon: FaGithub,
    left: '50%',
    top: '0%',
  },
  {
    href: 'https://www.linkedin.com/in/valiwisdev/',
    label: 'LinkedIn',
    Icon: FaLinkedin,
    left: '93.3%',
    top: '25%',
  },
  { href: 'https://x.com/itsvaliwis', label: 'X', Icon: FaXTwitter, left: '93.3%', top: '75%' },
  {
    href: 'https://www.instagram.com/itsvaliwis',
    label: 'Instagram',
    Icon: FaInstagram,
    left: '50%',
    top: '100%',
  },
  {
    href: 'https://www.youtube.com/@valecodes',
    label: 'YouTube',
    Icon: FaYoutube,
    left: '6.7%',
    top: '75%',
  },
  {
    href: 'https://discord.com/users/itsvaliwis',
    label: 'Discord',
    Icon: FaDiscord,
    left: '6.7%',
    top: '25%',
  },
] as const

export default function SocialMediaIcons() {
  const { showSocialIcons } = useSocialMediaIcons()

  return (
    <div
      className={`pointer-events-none absolute -inset-[20%] transition-all duration-300 sm:-inset-[18%] md:-inset-[15%] lg:-inset-[12%] ${
        showSocialIcons
          ? 'opacity-100 scale-100 animate-spin'
          : 'opacity-0 scale-95 pointer-events-none'
      }`}
      style={{
        animationDuration: showSocialIcons ? '120s' : undefined,
        animationDelay: showSocialIcons ? '300ms' : undefined,
      }}
    >
      {socialLinks.map(({ href, label, Icon, left, top }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="pointer-events-auto group absolute grid size-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/15 bg-indigo-950/80 text-white shadow-md shadow-black/25 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-amber-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:size-11 lg:size-12"
          style={{ left, top }}
        >
          <Icon className="social-icon" />
        </a>
      ))}
    </div>
  )
}
