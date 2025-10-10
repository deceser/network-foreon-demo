import { useQuery } from '@tanstack/react-query';

import { placeOrderService } from '@/services/place-order';
import type { IResponse } from '@/services/types';

export function useGetOrder(params) {
  return useQuery<IResponse<any>>({
    queryFn: () => placeOrderService.getOrder(params),
    queryKey: ['order-data', params],
    enabled: !!params,
  });
}
