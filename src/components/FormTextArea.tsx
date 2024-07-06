import { Textarea } from '@/components/ui/textarea';
import { FC, TextareaHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form';

interface FormTextAreaProps {
  name: string;
  label?: string;
  formItemProps?: React.HTMLAttributes<HTMLDivElement>;
}

const FormTextArea: FC<FormTextAreaProps & TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  name,
  label,
  required = false,
  formItemProps,
  ...rest
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
          render={({ field, fieldState }) => (
            <>
              <Textarea {...field} {...rest} />
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </>
          )}
        />
      </FormControl>
    </FormItem>
  );
};

export default FormTextArea;
