'use client';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import TimePicker, { TimePickerProps } from './ui/timepicker';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface FormTimePickerProps {
  name: string;
  label?: string;
  formItemProps?: React.HTMLAttributes<HTMLDivElement>;
}

const FormTimePicker = ({
  name,
  label,
  formItemProps,
  ...props
}: FormTimePickerProps & TimePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ...rest } = field;
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        };
        return (
          <FormItem className="flex flex-col items-start gap-x-2" {...formItemProps}>
            <FormLabel className="whitespace-nowrap">{label}</FormLabel>
            <FormControl>
              <TimePicker {...props} {...rest} value={value} onChange={handleChange} />
            </FormControl>
            {error && <FormMessage>{error.message}</FormMessage>}
          </FormItem>
        );
      }}
    />
  );
};

export default FormTimePicker;
