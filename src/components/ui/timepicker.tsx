import React from 'react';
import { cn } from '@/lib/utils';

export interface TimePickerProps extends React.ComponentPropsWithoutRef<'input'> {
  className?: string;
}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, onChange, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          ref={ref}
          type="time"
          id="timer"
          name="timer"
          className={cn(
            'w-auto rounded border border-gray-light p-0.5 focus:border-blue focus:outline-none',
            className,
          )}
          aria-label="Select time"
          // value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  },
);

TimePicker.displayName = 'TimePicker';

export default TimePicker;
