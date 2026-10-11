import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function ButtonGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
}

export { ButtonGroup }
