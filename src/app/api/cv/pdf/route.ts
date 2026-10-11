import { createResumePdf } from '@/lib/create-resume-pdf'
import { resume } from '@/data/resume'
import type { ResumeLocale } from '@/data/resume-locales'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestedLocale = new URL(request.url).searchParams.get('lang')
  const locale: ResumeLocale = requestedLocale === 'es' ? 'es' : 'en'
  const pdf = await createResumePdf(locale)
  const filename = resume.basics.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
  const body = new ArrayBuffer(pdf.byteLength)
  new Uint8Array(body).set(pdf)

  return new Response(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}-${locale}.pdf"`,
      'Cache-Control': 'no-store',
    },
  })
}
