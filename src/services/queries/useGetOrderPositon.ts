import { useQuery } from '@tanstack/react-query';

import { placeOrderService } from '@/services/place-order';
import type { IResponse } from '@/services/types';
import type { IParamPosition } from '@/types/models/place-order';

export function useGetOrderPosition(params: IParamPosition) {
  return useQuery<IResponse<any>>({
    queryFn: () => placeOrderService.getOrderPosition(params),
    queryKey: ['order-position', params],
  });
}
