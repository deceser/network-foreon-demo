import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/contexts/auth';
import { tryGetMe } from '@/services/auth';

export function useGetMe() {
  const { isLogged } = useAuth();

  return useQuery({
    queryKey: ['me'],
    queryFn: tryGetMe,
    enabled: isLogged,
  });
}
