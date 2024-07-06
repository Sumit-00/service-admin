'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PaginationState, OnChangeFn } from '@tanstack/react-table';

export function usePagination(initialSize = 10): {
  onPagination: OnChangeFn<PaginationState>;
  pagination: PaginationState;
  pageIndex: number;
  limit: number;
} {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: searchParams.get('limit') ? Number(searchParams.get('limit')) : initialSize,
    pageIndex: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  });
  const { pageSize, pageIndex } = pagination;

  const onPageOrPageSizeChange = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageIndex.toString());
    params.set('limit', pageSize.toString());
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, replace, pathname, pageSize, pageIndex]);

  useEffect(() => {
    onPageOrPageSizeChange();
  }, [onPageOrPageSizeChange, pageSize, pageIndex]);

  return {
    onPagination: setPagination,
    pagination,
    pageIndex,
    limit: pageSize,
  };
}
