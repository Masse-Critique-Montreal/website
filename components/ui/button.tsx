import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-destructive hover:text-white',
        defaultGreen: 'bg-primary text-primary-foreground hover:bg-chart-2 hover:text-white',
        defaultBlue: 'bg-primary text-primary-foreground hover:bg-chart-4 hover:text-white',

        black: 'bg-primary-foreground text-white',
        destructive:
          'bg-destructive text-white hover:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 hover:text-white',
        outline:
          'border-2 bg-none text-primary-foreground shadow-xs hover:bg-primary-foreground hover:border-primary-foreground hover:text-white dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        outlineWhite:
          'border-2 bg-none text-secondary-foreground shadow-xs hover:bg-secondary-foreground hover:border-secondary-foreground hover:text-black dark:bg-input/30 dark:border-input dark:hover:bg-input/50',

        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-white',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',


      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-4 has-[>svg]:px-2.5 rounded-full sm:text-md text-xs',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4 font-bold uppercase text-lg px-8 rounded-full',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
