import { getAllTheChecklists } from '@/app/checklist/actions';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type useGetAllTheChecklist = {
  query?: string;
};

export interface AllChecklistData {
  id: number;
  created_at: Date;
  updated_at: Date;
  uid: string;
  name: string;
  module: string;
  sub_module: string;
  created_by: string;
  updated_by: string;
  is_active: boolean;
  is_draft: boolean;
}
interface ApiResponse<T> {
  data: T;
}

export function useGetAllTheChecklist({ query }: useGetAllTheChecklist) {
  const result: UseQueryResult<
    ApiResponse<{ paginatedData: AllChecklistData[] }>,
    Error
  > = useQuery({
    queryKey: ['getAllTheChecklist'],
    queryFn: () =>
      getAllTheChecklists<{ data: { paginatedData: AllChecklistData[] } }>(query || ''),
  });
  return result.data;
}
