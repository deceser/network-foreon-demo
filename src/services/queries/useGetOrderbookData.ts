import { useQuery } from '@tanstack/react-query';

import { marketService } from '@/services/market';
import { queryKeys } from '@/services/queries';
import { useOrderbookDataSub } from '@/services/sockets/useOrderbookDataSub';
import type { IResponse } from '@/services/types';
import type { IUniqueOutcomeMarket } from '@/types/models/market';
import type { IOrder, IOrderbook } from '@/types/models/orderbook';

export function useGetOrderbookData({
  marketId,
  outcomeId,
  outcomeType,
}: Partial<IUniqueOutcomeMarket>) {
  const getOrderBookQuery = useQuery<IResponse<IOrderbook>>({
    queryFn: async () => {
      const response = await marketService.getOrderBook({
        marketId: marketId!,
        outcomeId: outcomeId!,
        outcomeType: outcomeType!,
      });

      const asks = groupOrdersWithSamePrice(response.data.asks);
      const bids = groupOrdersWithSamePrice(response.data.bids);
      return { ...response, data: { asks, bids } };
    },
    enabled: !!marketId && !!outcomeId && outcomeType !== undefined,
    queryKey: queryKeys.orderBook({
      marketId: marketId!,
      outcomeId: outcomeId!,
      outcomeType: outcomeType!,
    }),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Clear queued events if the query is up-to-date
  useOrderbookDataSub(
    { marketId, outcomeId, outcomeType },
    getOrderBookQuery.isSuccess,
  );

  return getOrderBookQuery;
}

function groupOrdersWithSamePrice(data: IOrder[]): IOrder[] {
  // Merge orders with same price => 1 row
  const uniquePrices = Array.from(
    new Set(data.map((order) => parseFloat(order.price))),
  );

  const mergedOrders = uniquePrices.map((price) => {
    const ordersWithSamePrice = data.filter(
      (order) => parseFloat(order.price) === price,
    );
    const totalAmount = ordersWithSamePrice.reduce(
      (acc, order) => acc + parseFloat(order.remainingAmount),
      0,
    );

    return {
      id: ordersWithSamePrice[0].id,
      price: String(price),
      remainingAmount: totalAmount.toString(),
    } satisfies IOrder;
  });

  return mergedOrders;
}
