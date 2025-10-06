/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable  @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */

import { type Address, Data, type PolicyId, type Script } from 'lucid-cardano';

import { ESortKey, EStatusKey, EVolumeKey } from '@/types/common/common.enum';

const volumeList = [
  {
    key: EVolumeKey.ALL,
    label: 'All',
    minAmount: undefined,
    maxAmount: undefined,
  },
  {
    key: EVolumeKey.UNDER_10_000,
    label: 'Under 10,000 USDM',
    maxAmount: 10000,
    minAmount: undefined,
  },
  {
    key: EVolumeKey.RANGE_10000_50000,
    label: '10,000 USDM - 50,000 USDM',
    minAmount: 10000,
    maxAmount: 50000,
  },
  {
    key: EVolumeKey.RANGE_50000_100000,
    label: '50,000 USDM - 100,000 USDM',
    minAmount: 50000,
    maxAmount: 100000,
  },
  {
    key: EVolumeKey.OVER_100000,
    label: 'Above 100,000 USDM',
    minAmount: 100000,
    maxAmount: undefined,
  },
];

const statusMarketList = [
  {
    key: EStatusKey.ALL,
    label: 'All',
  },
  {
    key: EStatusKey.ACTIVE,
    label: 'Active',
  },
  {
    key: EStatusKey.ENDED,
    label: 'Ended',
  },
];

const sortMarketList = [
  {
    key: ESortKey.VOLUME,
    label: 'Volume',
  },
  {
    key: ESortKey.NEWEST,
    label: 'Newest',
  },
  {
    key: ESortKey.ENDING_SOON,
    label: 'Ending Soon',
  },
  {
    key: ESortKey.ENDED_RECENTLY,
    label: 'Ended Recently',
  },
];

enum ETab {
  BUY = 'Buy',
  SELL = 'Sell',
}

const PredictionDatumSchema = Data.Object({
  id: Data.Bytes(),
  /// EndDate
  endDate: Data.Integer(),
  // System fee, per thousand
  totalShare: Data.Integer(),
  ipfsUrl: Data.Bytes(),
  // 0: unset, 1: yes, 2: no
  result: Data.Integer(),
});

type PredictionDatum = Data.Static<typeof PredictionDatumSchema>;
const PredictionDatum = PredictionDatumSchema as unknown as PredictionDatum;

enum OutcomeType {
  Yes = 'Yes',
  No = 'No',
}

enum OrderType {
  Limit = 'Limit',
  Market = 'Market',
}

enum OrderSide {
  Buy = 'Buy',
  Sell = 'Sell',
}
const OutputReferenceSchema = Data.Object({
  transactionId: Data.Object({
    hash: Data.Bytes(),
  }),
  outputIndex: Data.Integer(),
});
const PlaceSchema = Data.Object({
  share: Data.Integer(),
  side: Data.Enum([Data.Literal(OrderSide.Buy), Data.Literal(OrderSide.Sell)]),
  price: Data.Integer(),
  expiration: Data.Integer(),
  outcomeType: Data.Enum([
    Data.Literal(OutcomeType.Yes),
    Data.Literal(OutcomeType.No),
  ]),
  orderType: Data.Enum([
    Data.Literal(OrderType.Limit),
    Data.Literal(OrderType.Market),
  ]),
  maxMatchingTime: Data.Integer(),
  sourceOrderTxHash: Data.Nullable(OutputReferenceSchema),
});

const WithdrawSchema = Data.Object({
  amount: Data.Integer(),
});

type PlaceSchema = Data.Static<typeof PlaceSchema>;
type WithdrawSchema = Data.Static<typeof WithdrawSchema>;

const OrderDatumSchema = Data.Object({
  predictionId: Data.Bytes(),
  owner: Data.Bytes(),
  order: Data.Enum([
    Data.Object({
      Place: PlaceSchema,
    }),
    Data.Object({
      Withdraw: WithdrawSchema,
    }),
  ]),
});
type OrderDatum = Data.Static<typeof OrderDatumSchema>;
const OrderDatum = OrderDatumSchema as unknown as OrderDatum;

const OrderRedeemerSchema = Data.Enum([
  Data.Literal('Cancel'),
  Data.Literal('Scoop'),
]);

type OrderRedeemer = Data.Static<typeof OrderRedeemerSchema>;
const OrderRedeemer = OrderRedeemerSchema as unknown as OrderRedeemer;

type OutputReference = Data.Static<typeof OutputReferenceSchema>;
const OutputReference = OutputReferenceSchema as unknown as OutputReference;
type ContractScripts = {
  settingValidator: Script;
  settingAddress: Address;
  settingMint: Script;
  settingMintPolicyId: PolicyId;
  outcomeValidator: Script;
  outcomeAddress: Address;
  orderValidator: Script;
  orderAddress: Address;
  tokenMint: Script;
  tokenMintingPolicyId: PolicyId;
};
export {
  ETab,
  OrderDatum,
  OrderDatumSchema,
  OrderRedeemer,
  OrderSide,
  OrderType,
  OutcomeType,
  OutputReference,
  sortMarketList,
  statusMarketList,
  volumeList,
};
export type { ContractScripts };
