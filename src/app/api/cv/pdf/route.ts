import { createResumePdf } from '@/lib/create-resume-pdf'
import type { ResumeLocale } from '@/data/resume-locales'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestedLocale = new URL(request.url).searchParams.get('lang')
  const locale: ResumeLocale = requestedLocale === 'es' ? 'es' : 'en'
  const pdf = await createResumePdf(locale)
  const filename =
    locale === 'es' ? 'Valeria_Caro_Hoja_de_Vida_ES.pdf' : 'Valeria_Caro_Resume_EN.pdf'
  const body = new ArrayBuffer(pdf.byteLength)
  new Uint8Array(body).set(pdf)

  return new Response(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
