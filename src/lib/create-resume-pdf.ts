import {
  PDFDocument,
  PDFName,
  PDFString,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from 'pdf-lib'

import { getLocalizedResume, type ResumeLocale, resumeLocaleLabels } from '@/data/resume-locales'

const BLACK = rgb(0, 0, 0)
const PAGE_WIDTH = 612
const PAGE_HEIGHT = 792
const MARGIN = 48
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const lines: string[] = []
  let line = ''

  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word
    if (line && font.widthOfTextAtSize(candidate, size) > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }

  if (line) lines.push(line)
  return lines
}

function drawWrappedText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  width: number,
  font: PDFFont,
  size: number,
  lineHeight: number,
) {
  const lines = wrapText(text, font, size, width)
  lines.forEach((line, index) => {
    page.drawText(line, { x, y: y - index * lineHeight, size, font, color: BLACK })
  })
  return y - lines.length * lineHeight
}

function drawSectionTitle(page: PDFPage, title: string, y: number, font: PDFFont) {
  page.drawText(title.toUpperCase(), { x: MARGIN, y, size: 10.5, font, color: BLACK })
  const lineY = y - 4
  page.drawLine({
    start: { x: MARGIN, y: lineY },
    end: { x: PAGE_WIDTH - MARGIN, y: lineY },
    thickness: 0.75,
    color: BLACK,
  })
  return lineY - 12
}

function drawLink(
  document: PDFDocument,
  page: PDFPage,
  text: string,
  url: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
) {
  const width = font.widthOfTextAtSize(text, size)
  page.drawText(text, { x, y, size, font, color: BLACK })
  page.drawLine({
    start: { x, y: y - 1 },
    end: { x: x + width, y: y - 1 },
    thickness: 0.4,
    color: BLACK,
  })

  const annotation = document.context.obj({
    Type: PDFName.of('Annot'),
    Subtype: PDFName.of('Link'),
    Rect: [x, y - 2, x + width, y + size],
    Border: [0, 0, 0],
    A: document.context.obj({
      Type: PDFName.of('Action'),
      S: PDFName.of('URI'),
      URI: PDFString.of(url),
    }),
  })
  page.node.addAnnot(document.context.register(annotation))
  return width
}

export async function createResumePdf(locale: ResumeLocale = 'en') {
  const resume = getLocalizedResume(locale)
  const labels = resumeLocaleLabels[locale]
  const document = await PDFDocument.create()
  document.setTitle(`${resume.basics.name} - ${locale === 'es' ? 'CV' : 'Resume'}`)
  document.setAuthor(resume.basics.name)

  const page = document.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  const regular = await document.embedFont(StandardFonts.TimesRoman)
  const bold = await document.embedFont(StandardFonts.TimesRomanBold)
  const italic = await document.embedFont(StandardFonts.TimesRomanItalic)
  const top = PAGE_HEIGHT - MARGIN

  let y = top - 26
  const nameSize = 26
  page.drawText(resume.basics.name, {
    x: (PAGE_WIDTH - bold.widthOfTextAtSize(resume.basics.name, nameSize)) / 2,
    y,
    size: nameSize,
    font: bold,
    color: BLACK,
  })
  y -= 18
  const labelSize = 10.5
  page.drawText(resume.basics.label, {
    x: (PAGE_WIDTH - bold.widthOfTextAtSize(resume.basics.label, labelSize)) / 2,
    y,
    size: labelSize,
    font: bold,
    color: BLACK,
  })
  y -= 16

  const links = [
    { text: resume.basics.email, url: `mailto:${resume.basics.email}` },
    ...resume.basics.profiles.map((profile) => ({ text: profile.network, url: profile.url })),
  ]
  const location = `${resume.basics.location.city}, ${resume.basics.location.countryCode}`
  const linkWidths = links.map(({ text }) => regular.widthOfTextAtSize(text, 8.5))
  const separatorWidth = regular.widthOfTextAtSize('  |  ', 8.5)
  const rowWidth =
    regular.widthOfTextAtSize(location, 8.5) +
    separatorWidth * links.length +
    linkWidths.reduce((total, width) => total + width, 0)
  let x = (PAGE_WIDTH - rowWidth) / 2
  page.drawText(location, { x, y, size: 8.5, font: regular, color: BLACK })
  x += regular.widthOfTextAtSize(location, 8.5)
  for (const link of links) {
    page.drawText('  |  ', { x, y, size: 8.5, font: regular, color: BLACK })
    x += separatorWidth
    x += drawLink(document, page, link.text, link.url, x, y, regular, 8.5)
  }

  y -= 12
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_WIDTH - MARGIN, y },
    thickness: 0.75,
    color: BLACK,
  })
  y -= 18

  y = drawSectionTitle(page, labels.summary, y, bold)
  for (const item of resume.education) {
    const prefix = locale === 'es' ? 'Actualmente estudio el ' : 'I’m currently studying '
    const linkedText = locale === 'es' ? `${item.studyType} ${item.area}` : item.area
    const prefixWidth = regular.widthOfTextAtSize(prefix, 10)
    page.drawText(prefix, { x: MARGIN, y, size: 10, font: regular, color: BLACK })
    drawLink(document, page, linkedText, item.url, MARGIN + prefixWidth, y, regular, 10)
    y -= 12.5
    y = drawWrappedText(
      page,
      `${locale === 'es' ? `en la ${item.institution}.` : `at ${item.institution}.`} ${resume.basics.summary}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      regular,
      10,
      12.5,
    )
  }
  y -= 5

  y = drawSectionTitle(page, labels.experience, y, bold)
  for (const role of resume.work) {
    const dateWidth = italic.widthOfTextAtSize(role.period, 8.5)
    const titleWidth = CONTENT_WIDTH - dateWidth - 12
    const titleLines = wrapText(role.position, bold, 9.5, titleWidth)
    titleLines.forEach((line, index) => {
      page.drawText(line, {
        x: MARGIN,
        y: y - index * 10.5,
        size: 9.5,
        font: bold,
        color: BLACK,
      })
    })
    page.drawText(role.period, {
      x: PAGE_WIDTH - MARGIN - dateWidth,
      y,
      size: 8.5,
      font: italic,
      color: BLACK,
    })
    y -= titleLines.length * 10.5
    page.drawText(`${role.name}, ${role.location}`, {
      x: MARGIN,
      y,
      size: 8.5,
      font: italic,
      color: BLACK,
    })
    y -= 11

    for (const highlight of role.highlights) {
      page.drawCircle({ x: MARGIN + 3, y: y + 3, size: 1.2, color: BLACK })
      y = drawWrappedText(page, highlight, MARGIN + 12, y, CONTENT_WIDTH - 12, regular, 9, 10)
    }
    y -= 5
  }

  y = drawSectionTitle(page, labels.skills, y, bold)
  for (const skill of resume.skills) {
    const label = `${skill.name}:`
    page.drawText(label, { x: MARGIN, y, size: 9.25, font: bold, color: BLACK })
    const labelWidth = bold.widthOfTextAtSize(label, 9.25)
    y = drawWrappedText(
      page,
      skill.keywords.join(', '),
      MARGIN + labelWidth + 4,
      y,
      CONTENT_WIDTH - labelWidth - 4,
      regular,
      9.25,
      10,
    )
  }

  y -= 5
  y = drawSectionTitle(page, labels.programmingLanguages, y, bold)
  y = drawWrappedText(
    page,
    resume.programmingLanguages.join(', '),
    MARGIN,
    y,
    CONTENT_WIDTH,
    regular,
    9.25,
    10,
  )

  if (resume.interests.length > 0) {
    y -= 5
    y = drawSectionTitle(page, labels.interests, y, bold)
    for (const interest of resume.interests) {
      y = drawWrappedText(
        page,
        `${interest.name}: ${interest.summary}`,
        MARGIN,
        y,
        CONTENT_WIDTH,
        regular,
        9.25,
        10,
      )
      y -= 2
    }
  }

  if (y < MARGIN) {
    throw new Error('Resume content exceeds the single-page PDF layout.')
  }

  return document.save()
}
