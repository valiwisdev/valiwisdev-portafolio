'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { MousePointerClick } from 'lucide-react'
import { useSocialMediaIcons } from '@/context/SocialMediaIconsContext'
const SocialMediaIcons = dynamic(() => import('./SocialMediaIcons'), { ssr: false })

export default function ProfileAvatar() {
  const { showSocialIcons, toggleSocialIcons } = useSocialMediaIcons()

  return (
    <div className="order-1 flex items-center justify-center pb-2 md:pb-0 lg:order-2">
      <div className="relative flex flex-col items-center">
        <div className="relative">
          <div className="relative size-36 rounded-full sm:size-40 md:size-56 lg:size-70 xl:size-80">
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <Image
                src="/profile_orange.png"
                alt="Valiwis"
                fill
                className="object-cover"
                sizes="(max-width: 639px) 144px, (max-width: 767px) 160px, (max-width: 1023px) 224px, (max-width: 1279px) 280px, 320px"
                priority
              />
            </div>
            <button
              onClick={toggleSocialIcons}
              type="button"
              className="group absolute bottom-2 left-1/2 z-20 grid size-7 -translate-x-1/2 cursor-pointer place-items-center rounded-full border-2 border-amber-400 bg-indigo-950 text-amber-300 shadow-md transition-transform duration-200 hover:scale-110 focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-950 sm:bottom-3 sm:size-8 lg:size-9"
              aria-label={showSocialIcons ? 'Hide social links' : 'Show social links'}
              aria-expanded={showSocialIcons}
              title={showSocialIcons ? 'Hide social links' : 'Show social links'}
            >
              <MousePointerClick aria-hidden="true" className="size-3.5 sm:size-4 lg:size-[18px]" />
            </button>
          </div>
          <SocialMediaIcons />
        </div>
      </div>
    </div>
  )
}
