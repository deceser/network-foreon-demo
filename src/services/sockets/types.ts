import type { EOrderSide, EOutcomeType } from '@/types/models/orderbook';

interface IOrderbookEventData {
  /**
   * > 0: Buy,
   * < 0: Sell
   */
  amount: string;
  /**
   * Order ID
   */
  id: number;
  /**
   * Market ID
   */
  marketId: number;
  /**
   * Remaining amount
   */
  outcomeId: number;
  /**
   * Order side:  Buy | Sell
   */
  outcomeType: EOutcomeType;
  /**
   * Outcome type
   */
  price: string;
  /**
   * Price
   */
  side: EOrderSide;
}

export type { IOrderbookEventData };
