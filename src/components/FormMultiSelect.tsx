import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form';
import MultiSelectFormField, { MultiSelectFormFieldProps } from './ui/multi-select';

export interface FormMultiSelectProps extends MultiSelectFormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
  formItemProps?: React.HTMLAttributes<HTMLDivElement>;
}

const FormMultiSelect = ({
  name,
  label,
  options,
  required = false,
  value: CustomValue,
  disabled,
  className,
  formItemProps,
}: FormMultiSelectProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...restFields }, fieldState: { error } }) => {
        return (
          <FormItem className="flex-1" {...formItemProps}>
            {label && <FormLabel aria-required={required}>{label}</FormLabel>}
            <FormControl>
              <MultiSelectFormField
                defaultValue={CustomValue || value || []}
                value={value}
                {...restFields}
                options={options}
                onValueChange={restFields.onChange}
                placeholder="Select options"
                variant="inverted"
                animation={2}
                disabled={disabled}
                className={className}
              />
            </FormControl>
            {error && <FormMessage>{error.message}</FormMessage>}
          </FormItem>
        );
      }}
    />
  );
};

export default FormMultiSelect;
