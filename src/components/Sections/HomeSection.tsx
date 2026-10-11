import Link from 'next/link'
import { introductionWords } from '@/constants/words'
import { SocialMediaIconsProvider } from '@/context/SocialMediaIconsContext'
import { TypewriterEffectSmooth } from '../ui/TypewritterEffect'
import ProfileAvatar from '../ui/ProfileAvatar'
import ScrollButton from '../ui/ScrollButton'
import HomeControls from '../ui/HomeControls'

export default function HomeSection() {
  return (
    <section id="home" className="min-h-[100vh] md:min-h-svh relative">
      <div className="max-w-7xl mx-auto min-h-[80vh] md:min-h-[calc(100svh-6rem)] flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 items-center justify-center md:justify-items-center relative px-6 pt-19 md:pt-24">
        <SocialMediaIconsProvider>
          <HomeControls />

          <div className="text-center md:text-left order-2 md:order-1 mt-3 md:mt-0">
            <div className="inline-block">
              <TypewriterEffectSmooth words={introductionWords} />
              <div className="h-px bg-gradient-to-r from-amber-400 to-transparent w-0 animate-[growWidth_1s_ease-out_forwards]"></div>
            </div>
            <div className="mt-2 md:mt-10 space-y-2 md:space-y-8">
              <div className="md:hidden text-2xs font-light text-white leading-relaxed select-none px-4 space-y-2">
                <p>I&apos;m a software developer</p>
                <p>
                  from{' '}
                  <span className="font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                    Colombia.
                  </span>
                </p>
              </div>
              <p className="hidden md:block text-3xl font-light text-white leading-relaxed select-none">
                I&apos;m a software developer from{' '}
                <span className="font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Colombia.
                </span>
              </p>
            </div>

            <div className="mt-4 md:mt-12">
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
