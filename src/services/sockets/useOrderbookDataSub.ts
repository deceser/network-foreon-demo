import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useCallback, useEffect, useState } from 'react';

import { queryKeys } from '@/services/queries';
import { Wss } from '@/services/socket';
import { ESocketEvent } from '@/services/sockets/events';
import type { IOrderbookEventData } from '@/services/sockets/types';
import type { IResponse } from '@/services/types';
import type { IUniqueOutcomeMarket } from '@/types/models/market';
import {
  EOrderSide,
  type IOrder,
  type IOrderbook,
} from '@/types/models/orderbook';

const MIN_AMOUNT = 0.001;
const socket = Wss.getInstance();

/**
 * Update the orderbook data through the socket
 * @param to subcribe to the orderbook of an outcome
 * @param isDataApiGetSuccess if the data is fetched from the API
 */
export function useOrderbookDataSub(
  to: Partial<IUniqueOutcomeMarket>,
  isDataApiGetSuccess: boolean,
) {
  const queryClient = useQueryClient();
  const [socketUpdateQueue, setSocketUpdateQueue] = useState<VoidFunction[]>(
    [],
  );
  const isQueueEmpty = socketUpdateQueue.length === 0;
  const shouldUpdateDataThroughSocket = isDataApiGetSuccess && isQueueEmpty;

  const queueAnUpdate = useCallback((update: VoidFunction) => {
    setSocketUpdateQueue((prev) => [...prev, update]);
  }, []);

  useEffect(() => {
    if (to.marketId && to.outcomeId && to.outcomeType !== undefined) {
      setSocketUpdateQueue([]);
    }
  }, [to.marketId, to.outcomeId, to.outcomeType]);

  /**
   * Handle the queue update, if the data is not fetched from the API, we should not update the data from the socket
   * Only update the data from the socket if the queue is empty and the data is fetched from the API
   */
  useEffect(() => {
    async function handleQueueUpdate() {
      // If the data is not fetched from the API, we should not update the data from the socket
      if (!isDataApiGetSuccess || isQueueEmpty) return;

      const update = socketUpdateQueue.reduce(async (prev, cur) => {
        await prev;
        cur();
      }, Promise.resolve());

      await update;
      setSocketUpdateQueue([]);
    }

    handleQueueUpdate().catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({
        queryKey: queryKeys.orderBook(to),
      });
      setSocketUpdateQueue([]);
    });
  }, [isDataApiGetSuccess, isQueueEmpty, socketUpdateQueue, queryClient, to]);

  useOnOrderbookAdded(to, queueAnUpdate, shouldUpdateDataThroughSocket);
  useOnOrderbookUpdated(to, queueAnUpdate, shouldUpdateDataThroughSocket);
}

// =====================================================================================================================
// Internal hooks
// =====================================================================================================================

function useOnOrderbookUpdated(
  to: Partial<IUniqueOutcomeMarket>,
  queueUpdate: (update: VoidFunction) => void,
  shouldUpdateDataThroughSocket: boolean,
) {
  const queryClient = useQueryClient();
  const { marketId, outcomeId, outcomeType } = to;

  useEffect(() => {
    if (!marketId || !outcomeId || outcomeType === undefined) return;

    const onUpdateOrderbook = (updateData: IOrderbookEventData) => {
      const {
        marketId: _marketId,
        outcomeId: _outcomeId,
        outcomeType: _outcomeType,
      } = updateData;

      const updateOrderbook = (): void => {
        queryClient.setQueryData(
          queryKeys.orderBook({
            marketId: _marketId,
            outcomeId: _outcomeId,
            outcomeType: _outcomeType,
          }),
          (staleResponse: IResponse<IOrderbook>) => {
            const newOrderbook = produce(staleResponse, (draft) => {
              const { asks, bids } = draft.data;
              if (updateData.side === EOrderSide.SELL) {
                draft.data.asks = updateOrderList('sub', asks, updateData);
              } else {
                draft.data.bids = updateOrderList('sub', bids, updateData);
              }

              return draft;
            });

            return newOrderbook;
          },
        );
      };

      if (shouldUpdateDataThroughSocket) {
        return updateOrderbook();
      }

      return queueUpdate(updateOrderbook);
    };

    const eventName = getOrderBookEventName(ESocketEvent.UpdateOrderbook, {
      marketId,
      outcomeId,
      outcomeType,
    });

    socket.on(eventName, onUpdateOrderbook, { id: eventName });

    return () => {
      socket.off(eventName, onUpdateOrderbook, { id: eventName });
    };
  }, [
    queryClient,
    marketId,
    outcomeId,
    outcomeType,
    queueUpdate,
    shouldUpdateDataThroughSocket,
  ]);
}

function useOnOrderbookAdded(
  to: Partial<IUniqueOutcomeMarket>,
  queueUpdate: (update: VoidFunction) => void,
  shouldUpdateDataThroughSocket: boolean,
) {
  const queryClient = useQueryClient();
  const { marketId, outcomeId, outcomeType } = to;

  useEffect(() => {
    if (!marketId || !outcomeId || outcomeType === undefined) return;

    const onAddOrderbook = (data: IOrderbookEventData) => {
      const {
        marketId: _marketId,
        outcomeId: _outcomeId,
        outcomeType: _outcomeType,
      } = data;

      const updateOrderbook = (): void => {
        queryClient.setQueryData(
          queryKeys.orderBook({
            marketId: _marketId,
            outcomeId: _outcomeId,
            outcomeType: _outcomeType,
          }),
          (staleResponse: IResponse<IOrderbook>) => {
            const updatedResponse = produce(staleResponse, (draft) => {
              const { asks, bids } = draft.data;
              if (data.side === EOrderSide.SELL) {
                draft.data.asks = addOrderbookData(asks, data).toSorted(
                  (a, b) => parseFloat(a.price) - parseFloat(b.price),
                );
              } else {
                draft.data.bids = addOrderbookData(bids, data).toSorted(
                  (a, b) => parseFloat(b.price) - parseFloat(a.price),
                );
              }
            });

            return updatedResponse;
          },
        );
      };

      if (shouldUpdateDataThroughSocket) {
        return updateOrderbook();
      }

      return queueUpdate(updateOrderbook);
    };

    const eventName = getOrderBookEventName(
      ESocketEvent.AddOrderbook,
      to as Required<IUniqueOutcomeMarket>,
    );

    socket.on(eventName, onAddOrderbook, { id: eventName });

    return () => {
      socket.off(eventName, onAddOrderbook, { id: eventName });
    };
  }, [
    queryClient,
    shouldUpdateDataThroughSocket,
    queueUpdate,
    marketId,
    outcomeId,
    outcomeType,
    to,
  ]);
}

// =====================================================================================================================
// Internal functions
// =====================================================================================================================

function addOrderbookData(
  currentListOrder: IOrder[],
  newData: Pick<IOrderbookEventData, 'amount' | 'id' | 'price'>,
) {
  const isOrderExist =
    currentListOrder.findIndex(
      (order) => parseFloat(order.price) === parseFloat(newData.price),
    ) !== -1;
  if (isOrderExist) {
    return updateOrderList('add', currentListOrder, newData);
  }

  const newOrder: IOrder = {
    id: newData.id,
    price: newData.price,
    remainingAmount: newData.amount,
  };

  const newOrderList = [...currentListOrder, newOrder];
  return newOrderList;
}

function updateOrderList(
  type: 'add' | 'sub',
  lst: IOrder[],
  update: Pick<IOrderbookEventData, 'amount' | 'price'>,
) {
  const changeAmount =
    type === 'add' ? parseFloat(update.amount) : -parseFloat(update.amount);

  return lst
    .map((order) => {
      if (parseFloat(order.price) === parseFloat(update.price)) {
        const newAmount = String(
          parseFloat(order.remainingAmount) + changeAmount,
        );
        return {
          ...order,
          remainingAmount: newAmount,
        };
      }
      return order;
    })
    .filter((order) => parseFloat(order.remainingAmount) > MIN_AMOUNT);
}

function getOrderBookEventName(event: ESocketEvent, to: IUniqueOutcomeMarket) {
  return `${event}_${to.marketId}_${to.outcomeId}_${to.outcomeType}`;
}
