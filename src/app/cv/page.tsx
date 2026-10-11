import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { DownloadPdfButton } from '@/components/CV/DownloadPdfButton'
import { ResumeLanguageSelect } from '@/components/CV/ResumeLanguageSelect'
import { ButtonGroup } from '@/components/ui/button-group'
import { getLocalizedResume, resumeLocaleLabels, type ResumeLocale } from '@/data/resume-locales'
import { resume } from '@/data/resume'

export const metadata: Metadata = {
  title: `${resume.basics.name} | CV`,
  description: `${resume.basics.name}'s software development experience and skills.`,
}

function SectionTitle({ children, id }: Readonly<{ children: React.ReactNode; id: string }>) {
  return (
    <h2
      id={id}
      className="mb-2 border-b border-black pb-1 font-serif text-xs font-bold uppercase text-black"
    >
      {children}
    </h2>
  )
}

function asciiDashes(value: string) {
  return value.replace(/[\u2013\u2014]/g, '-')
}

export default async function CvPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>
}) {
  const { lang } = await searchParams
  const locale: ResumeLocale = lang === 'es' ? 'es' : 'en'
  const cv = getLocalizedResume(locale)
  const labels = resumeLocaleLabels[locale]
  const { basics, skills, programmingLanguages, work, interests, education } = cv

  return (
    <main lang={locale} className="min-h-screen bg-white px-4 pb-12 pt-5 text-black sm:px-6">
      <ButtonGroup
        aria-label="CV actions"
        className="sticky top-3 z-40 mx-auto mb-6 w-full max-w-[52rem] flex-nowrap justify-between gap-2 rounded-xl border border-black/15 bg-white/95 p-1.5 shadow-sm shadow-neutral-300/40 backdrop-blur-md print:hidden sm:p-2"
      >
        <Link
          href="/"
          aria-label="Back to portfolio"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-black transition-colors hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none sm:size-12"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
        </Link>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <ResumeLanguageSelect locale={locale} />
          <DownloadPdfButton locale={locale} />
        </div>
      </ButtonGroup>

      <article className="mx-auto max-w-[52rem] bg-white px-5 py-7 font-serif text-[14px] leading-snug text-black sm:px-10 sm:py-9">
        <header className="pb-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{basics.name}</h1>
          <p className="mt-1 text-sm">{basics.label}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
            <span>
              {basics.location.city}, {basics.location.countryCode}
            </span>
            <a className="underline underline-offset-2" href={`mailto:${basics.email}`}>
              {basics.email}
            </a>
            {basics.profiles.map((profile) => (
              <a
                key={profile.network}
                href={profile.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                {profile.network}
              </a>
            ))}
          </div>
        </header>

        <div className="mt-3 space-y-5">
          <section aria-labelledby="summary-heading">
            <SectionTitle id="summary-heading">{labels.summary}</SectionTitle>
            {education.map((item) => (
              <p key={item.url} className="text-[15px] leading-relaxed">
                {locale === 'es' ? 'Actualmente estudio el ' : 'I’m currently studying '}
                <a
                  className="underline underline-offset-2"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {locale === 'es' ? `${item.studyType} ${item.area}` : item.area}
                </a>{' '}
                {locale === 'es' ? `en la ${item.institution}. ` : `at ${item.institution}. `}
                {basics.summary}
              </p>
            ))}
          </section>

          <section aria-labelledby="experience-heading">
            <SectionTitle id="experience-heading">{labels.experience}</SectionTitle>
            <div className="space-y-3">
              {work.map((role) => (
                <article key={`${role.position}-${role.startDate}`} className="break-inside-avoid">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                    <h3 className="font-bold leading-tight">{asciiDashes(role.position)}</h3>
                    <p className="shrink-0 text-xs italic sm:text-right">
                      {asciiDashes(role.period)}
                    </p>
                  </div>
                  <p className="text-xs italic">
                    {role.name}, {role.location}
                  </p>
                  <ul className="mt-1 list-disc space-y-0 pl-5 leading-snug">
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="skills-heading">
            <SectionTitle id="skills-heading">{labels.skills}</SectionTitle>
            <div className="space-y-1">
              {skills.map((skill) => (
                <p key={skill.name}>
                  <span className="font-bold">{skill.name}:</span> {skill.keywords.join(', ')}
                </p>
              ))}
            </div>
          </section>

          <section aria-labelledby="programming-languages-heading">
            <SectionTitle id="programming-languages-heading">
              {labels.programmingLanguages}
            </SectionTitle>
            <p>{programmingLanguages.join(', ')}</p>
          </section>

          {interests.length > 0 && (
            <section aria-labelledby="interests-heading">
              <SectionTitle id="interests-heading">{labels.interests}</SectionTitle>
              <div className="space-y-1">
                {interests.map((interest) => (
                  <p key={interest.name}>
                    <span className="font-bold">{interest.name}:</span> {interest.summary}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  )
}
