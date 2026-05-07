import { TContact } from '@/schemas/contact.schema'
import emailjs from '@emailjs/browser'

const service_id = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID
const template_id = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID
const public_key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

export const sendEmail = async (formData: TContact) => {
  if (!service_id || !template_id || !public_key) {
    throw new Error('EmailJS environment variables are not set')
  }

  try {
    const result = await emailjs.send(service_id, template_id, formData, {
      publicKey: public_key,
    })
    console.log('Email successfully sent!', result.status, result.text)
    return result
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}
