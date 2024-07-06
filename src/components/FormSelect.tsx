import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectItemProps, SelectProps, SelectValueProps } from '@radix-ui/react-select';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form';

export type SelectItem = SelectItemProps & { label: React.ReactNode };

interface FormSelectProps extends SelectProps {
  name: string;
  disabled?: boolean;
  label?: string;
  options: Array<SelectItem>;
  selectValue: SelectValueProps;
  formItemProps?: React.HTMLAttributes<HTMLDivElement>;
  contentRenderer?: (item: SelectItem, index?: number) => React.ReactNode;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  disabled = false,
  onValueChange,
  selectValue,
  value: CustomValue,
  required = false,
  formItemProps,
  contentRenderer,
}) => {
  const { control } = useFormContext();

  return (
    <FormItem {...formItemProps}>
      {label && (
        <FormLabel htmlFor={name} aria-required={required}>
          {label}
        </FormLabel>
      )}
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => (
            <>
              <Select
                {...field}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (onValueChange) onValueChange(value);
                }}
                defaultValue={CustomValue || field.value}
                disabled={disabled}
                value={CustomValue || field.value}
              >
                <SelectTrigger>
                  <SelectValue {...selectValue} placeholder={selectValue?.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option, index) => (
                    <SelectItem key={option.value} value={option.value}>
                      {contentRenderer ? contentRenderer(option, index) : option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </>
          )}
        />
      </FormControl>
    </FormItem>
  );
};

export default FormSelect;
