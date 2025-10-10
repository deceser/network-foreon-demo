import { useQuery } from '@tanstack/react-query';

import { placeOrderService } from '@/services/place-order';
import type { IResponse } from '@/services/types';
import type { IParamPosition } from '@/types/models/place-order';

export function useGetClaimed(params: IParamPosition) {
  return useQuery<IResponse<any>>({
    queryFn: () => placeOrderService.getClaimPosition(params),
    queryKey: ['order-claimed', params],
  });
}
