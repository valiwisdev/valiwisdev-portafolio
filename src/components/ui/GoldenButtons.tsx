import React from 'react'

const goldenBaseStyles = {
  colors: 'bg-transparent border-2 border-amber-400 text-amber-400',
  shadows: 'shadow-lg shadow-amber-400/10',
  focus: 'focus:outline-none',
  transition: 'transition-all duration-200',
  font: 'font-semibold',
  cursor: 'cursor-pointer',
}

const goldenHoverStyles = `
  hover:shadow-xl hover:shadow-amber-400/20 hover:scale-[1.02] 
  hover:border-amber-300 hover:text-amber-300
`

const goldenDisabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed'

interface GoldenButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  isSubmitting?: boolean
  isActive?: boolean
  className?: string
  ariaLabel?: string
  title?: string
  size?: 'sm' | 'md' | 'lg'
}

export function CircularGoldenButton({
  onClick,
  children,
  isActive = false,
  ariaLabel,
  title,
  disabled = false,
  size = 'md',
}: Readonly<GoldenButtonProps>) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10',
    lg: 'w-12 h-12 text-lg',
  }

  const baseClasses = `
    ${goldenBaseStyles.colors} ${goldenBaseStyles.shadows} 
    ${goldenBaseStyles.focus} ${goldenBaseStyles.transition} 
    ${goldenBaseStyles.font} ${goldenBaseStyles.cursor}
    ${sizeClasses[size]} rounded-full flex items-center justify-center
    ${goldenDisabledStyles}
  `

  const interactiveClasses = !isActive && !disabled ? goldenHoverStyles : ''

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${interactiveClasses}`}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </button>
  )
}

export function RoundedGoldenButton({
  children,
  type = 'button',
  isSubmitting = false,
  className = '',
  onClick,
  ariaLabel,
  title,
  size = 'md',
  ...props
}: GoldenButtonProps) {
  const baseClasses = `
    inline-block rounded-lg
    ${goldenBaseStyles.colors} ${goldenBaseStyles.shadows}
    ${goldenBaseStyles.focus} ${goldenBaseStyles.transition}
    ${goldenBaseStyles.font} ${goldenBaseStyles.cursor}
    ${goldenDisabledStyles}
  `

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 md:px-8 md:py-4 text-sm md:text-base',
    lg: 'px-8 py-4 md:px-10 md:py-5 text-base md:text-lg',
  }

  const interactiveClasses = !isSubmitting ? goldenHoverStyles : ''

  const finalClassName =
    `${baseClasses} ${sizeClasses[size]} ${interactiveClasses} ${className}`.trim()

  return (
    <button
      type={type}
      disabled={isSubmitting}
      className={finalClassName}
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      {...props}
    >
      {children}
    </button>
  )
}
