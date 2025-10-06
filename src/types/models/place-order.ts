/* eslint-disable @typescript-eslint/naming-convention */

import type { EOrderStatus } from '@/types/models/orderbook';

/* eslint-disable @typescript-eslint/member-ordering */
enum TOrderStatus {
  Pending = 'Pending',
  Fillable = 'Fillable',
  Filling = 'Filling',
  PartialFilled = 'PartialFilled',

  // history
  Fullfilled = 'Fullfilled',
  FilledAndCancelled = 'FilledAndCancelled',
  Expired = 'Expired',
  Cancelled = 'Cancelled',
  Invalid = 'Invalid',
}
interface IParamPosition {
  limit: number;
  page?: number;
  search?: string;
  market?: string;
  sortType?: string;
  result?: string;
}
type ITradeHistory = {
  market_title: string;
  market_id: number;
  market_type: number;
  outcome_title: string;
  outcome_id: number;
  id: number;
  outcome_type: number;
  trade_id: number;
  method: number;
  order_id: number;
  user_id: number;
  price: number;
  filled_amount: number;
  created_at: string; // You can use `Date` if you prefer to work with Date objects
  order_hash: string;
  tx_hash: string;
  action: 'buy' | 'sell'; // If action is always "buy" or "sell"
  total: number;
};

type Outcome = {
  id: number;
  title: string;
  result: any;
};

type Market = {
  id: number;
  title: string;
  type: number;
  status: number;
};

type TOrder = {
  id: number;
  address: string;
  type: number;
  side: number;
  outcomeType: number;
  status: EOrderStatus;
  price: number;
  amount: number;
  filledAmount: number;
  remainingAmount: number;
  cancelledAmount: number;
  total: number;
  payback: number;
  txHash: string;
  outputIndex: number;
  createdAt: string; // or Date if you handle it as a Date object
  outcome: Outcome;
  market: Market;
  averagePrice: number;
};
type TPositionResponse = {
  type: string; // or 'yes' | 'no' if it's always limited to those values
  outcomeId: number;
  assetName: string;
  value: number;
  outcomes_id: number;
  outcomes_market_id: number;
  outcomes_title: string;
  market_id: number;
  market_title: string;
  market_type: number;
  wonLost: number; // If wonLost is a binary flag, you can define it as 0 | 1
};
export { TOrderStatus };

export type { IParamPosition, ITradeHistory, TOrder, TPositionResponse };
