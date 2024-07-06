'use client';

import { Table, PaginationState } from '@tanstack/react-table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
} from '@/components/ui/pagination';
import { PaginationMeta } from '../DataTable';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface PaginationProps<TData> {
  pagination: PaginationState;
  table: Table<TData>;
  meta: PaginationMeta;
}

export function PaginationComponent<TData>({ pagination, table, meta }: PaginationProps<TData>) {
  const { pageIndex, pageSize } = pagination;
  const isNextPageDisabled = pageIndex * pageSize >= (meta?.totalItems || 0);

  return (
    <div className="bg-white sticky bottom-0 z-10 flex flex-col items-center justify-between gap-4 space-x-2 py-4 md:mx-4 md:flex-row">
      <div className="text-black flex-1 text-a14">
        {meta?.totalItems
          ? `Showing ${(pageIndex - 1) * pageSize + 1} to ${
              isNextPageDisabled ? meta?.totalItems || 0 : pageIndex * pageSize
            } of ${meta?.totalItems || 0} results`
          : 'No Results'}
      </div>

      <div className="-space-x-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst onClick={() => table.setPageIndex(1)} href="#" />
            </PaginationItem>

            {table.getCanPreviousPage() && pageIndex - 1 > 0 && (
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => table.previousPage()} />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                isActive={true}
                onClick={() => table.setPageIndex(pageIndex)}
                href="#"
                className="min-w-full"
                aria-disabled={true}
              >
                {pageIndex}
              </PaginationLink>
            </PaginationItem>

            {!isNextPageDisabled && (
              <PaginationItem>
                <PaginationNext onClick={() => table.nextPage()} href="#" />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLast onClick={() => table.setPageIndex(meta?.totalPages || 0)} href="#" />
            </PaginationItem>
          </PaginationContent>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              table.setPageIndex(1);
            }}
          >
            <SelectTrigger className="hidden w-max md:flex">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100, 200].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  Show {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Pagination>
      </div>
    </div>
  );
}
