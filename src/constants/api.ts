const PlaceOrderAPI = {
  createOrder: '/orders',
  claimOrder: (id: number) => `/orders/${id}/claimed`,
  getMarketTrades: '/trades/market-trade',
  getHistoryOrder: '/trades/history',
  cancelOrder: (id: number) => `/orders/${id}/cancelled`,
  getOrderPosition: '/orders/position',
  getOrder: '/orders',
  claimPosition: '/orders/position-claims',
};
export default PlaceOrderAPI;
