import { get } from '@/services/httpClient';
import type { IResponse } from '@/services/types';
import type {
  ILatestMarketTradingPrice,
  IMarketDetail,
  IParamOrderBook,
  IParamTradeGraph,
  ITradeGraph,
} from '@/types/models/market';
import type { IOrderbook } from '@/types/models/orderbook';

const MarketAPI = {
  orderBook: '/markets/order-book',
  latestPrice: '/markets/latest-price',
  detail: (id: string) => `/markets/${id}`,
  tradeGraph: '/markets/trade-graph',
} as const;

export const marketService = {
  getOrderBook(params: IParamOrderBook) {
    return get<IResponse<IOrderbook>>(MarketAPI.orderBook, params);
  },

  getLatestPrice(params: { marketId: number; outcomeId: number; outcomeType: 0 | 1 }) {
    return get<IResponse<ILatestMarketTradingPrice>>(MarketAPI.latestPrice, params);
  },

  getMarketDetail(id: string) {
    return get<IResponse<IMarketDetail>>(MarketAPI.detail(id));
  },

  getTradeGraph(params: IParamTradeGraph) {
    return get<IResponse<ITradeGraph>>(MarketAPI.tradeGraph, params);
  },
};

export type { IResponse };

