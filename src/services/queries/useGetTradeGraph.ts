import { useQuery } from '@tanstack/react-query';

import { marketService } from '@/services/market';
import type { IParamTradeGraph } from '@/types/models/market';

export function useGetTradeGraph(params: IParamTradeGraph) {
  return useQuery({
    queryFn: async () => {
      const tradeGraph = await marketService.getTradeGraph(params);
      return tradeGraph?.data?.data;
    },
    queryKey: ['tradeGraph', params],
    refetchInterval: 60000,
  });
}
