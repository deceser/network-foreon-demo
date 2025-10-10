import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { Wss } from '@/services/socket';
import { ESocketEvent } from '@/services/sockets/events';
import type { EOrderStatus } from '@/types/models/orderbook';
import { showToastMessage } from '@/utils/helpers/toastMessage';

export interface IOrderReturnedData {
  amount: number;
  id: string;
  side: number;
  status: EOrderStatus;
  total: number;
}
const socket = Wss.getInstance();

/**
 * Handle market order returned event and show toast notification
 */
export function useMarketOrderReturned() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onMarketOrderReturned = () => {
      // Show toast notification
      showToastMessage(
        'error',
        'There is no available bid/ask, you may cancel the order now',
      );

      // Optionally update any query data if necessary
      queryClient
        .invalidateQueries({
          queryKey: ['order-data'],
        })
        .catch(() => {});
    };

    // Listen to the global 'market_order_returned' event
    socket.on(ESocketEvent.MarketOrderReturned, onMarketOrderReturned);

    return () => {
      socket.off(ESocketEvent.MarketOrderReturned, onMarketOrderReturned);
    };
  }, [queryClient]);
}
