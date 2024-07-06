'use client';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form';
import Upload from './ui/upload';

export type FormUploadType = {
  name: string;
  label?: string;
  formItemProps?: React.HTMLAttributes<HTMLDivElement>;
  disabled?: boolean;
};

const FormUpload: React.FC<FormUploadType> = ({ name, label, formItemProps, ...rest }) => {
  const { control } = useFormContext();

  return (
    <FormItem {...formItemProps}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Controller
        control={control}
        name={name}
        disabled={rest.disabled}
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <FormControl>
                <Upload onChange={field.onChange} name={field.name} value={field.value} {...rest} />
              </FormControl>
              {error && <FormMessage>{error.message}</FormMessage>}
            </>
          );
        }}
      />
    </FormItem>
  );
};

export default FormUpload;
