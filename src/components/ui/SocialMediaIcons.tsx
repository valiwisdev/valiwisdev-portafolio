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
  { href: 'https://github.com/valiwisdev', label: 'GitHub', Icon: FaGithub, left: '50%', top: '0%' },
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
      className={`absolute -inset-[16%] transition-all duration-300 md:-inset-[12%] ${
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
          className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-amber-400/20 md:p-3"
          style={{ left, top }}
        >
          <Icon className="social-icon" />
        </a>
      ))}
    </div>
  )
}
