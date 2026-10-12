import ContactForm from '@/components/ui/ContactForm'
import { Mail } from 'lucide-react'

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-0 items-start justify-center px-4 pb-8 pt-6 sm:px-6 md:px-8 md:pb-12 md:pt-10 lg:min-h-0 lg:pb-28 lg:pt-8 xl:pb-36 xl:pt-10"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="text-center lg:text-left">
            <h2 className="mb-6 text-4xl font-bold leading-none md:mb-8 md:text-5xl lg:text-6xl">
              <div className="text-white/80">Get in</div>
              <div className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]">
                Touch
              </div>
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-center text-sm leading-6 text-white/90 sm:text-base md:leading-7 lg:mx-0 lg:max-w-md lg:text-left">
              I&apos;m currently open to new opportunities and collaborations. Whether you have a
              question, a project idea, or just want to say hello, feel free to reach out !
            </p>
            <p className="mx-auto mb-2 max-w-md text-center text-sm text-white/90 sm:text-base lg:mx-0 lg:text-left">
              <Mail className="inline-block mr-2 text-amber-400" size={20} />
              <a href="mailto:valiwisdev@outlook.com" className="text-white hover:underline">
                valiwisdev@outlook.com
              </a>
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-lg lg:max-w-md">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
