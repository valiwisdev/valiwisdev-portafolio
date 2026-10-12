'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
const SocialMediaIcons = dynamic(() => import('./SocialMediaIcons'), { ssr: false })

export default function ProfileAvatar() {
  return (
    <div className="order-1 flex items-center justify-center pb-2 md:pb-0 lg:order-2">
      <div className="relative">
        <div className="relative size-36 overflow-hidden rounded-full sm:size-40 md:size-56 lg:size-70 xl:size-80">
          <Image
            src="/profile_orange.png"
            alt="Valiwis"
            fill
            className="object-cover"
            sizes="(max-width: 639px) 144px, (max-width: 767px) 160px, (max-width: 1023px) 224px, (max-width: 1279px) 280px, 320px"
            priority
          />
        </div>
        <SocialMediaIcons />
      </div>
    </div>
  )
}
