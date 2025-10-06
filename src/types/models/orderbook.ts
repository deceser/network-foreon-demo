enum EOrderSide {
  BUY = 1,
  SELL = 2,
}

enum EOrderType {
  LIMIT = 1,
  MARKET = 2,
}

enum EOutcomeType {
  NO = 0,
  YES = 1,
}

enum EOrderStatus {
  MarketOrderReturned = -5, // Market order returned
  Invalid = -3, //  Invalid order
  Expired = -2, // Expired order
  Cancelled = -1, // Cancel order
  Pending = 0, // Pending order waiting for lock balance
  Fillable = 1, // Order waiting for exchange
  Filling = 2, // Order in exchange processing with another order
  PartialFilled = 3, // Order is partially filled
  Fullfilled = 4, // Order matched all amount
  FilledAndCancelled = 5, // Order matched all amount and cancelled'
  Claimed = 6, // Order claimed
}

interface IOrder {
  id: number;
  price: string;
  remainingAmount: string;
  //type: EOrderType;
}

interface IOrderbook {
  asks: IOrder[];
  bids: IOrder[];
}

export type { IOrderbook, IOrder };
export { EOutcomeType, EOrderStatus, EOrderSide, EOrderType };
