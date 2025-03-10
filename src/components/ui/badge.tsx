import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-a12 font-bold  focus:outline-none focus:ring-2 focus:ring-blue-hover focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-blue text-white hover:bg-blue-hover',
        secondary:
          'border-transparent bg-white text-gray-darkest hover:bg-gray-light cursor-pointer',
        destructive: 'border-transparent bg-red-hover text-white hover:bg-red-dark',
        outline: 'text-black',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
