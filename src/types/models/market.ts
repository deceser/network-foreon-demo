import type { TISODateString } from '@/types/common';
import type {
  EResolveStatus,
  ESortKey,
  EStatusKey,
  EVolumeKey,
} from '@/types/common/common.enum';
import type { EOutcomeType } from '@/types/models/orderbook';

enum EMarketType {
  SINGLE_OUTCOME = 0,
  MULTIPLE_OUTCOME = 1,
}

enum EResolveMethod {
  AUTOMATICALLY,
  MANUALLY,
}

enum EMarketStatus {
  CREATED,
  ACTIVE,
  ENDED,
  CANCELED,
}
enum ETimeRageGraph {
  ONE_HOURS = 'H_1',
  SIX_HOURS = 'H_6',
  DAY = 'D',
  WEEK = 'W',
  MONTH = 'M',
  ALL = 'ALL',
}
interface IMarket {
  canceledAt: string | null;
  category: string;
  createdAt: TISODateString;
  endedAt: TISODateString;
  id: number;
  imageUrl: string;
  isCanceled: number;
  marketRule: string;
  noVolume: number;
  outcomes: IOutcome[];
  resolveMethod: EResolveMethod;
  resolveStatus: EResolveStatus;
  status: EMarketStatus;
  title: string;
  totalVolume: number;
  type: EMarketType;
  updatedAt: TISODateString;
  yesVolume: number;
}

interface ICategory {
  key: string;
  value: string;
}

enum EResolveResult {
  YES = 'Yes',
  NO = 'No',
}

interface IOutcome {
  createdAt: TISODateString;
  deletedAt: TISODateString;
  hash: string;
  id: number;
  imageUrl: string;
  ipfsUrl: string;
  marketId: IMarketDetail['id'];
  noLatestPrice: number;
  reliableUrl: string;
  resolveHash: null;
  result: EResolveResult;
  title: string;
  updatedAt: TISODateString;
  volume: number;
  yesLatestPrice: number;
}

interface IMarketDetail {
  cancelledAt: Date;
  category: string;
  createdAt: Date;
  endedAt: Date;
  hash: null;
  id: number;
  imageUrl: string;
  isCanceled: number;
  marketRule: string;
  noVolume: number;
  outcomes: IOutcome[];
  resolveMethod: EResolveMethod;
  resolveStatus: EResolveStatus;
  status: EMarketStatus;
  title: string;
  totalVolume: number;
  type: EMarketType;
  updatedAt: Date;
  yesVolume: number;
}
interface IPaginationMarket {
  currentPage: number;
  limitPage?: number;
  pageNumber?: number;
  totalItem?: number;
  totalPage?: number;
}
interface IParamMarketList {
  limit: number;
  category?: string;
  maxAmount?: number;
  maxDate?: string;
  minAmount?: number;
  minDate?: string;
  page?: number;
  search?: string;
  sortBy?: string;
  status?: string;
}

interface IMarketFilter {
  category: string[];
  limit: number;
  page: number;
  search: string;
  status: EStatusKey;
  maxAmount?: number;
  maxDate?: string;
  minAmount?: number;
  minDate?: string;
  sortBy?: ESortKey;
  volumeKey?: EVolumeKey;
  /**
   * ISO 9601 date string
   *  */
}

interface IParamOrderBook {
  marketId: number;
  outcomeId: number;
  outcomeType: 0 | 1;
}
interface IParamTradeGraph {
  graphType: ETimeRageGraph;
  maxDate?: string;
  minDate?: string;
  outcomeId?: number;
}
type TDataType = {
  created_at: string;
  outcome_type?: number;
  price?: number;
  trades_id?: number;
};

interface ITradeGraph {
  dataNo: TDataType[];
  dataYes: TDataType[];
}

interface ILatestMarketTradingPrice {
  marketId: number;
  price: string;
}

interface IUniqueOutcomeMarket {
  marketId: number;
  outcomeId: number;
  outcomeType: EOutcomeType;
}

export type {
  ICategory,
  IMarket,
  IPaginationMarket,
  IParamMarketList,
  IMarketDetail,
  IParamOrderBook,
  IMarketFilter,
  IOutcome,
  IParamTradeGraph,
  ITradeGraph,
  TDataType,
  ILatestMarketTradingPrice,
  IUniqueOutcomeMarket,
};

export {
  EMarketType,
  EMarketStatus,
  EResolveMethod,
  EResolveStatus,
  EResolveResult,
  ETimeRageGraph,
};
