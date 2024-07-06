import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { flattenFilters } from '@/lib/utils';
import { CircleX } from 'lucide-react';
import React from 'react';

export function AppliedFilters({ filterProps }: { filterProps: any }) {
  const flattenedFilters = flattenFilters(filterProps?.defaultValues || {});

  return (
    <>
      {Object.keys(flattenedFilters).length > 0 && (
        <>
          <Separator />
          <div className="hidden pb-4 md:block">
            <div className="flex flex-col gap-2 p-2 px-4 md:flex-row md:items-center md:justify-start md:gap-4">
              <div className="flex items-center justify-center rounded bg-black p-2 text-white">
                Applied Filters
              </div>
              <Separator orientation="vertical" className="h-6" />
              {Object.entries(flattenedFilters)
                .filter(([, value]) => value !== undefined) // Exclude undefined values
                .map(([key, value]) => (
                  <Badge key={key} variant={'secondary'} className="relative h-8 pr-10">
                    {key}: {Array.isArray(value) ? value.join(', ') : value}
                    <CircleX
                      className="absolute right-1 cursor-pointer fill-background"
                      onClick={() => filterProps?.clearSingleFilter?.(key)}
                    />
                  </Badge>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
