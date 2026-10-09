import ContactForm from '@/components/ui/ContactForm'
import { Mail } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="min-h-svh flex items-center justify-center py-20 px-6">
      <div className="max-w-7xl mx-auto w-full relative px-6 pt-2">
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-2 md:col-span-1 text-center md:text-center lg:text-left">
            <h2 className="text-6xl md:text-8xl font-bold mb-8 leading-none">
              <div className="text-white/80 lg:-ml-1">Get in</div>
              <div className="text-amber-400 drop-shadow-[0_0_40px_rgba(251,191,36,0.9)] lg:ml-8 lg:-mt-2">
                Touch
              </div>
            </h2>
            <p className="text-white/90 mb-6 text-center md:text-center lg:text-justify max-w-md mx-auto lg:mx-0 lg:ml-2">
              I&apos;m currently open to new opportunities and collaborations. Whether you have a
              question, a project idea, or just want to say hello, feel free to reach out ! 
            </p>
            <p className="text-white/90 mb-2 text-center md:text-center lg:text-justify max-w-md mx-auto lg:mx-0 lg:ml-2">
              <Mail className="inline-block mr-2 text-amber-400" size={20} />
              <a href="mailto:valiwisdev@outlook.com" className="text-white hover:underline">
                valiwisdev@outlook.com
              </a>
            </p>
          </div>
          <div className="col-span-2 md:col-span-1 flex justify-center">
            <div className="w-full max-w-md">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
