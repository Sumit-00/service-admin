'use client';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RadioGroupItemProps, RadioGroupProps } from '@radix-ui/react-radio-group';
import { Controller, useFormContext } from 'react-hook-form';

export type FormRadioItemProps = RadioGroupItemProps & { label: React.ReactNode };

interface FormRadioProps extends RadioGroupProps {
  name: string;
  label?: string;
  options: Array<FormRadioItemProps>;
  formItemProps?: React.HTMLAttributes<HTMLDivElement>;
}

const FormRadio = ({
  name,
  label,
  className,
  options,
  required = false,
  formItemProps,
  ...rest
}: FormRadioProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem {...formItemProps}>
          {label && <FormLabel aria-required={required}>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              {...rest}
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={className}
              aria-labelledby={`${name}-label`}
              {...field}
            >
              {options.map((option: FormRadioItemProps) => (
                <FormItem className="flex items-center space-x-3 space-y-0" key={option.value}>
                  <FormControl>
                    <RadioGroupItem {...option} />
                  </FormControl>
                  <FormLabel className="cursor-pointer font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default FormRadio;
