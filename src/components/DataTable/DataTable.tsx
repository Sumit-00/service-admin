import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Column,
  ColumnDef,
  OnChangeFn,
  PaginationState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import DialogBox from '../DialogBox';
import FormWrapper, { FormWrapperProps } from '../FormWrapper';
import { Button } from '../ui/button';
import { ColumnDropdownMenu } from './ui/ColumnDropdownMenu';
import { PaginationComponent } from './ui/PaginationComponent';
import { Search } from './ui/Search';
import { AppliedFilters } from './ui/AppliedFilters';

export type PaginationMeta = {
  itemsPerPage?: number;
  totalItems?: number;
  currentPage?: number;
  totalPages?: number;
  sortBy?: Array<string[]>;
};

export type PaginationRequest = {
  page?: number;
  limit?: number;
  search?: string;
};

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  searchProps: {
    show?: boolean;
    placeholder?: string;
  };
  filterProps?: FormWrapperProps & {
    show?: boolean;
    clearSingleFilter: (name: string) => void;
  };
  paginationProps: {
    show?: boolean;
    onPagination: OnChangeFn<PaginationState>;
    pagination: PaginationState;
    meta: PaginationMeta;
  };
  ctas?: React.ReactNode;
}

const getCommonPinningClasses = (column: Column<any>): string => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

  let classes = 'relative';
  if (isPinned) {
    classes += ' lg:sticky lg:z-10';
    if (isPinned === 'left') {
      // classes += ` lg:left-[${column.getStart('left')}px]`;
      classes += ` lg:left-0`;
    } else if (isPinned === 'right') {
      // classes += ` lg:right-[${column.getAfter('right')}px]`;
      classes += ` lg:right-0`;
    }
    if (isLastLeftPinnedColumn) {
      classes += ' lg:shadow-[inset_-4px_0_4px_-4px_gray] ';
    } else if (isFirstRightPinnedColumn) {
      classes += ' lg:shadow-[inset_4px_0_4px_-4px_gray] ';
    }
  }

  return classes;
};

export function DataTable<TData>({
  columns,
  data = [],
  paginationProps = {
    onPagination: () => {},
    pagination: { pageIndex: 0, pageSize: 10 },
    show: true,
    meta: {
      itemsPerPage: 10,
      totalItems: 0,
      currentPage: 1,
      totalPages: 0,
      sortBy: [],
    },
  },
  ctas,
  searchProps = {
    show: true,
  },
  filterProps,
}: DataTableProps<TData>) {
  const { pagination, onPagination, meta } = paginationProps;
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    enableColumnPinning: true,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: onPagination, //update the pagination state when internal APIs mutate the pagination state
    manualPagination: true,
    rowCount: meta?.totalItems || 0,
    // pageCount: meta?.totalPages || -1,
    state: {
      columnVisibility,
      rowSelection,
      pagination: pagination,
      columnPinning: {
        left: [columns?.[0]?.id as string],
        right: ['actions'],
      },
    },
  });

  return (
    <section className="w-full" aria-label="search and filter options">
      <div className="flex flex-col justify-between gap-3 py-6 md:mx-4 md:flex-row md:gap-4">
        {searchProps.show && (
          <Search onPagination={onPagination} placeholder={searchProps?.placeholder} />
        )}
        <div className="flex flex-col gap-2 md:flex-row md:gap-2">
          <DialogBox
            body={(onClose) =>
              filterProps?.show && (
                <FormWrapper
                  {...filterProps}
                  onCancel={() => {
                    onClose();
                    filterProps?.onCancel?.();
                  }}
                  onSubmit={(data: Record<string, unknown>) => {
                    filterProps?.onSubmit?.(data);
                    onClose();
                  }}
                />
              )
            }
            trigger={
              filterProps?.show && (
                <Button variant="outline" className="w-full max-w-full md:w-auto">
                  Filters
                </Button>
              )
            }
            title="Filters"
            footer={null}
          />
          <ColumnDropdownMenu table={table} />
          {ctas ?? null}
        </div>
      </div>
      {Object.keys(filterProps?.defaultValues || {}).length > 0 && (
        <AppliedFilters filterProps={filterProps} />
      )}
      <div className="overflow-x-auto rounded border md:mx-4">
        <Table>
          <TableHeader className="sticky top-0 hidden md:table-header-group">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`max-w-fit lg:min-w-[150px] ${getCommonPinningClasses(header.column)} whitespace-nowrap bg-black text-white`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="block bg-background hover:bg-gray-light md:table-row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`bg-inherit block md:table-cell ${getCommonPinningClasses(cell.column)}`}
                    >
                      <span
                        className={`block font-bold md:hidden lg:min-w-[${cell.column.getSize()}px]`}
                      >
                        {cell.column.columnDef.header as React.ReactNode}:
                      </span>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="block md:table-row">
                <TableCell
                  colSpan={columns.length}
                  className="border-gray-200 block h-24 border-b p-4 text-center md:table-cell lg:min-w-[150px]"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paginationProps.show && (
        <PaginationComponent pagination={pagination} table={table} meta={meta} />
      )}
    </section>
  );
}
