export interface IResponse<TData> {
  code: number;
  data: TData;
  metadata: {
    limit: number;
    page: number;
    timestamp: number;
    total: number;
    totalPage: number;
  };
}
