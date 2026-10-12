'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactSchema, type TContact } from '@/schemas/contact.schema'
import { sendEmail } from '@/lib/emailjs'
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { RoundedGoldenButton } from './GoldenButtons'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TContact>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (data: TContact) => {
    setIsSubmitting(true)
    setIsSuccess(false)

    try {
      await sendEmail(data)
      setIsSuccess(true)
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeSuccessPopup = () => {
    reset()
    setIsSuccess(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      <div className="flex flex-col gap-2">
        <input
          {...register('name')}
          type="text"
          id="name"
          className="p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-200"
          placeholder="Name"
        />
        {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <input
          {...register('email')}
          type="email"
          id="email"
          className="p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-200"
          placeholder="Email"
        />
        {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          {...register('message')}
          id="message"
          className="p-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-200 resize-none"
          placeholder="Message"
          rows={5}
        />
        {errors.message && (
          <span className="text-red-400 text-xs mt-1">{errors.message.message}</span>
        )}
      </div>

      <RoundedGoldenButton isSubmitting={isSubmitting} type="submit">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </RoundedGoldenButton>

      </form>
      {isSuccess && (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-success-title"
        aria-describedby="contact-success-description"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 text-white backdrop-blur-sm"
      >
        <div className="w-full max-w-sm rounded-2xl border border-amber-400/30 bg-[#100b3f] p-6 text-center shadow-xl shadow-black/30">
          <CheckCircle2 aria-hidden="true" className="mx-auto mb-3 h-10 w-10 text-emerald-400" />
          <h2 id="contact-success-title" className="text-lg font-semibold text-white">
            Message sent successfully
          </h2>
          <p id="contact-success-description" className="mt-2 text-sm text-slate-300">
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
          <RoundedGoldenButton
            type="button"
            onClick={closeSuccessPopup}
            size="sm"
            className="mt-5 w-full"
          >
            Close
          </RoundedGoldenButton>
        </div>
      </div>
      )}
    </>
  )
}
