import { del, get, post } from '@/services/httpClient';
import type { IResponse } from '@/services/types';
import PlaceOrderAPI from '@/constants/api';

export const placeOrderService = {
  getOrder(params: Record<string, any>) {
    return get<IResponse<any>>(PlaceOrderAPI.getOrder, params);
  },

  getOrderPosition(params: Record<string, any>) {
    return get<IResponse<any>>(PlaceOrderAPI.getOrderPosition, params);
  },

  getHistoryOrder(params: Record<string, any>) {
    return get<IResponse<any>>(PlaceOrderAPI.getHistoryOrder, params);
  },

  getTotalVolume() {
    return get<IResponse<any>>(PlaceOrderAPI.getMarketTrades);
  },

  createOrder(data: Record<string, any>) {
    return post<IResponse<any>>(PlaceOrderAPI.createOrder, data);
  },

  cancelOrder(id: number) {
    return del<IResponse<any>>(PlaceOrderAPI.cancelOrder(id));
  },

  claimPosition(data: Record<string, any>) {
    return post<IResponse<any>>(PlaceOrderAPI.claimPosition, data);
  },

  getClaimPosition(params: Record<string, any>) {
    return get<IResponse<any>>(PlaceOrderAPI.claimPosition, params);
  },
};

export type { IResponse };

