import { RenderGridFormItemProps } from '@/components/RenderFormItem';
import { FORM_FIELD_TYPES } from '@/constants/enums';
import { clsx, type ClassValue } from 'clsx';
import React, { Attributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { parseISO, format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGridColumnsClass = (gridColumns?: number) =>
  gridColumns ? `md:grid-cols-${gridColumns}` : '';

export enum NUMBERS {
  ZERO = 0,
}

export const ChildrenWithProps = (
  children: React.ReactNode,
  childrenAdditionalProps: Partial<unknown> & Attributes,
) =>
  React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, childrenAdditionalProps);
    }
    return child;
  });

export const GridRowClasses: Record<number, string> = {};
export const GridColumnClasses: Record<number, string> = {};
export const ColumnSpanClasses: Record<number, string> = {};
export const RowSpanClasses: Record<number, string> = {};

for (let i = 1; i <= 12; i++) {
  GridRowClasses[i] = `grid-rows-${i}`;
  GridColumnClasses[i] = `grid-cols-${i}`;
  ColumnSpanClasses[i] = `col-span-${i}`;
  RowSpanClasses[i] = `row-span-${i}`;
}

export const isEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export const generateNumbersList = (value: number) => {
  return new Array(value).fill({}).map((_, index) => {
    return {
      value: (index + 1).toString(),
      label: (index + 1).toString(),
    };
  });
};

export const createFormConfig = <T extends RenderGridFormItemProps<FORM_FIELD_TYPES>[]>(
  config: T,
): T => config;

export function flattenFilters(filters: Record<string, any>, prefix = ''): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(filters)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenFilters(value, newKey));
    } else if (value !== undefined) {
      result[newKey] = value;
    }
  }

  return result;
}

// Utility function to flatten objects
export const flattenObject = (obj: Record<string, any>, prefix = ''): any[] => {
  const result: any[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result.push(...flattenObject(value, newKey));
    } else {
      result.push(newKey, value);
    }
  }

  return result;
};

// Function to extract the Date object
export const extractDate = (dateTime: string): Date => {
  return parseISO(dateTime);
};

// Function to extract the time string
export const extractTime = (dateTime: string): string => {
  const parsedDate = parseISO(dateTime);

  return format(parsedDate, 'HH:mm');
};

export const getQueryParams = (query: Record<string, unknown> = {}) => {
  const queries = Object.entries(query || {}).reduce((acc, [key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      let arrStr: string = '';
      value.forEach((item) => {
        arrStr += `&${key}=${item}`;
      });
      return acc + arrStr;
    } else {
      return acc + `&${key}=${value}`;
    }
  }, '');
  return queries.length > 0 ? '?' + queries.slice(1) : '';
};
