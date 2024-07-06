import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface FormInputProps {
  name: string;
  label?: string;
  formItemProps?: React.HTMLAttributes<HTMLDivElement>;
}

const FormInput = ({ name, label, formItemProps, type, ...rest }: FormInputProps & InputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem {...formItemProps}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              {...rest}
              type={type}
              onChange={(e) => {
                if (type === 'number') {
                  field.onChange(Number(e.target.value));
                } else {
                  field.onChange(e);
                }
              }}
            />
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default FormInput;
