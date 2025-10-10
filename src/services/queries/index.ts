import type { IUniqueOutcomeMarket } from '@/types/models/market';
import type { EOutcomeType } from '@/types/models/orderbook';

export const queryKeys = {
  orderBook: ({
    marketId,
    outcomeId,
    outcomeType,
  }: Partial<IUniqueOutcomeMarket>) => [
    'order-book',
    marketId,
    outcomeId,
    outcomeType,
  ],
  latestTradePrice: ({
    marketId,
    outcomeId,
    outcomeType,
  }: {
    marketId: number | undefined;
    outcomeId: number | undefined;
    outcomeType: EOutcomeType | undefined;
  }) => ['latest-trade-price', marketId, outcomeId, outcomeType],
};
