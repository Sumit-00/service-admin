'use client';

import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DATE_UI_FORMAT } from '@/constants/constants';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Button } from './button';

export function DatePicker({ className, ...props }: any) {
  const { mode, value, disabled } = props;

  const formatDate = (date: Date | DateRange | undefined) => {
    if (mode === 'range' && date && 'from' in date && date.from) {
      return date.to
        ? `${format(date.from, DATE_UI_FORMAT)} - ${format(date.to, DATE_UI_FORMAT)}`
        : format(date.from, DATE_UI_FORMAT);
    } else if (date && date instanceof Date) {
      return format(date, DATE_UI_FORMAT);
    }
    return 'Pick a date';
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-full justify-start text-left font-normal', !value && 'text-black/45')}
            disabled={props?.disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDate(value)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {mode === 'range' ? (
            <Calendar
              initialFocus
              mode="range"
              numberOfMonths={2}
              selected={value}
              onSelect={props.onChange}
              disabled={disabled}
            />
          ) : (
            <Calendar
              initialFocus
              mode="single"
              selected={value}
              onSelect={props.onChange}
              disabled={disabled}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
