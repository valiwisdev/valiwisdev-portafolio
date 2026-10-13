'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactSchema, type TContact } from '@/schemas/contact.schema'
import { sendEmail } from '@/lib/emailjs'
import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-lg flex-col gap-5 rounded-xl bg-[#100b3f]/65 p-5 shadow-xl shadow-black/10 backdrop-blur-md sm:gap-6 sm:p-6"
      >
        <div className="mb-1 flex items-center gap-3 border-b border-white/10 pb-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-amber-400/25 bg-amber-400/10 text-amber-400">
            <Send aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">
              Send a message
            </p>
            <p className="mt-1 text-xs text-slate-400">I usually reply within a few days.</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-200">
            Name
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className="contact-form-field min-h-12 rounded-lg border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors duration-200 focus:border-amber-400/70 focus:bg-slate-950/70 focus:outline-none focus:ring-2 focus:ring-amber-400/15 aria-[invalid=true]:border-rose-400/70"
            placeholder="Your name"
          />
          {errors.name && (
            <span id="name-error" className="text-xs text-rose-300" role="alert">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="contact-form-field min-h-12 rounded-lg border border-white/10 bg-slate-950/45 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors duration-200 focus:border-amber-400/70 focus:bg-slate-950/70 focus:outline-none focus:ring-2 focus:ring-amber-400/15 aria-[invalid=true]:border-rose-400/70"
            placeholder="you@example.com"
          />
          {errors.email && (
            <span id="email-error" className="text-xs text-rose-300" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-slate-200">
            Message
          </label>
          <textarea
            {...register('message')}
            id="message"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className="contact-form-field min-h-36 resize-y rounded-lg border border-white/10 bg-slate-950/45 px-4 py-3 text-sm leading-relaxed text-white placeholder:text-slate-500 transition-colors duration-200 focus:border-amber-400/70 focus:bg-slate-950/70 focus:outline-none focus:ring-2 focus:ring-amber-400/15 aria-[invalid=true]:border-rose-400/70"
            placeholder="Tell me a little about what you have in mind..."
            rows={5}
          />
          {errors.message && (
            <span id="message-error" className="text-xs text-rose-300" role="alert">
              {errors.message.message}
            </span>
          )}
        </div>

        <RoundedGoldenButton isSubmitting={isSubmitting} type="submit" className="w-full">
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
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#100b3f] p-6 text-center shadow-xl shadow-black/30">
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
