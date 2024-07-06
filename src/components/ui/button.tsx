import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded no-underline focus-within:no-underline focus-within:outline-none max-w-fit md:max-w-full focus-visible:outline-none',
  {
    variants: {
      variant: {
        default:
          'bg-blue  text-white  hover:bg-blue-hover active:bg-blue-hover disabled:bg-muted focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue focus:bg-blue-hover',
        destructive:
          'bg-red-hover text-red-hover-foreground hover:bg-red-dark active:bg-red-dark disabled:bg-muted focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-hover focus:bg-red-dark',
        outline:
          'bg-white text-blue border border-blue hover:bg-white-hover active:bg-white-hover focus:bg-white-hover focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue',
        link: 'px-1 focus-within:underline focus:underline active:underline gap-x-1 focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-2 hover:underline hover:decoration-2 hover:underline-offset-2 active:decoration-2 active:underline-offset-2',
        unstyled: 'px-1 gap-x-1',
      },
      size: {
        default: 'h-10 px-4 py-2 whitespace-nowrap',
        sm: 'h-9 rounded px-3',
        lg: 'h-11 rounded px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
