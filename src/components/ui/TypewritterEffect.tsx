'use client'

import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: Readonly<{
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}>) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(''),
  }))

  const renderWords = () => (
    <div>
      {wordsArray.map((word, index) => (
        <div key={`word-${index}`} className="inline-block">
          {word.text.map((char, charIndex) => (
            <span key={`char-${charIndex}`} className={cn('text-white', word.className)}>
              {char}
            </span>
          ))}
          &nbsp;
        </div>
      ))}
    </div>
  )

  return (
    <div className={cn('my-1 flex space-x-0.5 md:my-2', className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: '0%' }}
        whileInView={{ width: 'fit-content' }}
        transition={{ duration: 2, ease: 'linear', delay: 1 }}
      >
        <div
          className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          style={{ whiteSpace: 'nowrap' }}
        >
          {renderWords()}{' '}
        </div>{' '}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className={cn(
          'block h-8 w-1 rounded-sm bg-amber-500 sm:h-10 md:h-12 lg:h-14 xl:h-16',
          cursorClassName,
        )}
      />
    </div>
  )
}
