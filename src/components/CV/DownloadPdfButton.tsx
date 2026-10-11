import { Download } from 'lucide-react'
import type { ResumeLocale } from '@/data/resume-locales'

export function DownloadPdfButton({ locale }: Readonly<{ locale: ResumeLocale }>) {
  return (
    <a
      href={`/api/cv/pdf?lang=${locale}`}
      download
      aria-label={`Download ${locale === 'es' ? 'Spanish' : 'English'} PDF`}
      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border-2 border-black bg-black px-3 py-2 font-mono text-xs font-semibold text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
    >
      <Download aria-hidden="true" className="size-4" />
      <span className="sm:hidden">PDF · {locale.toUpperCase()}</span>
      <span className="hidden sm:inline">Download PDF · {locale.toUpperCase()}</span>
    </a>
  )
}
