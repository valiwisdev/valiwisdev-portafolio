import { Download } from 'lucide-react'
import type { ResumeLocale } from '@/data/resume-locales'

export function DownloadPdfButton({ locale }: Readonly<{ locale: ResumeLocale }>) {
  return (
    <a
      href={`/api/cv/pdf?lang=${locale}`}
      download
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 border-black bg-black px-6 py-3 font-mono text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      <Download aria-hidden="true" className="size-4" />
      Download PDF · {locale.toUpperCase()}
    </a>
  )
}
