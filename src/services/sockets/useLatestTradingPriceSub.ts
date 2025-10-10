import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useEffect } from 'react';

import { queryKeys } from '@/services/queries';
import { Wss } from '@/services/socket';
import { ESocketEvent } from '@/services/sockets/events';
import type { IResponse } from '@/services/types';
import type {
  ILatestMarketTradingPrice,
  IUniqueOutcomeMarket,
} from '@/types/models/market';

const socket = Wss.getInstance();
const getLatestTradingPriceEventName = (to: IUniqueOutcomeMarket) =>
  `${ESocketEvent.MarketTrade}:${to.marketId}:${to.outcomeId}:${to.outcomeType}`;

export function useLatestTradingPriceSub(to: Partial<IUniqueOutcomeMarket>) {
  const queryClient = useQueryClient();
  const { marketId, outcomeId, outcomeType } = to;

  useEffect(() => {
    if (!marketId || !outcomeId || outcomeType === undefined) return;

    const onLatestTradingPriceUpdate = (latestTradePrice: string) => {
      queryClient.setQueryData(
        queryKeys.latestTradePrice({ marketId, outcomeId, outcomeType }),
        (prevData: IResponse<ILatestMarketTradingPrice>) => {
          return produce(prevData, (draft) => {
            draft.data.price = latestTradePrice;
          });
        },
      );
    };

    const eventName = getLatestTradingPriceEventName({
      marketId,
      outcomeId,
      outcomeType,
    });
    socket.on(eventName, onLatestTradingPriceUpdate);

    return () => {
      socket.off(eventName, onLatestTradingPriceUpdate);
    };
  }, [marketId, outcomeId, outcomeType, queryClient]);
}
