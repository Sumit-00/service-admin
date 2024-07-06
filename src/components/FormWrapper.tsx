'use client';

import { cn, getGridColumnsClass } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { DefaultValues, FieldValues, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import RenderFormItem, { FormFieldTypeMapping, RenderGridFormItemProps } from './RenderFormItem';
import { Button } from './ui/button';
import { Form } from './ui/form';

export interface FormWrapperProps {
  schema?: z.ZodTypeAny;
  onSubmit: (data: any) => void;
  config: Array<RenderGridFormItemProps<keyof FormFieldTypeMapping>>;
  defaultValues: DefaultValues<FieldValues>;
  gridColumns?: number;
  onCancel?: () => void;
  footer?: ReactNode;
  className?: string;
  disabled?: boolean;
}

const FormWrapper = ({
  schema,
  onSubmit,
  config,
  defaultValues,
  gridColumns,
  onCancel,
  footer,
  className,
  disabled = false,
}: FormWrapperProps) => {
  const form = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: { ...defaultValues },
    disabled,
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 p-1">
          <div
            className={cn(
              'grid grid-flow-row gap-4 md:grid-flow-dense',
              getGridColumnsClass(gridColumns),
              className,
            )}
          >
            {config?.map((fieldItemConfig: RenderGridFormItemProps<keyof FormFieldTypeMapping>) => {
              const { className, ...rest } = fieldItemConfig;
              return (
                <span key={fieldItemConfig.name} className={`col-span-12 ${className || ''}`}>
                  <RenderFormItem {...rest} />
                </span>
              );
            })}
          </div>

          {footer !== undefined ? (
            footer
          ) : (
            <div className="text-center">
              {onCancel && (
                <Button
                  variant="outline"
                  className="mr-4"
                  type="button"
                  onClick={() => {
                    form.reset();
                    form.clearErrors();
                    form.reset(defaultValues);
                    onCancel?.();
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit">Submit</Button>
            </div>
          )}
        </form>
      </Form>
    </FormProvider>
  );
};

export default FormWrapper;
