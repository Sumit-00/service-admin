import { getAllTheAssignee } from '@/app/audit/actions';
import { UserType } from '@/constants/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export function useGetAllTheAssignee(query = '') {
  const result: UseQueryResult<{ data: { data: UserType[] } }> = useQuery({
    queryKey: ['getAllTheAssignee'],
    queryFn: () => getAllTheAssignee<{ data: { data: UserType[] } }>(query),
  });

  return result;
}
