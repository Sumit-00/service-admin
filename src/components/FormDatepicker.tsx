'use client';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DatePicker } from './ui/datepicker';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CalendarProps } from './ui/calendar';

export interface FormDatePickerProps {
  name: string;
  label?: string;
  mode: string;
  formItemProps?: React.HTMLAttributes<HTMLDivElement>;
  disabled?: boolean;
}

const FormDatePicker = ({
  name,
  label,
  formItemProps,
  ...rest
}: FormDatePickerProps & CalendarProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      disabled={rest.disabled}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem className="flex flex-col items-start gap-x-2" {...formItemProps}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <DatePicker {...field} {...rest} />
            </FormControl>
            {error && <FormMessage>{error.message}</FormMessage>}
          </FormItem>
        );
      }}
    />
  );
};

export default FormDatePicker;
