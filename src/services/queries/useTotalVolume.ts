import { useQuery } from '@tanstack/react-query';

import { placeOrderService } from '@/services/place-order';
import type { IResponse } from '@/services/types';

const ACCESS_TOKEN_KEY = 'access_token';
export function useGetTotalVolume() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  return useQuery<IResponse<any>>({
    queryFn: () => placeOrderService.getTotalVolume(),
    queryKey: ['total-volume', accessToken],
    enabled: !!accessToken,
  });
}
