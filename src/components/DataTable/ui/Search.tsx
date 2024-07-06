'use client';

import { Input } from '@/components/ui/input';
import useSearch from '../useSearch';
import { OnChangeFn, PaginationState } from '@tanstack/react-table';

export const Search = ({
  onPagination,
  placeholder,
}: {
  onPagination: OnChangeFn<PaginationState>;
  placeholder?: string;
}) => {
  const { onSearch, searchTerm } = useSearch({ onPagination });

  return (
    <Input
      placeholder={placeholder || 'Search'}
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      className="max-w-sm"
    />
  );
};
