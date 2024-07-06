'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { CATEGORY, FORM_FIELD_TYPES, LOCATIONS, ROUTES } from '@/constants/enums';
import { Button } from '@/components/ui/button';
import RenderFormItem from '@/components/RenderFormItem';
import PageSection from '@/components/PageSection';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';
import { addMinutes, format } from 'date-fns';
import { BrandDataType } from '@/constants/types';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  brandName: z.string({ required_error: 'Please enter a brand name' }),
  location: z.array(z.string({ required_error: 'Please select locations' })),
  category: z.string({ required_error: 'Please select a building' }),
  validity: z.date({ required_error: 'Please select a validity date' }),
  url: z.string({ required_error: 'Please enter an url' }),
  coupon: z.string({ required_error: 'Please enter your coupon' }),
  brandLogo: z.string({ required_error: 'Please enter your image UR:' }),
  productImage: z.string({ required_error: 'Please enter your image URL' }),
  brandColor: z.string({ required_error: 'Please enter your brand color' }),
  offerDesc: z.string({ required_error: 'Please enter offer description' }),
  terms: z.string({ required_error: 'Please enter terms and condition' }),
});

function CreateOfferPage() {
  const router = useRouter();

  const config = [
    {
      name: 'brandName',
      label: 'Your brand name',
      type: FORM_FIELD_TYPES.TEXT,
      placeholder: 'Please enter the brand name',
    },
    {
      name: 'location',
      label: 'Select Location',
      type: FORM_FIELD_TYPES.MULTI_SELECT,
      options: Object.values(LOCATIONS).map((location) => ({
        label: location,
        value: location,
      })),
      defaultValue: [{}],
      selectValue: {
        placeholder: 'Please enter the location',
      },
    },
    {
      name: 'category',
      label: 'Select Category',
      type: FORM_FIELD_TYPES.SELECT,
      options: Object.values(CATEGORY).map((category: string) => ({
        label: category,
        value: category,
      })),
      selectValue: {
        placeholder: 'Please select the category',
      },
    },
    {
      name: 'validity',
      label: 'Please enter the expiry date',
      type: FORM_FIELD_TYPES.DATE_PICKER,
      placeholder: 'e.g: 10, 20 (in days)',
    },
    {
      name: 'url',
      label: 'Please enter the redirection url',
      type: FORM_FIELD_TYPES.TEXT,
      placeholder: 'www.yourbrandname.com',
    },
    {
      name: 'coupon',
      label: 'Please enter the coupon code',
      type: FORM_FIELD_TYPES.TEXT,
      placeholder: '..',
    },
    {
      name: 'brandLogo',
      label: 'Please enter your brand logo URL',
      type: FORM_FIELD_TYPES.TEXT,
      placeholder: 'link',
    },
    {
      name: 'productImage',
      label: 'Please enter your product image url',
      type: FORM_FIELD_TYPES.TEXT,
      placeholder: 'link',
    },
    {
      name: 'brandColor',
      label: 'Please enter your brand color',
      type: FORM_FIELD_TYPES.TEXT,
      placeholder: 'enter in hex format or rgba format (eg: #fffff)',
    },
    {
      name: 'offerDesc',
      label: 'Please enter your offer description',
      type: FORM_FIELD_TYPES.TEXT,
      placeholder: 'Please the description you want to display',
    },
    {
      name: 'terms',
      label: 'Please enter your terms and conditions',
      type: FORM_FIELD_TYPES.TEXT_AREA,
      placeholder: 'Please all the terms and conditions you want to display',
    },
  ];

  const form = useForm<BrandDataType>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = async (data: BrandDataType) => {
    const now = new Date();
    const utcDate = addMinutes(now, now.getTimezoneOffset());
    const formattedDate = format(utcDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    const parsedStartDate = new Date(data.validity).toISOString();
    const apiData = {
      ...data,
      id: new Date().getTime(),
      liveFrom: formattedDate,
      validity: parsedStartDate,
      redemption_count: 0,
    };
    await addDoc(collection(db, 'brand_data'), apiData);
    router.push(ROUTES.offersList);
  };

  return (
    <PageSection title="Create Offer">
      <div className="py-4 sm:p-4">
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-8 p-1">
              {config?.map((fieldItemConfig) => {
                return (
                  <div
                    className={'grid-flow-rows grid items-center gap-4 md:grid-flow-dense'}
                    key={fieldItemConfig.name}
                  >
                    <RenderFormItem {...fieldItemConfig} />
                  </div>
                );
              })}
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  className="mr-4"
                  type="button"
                  onClick={() => {
                    form.reset();
                    form.clearErrors();
                    form.reset({});
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </div>
    </PageSection>
  );
}

export default CreateOfferPage;
