import { useQuery } from '@tanstack/react-query';

import { marketService } from '@/services/market';

export function useGetMarketDetail(id: string | undefined) {
  return useQuery({
    queryFn: () => marketService.getMarketDetail(id!),
    queryKey: ['markets', id],
    enabled: !!id,
  });
}
