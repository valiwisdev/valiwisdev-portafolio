'use client'

import Image from 'next/image'

import type { ResumeLocale } from '@/data/resume-locales'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function LanguageOption({ locale }: Readonly<{ locale: ResumeLocale }>) {
  const flag = locale === 'es' ? '/flags/es.svg' : '/flags/us.svg'

  return (
    <span className="inline-flex items-center gap-2">
      <Image src={flag} alt="" aria-hidden="true" width={19} height={14} />
      {locale.toUpperCase()}
    </span>
  )
}

export function ResumeLanguageSelect({ locale }: Readonly<{ locale: ResumeLocale }>) {
  function changeLanguage(nextLocale: string) {
    window.location.assign(nextLocale === 'es' ? '/cv?lang=es' : '/cv')
  }

  return (
    <Select value={locale} onValueChange={changeLanguage}>
      <SelectTrigger
        aria-label="CV language"
        className="min-h-12 min-w-24 rounded-lg border-0 px-3 font-semibold transition-colors focus-visible:bg-neutral-100 focus-visible:ring-0 data-[state=open]:bg-neutral-100 sm:min-w-28"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        align="end"
        className="rounded-lg border-neutral-300 shadow-sm shadow-neutral-300/40"
      >
        <SelectItem value="en">
          <LanguageOption locale="en" />
        </SelectItem>
        <SelectItem value="es">
          <LanguageOption locale="es" />
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
