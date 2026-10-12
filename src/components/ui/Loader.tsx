import { Music } from 'lucide-react'
import { motion } from 'motion/react'

const LoaderFive = ({ text }: { text: string }) => (
  <div className="font-sans font-semibold [--shadow-color:var(--color-neutral-500)] dark:[--shadow-color:var(--color-neutral-100)]">
    {text.split('').map((char, index) => (
      <motion.span
        key={index}
        className="inline-block"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{
          scale: [1, 1.1, 1],
          textShadow: [
            '0 0 0 var(--shadow-color)',
            '0 0 1px var(--shadow-color)',
            '0 0 0 var(--shadow-color)',
          ],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'loop',
          delay: index * 0.05,
          ease: 'easeInOut',
          repeatDelay: 2,
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </div>
)

export const MusicLoader = ({ text }: { text: string }) => (
  <div className="select-none flex items-center gap-2 text-center text-amber-400/60 md:text-left">
    <Music className="size-5 font-medium" />
    <LoaderFive text={text} />
  </div>
)
