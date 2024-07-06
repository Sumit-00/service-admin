import { GridColumnClasses, GridRowClasses, cn, getGridColumnsClass } from '@/lib/utils';
import { useFieldArray, useFormContext } from 'react-hook-form';
import RenderFormItem, { FormFieldTypeMapping, RenderGridFormItemProps } from './RenderFormItem';
import { Button } from './ui/button';

export interface FormFieldArrayProps<T extends keyof FormFieldTypeMapping> {
  name: string;
  nestedFields?: Array<RenderGridFormItemProps<T>>;
  gridColumns?: number;
  className?: string;
}

const FormFieldArray = <T extends keyof FormFieldTypeMapping>({
  name,
  nestedFields,
  gridColumns,
  // defaultValues = {},
  className = '',
}: FormFieldArrayProps<T>) => {
  const { control, formState } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  return (
    <div className="space-y-4">
      <div className="p-y-4 space-y-4">
        {fields.map((field, index) => {
          return (
            <div
              key={field.id}
              className={cn(
                'flex flex-col items-center justify-evenly space-y-4 bg-blue p-2 text-white',
                className,
              )}
            >
              <div>
                <div className={cn('grid items-center gap-4', getGridColumnsClass(gridColumns))}>
                  {nestedFields?.map((fieldItemConfig: RenderGridFormItemProps<T>) => {
                    const { gridColumn, gridRow, ...rest } = fieldItemConfig;
                    return (
                      <div
                        key={`${name}.${index}.${fieldItemConfig.name}`}
                        className={`grid-cols-1 grid-rows-1 md:${GridRowClasses[gridRow || 1]} md:${GridColumnClasses[gridColumn || 1]}`}
                      >
                        <RenderFormItem
                          {...rest}
                          name={`${name}.${index}.${fieldItemConfig.name}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <Button onClick={() => remove(index)}>Delete</Button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        <Button
          onClick={(e) => {
            append({ ...formState });
            e.preventDefault();
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default FormFieldArray;
