'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactSchema, type TContact } from '@/schemas/contact.schema'
import { sendEmail } from '@/lib/emailjs'
import { useState } from 'react'
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
      reset()
      setIsSuccess(true)
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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

      {isSuccess && (
        <div className="text-center text-green-400 text-sm bg-green-400/5 p-3 rounded-md border border-green-400/20">
          Message sent successfully! I&apos;ll get back to you soon.
        </div>
      )}
    </form>
  )
}
