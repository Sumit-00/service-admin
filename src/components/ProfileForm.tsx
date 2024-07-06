'use client';

import FormWrapper from '@/components/FormWrapper';
import { FORM_FIELD_TYPES } from '@/constants/enums';
import { z } from 'zod';
import { createFormConfig } from '@/lib/utils';

const formSchema = z.object({
  checkbox: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  timepicker: z.string().nonempty({ message: 'You must select a time.' }),
});

const formConfig = createFormConfig([
  {
    name: 'checkbox',
    label: 'checkbox',
    type: FORM_FIELD_TYPES.CHECKBOX,
    gridColumn: 2,
  },
  {
    name: 'switch',
    label: 'switch',
    type: FORM_FIELD_TYPES.SWITCH,
    gridColumn: 2,
  },
  {
    name: 'datepicker',
    label: 'datepicker',
    type: FORM_FIELD_TYPES.DATE_PICKER,
    componentsProps: {
      name: 'datepicker',
      mode: 'single',
    },
  },
  {
    name: 'timepicker',
    label: 'timepicker',
    type: FORM_FIELD_TYPES.TIME_PICKER,
  },
]);

export function ProfileForm() {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center">
      <FormWrapper
        onSubmit={onSubmit}
        defaultValues={{
          username: 'test',
          email: 'testemail@gmail.com',
          password: '123',
          gender: 'male',
          country: 'usa',
          bio: 'test bio',
        }}
        schema={formSchema}
        config={formConfig}
      />
    </div>
  );
}
