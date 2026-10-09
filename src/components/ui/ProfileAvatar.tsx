'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
const SocialMediaIcons = dynamic(() => import('./SocialMediaIcons'), { ssr: false })

export default function ProfileAvatar() {
  return (
    <div className="flex justify-center items-center order-1 md:order-2 pb-4 md:pb-0">
      <div className="relative">
        <div className="relative w-38 h-38 md:w-70 md:h-70 rounded-full overflow-hidden">
          <Image
            src="/profile_orange.png"
            alt="Valiwis"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 192px, 320px"
            priority
          />
        </div>
        <SocialMediaIcons />
      </div>
    </div>
  )
}
