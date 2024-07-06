import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded border border-gray-darkest bg-white px-3 py-2 text-a14 ring-offset-white file:border-0 file:bg-transparent file:text-a14 file:font-bold placeholder:text-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-hover focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
