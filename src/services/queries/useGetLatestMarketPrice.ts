import { useQuery } from '@tanstack/react-query';

import { marketService } from '@/services/market';
import { queryKeys } from '@/services/queries';
import { useLatestTradingPriceSub } from '@/services/sockets/useLatestTradingPriceSub';
import type { EOutcomeType } from '@/types/models/orderbook';

export function useGetLatestMarketPrice({
  marketId,
  outcomeId,
  outcomeType,
}: {
  marketId: number | undefined;
  outcomeId: number | undefined;
  outcomeType: EOutcomeType | undefined;
}) {
  useLatestTradingPriceSub({ marketId, outcomeId, outcomeType });

  return useQuery({
    queryKey: queryKeys.latestTradePrice({
      marketId,
      outcomeId,
      outcomeType,
    }),
    queryFn: () =>
      marketService.getLatestPrice({
        marketId: marketId!,
        outcomeId: outcomeId!,
        outcomeType: outcomeType!,
      }),
    enabled: !!marketId && !!outcomeId && outcomeType !== undefined,
  });
}
