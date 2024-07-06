'use client';

import { useState } from 'react';
import { FormFieldTypeMapping, RenderGridFormItemProps } from '../RenderFormItem';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { flattenFilters } from '@/lib/utils';

type UseFiltersHook<T extends keyof FormFieldTypeMapping> = (
  filters: RenderGridFormItemProps<T>[],
) => {
  filtersWithOnChange: RenderGridFormItemProps<T>[];
  filterStates: Record<string, string>;
  onSubmitFiltersForm: (data: Record<string, unknown>) => void;
  onResetFilters: () => void;
  clearSingleFilter: (name: string) => void;
};

const useFilters: UseFiltersHook<keyof FormFieldTypeMapping> = <
  T extends keyof FormFieldTypeMapping,
>(
  filters: RenderGridFormItemProps<T>[],
) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [filterStates, setFilterStates] = useState<Record<string, string>>(() => {
    const initialStates = filters.reduce(
      (acc, filter) => {
        const value = searchParams.get(filter.name);
        if (value) {
          acc[filter.name] = value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );
    return initialStates;
  });

  const filtersWithOnChange = filters.map((filter) => {
    const onValueChange: (value: string) => void = (value: string) => {
      const newFilterStates = {
        ...filterStates,
        [filter.name]: value,
      };
      setFilterStates(newFilterStates);

      const params = new URLSearchParams(searchParams);
      Object.entries(newFilterStates).forEach(([key, value]) => {
        params.set(key, value);
      });

      replace(`${pathname}?${params.toString()}`);
    };

    return {
      ...filter,
      componentsProps: {
        ...filter.componentsProps,
        onValueChange,
      },
    };
  });

  const onSubmitFiltersForm = (data: Record<string, unknown>) => {
    const newFilterStates = Object.keys(data).reduce(
      (acc, key: string) => {
        if (data[key] !== undefined && data[key] !== null) {
          acc[key] = data[key] as string;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    setFilterStates(newFilterStates);
    const params = new URLSearchParams(searchParams);
    const flattenedData = flattenFilters(newFilterStates);

    Object.entries(flattenedData).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, value as string);
      } else {
        params.delete(key);
      }
    });

    replace(`${pathname}?${params.toString()}`);
  };

  const onResetFilters = () => {
    setFilterStates({});
    const params = new URLSearchParams(searchParams);
    filters.forEach((filter) => {
      params.delete(filter.name);
    });
    replace(`${pathname}?${params.toString()}`);
  };

  const clearSingleFilter = (name: string) => {
    const newFilterStates = JSON.parse(JSON.stringify(filterStates));

    const deleteNestedKey = (obj: Record<string, any>, keyPath: string) => {
      const keys = keyPath.split('.');
      let currentObj = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!currentObj[keys[i]]) return;
        currentObj = currentObj[keys[i]];
      }
      delete currentObj[keys[keys.length - 1]];
    };

    deleteNestedKey(newFilterStates, name);
    setFilterStates(newFilterStates);

    const params = new URLSearchParams(window.location.search);
    params.delete(name);

    const flattenedNewFilterStates = flattenFilters(newFilterStates);
    for (const [key, value] of Object.entries(flattenedNewFilterStates)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item) => params.append(key, item));
        } else {
          params.set(key, value.toString());
        }
      }
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return {
    filtersWithOnChange,
    filterStates,
    onSubmitFiltersForm,
    onResetFilters,
    clearSingleFilter,
  };
};

export default useFilters;
