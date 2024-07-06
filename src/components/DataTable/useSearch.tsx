'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
import { OnChangeFn, PaginationState } from '@tanstack/react-table';

export default function useSearch({
  onPagination,
}: {
  onPagination: OnChangeFn<PaginationState>;
}): {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
} {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('search')?.toString() || '',
  );
  const debouncedSearch = useDebounce(searchTerm, 300);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    setSearchTerm(value);
    onPagination({
      pageIndex: 1,
      pageSize: params.get('limit') ? Number(params.get('limit')) : 10,
    });
  };

  useEffect(() => {
    const onDebouncedSearch = () => {
      const params = new URLSearchParams(searchParams);
      if (debouncedSearch) {
        params.set('search', debouncedSearch);
      } else {
        params.delete('search');
      }
      replace(`${pathname}?${params.toString()}`);
    };

    onDebouncedSearch();
  }, [debouncedSearch, searchParams, replace, pathname]);

  return {
    onSearch: handleSearch,
    searchTerm,
  };
}
