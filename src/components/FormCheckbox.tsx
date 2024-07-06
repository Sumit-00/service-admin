'use client';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Checkbox } from './ui/checkbox';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { CheckboxProps } from '@radix-ui/react-checkbox';

interface CheckboxItem {
  value: string;
  label: React.ReactNode;
}

interface BaseCheckboxProps {
  className?: string;
  onChange?: (checked: boolean | string) => void;
}

interface SingleCheckboxProps extends BaseCheckboxProps {
  type: 'single';
}

interface MultipleCheckboxProps extends BaseCheckboxProps {
  type: 'multiple';
  items: CheckboxItem[];
}

type CheckboxInternalProps = SingleCheckboxProps | MultipleCheckboxProps;

export interface FormCheckboxProps {
  name: string;
  label?: React.ReactNode;
  desc?: string;
  componentsProps: Omit<CheckboxProps, keyof CheckboxInternalProps> &
    Partial<CheckboxInternalProps>;
  id?: string;
  formItemProps?: React.HTMLAttributes<HTMLDivElement>;
}

const FormCheckbox = ({
  name,
  label,
  desc,
  componentsProps,
  id,
  formItemProps,
}: FormCheckboxProps) => {
  const { control } = useFormContext();
  const items =
    (componentsProps as MultipleCheckboxProps)?.type === 'multiple'
      ? (componentsProps as MultipleCheckboxProps)?.items
      : [];

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      disabled={componentsProps?.disabled}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem
            className={cn('flex flex-col items-start gap-x-2', componentsProps?.className)}
            {...formItemProps}
          >
            {desc && <FormDescription>{desc}</FormDescription>}
            <div className="flex items-center gap-x-2">
              {componentsProps?.type === 'single' && (
                <Checkbox
                  {...field}
                  id={id}
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    componentsProps?.onChange?.(checked);
                  }}
                  disabled={componentsProps?.disabled}
                />
              )}
              {label && (
                <FormLabel htmlFor={id} className="w-full cursor-pointer">
                  {label}
                </FormLabel>
              )}
            </div>
            {componentsProps?.type === 'multiple' && (
              <div className="flex flex-wrap gap-4">
                {items?.map((item: CheckboxItem) => (
                  <Controller
                    key={item.value}
                    control={control}
                    name={name}
                    disabled={componentsProps?.disabled}
                    render={({ field: innerField }) => {
                      return (
                        <FormItem
                          key={item.value}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={innerField?.value?.includes?.(item.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? innerField.onChange([...(innerField?.value || []), item.value])
                                  : innerField.onChange(
                                      innerField.value?.filter(
                                        (value: string) => value !== item.value,
                                      ),
                                    );
                              }}
                              disabled={componentsProps?.disabled}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-a14 font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            )}
            {error && <FormMessage>{error.message}</FormMessage>}
          </FormItem>
        );
      }}
    />
  );
};

export default FormCheckbox;
