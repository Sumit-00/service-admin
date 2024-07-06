'use client';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from './ui/switch';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SwitchProps } from '@radix-ui/react-switch';

export interface FormSwitchProps {
  name: string;
  label?: string;
  formItemProps?: React.ComponentPropsWithoutRef<typeof FormItem>;
}

const FormSwitch = ({ name, label, formItemProps, ...props }: FormSwitchProps & SwitchProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="flex items-center gap-x-2" {...formItemProps}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Switch {...props} {...field} />
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default FormSwitch;
