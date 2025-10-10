import { useQuery } from '@tanstack/react-query';

import { placeOrderService } from '@/services/place-order';
import type { IResponse } from '@/services/types';

export function useGetHistoryOrder(params) {
  return useQuery<IResponse<any>>({
    queryFn: () => placeOrderService.getHistoryOrder(params),
    queryKey: ['order-history', params],
  });
}
