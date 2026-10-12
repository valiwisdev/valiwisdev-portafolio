import Link from 'next/link'
import { introductionWords } from '@/constants/words'
import { SocialMediaIconsProvider } from '@/context/SocialMediaIconsContext'
import { TypewriterEffectSmooth } from '../ui/TypewritterEffect'
import ProfileAvatar from '../ui/ProfileAvatar'
import ScrollButton from '../ui/ScrollButton'
import HomeControls from '../ui/HomeControls'

export default function HomeSection() {
  return (
    <section id="home" className="relative min-h-svh">
      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col items-center justify-center gap-5 px-5 pb-16 pt-24 sm:px-8 md:gap-8 md:px-10 md:pb-20 md:pt-28 lg:grid lg:grid-cols-2 lg:justify-items-center lg:gap-12 lg:px-8 lg:pb-24 lg:pt-28 xl:gap-16">
        <SocialMediaIconsProvider>
          <HomeControls />

          <div className="order-2 mt-2 text-center lg:order-1 lg:mt-0 lg:text-left">
            <div className="inline-block">
              <TypewriterEffectSmooth words={introductionWords} />
              <div className="h-px bg-gradient-to-r from-amber-400 to-transparent w-0 animate-[growWidth_1s_ease-out_forwards]"></div>
            </div>
            <div className="mt-3 md:mt-5 lg:mt-10">
              <p className="px-3 text-sm font-light leading-relaxed text-white select-none sm:text-base md:px-0 md:text-xl lg:max-w-xl lg:text-3xl">
                I&apos;m a software developer from{' '}
                <span className="font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Colombia.
                </span>
              </p>
            </div>

            <div className="mt-5 md:mt-7 lg:mt-12">
              <Link
                href="/cv"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 border-amber-400 bg-transparent px-6 py-3 font-mono text-sm font-semibold text-amber-400 shadow-lg shadow-amber-400/10 transition-all hover:border-amber-300 hover:text-amber-300 hover:shadow-xl hover:shadow-amber-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              >
                Download CV
              </Link>
            </div>
          </div>

          <ProfileAvatar />
        </SocialMediaIconsProvider>
        <ScrollButton />
      </div>
    </section>
  )
}
