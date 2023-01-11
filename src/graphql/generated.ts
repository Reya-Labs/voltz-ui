import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Amm = {
  __typename?: 'AMM';
  burns: Array<Burn>;
  createdTimestamp: Scalars['BigInt'];
  fcm: Fcm;
  id: Scalars['ID'];
  liquidations: Array<Liquidation>;
  marginEngine: MarginEngine;
  marginUpdates: Array<MarginUpdate>;
  mints: Array<Mint>;
  rateOracle: RateOracle;
  settlements: Array<Settlement>;
  swaps: Array<Swap>;
  termEndTimestamp: Scalars['BigInt'];
  termStartTimestamp: Scalars['BigInt'];
  tick: Scalars['BigInt'];
  tickSpacing: Scalars['BigInt'];
  totalLiquidity: Scalars['BigInt'];
  totalNotionalTraded: Scalars['BigInt'];
  txCount: Scalars['BigInt'];
  updatedTimestamp: Scalars['BigInt'];
  vammPriceChangeCount: Scalars['BigInt'];
};

export type AmmBurnsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Burn_Filter>;
};

export type AmmLiquidationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Liquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Liquidation_Filter>;
};

export type AmmMarginUpdatesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarginUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MarginUpdate_Filter>;
};

export type AmmMintsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
};

export type AmmSettlementsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Settlement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Settlement_Filter>;
};

export type AmmSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};

export type Amm_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  burns_?: InputMaybe<Burn_Filter>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fcm?: InputMaybe<Scalars['String']>;
  fcm_?: InputMaybe<Fcm_Filter>;
  fcm_contains?: InputMaybe<Scalars['String']>;
  fcm_contains_nocase?: InputMaybe<Scalars['String']>;
  fcm_ends_with?: InputMaybe<Scalars['String']>;
  fcm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fcm_gt?: InputMaybe<Scalars['String']>;
  fcm_gte?: InputMaybe<Scalars['String']>;
  fcm_in?: InputMaybe<Array<Scalars['String']>>;
  fcm_lt?: InputMaybe<Scalars['String']>;
  fcm_lte?: InputMaybe<Scalars['String']>;
  fcm_not?: InputMaybe<Scalars['String']>;
  fcm_not_contains?: InputMaybe<Scalars['String']>;
  fcm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  fcm_not_ends_with?: InputMaybe<Scalars['String']>;
  fcm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fcm_not_in?: InputMaybe<Array<Scalars['String']>>;
  fcm_not_starts_with?: InputMaybe<Scalars['String']>;
  fcm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fcm_starts_with?: InputMaybe<Scalars['String']>;
  fcm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidations_?: InputMaybe<Liquidation_Filter>;
  marginEngine?: InputMaybe<Scalars['String']>;
  marginEngine_?: InputMaybe<MarginEngine_Filter>;
  marginEngine_contains?: InputMaybe<Scalars['String']>;
  marginEngine_contains_nocase?: InputMaybe<Scalars['String']>;
  marginEngine_ends_with?: InputMaybe<Scalars['String']>;
  marginEngine_ends_with_nocase?: InputMaybe<Scalars['String']>;
  marginEngine_gt?: InputMaybe<Scalars['String']>;
  marginEngine_gte?: InputMaybe<Scalars['String']>;
  marginEngine_in?: InputMaybe<Array<Scalars['String']>>;
  marginEngine_lt?: InputMaybe<Scalars['String']>;
  marginEngine_lte?: InputMaybe<Scalars['String']>;
  marginEngine_not?: InputMaybe<Scalars['String']>;
  marginEngine_not_contains?: InputMaybe<Scalars['String']>;
  marginEngine_not_contains_nocase?: InputMaybe<Scalars['String']>;
  marginEngine_not_ends_with?: InputMaybe<Scalars['String']>;
  marginEngine_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  marginEngine_not_in?: InputMaybe<Array<Scalars['String']>>;
  marginEngine_not_starts_with?: InputMaybe<Scalars['String']>;
  marginEngine_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  marginEngine_starts_with?: InputMaybe<Scalars['String']>;
  marginEngine_starts_with_nocase?: InputMaybe<Scalars['String']>;
  marginUpdates_?: InputMaybe<MarginUpdate_Filter>;
  mints_?: InputMaybe<Mint_Filter>;
  rateOracle?: InputMaybe<Scalars['String']>;
  rateOracle_?: InputMaybe<RateOracle_Filter>;
  rateOracle_contains?: InputMaybe<Scalars['String']>;
  rateOracle_contains_nocase?: InputMaybe<Scalars['String']>;
  rateOracle_ends_with?: InputMaybe<Scalars['String']>;
  rateOracle_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rateOracle_gt?: InputMaybe<Scalars['String']>;
  rateOracle_gte?: InputMaybe<Scalars['String']>;
  rateOracle_in?: InputMaybe<Array<Scalars['String']>>;
  rateOracle_lt?: InputMaybe<Scalars['String']>;
  rateOracle_lte?: InputMaybe<Scalars['String']>;
  rateOracle_not?: InputMaybe<Scalars['String']>;
  rateOracle_not_contains?: InputMaybe<Scalars['String']>;
  rateOracle_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rateOracle_not_ends_with?: InputMaybe<Scalars['String']>;
  rateOracle_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rateOracle_not_in?: InputMaybe<Array<Scalars['String']>>;
  rateOracle_not_starts_with?: InputMaybe<Scalars['String']>;
  rateOracle_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rateOracle_starts_with?: InputMaybe<Scalars['String']>;
  rateOracle_starts_with_nocase?: InputMaybe<Scalars['String']>;
  settlements_?: InputMaybe<Settlement_Filter>;
  swaps_?: InputMaybe<Swap_Filter>;
  termEndTimestamp?: InputMaybe<Scalars['BigInt']>;
  termEndTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  termEndTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  termEndTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  termEndTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  termEndTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  termEndTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  termEndTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  termStartTimestamp?: InputMaybe<Scalars['BigInt']>;
  termStartTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  termStartTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  termStartTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  termStartTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  termStartTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  termStartTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  termStartTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tick?: InputMaybe<Scalars['BigInt']>;
  tickSpacing?: InputMaybe<Scalars['BigInt']>;
  tickSpacing_gt?: InputMaybe<Scalars['BigInt']>;
  tickSpacing_gte?: InputMaybe<Scalars['BigInt']>;
  tickSpacing_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tickSpacing_lt?: InputMaybe<Scalars['BigInt']>;
  tickSpacing_lte?: InputMaybe<Scalars['BigInt']>;
  tickSpacing_not?: InputMaybe<Scalars['BigInt']>;
  tickSpacing_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tick_gt?: InputMaybe<Scalars['BigInt']>;
  tick_gte?: InputMaybe<Scalars['BigInt']>;
  tick_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tick_lt?: InputMaybe<Scalars['BigInt']>;
  tick_lte?: InputMaybe<Scalars['BigInt']>;
  tick_not?: InputMaybe<Scalars['BigInt']>;
  tick_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLiquidity?: InputMaybe<Scalars['BigInt']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BigInt']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BigInt']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalLiquidity_lt?: InputMaybe<Scalars['BigInt']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BigInt']>;
  totalLiquidity_not?: InputMaybe<Scalars['BigInt']>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNotionalTraded?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_gt?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_gte?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNotionalTraded_lt?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_lte?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_not?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount?: InputMaybe<Scalars['BigInt']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txCount_lt?: InputMaybe<Scalars['BigInt']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']>;
  txCount_not?: InputMaybe<Scalars['BigInt']>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedTimestamp?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vammPriceChangeCount?: InputMaybe<Scalars['BigInt']>;
  vammPriceChangeCount_gt?: InputMaybe<Scalars['BigInt']>;
  vammPriceChangeCount_gte?: InputMaybe<Scalars['BigInt']>;
  vammPriceChangeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vammPriceChangeCount_lt?: InputMaybe<Scalars['BigInt']>;
  vammPriceChangeCount_lte?: InputMaybe<Scalars['BigInt']>;
  vammPriceChangeCount_not?: InputMaybe<Scalars['BigInt']>;
  vammPriceChangeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Amm_OrderBy {
  Burns = 'burns',
  CreatedTimestamp = 'createdTimestamp',
  Fcm = 'fcm',
  Id = 'id',
  Liquidations = 'liquidations',
  MarginEngine = 'marginEngine',
  MarginUpdates = 'marginUpdates',
  Mints = 'mints',
  RateOracle = 'rateOracle',
  Settlements = 'settlements',
  Swaps = 'swaps',
  TermEndTimestamp = 'termEndTimestamp',
  TermStartTimestamp = 'termStartTimestamp',
  Tick = 'tick',
  TickSpacing = 'tickSpacing',
  TotalLiquidity = 'totalLiquidity',
  TotalNotionalTraded = 'totalNotionalTraded',
  TxCount = 'txCount',
  UpdatedTimestamp = 'updatedTimestamp',
  VammPriceChangeCount = 'vammPriceChangeCount',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Burn = {
  __typename?: 'Burn';
  amm: Amm;
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  position: Position;
  sender: Scalars['String'];
  transaction: Transaction;
};

export type Burn_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  position?: InputMaybe<Scalars['String']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']>;
  position_contains_nocase?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Burn_OrderBy {
  Amm = 'amm',
  Amount = 'amount',
  Id = 'id',
  Position = 'position',
  Sender = 'sender',
  Transaction = 'transaction',
}

export type Fcm = {
  __typename?: 'FCM';
  amm: Amm;
  id: Scalars['ID'];
};

export type FcmPosition = {
  __typename?: 'FCMPosition';
  amm: Amm;
  createdTimestamp: Scalars['BigInt'];
  fcmSettlements: Array<FcmSettlement>;
  fcmSwaps: Array<FcmSwap>;
  fcmUnwinds: Array<FcmUnwind>;
  fixedTokenBalance: Scalars['BigInt'];
  id: Scalars['ID'];
  isSettled: Scalars['Boolean'];
  marginInScaledYieldBearingTokens: Scalars['BigInt'];
  owner: Wallet;
  snapshotCount: Scalars['BigInt'];
  snapshots: Array<FcmPositionSnapshot>;
  sumOfWeightedFixedRate: Scalars['BigInt'];
  totalNotionalTraded: Scalars['BigInt'];
  updatedTimestamp: Scalars['BigInt'];
  variableTokenBalance: Scalars['BigInt'];
};

export type FcmPositionFcmSettlementsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmSettlement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FcmSettlement_Filter>;
};

export type FcmPositionFcmSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmSwap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FcmSwap_Filter>;
};

export type FcmPositionFcmUnwindsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmUnwind_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FcmUnwind_Filter>;
};

export type FcmPositionSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmPositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FcmPositionSnapshot_Filter>;
};

export type FcmPositionSnapshot = {
  __typename?: 'FCMPositionSnapshot';
  createdTimestamp: Scalars['BigInt'];
  fcmPosition: FcmPosition;
  fixedTokenBalance: Scalars['BigInt'];
  id: Scalars['ID'];
  isSettled: Scalars['Boolean'];
  marginInScaledYieldBearingTokens: Scalars['BigInt'];
  sumOfWeightedFixedRate: Scalars['BigInt'];
  totalNotionalTraded: Scalars['BigInt'];
  variableTokenBalance: Scalars['BigInt'];
};

export type FcmPositionSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fcmPosition?: InputMaybe<Scalars['String']>;
  fcmPosition_?: InputMaybe<FcmPosition_Filter>;
  fcmPosition_contains?: InputMaybe<Scalars['String']>;
  fcmPosition_contains_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_ends_with?: InputMaybe<Scalars['String']>;
  fcmPosition_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_gt?: InputMaybe<Scalars['String']>;
  fcmPosition_gte?: InputMaybe<Scalars['String']>;
  fcmPosition_in?: InputMaybe<Array<Scalars['String']>>;
  fcmPosition_lt?: InputMaybe<Scalars['String']>;
  fcmPosition_lte?: InputMaybe<Scalars['String']>;
  fcmPosition_not?: InputMaybe<Scalars['String']>;
  fcmPosition_not_contains?: InputMaybe<Scalars['String']>;
  fcmPosition_not_contains_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_not_ends_with?: InputMaybe<Scalars['String']>;
  fcmPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_not_in?: InputMaybe<Array<Scalars['String']>>;
  fcmPosition_not_starts_with?: InputMaybe<Scalars['String']>;
  fcmPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_starts_with?: InputMaybe<Scalars['String']>;
  fcmPosition_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fixedTokenBalance?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_gt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_gte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenBalance_lt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_lte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_not?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isSettled?: InputMaybe<Scalars['Boolean']>;
  isSettled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isSettled_not?: InputMaybe<Scalars['Boolean']>;
  isSettled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  marginInScaledYieldBearingTokens?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_gt?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_gte?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_in?: InputMaybe<Array<Scalars['BigInt']>>;
  marginInScaledYieldBearingTokens_lt?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_lte?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_not?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sumOfWeightedFixedRate?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_gt?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_gte?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sumOfWeightedFixedRate_lt?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_lte?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_not?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNotionalTraded?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_gt?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_gte?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNotionalTraded_lt?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_lte?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_not?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  variableTokenBalance?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_gt?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_gte?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  variableTokenBalance_lt?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_lte?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_not?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FcmPositionSnapshot_OrderBy {
  CreatedTimestamp = 'createdTimestamp',
  FcmPosition = 'fcmPosition',
  FixedTokenBalance = 'fixedTokenBalance',
  Id = 'id',
  IsSettled = 'isSettled',
  MarginInScaledYieldBearingTokens = 'marginInScaledYieldBearingTokens',
  SumOfWeightedFixedRate = 'sumOfWeightedFixedRate',
  TotalNotionalTraded = 'totalNotionalTraded',
  VariableTokenBalance = 'variableTokenBalance',
}

export type FcmPosition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fcmSettlements_?: InputMaybe<FcmSettlement_Filter>;
  fcmSwaps_?: InputMaybe<FcmSwap_Filter>;
  fcmUnwinds_?: InputMaybe<FcmUnwind_Filter>;
  fixedTokenBalance?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_gt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_gte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenBalance_lt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_lte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_not?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isSettled?: InputMaybe<Scalars['Boolean']>;
  isSettled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isSettled_not?: InputMaybe<Scalars['Boolean']>;
  isSettled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  marginInScaledYieldBearingTokens?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_gt?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_gte?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_in?: InputMaybe<Array<Scalars['BigInt']>>;
  marginInScaledYieldBearingTokens_lt?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_lte?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_not?: InputMaybe<Scalars['BigInt']>;
  marginInScaledYieldBearingTokens_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Wallet_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  snapshotCount?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_gt?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_gte?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  snapshotCount_lt?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_lte?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_not?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  snapshots_?: InputMaybe<FcmPositionSnapshot_Filter>;
  sumOfWeightedFixedRate?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_gt?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_gte?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sumOfWeightedFixedRate_lt?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_lte?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_not?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNotionalTraded?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_gt?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_gte?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNotionalTraded_lt?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_lte?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_not?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedTimestamp?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  variableTokenBalance?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_gt?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_gte?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  variableTokenBalance_lt?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_lte?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_not?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FcmPosition_OrderBy {
  Amm = 'amm',
  CreatedTimestamp = 'createdTimestamp',
  FcmSettlements = 'fcmSettlements',
  FcmSwaps = 'fcmSwaps',
  FcmUnwinds = 'fcmUnwinds',
  FixedTokenBalance = 'fixedTokenBalance',
  Id = 'id',
  IsSettled = 'isSettled',
  MarginInScaledYieldBearingTokens = 'marginInScaledYieldBearingTokens',
  Owner = 'owner',
  SnapshotCount = 'snapshotCount',
  Snapshots = 'snapshots',
  SumOfWeightedFixedRate = 'sumOfWeightedFixedRate',
  TotalNotionalTraded = 'totalNotionalTraded',
  UpdatedTimestamp = 'updatedTimestamp',
  VariableTokenBalance = 'variableTokenBalance',
}

export type FcmSettlement = {
  __typename?: 'FCMSettlement';
  amm: Amm;
  fcmPosition: FcmPosition;
  id: Scalars['ID'];
  settlementCashflow: Scalars['BigInt'];
  transaction: Transaction;
};

export type FcmSettlement_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition?: InputMaybe<Scalars['String']>;
  fcmPosition_?: InputMaybe<FcmPosition_Filter>;
  fcmPosition_contains?: InputMaybe<Scalars['String']>;
  fcmPosition_contains_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_ends_with?: InputMaybe<Scalars['String']>;
  fcmPosition_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_gt?: InputMaybe<Scalars['String']>;
  fcmPosition_gte?: InputMaybe<Scalars['String']>;
  fcmPosition_in?: InputMaybe<Array<Scalars['String']>>;
  fcmPosition_lt?: InputMaybe<Scalars['String']>;
  fcmPosition_lte?: InputMaybe<Scalars['String']>;
  fcmPosition_not?: InputMaybe<Scalars['String']>;
  fcmPosition_not_contains?: InputMaybe<Scalars['String']>;
  fcmPosition_not_contains_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_not_ends_with?: InputMaybe<Scalars['String']>;
  fcmPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_not_in?: InputMaybe<Array<Scalars['String']>>;
  fcmPosition_not_starts_with?: InputMaybe<Scalars['String']>;
  fcmPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_starts_with?: InputMaybe<Scalars['String']>;
  fcmPosition_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  settlementCashflow?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_gt?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_gte?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_in?: InputMaybe<Array<Scalars['BigInt']>>;
  settlementCashflow_lt?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_lte?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_not?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum FcmSettlement_OrderBy {
  Amm = 'amm',
  FcmPosition = 'fcmPosition',
  Id = 'id',
  SettlementCashflow = 'settlementCashflow',
  Transaction = 'transaction',
}

export type FcmSwap = {
  __typename?: 'FCMSwap';
  amm: Amm;
  cumulativeFeeIncurred: Scalars['BigInt'];
  desiredNotional: Scalars['BigInt'];
  fcmPosition: FcmPosition;
  fixedTokenDelta: Scalars['BigInt'];
  fixedTokenDeltaUnbalanced: Scalars['BigInt'];
  id: Scalars['ID'];
  sqrtPriceLimitX96: Scalars['BigInt'];
  transaction: Transaction;
  variableTokenDelta: Scalars['BigInt'];
};

export type FcmSwap_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cumulativeFeeIncurred?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeFeeIncurred_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  desiredNotional?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_gt?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_gte?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_in?: InputMaybe<Array<Scalars['BigInt']>>;
  desiredNotional_lt?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_lte?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_not?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fcmPosition?: InputMaybe<Scalars['String']>;
  fcmPosition_?: InputMaybe<FcmPosition_Filter>;
  fcmPosition_contains?: InputMaybe<Scalars['String']>;
  fcmPosition_contains_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_ends_with?: InputMaybe<Scalars['String']>;
  fcmPosition_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_gt?: InputMaybe<Scalars['String']>;
  fcmPosition_gte?: InputMaybe<Scalars['String']>;
  fcmPosition_in?: InputMaybe<Array<Scalars['String']>>;
  fcmPosition_lt?: InputMaybe<Scalars['String']>;
  fcmPosition_lte?: InputMaybe<Scalars['String']>;
  fcmPosition_not?: InputMaybe<Scalars['String']>;
  fcmPosition_not_contains?: InputMaybe<Scalars['String']>;
  fcmPosition_not_contains_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_not_ends_with?: InputMaybe<Scalars['String']>;
  fcmPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_not_in?: InputMaybe<Array<Scalars['String']>>;
  fcmPosition_not_starts_with?: InputMaybe<Scalars['String']>;
  fcmPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_starts_with?: InputMaybe<Scalars['String']>;
  fcmPosition_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fixedTokenDelta?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_gt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_gte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenDeltaUnbalanced_lt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_lte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_not?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenDelta_gt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_gte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenDelta_lt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_lte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_not?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sqrtPriceLimitX96?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_gt?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_gte?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sqrtPriceLimitX96_lt?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_lte?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_not?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  variableTokenDelta?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_gt?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_gte?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  variableTokenDelta_lt?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_lte?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_not?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FcmSwap_OrderBy {
  Amm = 'amm',
  CumulativeFeeIncurred = 'cumulativeFeeIncurred',
  DesiredNotional = 'desiredNotional',
  FcmPosition = 'fcmPosition',
  FixedTokenDelta = 'fixedTokenDelta',
  FixedTokenDeltaUnbalanced = 'fixedTokenDeltaUnbalanced',
  Id = 'id',
  SqrtPriceLimitX96 = 'sqrtPriceLimitX96',
  Transaction = 'transaction',
  VariableTokenDelta = 'variableTokenDelta',
}

export type FcmUnwind = {
  __typename?: 'FCMUnwind';
  amm: Amm;
  cumulativeFeeIncurred: Scalars['BigInt'];
  desiredNotional: Scalars['BigInt'];
  fcmPosition: FcmPosition;
  fixedTokenDelta: Scalars['BigInt'];
  fixedTokenDeltaUnbalanced: Scalars['BigInt'];
  id: Scalars['ID'];
  sqrtPriceLimitX96: Scalars['BigInt'];
  transaction: Transaction;
  variableTokenDelta: Scalars['BigInt'];
};

export type FcmUnwind_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cumulativeFeeIncurred?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeFeeIncurred_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  desiredNotional?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_gt?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_gte?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_in?: InputMaybe<Array<Scalars['BigInt']>>;
  desiredNotional_lt?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_lte?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_not?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fcmPosition?: InputMaybe<Scalars['String']>;
  fcmPosition_?: InputMaybe<FcmPosition_Filter>;
  fcmPosition_contains?: InputMaybe<Scalars['String']>;
  fcmPosition_contains_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_ends_with?: InputMaybe<Scalars['String']>;
  fcmPosition_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_gt?: InputMaybe<Scalars['String']>;
  fcmPosition_gte?: InputMaybe<Scalars['String']>;
  fcmPosition_in?: InputMaybe<Array<Scalars['String']>>;
  fcmPosition_lt?: InputMaybe<Scalars['String']>;
  fcmPosition_lte?: InputMaybe<Scalars['String']>;
  fcmPosition_not?: InputMaybe<Scalars['String']>;
  fcmPosition_not_contains?: InputMaybe<Scalars['String']>;
  fcmPosition_not_contains_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_not_ends_with?: InputMaybe<Scalars['String']>;
  fcmPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_not_in?: InputMaybe<Array<Scalars['String']>>;
  fcmPosition_not_starts_with?: InputMaybe<Scalars['String']>;
  fcmPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fcmPosition_starts_with?: InputMaybe<Scalars['String']>;
  fcmPosition_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fixedTokenDelta?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_gt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_gte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenDeltaUnbalanced_lt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_lte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_not?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenDelta_gt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_gte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenDelta_lt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_lte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_not?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sqrtPriceLimitX96?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_gt?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_gte?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sqrtPriceLimitX96_lt?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_lte?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_not?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  variableTokenDelta?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_gt?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_gte?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  variableTokenDelta_lt?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_lte?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_not?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum FcmUnwind_OrderBy {
  Amm = 'amm',
  CumulativeFeeIncurred = 'cumulativeFeeIncurred',
  DesiredNotional = 'desiredNotional',
  FcmPosition = 'fcmPosition',
  FixedTokenDelta = 'fixedTokenDelta',
  FixedTokenDeltaUnbalanced = 'fixedTokenDeltaUnbalanced',
  Id = 'id',
  SqrtPriceLimitX96 = 'sqrtPriceLimitX96',
  Transaction = 'transaction',
  VariableTokenDelta = 'variableTokenDelta',
}

export type Fcm_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Fcm_OrderBy {
  Amm = 'amm',
  Id = 'id',
}

export type Factory = {
  __typename?: 'Factory';
  id: Scalars['ID'];
  owner: Scalars['ID'];
};

export type Factory_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['ID']>;
  owner_gt?: InputMaybe<Scalars['ID']>;
  owner_gte?: InputMaybe<Scalars['ID']>;
  owner_in?: InputMaybe<Array<Scalars['ID']>>;
  owner_lt?: InputMaybe<Scalars['ID']>;
  owner_lte?: InputMaybe<Scalars['ID']>;
  owner_not?: InputMaybe<Scalars['ID']>;
  owner_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Factory_OrderBy {
  Id = 'id',
  Owner = 'owner',
}

export type Liquidation = {
  __typename?: 'Liquidation';
  amm: Amm;
  id: Scalars['ID'];
  liquidator: Scalars['String'];
  notionalUnwound: Scalars['BigInt'];
  position: Position;
  reward: Scalars['BigInt'];
  transaction: Transaction;
};

export type Liquidation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidator?: InputMaybe<Scalars['String']>;
  liquidator_contains?: InputMaybe<Scalars['String']>;
  liquidator_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidator_ends_with?: InputMaybe<Scalars['String']>;
  liquidator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidator_gt?: InputMaybe<Scalars['String']>;
  liquidator_gte?: InputMaybe<Scalars['String']>;
  liquidator_in?: InputMaybe<Array<Scalars['String']>>;
  liquidator_lt?: InputMaybe<Scalars['String']>;
  liquidator_lte?: InputMaybe<Scalars['String']>;
  liquidator_not?: InputMaybe<Scalars['String']>;
  liquidator_not_contains?: InputMaybe<Scalars['String']>;
  liquidator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidator_not_ends_with?: InputMaybe<Scalars['String']>;
  liquidator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidator_not_in?: InputMaybe<Array<Scalars['String']>>;
  liquidator_not_starts_with?: InputMaybe<Scalars['String']>;
  liquidator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  liquidator_starts_with?: InputMaybe<Scalars['String']>;
  liquidator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  notionalUnwound?: InputMaybe<Scalars['BigInt']>;
  notionalUnwound_gt?: InputMaybe<Scalars['BigInt']>;
  notionalUnwound_gte?: InputMaybe<Scalars['BigInt']>;
  notionalUnwound_in?: InputMaybe<Array<Scalars['BigInt']>>;
  notionalUnwound_lt?: InputMaybe<Scalars['BigInt']>;
  notionalUnwound_lte?: InputMaybe<Scalars['BigInt']>;
  notionalUnwound_not?: InputMaybe<Scalars['BigInt']>;
  notionalUnwound_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  position?: InputMaybe<Scalars['String']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']>;
  position_contains_nocase?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reward?: InputMaybe<Scalars['BigInt']>;
  reward_gt?: InputMaybe<Scalars['BigInt']>;
  reward_gte?: InputMaybe<Scalars['BigInt']>;
  reward_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reward_lt?: InputMaybe<Scalars['BigInt']>;
  reward_lte?: InputMaybe<Scalars['BigInt']>;
  reward_not?: InputMaybe<Scalars['BigInt']>;
  reward_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Liquidation_OrderBy {
  Amm = 'amm',
  Id = 'id',
  Liquidator = 'liquidator',
  NotionalUnwound = 'notionalUnwound',
  Position = 'position',
  Reward = 'reward',
  Transaction = 'transaction',
}

export type MarginEngine = {
  __typename?: 'MarginEngine';
  amm: Amm;
  id: Scalars['ID'];
};

export type MarginEngine_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum MarginEngine_OrderBy {
  Amm = 'amm',
  Id = 'id',
}

export type MarginUpdate = {
  __typename?: 'MarginUpdate';
  amm: Amm;
  depositer: Scalars['String'];
  id: Scalars['ID'];
  marginDelta: Scalars['BigInt'];
  position: Position;
  transaction: Transaction;
};

export type MarginUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  depositer?: InputMaybe<Scalars['String']>;
  depositer_contains?: InputMaybe<Scalars['String']>;
  depositer_contains_nocase?: InputMaybe<Scalars['String']>;
  depositer_ends_with?: InputMaybe<Scalars['String']>;
  depositer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  depositer_gt?: InputMaybe<Scalars['String']>;
  depositer_gte?: InputMaybe<Scalars['String']>;
  depositer_in?: InputMaybe<Array<Scalars['String']>>;
  depositer_lt?: InputMaybe<Scalars['String']>;
  depositer_lte?: InputMaybe<Scalars['String']>;
  depositer_not?: InputMaybe<Scalars['String']>;
  depositer_not_contains?: InputMaybe<Scalars['String']>;
  depositer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  depositer_not_ends_with?: InputMaybe<Scalars['String']>;
  depositer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  depositer_not_in?: InputMaybe<Array<Scalars['String']>>;
  depositer_not_starts_with?: InputMaybe<Scalars['String']>;
  depositer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  depositer_starts_with?: InputMaybe<Scalars['String']>;
  depositer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  marginDelta?: InputMaybe<Scalars['BigInt']>;
  marginDelta_gt?: InputMaybe<Scalars['BigInt']>;
  marginDelta_gte?: InputMaybe<Scalars['BigInt']>;
  marginDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  marginDelta_lt?: InputMaybe<Scalars['BigInt']>;
  marginDelta_lte?: InputMaybe<Scalars['BigInt']>;
  marginDelta_not?: InputMaybe<Scalars['BigInt']>;
  marginDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  position?: InputMaybe<Scalars['String']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']>;
  position_contains_nocase?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum MarginUpdate_OrderBy {
  Amm = 'amm',
  Depositer = 'depositer',
  Id = 'id',
  MarginDelta = 'marginDelta',
  Position = 'position',
  Transaction = 'transaction',
}

export type Mint = {
  __typename?: 'Mint';
  amm: Amm;
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  position: Position;
  sender: Scalars['String'];
  transaction: Transaction;
};

export type Mint_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  position?: InputMaybe<Scalars['String']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']>;
  position_contains_nocase?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Mint_OrderBy {
  Amm = 'amm',
  Amount = 'amount',
  Id = 'id',
  Position = 'position',
  Sender = 'sender',
  Transaction = 'transaction',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Position = {
  __typename?: 'Position';
  accumulatedFees: Scalars['BigInt'];
  amm: Amm;
  burns: Array<Burn>;
  createdTimestamp: Scalars['BigInt'];
  fixedTokenBalance: Scalars['BigInt'];
  id: Scalars['ID'];
  isSettled: Scalars['Boolean'];
  liquidations: Array<Liquidation>;
  liquidity: Scalars['BigInt'];
  margin: Scalars['BigInt'];
  marginUpdates: Array<MarginUpdate>;
  mints: Array<Mint>;
  owner: Wallet;
  positionType: Scalars['BigInt'];
  settlements: Array<Settlement>;
  snapshotCount: Scalars['BigInt'];
  snapshots: Array<PositionSnapshot>;
  sumOfWeightedFixedRate: Scalars['BigInt'];
  swaps: Array<Swap>;
  tickLower: Scalars['BigInt'];
  tickUpper: Scalars['BigInt'];
  totalNotionalTraded: Scalars['BigInt'];
  updatedTimestamp: Scalars['BigInt'];
  variableTokenBalance: Scalars['BigInt'];
};

export type PositionBurnsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Burn_Filter>;
};

export type PositionLiquidationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Liquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Liquidation_Filter>;
};

export type PositionMarginUpdatesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarginUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MarginUpdate_Filter>;
};

export type PositionMintsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
};

export type PositionSettlementsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Settlement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Settlement_Filter>;
};

export type PositionSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PositionSnapshot_Filter>;
};

export type PositionSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};

export type PositionSnapshot = {
  __typename?: 'PositionSnapshot';
  accumulatedFees: Scalars['BigInt'];
  createdTimestamp: Scalars['BigInt'];
  fixedTokenBalance: Scalars['BigInt'];
  id: Scalars['ID'];
  isSettled: Scalars['Boolean'];
  liquidity: Scalars['BigInt'];
  margin: Scalars['BigInt'];
  position: Position;
  positionType: Scalars['BigInt'];
  sumOfWeightedFixedRate: Scalars['BigInt'];
  totalNotionalTraded: Scalars['BigInt'];
  variableTokenBalance: Scalars['BigInt'];
};

export type PositionSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accumulatedFees?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_gt?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_gte?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accumulatedFees_lt?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_lte?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_not?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenBalance?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_gt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_gte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenBalance_lt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_lte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_not?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isSettled?: InputMaybe<Scalars['Boolean']>;
  isSettled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isSettled_not?: InputMaybe<Scalars['Boolean']>;
  isSettled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  liquidity?: InputMaybe<Scalars['BigInt']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin?: InputMaybe<Scalars['BigInt']>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  position?: InputMaybe<Scalars['String']>;
  positionType?: InputMaybe<Scalars['BigInt']>;
  positionType_gt?: InputMaybe<Scalars['BigInt']>;
  positionType_gte?: InputMaybe<Scalars['BigInt']>;
  positionType_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionType_lt?: InputMaybe<Scalars['BigInt']>;
  positionType_lte?: InputMaybe<Scalars['BigInt']>;
  positionType_not?: InputMaybe<Scalars['BigInt']>;
  positionType_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']>;
  position_contains_nocase?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sumOfWeightedFixedRate?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_gt?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_gte?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sumOfWeightedFixedRate_lt?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_lte?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_not?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNotionalTraded?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_gt?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_gte?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNotionalTraded_lt?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_lte?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_not?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  variableTokenBalance?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_gt?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_gte?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  variableTokenBalance_lt?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_lte?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_not?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum PositionSnapshot_OrderBy {
  AccumulatedFees = 'accumulatedFees',
  CreatedTimestamp = 'createdTimestamp',
  FixedTokenBalance = 'fixedTokenBalance',
  Id = 'id',
  IsSettled = 'isSettled',
  Liquidity = 'liquidity',
  Margin = 'margin',
  Position = 'position',
  PositionType = 'positionType',
  SumOfWeightedFixedRate = 'sumOfWeightedFixedRate',
  TotalNotionalTraded = 'totalNotionalTraded',
  VariableTokenBalance = 'variableTokenBalance',
}

export type Position_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accumulatedFees?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_gt?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_gte?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accumulatedFees_lt?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_lte?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_not?: InputMaybe<Scalars['BigInt']>;
  accumulatedFees_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  burns_?: InputMaybe<Burn_Filter>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenBalance?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_gt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_gte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenBalance_lt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_lte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_not?: InputMaybe<Scalars['BigInt']>;
  fixedTokenBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isSettled?: InputMaybe<Scalars['Boolean']>;
  isSettled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isSettled_not?: InputMaybe<Scalars['Boolean']>;
  isSettled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  liquidations_?: InputMaybe<Liquidation_Filter>;
  liquidity?: InputMaybe<Scalars['BigInt']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin?: InputMaybe<Scalars['BigInt']>;
  marginUpdates_?: InputMaybe<MarginUpdate_Filter>;
  margin_gt?: InputMaybe<Scalars['BigInt']>;
  margin_gte?: InputMaybe<Scalars['BigInt']>;
  margin_in?: InputMaybe<Array<Scalars['BigInt']>>;
  margin_lt?: InputMaybe<Scalars['BigInt']>;
  margin_lte?: InputMaybe<Scalars['BigInt']>;
  margin_not?: InputMaybe<Scalars['BigInt']>;
  margin_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  mints_?: InputMaybe<Mint_Filter>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Wallet_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  positionType?: InputMaybe<Scalars['BigInt']>;
  positionType_gt?: InputMaybe<Scalars['BigInt']>;
  positionType_gte?: InputMaybe<Scalars['BigInt']>;
  positionType_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionType_lt?: InputMaybe<Scalars['BigInt']>;
  positionType_lte?: InputMaybe<Scalars['BigInt']>;
  positionType_not?: InputMaybe<Scalars['BigInt']>;
  positionType_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  settlements_?: InputMaybe<Settlement_Filter>;
  snapshotCount?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_gt?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_gte?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  snapshotCount_lt?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_lte?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_not?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  snapshots_?: InputMaybe<PositionSnapshot_Filter>;
  sumOfWeightedFixedRate?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_gt?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_gte?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sumOfWeightedFixedRate_lt?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_lte?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_not?: InputMaybe<Scalars['BigInt']>;
  sumOfWeightedFixedRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swaps_?: InputMaybe<Swap_Filter>;
  tickLower?: InputMaybe<Scalars['BigInt']>;
  tickLower_gt?: InputMaybe<Scalars['BigInt']>;
  tickLower_gte?: InputMaybe<Scalars['BigInt']>;
  tickLower_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tickLower_lt?: InputMaybe<Scalars['BigInt']>;
  tickLower_lte?: InputMaybe<Scalars['BigInt']>;
  tickLower_not?: InputMaybe<Scalars['BigInt']>;
  tickLower_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tickUpper?: InputMaybe<Scalars['BigInt']>;
  tickUpper_gt?: InputMaybe<Scalars['BigInt']>;
  tickUpper_gte?: InputMaybe<Scalars['BigInt']>;
  tickUpper_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tickUpper_lt?: InputMaybe<Scalars['BigInt']>;
  tickUpper_lte?: InputMaybe<Scalars['BigInt']>;
  tickUpper_not?: InputMaybe<Scalars['BigInt']>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNotionalTraded?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_gt?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_gte?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalNotionalTraded_lt?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_lte?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_not?: InputMaybe<Scalars['BigInt']>;
  totalNotionalTraded_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedTimestamp?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  updatedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  variableTokenBalance?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_gt?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_gte?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  variableTokenBalance_lt?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_lte?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_not?: InputMaybe<Scalars['BigInt']>;
  variableTokenBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Position_OrderBy {
  AccumulatedFees = 'accumulatedFees',
  Amm = 'amm',
  Burns = 'burns',
  CreatedTimestamp = 'createdTimestamp',
  FixedTokenBalance = 'fixedTokenBalance',
  Id = 'id',
  IsSettled = 'isSettled',
  Liquidations = 'liquidations',
  Liquidity = 'liquidity',
  Margin = 'margin',
  MarginUpdates = 'marginUpdates',
  Mints = 'mints',
  Owner = 'owner',
  PositionType = 'positionType',
  Settlements = 'settlements',
  SnapshotCount = 'snapshotCount',
  Snapshots = 'snapshots',
  SumOfWeightedFixedRate = 'sumOfWeightedFixedRate',
  Swaps = 'swaps',
  TickLower = 'tickLower',
  TickUpper = 'tickUpper',
  TotalNotionalTraded = 'totalNotionalTraded',
  UpdatedTimestamp = 'updatedTimestamp',
  VariableTokenBalance = 'variableTokenBalance',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  amm?: Maybe<Amm>;
  amms: Array<Amm>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  factories: Array<Factory>;
  factory?: Maybe<Factory>;
  fcm?: Maybe<Fcm>;
  fcmposition?: Maybe<FcmPosition>;
  fcmpositionSnapshot?: Maybe<FcmPositionSnapshot>;
  fcmpositionSnapshots: Array<FcmPositionSnapshot>;
  fcmpositions: Array<FcmPosition>;
  fcms: Array<Fcm>;
  fcmsettlement?: Maybe<FcmSettlement>;
  fcmsettlements: Array<FcmSettlement>;
  fcmswap?: Maybe<FcmSwap>;
  fcmswaps: Array<FcmSwap>;
  fcmunwind?: Maybe<FcmUnwind>;
  fcmunwinds: Array<FcmUnwind>;
  liquidation?: Maybe<Liquidation>;
  liquidations: Array<Liquidation>;
  marginEngine?: Maybe<MarginEngine>;
  marginEngines: Array<MarginEngine>;
  marginUpdate?: Maybe<MarginUpdate>;
  marginUpdates: Array<MarginUpdate>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  position?: Maybe<Position>;
  positionSnapshot?: Maybe<PositionSnapshot>;
  positionSnapshots: Array<PositionSnapshot>;
  positions: Array<Position>;
  rateOracle?: Maybe<RateOracle>;
  rateOracles: Array<RateOracle>;
  settlement?: Maybe<Settlement>;
  settlements: Array<Settlement>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  underlyingToken?: Maybe<UnderlyingToken>;
  underlyingTokens: Array<UnderlyingToken>;
  vammpriceChange?: Maybe<VammPriceChange>;
  vammpriceChanges: Array<VammPriceChange>;
  wallet?: Maybe<Wallet>;
  wallets: Array<Wallet>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryAmmArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAmmsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Amm_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Amm_Filter>;
};

export type QueryBurnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBurnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Burn_Filter>;
};

export type QueryFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Factory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Factory_Filter>;
};

export type QueryFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFcmArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFcmpositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFcmpositionSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFcmpositionSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmPositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FcmPositionSnapshot_Filter>;
};

export type QueryFcmpositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FcmPosition_Filter>;
};

export type QueryFcmsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Fcm_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Fcm_Filter>;
};

export type QueryFcmsettlementArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFcmsettlementsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmSettlement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FcmSettlement_Filter>;
};

export type QueryFcmswapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFcmswapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmSwap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FcmSwap_Filter>;
};

export type QueryFcmunwindArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFcmunwindsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmUnwind_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FcmUnwind_Filter>;
};

export type QueryLiquidationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLiquidationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Liquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Liquidation_Filter>;
};

export type QueryMarginEngineArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMarginEnginesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarginEngine_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarginEngine_Filter>;
};

export type QueryMarginUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMarginUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarginUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarginUpdate_Filter>;
};

export type QueryMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Mint_Filter>;
};

export type QueryPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPositionSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPositionSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionSnapshot_Filter>;
};

export type QueryPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Position_Filter>;
};

export type QueryRateOracleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRateOraclesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RateOracle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RateOracle_Filter>;
};

export type QuerySettlementArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySettlementsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Settlement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Settlement_Filter>;
};

export type QuerySwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};

export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};

export type QueryUnderlyingTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUnderlyingTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnderlyingToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UnderlyingToken_Filter>;
};

export type QueryVammpriceChangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryVammpriceChangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VammPriceChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VammPriceChange_Filter>;
};

export type QueryWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type RateOracle = {
  __typename?: 'RateOracle';
  id: Scalars['ID'];
  protocolId: Scalars['BigInt'];
  token: UnderlyingToken;
};

export type RateOracle_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  protocolId?: InputMaybe<Scalars['BigInt']>;
  protocolId_gt?: InputMaybe<Scalars['BigInt']>;
  protocolId_gte?: InputMaybe<Scalars['BigInt']>;
  protocolId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  protocolId_lt?: InputMaybe<Scalars['BigInt']>;
  protocolId_lte?: InputMaybe<Scalars['BigInt']>;
  protocolId_not?: InputMaybe<Scalars['BigInt']>;
  protocolId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<UnderlyingToken_Filter>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum RateOracle_OrderBy {
  Id = 'id',
  ProtocolId = 'protocolId',
  Token = 'token',
}

export type Settlement = {
  __typename?: 'Settlement';
  amm: Amm;
  id: Scalars['ID'];
  position: Position;
  settlementCashflow: Scalars['BigInt'];
  transaction: Transaction;
};

export type Settlement_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  position?: InputMaybe<Scalars['String']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']>;
  position_contains_nocase?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']>;
  settlementCashflow?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_gt?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_gte?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_in?: InputMaybe<Array<Scalars['BigInt']>>;
  settlementCashflow_lt?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_lte?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_not?: InputMaybe<Scalars['BigInt']>;
  settlementCashflow_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Settlement_OrderBy {
  Amm = 'amm',
  Id = 'id',
  Position = 'position',
  SettlementCashflow = 'settlementCashflow',
  Transaction = 'transaction',
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  amm?: Maybe<Amm>;
  amms: Array<Amm>;
  burn?: Maybe<Burn>;
  burns: Array<Burn>;
  factories: Array<Factory>;
  factory?: Maybe<Factory>;
  fcm?: Maybe<Fcm>;
  fcmposition?: Maybe<FcmPosition>;
  fcmpositionSnapshot?: Maybe<FcmPositionSnapshot>;
  fcmpositionSnapshots: Array<FcmPositionSnapshot>;
  fcmpositions: Array<FcmPosition>;
  fcms: Array<Fcm>;
  fcmsettlement?: Maybe<FcmSettlement>;
  fcmsettlements: Array<FcmSettlement>;
  fcmswap?: Maybe<FcmSwap>;
  fcmswaps: Array<FcmSwap>;
  fcmunwind?: Maybe<FcmUnwind>;
  fcmunwinds: Array<FcmUnwind>;
  liquidation?: Maybe<Liquidation>;
  liquidations: Array<Liquidation>;
  marginEngine?: Maybe<MarginEngine>;
  marginEngines: Array<MarginEngine>;
  marginUpdate?: Maybe<MarginUpdate>;
  marginUpdates: Array<MarginUpdate>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  position?: Maybe<Position>;
  positionSnapshot?: Maybe<PositionSnapshot>;
  positionSnapshots: Array<PositionSnapshot>;
  positions: Array<Position>;
  rateOracle?: Maybe<RateOracle>;
  rateOracles: Array<RateOracle>;
  settlement?: Maybe<Settlement>;
  settlements: Array<Settlement>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  underlyingToken?: Maybe<UnderlyingToken>;
  underlyingTokens: Array<UnderlyingToken>;
  vammpriceChange?: Maybe<VammPriceChange>;
  vammpriceChanges: Array<VammPriceChange>;
  wallet?: Maybe<Wallet>;
  wallets: Array<Wallet>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionAmmArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAmmsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Amm_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Amm_Filter>;
};

export type SubscriptionBurnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBurnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Burn_Filter>;
};

export type SubscriptionFactoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Factory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Factory_Filter>;
};

export type SubscriptionFactoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFcmArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFcmpositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFcmpositionSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFcmpositionSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmPositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FcmPositionSnapshot_Filter>;
};

export type SubscriptionFcmpositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FcmPosition_Filter>;
};

export type SubscriptionFcmsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Fcm_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Fcm_Filter>;
};

export type SubscriptionFcmsettlementArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFcmsettlementsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmSettlement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FcmSettlement_Filter>;
};

export type SubscriptionFcmswapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFcmswapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmSwap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FcmSwap_Filter>;
};

export type SubscriptionFcmunwindArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFcmunwindsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmUnwind_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FcmUnwind_Filter>;
};

export type SubscriptionLiquidationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLiquidationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Liquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Liquidation_Filter>;
};

export type SubscriptionMarginEngineArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMarginEnginesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarginEngine_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarginEngine_Filter>;
};

export type SubscriptionMarginUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMarginUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarginUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarginUpdate_Filter>;
};

export type SubscriptionMintArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMintsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Mint_Filter>;
};

export type SubscriptionPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPositionSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPositionSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PositionSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionSnapshot_Filter>;
};

export type SubscriptionPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Position_Filter>;
};

export type SubscriptionRateOracleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRateOraclesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RateOracle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RateOracle_Filter>;
};

export type SubscriptionSettlementArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSettlementsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Settlement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Settlement_Filter>;
};

export type SubscriptionSwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};

export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};

export type SubscriptionUnderlyingTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUnderlyingTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnderlyingToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UnderlyingToken_Filter>;
};

export type SubscriptionVammpriceChangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionVammpriceChangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VammPriceChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VammPriceChange_Filter>;
};

export type SubscriptionWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Swap = {
  __typename?: 'Swap';
  amm: Amm;
  cumulativeFeeIncurred: Scalars['BigInt'];
  desiredNotional: Scalars['BigInt'];
  fixedTokenDelta: Scalars['BigInt'];
  fixedTokenDeltaUnbalanced: Scalars['BigInt'];
  id: Scalars['ID'];
  position: Position;
  sender: Scalars['String'];
  sqrtPriceLimitX96: Scalars['BigInt'];
  transaction: Transaction;
  variableTokenDelta: Scalars['BigInt'];
};

export type Swap_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  cumulativeFeeIncurred?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeFeeIncurred_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeFeeIncurred_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  desiredNotional?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_gt?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_gte?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_in?: InputMaybe<Array<Scalars['BigInt']>>;
  desiredNotional_lt?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_lte?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_not?: InputMaybe<Scalars['BigInt']>;
  desiredNotional_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenDelta?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_gt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_gte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenDeltaUnbalanced_lt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_lte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_not?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDeltaUnbalanced_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenDelta_gt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_gte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fixedTokenDelta_lt?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_lte?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_not?: InputMaybe<Scalars['BigInt']>;
  fixedTokenDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  position?: InputMaybe<Scalars['String']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']>;
  position_contains_nocase?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sqrtPriceLimitX96?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_gt?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_gte?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sqrtPriceLimitX96_lt?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_lte?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_not?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceLimitX96_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  variableTokenDelta?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_gt?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_gte?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  variableTokenDelta_lt?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_lte?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_not?: InputMaybe<Scalars['BigInt']>;
  variableTokenDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Swap_OrderBy {
  Amm = 'amm',
  CumulativeFeeIncurred = 'cumulativeFeeIncurred',
  DesiredNotional = 'desiredNotional',
  FixedTokenDelta = 'fixedTokenDelta',
  FixedTokenDeltaUnbalanced = 'fixedTokenDeltaUnbalanced',
  Id = 'id',
  Position = 'position',
  Sender = 'sender',
  SqrtPriceLimitX96 = 'sqrtPriceLimitX96',
  Transaction = 'transaction',
  VariableTokenDelta = 'variableTokenDelta',
}

export type Transaction = {
  __typename?: 'Transaction';
  amm: Amm;
  blockNumber: Scalars['BigInt'];
  burns: Array<Burn>;
  createdTimestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  id: Scalars['ID'];
  liquidations: Array<Liquidation>;
  marginUpdates: Array<MarginUpdate>;
  mints: Array<Mint>;
  settlements: Array<Settlement>;
  swaps: Array<Swap>;
};

export type TransactionBurnsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Burn_Filter>;
};

export type TransactionLiquidationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Liquidation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Liquidation_Filter>;
};

export type TransactionMarginUpdatesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarginUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MarginUpdate_Filter>;
};

export type TransactionMintsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
};

export type TransactionSettlementsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Settlement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Settlement_Filter>;
};

export type TransactionSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};

export type Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burns_?: InputMaybe<Burn_Filter>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidations_?: InputMaybe<Liquidation_Filter>;
  marginUpdates_?: InputMaybe<MarginUpdate_Filter>;
  mints_?: InputMaybe<Mint_Filter>;
  settlements_?: InputMaybe<Settlement_Filter>;
  swaps_?: InputMaybe<Swap_Filter>;
};

export enum Transaction_OrderBy {
  Amm = 'amm',
  BlockNumber = 'blockNumber',
  Burns = 'burns',
  CreatedTimestamp = 'createdTimestamp',
  GasPrice = 'gasPrice',
  Id = 'id',
  Liquidations = 'liquidations',
  MarginUpdates = 'marginUpdates',
  Mints = 'mints',
  Settlements = 'settlements',
  Swaps = 'swaps',
}

export type UnderlyingToken = {
  __typename?: 'UnderlyingToken';
  decimals: Scalars['BigInt'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UnderlyingToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  decimals?: InputMaybe<Scalars['BigInt']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimals_lt?: InputMaybe<Scalars['BigInt']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']>;
  decimals_not?: InputMaybe<Scalars['BigInt']>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum UnderlyingToken_OrderBy {
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
}

export type VammPriceChange = {
  __typename?: 'VAMMPriceChange';
  amm: Amm;
  id: Scalars['ID'];
  tick: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type VammPriceChange_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amm?: InputMaybe<Scalars['String']>;
  amm_?: InputMaybe<Amm_Filter>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tick?: InputMaybe<Scalars['BigInt']>;
  tick_gt?: InputMaybe<Scalars['BigInt']>;
  tick_gte?: InputMaybe<Scalars['BigInt']>;
  tick_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tick_lt?: InputMaybe<Scalars['BigInt']>;
  tick_lte?: InputMaybe<Scalars['BigInt']>;
  tick_not?: InputMaybe<Scalars['BigInt']>;
  tick_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum VammPriceChange_OrderBy {
  Amm = 'amm',
  Id = 'id',
  Tick = 'tick',
  Timestamp = 'timestamp',
}

export type Wallet = {
  __typename?: 'Wallet';
  fcmPositionCount: Scalars['BigInt'];
  fcmPositions: Array<FcmPosition>;
  id: Scalars['ID'];
  positionCount: Scalars['BigInt'];
  positions: Array<Position>;
};

export type WalletFcmPositionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FcmPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FcmPosition_Filter>;
};

export type WalletPositionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Position_Filter>;
};

export type Wallet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  fcmPositionCount?: InputMaybe<Scalars['BigInt']>;
  fcmPositionCount_gt?: InputMaybe<Scalars['BigInt']>;
  fcmPositionCount_gte?: InputMaybe<Scalars['BigInt']>;
  fcmPositionCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fcmPositionCount_lt?: InputMaybe<Scalars['BigInt']>;
  fcmPositionCount_lte?: InputMaybe<Scalars['BigInt']>;
  fcmPositionCount_not?: InputMaybe<Scalars['BigInt']>;
  fcmPositionCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fcmPositions_?: InputMaybe<FcmPosition_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  positionCount?: InputMaybe<Scalars['BigInt']>;
  positionCount_gt?: InputMaybe<Scalars['BigInt']>;
  positionCount_gte?: InputMaybe<Scalars['BigInt']>;
  positionCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionCount_lt?: InputMaybe<Scalars['BigInt']>;
  positionCount_lte?: InputMaybe<Scalars['BigInt']>;
  positionCount_not?: InputMaybe<Scalars['BigInt']>;
  positionCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positions_?: InputMaybe<Position_Filter>;
};

export enum Wallet_OrderBy {
  FcmPositionCount = 'fcmPositionCount',
  FcmPositions = 'fcmPositions',
  Id = 'id',
  PositionCount = 'positionCount',
  Positions = 'positions',
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type GetWalletQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetWalletQuery = {
  __typename?: 'Query';
  wallet?: {
    __typename?: 'Wallet';
    id: string;
    positionCount: any;
    positions: Array<{
      __typename?: 'Position';
      id: string;
      createdTimestamp: any;
      tickLower: any;
      tickUpper: any;
      updatedTimestamp: any;
      liquidity: any;
      margin: any;
      fixedTokenBalance: any;
      variableTokenBalance: any;
      accumulatedFees: any;
      totalNotionalTraded: any;
      sumOfWeightedFixedRate: any;
      positionType: any;
      isSettled: boolean;
      amm: {
        __typename?: 'AMM';
        id: string;
        tickSpacing: any;
        termStartTimestamp: any;
        termEndTimestamp: any;
        totalNotionalTraded: any;
        totalLiquidity: any;
        updatedTimestamp: any;
        tick: any;
        txCount: any;
        fcm: { __typename?: 'FCM'; id: string };
        marginEngine: { __typename?: 'MarginEngine'; id: string };
        rateOracle: {
          __typename?: 'RateOracle';
          id: string;
          protocolId: any;
          token: { __typename?: 'UnderlyingToken'; id: string; name: string; decimals: any };
        };
      };
      owner: { __typename?: 'Wallet'; id: string };
      mints: Array<{
        __typename?: 'Mint';
        id: string;
        sender: string;
        amount: any;
        transaction: { __typename?: 'Transaction'; id: string; createdTimestamp: any };
      }>;
      burns: Array<{
        __typename?: 'Burn';
        id: string;
        sender: string;
        amount: any;
        transaction: { __typename?: 'Transaction'; id: string; createdTimestamp: any };
      }>;
      swaps: Array<{
        __typename?: 'Swap';
        id: string;
        sender: string;
        desiredNotional: any;
        sqrtPriceLimitX96: any;
        cumulativeFeeIncurred: any;
        fixedTokenDelta: any;
        variableTokenDelta: any;
        fixedTokenDeltaUnbalanced: any;
        transaction: { __typename?: 'Transaction'; id: string; createdTimestamp: any };
      }>;
      marginUpdates: Array<{
        __typename?: 'MarginUpdate';
        id: string;
        depositer: string;
        marginDelta: any;
        transaction: { __typename?: 'Transaction'; id: string; createdTimestamp: any };
      }>;
      liquidations: Array<{
        __typename?: 'Liquidation';
        id: string;
        liquidator: string;
        reward: any;
        notionalUnwound: any;
        transaction: { __typename?: 'Transaction'; id: string; createdTimestamp: any };
      }>;
      settlements: Array<{
        __typename?: 'Settlement';
        id: string;
        settlementCashflow: any;
        transaction: { __typename?: 'Transaction'; id: string; createdTimestamp: any };
      }>;
    }>;
  } | null;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AMM: ResolverTypeWrapper<Partial<Amm>>;
  AMM_filter: ResolverTypeWrapper<Partial<Amm_Filter>>;
  AMM_orderBy: ResolverTypeWrapper<Partial<Amm_OrderBy>>;
  BigDecimal: ResolverTypeWrapper<Partial<Scalars['BigDecimal']>>;
  BigInt: ResolverTypeWrapper<Partial<Scalars['BigInt']>>;
  BlockChangedFilter: ResolverTypeWrapper<Partial<BlockChangedFilter>>;
  Block_height: ResolverTypeWrapper<Partial<Block_Height>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  Burn: ResolverTypeWrapper<Partial<Burn>>;
  Burn_filter: ResolverTypeWrapper<Partial<Burn_Filter>>;
  Burn_orderBy: ResolverTypeWrapper<Partial<Burn_OrderBy>>;
  Bytes: ResolverTypeWrapper<Partial<Scalars['Bytes']>>;
  FCM: ResolverTypeWrapper<Partial<Fcm>>;
  FCMPosition: ResolverTypeWrapper<Partial<FcmPosition>>;
  FCMPositionSnapshot: ResolverTypeWrapper<Partial<FcmPositionSnapshot>>;
  FCMPositionSnapshot_filter: ResolverTypeWrapper<Partial<FcmPositionSnapshot_Filter>>;
  FCMPositionSnapshot_orderBy: ResolverTypeWrapper<Partial<FcmPositionSnapshot_OrderBy>>;
  FCMPosition_filter: ResolverTypeWrapper<Partial<FcmPosition_Filter>>;
  FCMPosition_orderBy: ResolverTypeWrapper<Partial<FcmPosition_OrderBy>>;
  FCMSettlement: ResolverTypeWrapper<Partial<FcmSettlement>>;
  FCMSettlement_filter: ResolverTypeWrapper<Partial<FcmSettlement_Filter>>;
  FCMSettlement_orderBy: ResolverTypeWrapper<Partial<FcmSettlement_OrderBy>>;
  FCMSwap: ResolverTypeWrapper<Partial<FcmSwap>>;
  FCMSwap_filter: ResolverTypeWrapper<Partial<FcmSwap_Filter>>;
  FCMSwap_orderBy: ResolverTypeWrapper<Partial<FcmSwap_OrderBy>>;
  FCMUnwind: ResolverTypeWrapper<Partial<FcmUnwind>>;
  FCMUnwind_filter: ResolverTypeWrapper<Partial<FcmUnwind_Filter>>;
  FCMUnwind_orderBy: ResolverTypeWrapper<Partial<FcmUnwind_OrderBy>>;
  FCM_filter: ResolverTypeWrapper<Partial<Fcm_Filter>>;
  FCM_orderBy: ResolverTypeWrapper<Partial<Fcm_OrderBy>>;
  Factory: ResolverTypeWrapper<Partial<Factory>>;
  Factory_filter: ResolverTypeWrapper<Partial<Factory_Filter>>;
  Factory_orderBy: ResolverTypeWrapper<Partial<Factory_OrderBy>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>;
  Liquidation: ResolverTypeWrapper<Partial<Liquidation>>;
  Liquidation_filter: ResolverTypeWrapper<Partial<Liquidation_Filter>>;
  Liquidation_orderBy: ResolverTypeWrapper<Partial<Liquidation_OrderBy>>;
  MarginEngine: ResolverTypeWrapper<Partial<MarginEngine>>;
  MarginEngine_filter: ResolverTypeWrapper<Partial<MarginEngine_Filter>>;
  MarginEngine_orderBy: ResolverTypeWrapper<Partial<MarginEngine_OrderBy>>;
  MarginUpdate: ResolverTypeWrapper<Partial<MarginUpdate>>;
  MarginUpdate_filter: ResolverTypeWrapper<Partial<MarginUpdate_Filter>>;
  MarginUpdate_orderBy: ResolverTypeWrapper<Partial<MarginUpdate_OrderBy>>;
  Mint: ResolverTypeWrapper<Partial<Mint>>;
  Mint_filter: ResolverTypeWrapper<Partial<Mint_Filter>>;
  Mint_orderBy: ResolverTypeWrapper<Partial<Mint_OrderBy>>;
  OrderDirection: ResolverTypeWrapper<Partial<OrderDirection>>;
  Position: ResolverTypeWrapper<Partial<Position>>;
  PositionSnapshot: ResolverTypeWrapper<Partial<PositionSnapshot>>;
  PositionSnapshot_filter: ResolverTypeWrapper<Partial<PositionSnapshot_Filter>>;
  PositionSnapshot_orderBy: ResolverTypeWrapper<Partial<PositionSnapshot_OrderBy>>;
  Position_filter: ResolverTypeWrapper<Partial<Position_Filter>>;
  Position_orderBy: ResolverTypeWrapper<Partial<Position_OrderBy>>;
  Query: ResolverTypeWrapper<{}>;
  RateOracle: ResolverTypeWrapper<Partial<RateOracle>>;
  RateOracle_filter: ResolverTypeWrapper<Partial<RateOracle_Filter>>;
  RateOracle_orderBy: ResolverTypeWrapper<Partial<RateOracle_OrderBy>>;
  Settlement: ResolverTypeWrapper<Partial<Settlement>>;
  Settlement_filter: ResolverTypeWrapper<Partial<Settlement_Filter>>;
  Settlement_orderBy: ResolverTypeWrapper<Partial<Settlement_OrderBy>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  Subscription: ResolverTypeWrapper<{}>;
  Swap: ResolverTypeWrapper<Partial<Swap>>;
  Swap_filter: ResolverTypeWrapper<Partial<Swap_Filter>>;
  Swap_orderBy: ResolverTypeWrapper<Partial<Swap_OrderBy>>;
  Transaction: ResolverTypeWrapper<Partial<Transaction>>;
  Transaction_filter: ResolverTypeWrapper<Partial<Transaction_Filter>>;
  Transaction_orderBy: ResolverTypeWrapper<Partial<Transaction_OrderBy>>;
  UnderlyingToken: ResolverTypeWrapper<Partial<UnderlyingToken>>;
  UnderlyingToken_filter: ResolverTypeWrapper<Partial<UnderlyingToken_Filter>>;
  UnderlyingToken_orderBy: ResolverTypeWrapper<Partial<UnderlyingToken_OrderBy>>;
  VAMMPriceChange: ResolverTypeWrapper<Partial<VammPriceChange>>;
  VAMMPriceChange_filter: ResolverTypeWrapper<Partial<VammPriceChange_Filter>>;
  VAMMPriceChange_orderBy: ResolverTypeWrapper<Partial<VammPriceChange_OrderBy>>;
  Wallet: ResolverTypeWrapper<Partial<Wallet>>;
  Wallet_filter: ResolverTypeWrapper<Partial<Wallet_Filter>>;
  Wallet_orderBy: ResolverTypeWrapper<Partial<Wallet_OrderBy>>;
  _Block_: ResolverTypeWrapper<Partial<_Block_>>;
  _Meta_: ResolverTypeWrapper<Partial<_Meta_>>;
  _SubgraphErrorPolicy_: ResolverTypeWrapper<Partial<_SubgraphErrorPolicy_>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AMM: Partial<Amm>;
  AMM_filter: Partial<Amm_Filter>;
  BigDecimal: Partial<Scalars['BigDecimal']>;
  BigInt: Partial<Scalars['BigInt']>;
  BlockChangedFilter: Partial<BlockChangedFilter>;
  Block_height: Partial<Block_Height>;
  Boolean: Partial<Scalars['Boolean']>;
  Burn: Partial<Burn>;
  Burn_filter: Partial<Burn_Filter>;
  Bytes: Partial<Scalars['Bytes']>;
  FCM: Partial<Fcm>;
  FCMPosition: Partial<FcmPosition>;
  FCMPositionSnapshot: Partial<FcmPositionSnapshot>;
  FCMPositionSnapshot_filter: Partial<FcmPositionSnapshot_Filter>;
  FCMPosition_filter: Partial<FcmPosition_Filter>;
  FCMSettlement: Partial<FcmSettlement>;
  FCMSettlement_filter: Partial<FcmSettlement_Filter>;
  FCMSwap: Partial<FcmSwap>;
  FCMSwap_filter: Partial<FcmSwap_Filter>;
  FCMUnwind: Partial<FcmUnwind>;
  FCMUnwind_filter: Partial<FcmUnwind_Filter>;
  FCM_filter: Partial<Fcm_Filter>;
  Factory: Partial<Factory>;
  Factory_filter: Partial<Factory_Filter>;
  ID: Partial<Scalars['ID']>;
  Int: Partial<Scalars['Int']>;
  Liquidation: Partial<Liquidation>;
  Liquidation_filter: Partial<Liquidation_Filter>;
  MarginEngine: Partial<MarginEngine>;
  MarginEngine_filter: Partial<MarginEngine_Filter>;
  MarginUpdate: Partial<MarginUpdate>;
  MarginUpdate_filter: Partial<MarginUpdate_Filter>;
  Mint: Partial<Mint>;
  Mint_filter: Partial<Mint_Filter>;
  Position: Partial<Position>;
  PositionSnapshot: Partial<PositionSnapshot>;
  PositionSnapshot_filter: Partial<PositionSnapshot_Filter>;
  Position_filter: Partial<Position_Filter>;
  Query: {};
  RateOracle: Partial<RateOracle>;
  RateOracle_filter: Partial<RateOracle_Filter>;
  Settlement: Partial<Settlement>;
  Settlement_filter: Partial<Settlement_Filter>;
  String: Partial<Scalars['String']>;
  Subscription: {};
  Swap: Partial<Swap>;
  Swap_filter: Partial<Swap_Filter>;
  Transaction: Partial<Transaction>;
  Transaction_filter: Partial<Transaction_Filter>;
  UnderlyingToken: Partial<UnderlyingToken>;
  UnderlyingToken_filter: Partial<UnderlyingToken_Filter>;
  VAMMPriceChange: Partial<VammPriceChange>;
  VAMMPriceChange_filter: Partial<VammPriceChange_Filter>;
  Wallet: Partial<Wallet>;
  Wallet_filter: Partial<Wallet_Filter>;
  _Block_: Partial<_Block_>;
  _Meta_: Partial<_Meta_>;
}>;

export type DerivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type DerivedFromDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = DerivedFromDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {};

export type EntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EntityDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SubgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type SubgraphIdDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = SubgraphIdDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AmmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AMM'] = ResolversParentTypes['AMM'],
> = ResolversObject<{
  burns?: Resolver<
    Array<ResolversTypes['Burn']>,
    ParentType,
    ContextType,
    RequireFields<AmmBurnsArgs, 'first' | 'skip'>
  >;
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fcm?: Resolver<ResolversTypes['FCM'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  liquidations?: Resolver<
    Array<ResolversTypes['Liquidation']>,
    ParentType,
    ContextType,
    RequireFields<AmmLiquidationsArgs, 'first' | 'skip'>
  >;
  marginEngine?: Resolver<ResolversTypes['MarginEngine'], ParentType, ContextType>;
  marginUpdates?: Resolver<
    Array<ResolversTypes['MarginUpdate']>,
    ParentType,
    ContextType,
    RequireFields<AmmMarginUpdatesArgs, 'first' | 'skip'>
  >;
  mints?: Resolver<
    Array<ResolversTypes['Mint']>,
    ParentType,
    ContextType,
    RequireFields<AmmMintsArgs, 'first' | 'skip'>
  >;
  rateOracle?: Resolver<ResolversTypes['RateOracle'], ParentType, ContextType>;
  settlements?: Resolver<
    Array<ResolversTypes['Settlement']>,
    ParentType,
    ContextType,
    RequireFields<AmmSettlementsArgs, 'first' | 'skip'>
  >;
  swaps?: Resolver<
    Array<ResolversTypes['Swap']>,
    ParentType,
    ContextType,
    RequireFields<AmmSwapsArgs, 'first' | 'skip'>
  >;
  termEndTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  termStartTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tick?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tickSpacing?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalLiquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalNotionalTraded?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  updatedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  vammPriceChangeCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BurnResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Burn'] = ResolversParentTypes['Burn'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type FcmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FCM'] = ResolversParentTypes['FCM'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FcmPositionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FCMPosition'] = ResolversParentTypes['FCMPosition'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fcmSettlements?: Resolver<
    Array<ResolversTypes['FCMSettlement']>,
    ParentType,
    ContextType,
    RequireFields<FcmPositionFcmSettlementsArgs, 'first' | 'skip'>
  >;
  fcmSwaps?: Resolver<
    Array<ResolversTypes['FCMSwap']>,
    ParentType,
    ContextType,
    RequireFields<FcmPositionFcmSwapsArgs, 'first' | 'skip'>
  >;
  fcmUnwinds?: Resolver<
    Array<ResolversTypes['FCMUnwind']>,
    ParentType,
    ContextType,
    RequireFields<FcmPositionFcmUnwindsArgs, 'first' | 'skip'>
  >;
  fixedTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isSettled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  marginInScaledYieldBearingTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  snapshotCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  snapshots?: Resolver<
    Array<ResolversTypes['FCMPositionSnapshot']>,
    ParentType,
    ContextType,
    RequireFields<FcmPositionSnapshotsArgs, 'first' | 'skip'>
  >;
  sumOfWeightedFixedRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalNotionalTraded?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  updatedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  variableTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FcmPositionSnapshotResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FCMPositionSnapshot'] = ResolversParentTypes['FCMPositionSnapshot'],
> = ResolversObject<{
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fcmPosition?: Resolver<ResolversTypes['FCMPosition'], ParentType, ContextType>;
  fixedTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isSettled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  marginInScaledYieldBearingTokens?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sumOfWeightedFixedRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalNotionalTraded?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  variableTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FcmSettlementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FCMSettlement'] = ResolversParentTypes['FCMSettlement'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  fcmPosition?: Resolver<ResolversTypes['FCMPosition'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  settlementCashflow?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FcmSwapResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FCMSwap'] = ResolversParentTypes['FCMSwap'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  cumulativeFeeIncurred?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  desiredNotional?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fcmPosition?: Resolver<ResolversTypes['FCMPosition'], ParentType, ContextType>;
  fixedTokenDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fixedTokenDeltaUnbalanced?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sqrtPriceLimitX96?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  variableTokenDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FcmUnwindResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FCMUnwind'] = ResolversParentTypes['FCMUnwind'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  cumulativeFeeIncurred?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  desiredNotional?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fcmPosition?: Resolver<ResolversTypes['FCMPosition'], ParentType, ContextType>;
  fixedTokenDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fixedTokenDeltaUnbalanced?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sqrtPriceLimitX96?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  variableTokenDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FactoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Factory'] = ResolversParentTypes['Factory'],
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LiquidationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Liquidation'] = ResolversParentTypes['Liquidation'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  liquidator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notionalUnwound?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  reward?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarginEngineResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MarginEngine'] = ResolversParentTypes['MarginEngine'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarginUpdateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MarginUpdate'] = ResolversParentTypes['MarginUpdate'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  depositer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  marginDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MintResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mint'] = ResolversParentTypes['Mint'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Position'] = ResolversParentTypes['Position'],
> = ResolversObject<{
  accumulatedFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  burns?: Resolver<
    Array<ResolversTypes['Burn']>,
    ParentType,
    ContextType,
    RequireFields<PositionBurnsArgs, 'first' | 'skip'>
  >;
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fixedTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isSettled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  liquidations?: Resolver<
    Array<ResolversTypes['Liquidation']>,
    ParentType,
    ContextType,
    RequireFields<PositionLiquidationsArgs, 'first' | 'skip'>
  >;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  margin?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  marginUpdates?: Resolver<
    Array<ResolversTypes['MarginUpdate']>,
    ParentType,
    ContextType,
    RequireFields<PositionMarginUpdatesArgs, 'first' | 'skip'>
  >;
  mints?: Resolver<
    Array<ResolversTypes['Mint']>,
    ParentType,
    ContextType,
    RequireFields<PositionMintsArgs, 'first' | 'skip'>
  >;
  owner?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  positionType?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  settlements?: Resolver<
    Array<ResolversTypes['Settlement']>,
    ParentType,
    ContextType,
    RequireFields<PositionSettlementsArgs, 'first' | 'skip'>
  >;
  snapshotCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  snapshots?: Resolver<
    Array<ResolversTypes['PositionSnapshot']>,
    ParentType,
    ContextType,
    RequireFields<PositionSnapshotsArgs, 'first' | 'skip'>
  >;
  sumOfWeightedFixedRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  swaps?: Resolver<
    Array<ResolversTypes['Swap']>,
    ParentType,
    ContextType,
    RequireFields<PositionSwapsArgs, 'first' | 'skip'>
  >;
  tickLower?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tickUpper?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalNotionalTraded?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  updatedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  variableTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionSnapshotResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PositionSnapshot'] = ResolversParentTypes['PositionSnapshot'],
> = ResolversObject<{
  accumulatedFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fixedTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isSettled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  margin?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  positionType?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sumOfWeightedFixedRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalNotionalTraded?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  variableTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  _meta?: Resolver<
    Maybe<ResolversTypes['_Meta_']>,
    ParentType,
    ContextType,
    Partial<Query_MetaArgs>
  >;
  amm?: Resolver<
    Maybe<ResolversTypes['AMM']>,
    ParentType,
    ContextType,
    RequireFields<QueryAmmArgs, 'id' | 'subgraphError'>
  >;
  amms?: Resolver<
    Array<ResolversTypes['AMM']>,
    ParentType,
    ContextType,
    RequireFields<QueryAmmsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  burn?: Resolver<
    Maybe<ResolversTypes['Burn']>,
    ParentType,
    ContextType,
    RequireFields<QueryBurnArgs, 'id' | 'subgraphError'>
  >;
  burns?: Resolver<
    Array<ResolversTypes['Burn']>,
    ParentType,
    ContextType,
    RequireFields<QueryBurnsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  factories?: Resolver<
    Array<ResolversTypes['Factory']>,
    ParentType,
    ContextType,
    RequireFields<QueryFactoriesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  factory?: Resolver<
    Maybe<ResolversTypes['Factory']>,
    ParentType,
    ContextType,
    RequireFields<QueryFactoryArgs, 'id' | 'subgraphError'>
  >;
  fcm?: Resolver<
    Maybe<ResolversTypes['FCM']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmArgs, 'id' | 'subgraphError'>
  >;
  fcmposition?: Resolver<
    Maybe<ResolversTypes['FCMPosition']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmpositionArgs, 'id' | 'subgraphError'>
  >;
  fcmpositionSnapshot?: Resolver<
    Maybe<ResolversTypes['FCMPositionSnapshot']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmpositionSnapshotArgs, 'id' | 'subgraphError'>
  >;
  fcmpositionSnapshots?: Resolver<
    Array<ResolversTypes['FCMPositionSnapshot']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmpositionSnapshotsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  fcmpositions?: Resolver<
    Array<ResolversTypes['FCMPosition']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmpositionsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  fcms?: Resolver<
    Array<ResolversTypes['FCM']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  fcmsettlement?: Resolver<
    Maybe<ResolversTypes['FCMSettlement']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmsettlementArgs, 'id' | 'subgraphError'>
  >;
  fcmsettlements?: Resolver<
    Array<ResolversTypes['FCMSettlement']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmsettlementsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  fcmswap?: Resolver<
    Maybe<ResolversTypes['FCMSwap']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmswapArgs, 'id' | 'subgraphError'>
  >;
  fcmswaps?: Resolver<
    Array<ResolversTypes['FCMSwap']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmswapsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  fcmunwind?: Resolver<
    Maybe<ResolversTypes['FCMUnwind']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmunwindArgs, 'id' | 'subgraphError'>
  >;
  fcmunwinds?: Resolver<
    Array<ResolversTypes['FCMUnwind']>,
    ParentType,
    ContextType,
    RequireFields<QueryFcmunwindsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  liquidation?: Resolver<
    Maybe<ResolversTypes['Liquidation']>,
    ParentType,
    ContextType,
    RequireFields<QueryLiquidationArgs, 'id' | 'subgraphError'>
  >;
  liquidations?: Resolver<
    Array<ResolversTypes['Liquidation']>,
    ParentType,
    ContextType,
    RequireFields<QueryLiquidationsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  marginEngine?: Resolver<
    Maybe<ResolversTypes['MarginEngine']>,
    ParentType,
    ContextType,
    RequireFields<QueryMarginEngineArgs, 'id' | 'subgraphError'>
  >;
  marginEngines?: Resolver<
    Array<ResolversTypes['MarginEngine']>,
    ParentType,
    ContextType,
    RequireFields<QueryMarginEnginesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  marginUpdate?: Resolver<
    Maybe<ResolversTypes['MarginUpdate']>,
    ParentType,
    ContextType,
    RequireFields<QueryMarginUpdateArgs, 'id' | 'subgraphError'>
  >;
  marginUpdates?: Resolver<
    Array<ResolversTypes['MarginUpdate']>,
    ParentType,
    ContextType,
    RequireFields<QueryMarginUpdatesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  mint?: Resolver<
    Maybe<ResolversTypes['Mint']>,
    ParentType,
    ContextType,
    RequireFields<QueryMintArgs, 'id' | 'subgraphError'>
  >;
  mints?: Resolver<
    Array<ResolversTypes['Mint']>,
    ParentType,
    ContextType,
    RequireFields<QueryMintsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  position?: Resolver<
    Maybe<ResolversTypes['Position']>,
    ParentType,
    ContextType,
    RequireFields<QueryPositionArgs, 'id' | 'subgraphError'>
  >;
  positionSnapshot?: Resolver<
    Maybe<ResolversTypes['PositionSnapshot']>,
    ParentType,
    ContextType,
    RequireFields<QueryPositionSnapshotArgs, 'id' | 'subgraphError'>
  >;
  positionSnapshots?: Resolver<
    Array<ResolversTypes['PositionSnapshot']>,
    ParentType,
    ContextType,
    RequireFields<QueryPositionSnapshotsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  positions?: Resolver<
    Array<ResolversTypes['Position']>,
    ParentType,
    ContextType,
    RequireFields<QueryPositionsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  rateOracle?: Resolver<
    Maybe<ResolversTypes['RateOracle']>,
    ParentType,
    ContextType,
    RequireFields<QueryRateOracleArgs, 'id' | 'subgraphError'>
  >;
  rateOracles?: Resolver<
    Array<ResolversTypes['RateOracle']>,
    ParentType,
    ContextType,
    RequireFields<QueryRateOraclesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  settlement?: Resolver<
    Maybe<ResolversTypes['Settlement']>,
    ParentType,
    ContextType,
    RequireFields<QuerySettlementArgs, 'id' | 'subgraphError'>
  >;
  settlements?: Resolver<
    Array<ResolversTypes['Settlement']>,
    ParentType,
    ContextType,
    RequireFields<QuerySettlementsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  swap?: Resolver<
    Maybe<ResolversTypes['Swap']>,
    ParentType,
    ContextType,
    RequireFields<QuerySwapArgs, 'id' | 'subgraphError'>
  >;
  swaps?: Resolver<
    Array<ResolversTypes['Swap']>,
    ParentType,
    ContextType,
    RequireFields<QuerySwapsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  transaction?: Resolver<
    Maybe<ResolversTypes['Transaction']>,
    ParentType,
    ContextType,
    RequireFields<QueryTransactionArgs, 'id' | 'subgraphError'>
  >;
  transactions?: Resolver<
    Array<ResolversTypes['Transaction']>,
    ParentType,
    ContextType,
    RequireFields<QueryTransactionsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  underlyingToken?: Resolver<
    Maybe<ResolversTypes['UnderlyingToken']>,
    ParentType,
    ContextType,
    RequireFields<QueryUnderlyingTokenArgs, 'id' | 'subgraphError'>
  >;
  underlyingTokens?: Resolver<
    Array<ResolversTypes['UnderlyingToken']>,
    ParentType,
    ContextType,
    RequireFields<QueryUnderlyingTokensArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  vammpriceChange?: Resolver<
    Maybe<ResolversTypes['VAMMPriceChange']>,
    ParentType,
    ContextType,
    RequireFields<QueryVammpriceChangeArgs, 'id' | 'subgraphError'>
  >;
  vammpriceChanges?: Resolver<
    Array<ResolversTypes['VAMMPriceChange']>,
    ParentType,
    ContextType,
    RequireFields<QueryVammpriceChangesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  wallet?: Resolver<
    Maybe<ResolversTypes['Wallet']>,
    ParentType,
    ContextType,
    RequireFields<QueryWalletArgs, 'id' | 'subgraphError'>
  >;
  wallets?: Resolver<
    Array<ResolversTypes['Wallet']>,
    ParentType,
    ContextType,
    RequireFields<QueryWalletsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
}>;

export type RateOracleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RateOracle'] = ResolversParentTypes['RateOracle'],
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  protocolId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['UnderlyingToken'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SettlementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Settlement'] = ResolversParentTypes['Settlement'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  settlementCashflow?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = ResolversObject<{
  _meta?: SubscriptionResolver<
    Maybe<ResolversTypes['_Meta_']>,
    '_meta',
    ParentType,
    ContextType,
    Partial<Subscription_MetaArgs>
  >;
  amm?: SubscriptionResolver<
    Maybe<ResolversTypes['AMM']>,
    'amm',
    ParentType,
    ContextType,
    RequireFields<SubscriptionAmmArgs, 'id' | 'subgraphError'>
  >;
  amms?: SubscriptionResolver<
    Array<ResolversTypes['AMM']>,
    'amms',
    ParentType,
    ContextType,
    RequireFields<SubscriptionAmmsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  burn?: SubscriptionResolver<
    Maybe<ResolversTypes['Burn']>,
    'burn',
    ParentType,
    ContextType,
    RequireFields<SubscriptionBurnArgs, 'id' | 'subgraphError'>
  >;
  burns?: SubscriptionResolver<
    Array<ResolversTypes['Burn']>,
    'burns',
    ParentType,
    ContextType,
    RequireFields<SubscriptionBurnsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  factories?: SubscriptionResolver<
    Array<ResolversTypes['Factory']>,
    'factories',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFactoriesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  factory?: SubscriptionResolver<
    Maybe<ResolversTypes['Factory']>,
    'factory',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFactoryArgs, 'id' | 'subgraphError'>
  >;
  fcm?: SubscriptionResolver<
    Maybe<ResolversTypes['FCM']>,
    'fcm',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmArgs, 'id' | 'subgraphError'>
  >;
  fcmposition?: SubscriptionResolver<
    Maybe<ResolversTypes['FCMPosition']>,
    'fcmposition',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmpositionArgs, 'id' | 'subgraphError'>
  >;
  fcmpositionSnapshot?: SubscriptionResolver<
    Maybe<ResolversTypes['FCMPositionSnapshot']>,
    'fcmpositionSnapshot',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmpositionSnapshotArgs, 'id' | 'subgraphError'>
  >;
  fcmpositionSnapshots?: SubscriptionResolver<
    Array<ResolversTypes['FCMPositionSnapshot']>,
    'fcmpositionSnapshots',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmpositionSnapshotsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  fcmpositions?: SubscriptionResolver<
    Array<ResolversTypes['FCMPosition']>,
    'fcmpositions',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmpositionsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  fcms?: SubscriptionResolver<
    Array<ResolversTypes['FCM']>,
    'fcms',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  fcmsettlement?: SubscriptionResolver<
    Maybe<ResolversTypes['FCMSettlement']>,
    'fcmsettlement',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmsettlementArgs, 'id' | 'subgraphError'>
  >;
  fcmsettlements?: SubscriptionResolver<
    Array<ResolversTypes['FCMSettlement']>,
    'fcmsettlements',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmsettlementsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  fcmswap?: SubscriptionResolver<
    Maybe<ResolversTypes['FCMSwap']>,
    'fcmswap',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmswapArgs, 'id' | 'subgraphError'>
  >;
  fcmswaps?: SubscriptionResolver<
    Array<ResolversTypes['FCMSwap']>,
    'fcmswaps',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmswapsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  fcmunwind?: SubscriptionResolver<
    Maybe<ResolversTypes['FCMUnwind']>,
    'fcmunwind',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmunwindArgs, 'id' | 'subgraphError'>
  >;
  fcmunwinds?: SubscriptionResolver<
    Array<ResolversTypes['FCMUnwind']>,
    'fcmunwinds',
    ParentType,
    ContextType,
    RequireFields<SubscriptionFcmunwindsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  liquidation?: SubscriptionResolver<
    Maybe<ResolversTypes['Liquidation']>,
    'liquidation',
    ParentType,
    ContextType,
    RequireFields<SubscriptionLiquidationArgs, 'id' | 'subgraphError'>
  >;
  liquidations?: SubscriptionResolver<
    Array<ResolversTypes['Liquidation']>,
    'liquidations',
    ParentType,
    ContextType,
    RequireFields<SubscriptionLiquidationsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  marginEngine?: SubscriptionResolver<
    Maybe<ResolversTypes['MarginEngine']>,
    'marginEngine',
    ParentType,
    ContextType,
    RequireFields<SubscriptionMarginEngineArgs, 'id' | 'subgraphError'>
  >;
  marginEngines?: SubscriptionResolver<
    Array<ResolversTypes['MarginEngine']>,
    'marginEngines',
    ParentType,
    ContextType,
    RequireFields<SubscriptionMarginEnginesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  marginUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes['MarginUpdate']>,
    'marginUpdate',
    ParentType,
    ContextType,
    RequireFields<SubscriptionMarginUpdateArgs, 'id' | 'subgraphError'>
  >;
  marginUpdates?: SubscriptionResolver<
    Array<ResolversTypes['MarginUpdate']>,
    'marginUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionMarginUpdatesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  mint?: SubscriptionResolver<
    Maybe<ResolversTypes['Mint']>,
    'mint',
    ParentType,
    ContextType,
    RequireFields<SubscriptionMintArgs, 'id' | 'subgraphError'>
  >;
  mints?: SubscriptionResolver<
    Array<ResolversTypes['Mint']>,
    'mints',
    ParentType,
    ContextType,
    RequireFields<SubscriptionMintsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  position?: SubscriptionResolver<
    Maybe<ResolversTypes['Position']>,
    'position',
    ParentType,
    ContextType,
    RequireFields<SubscriptionPositionArgs, 'id' | 'subgraphError'>
  >;
  positionSnapshot?: SubscriptionResolver<
    Maybe<ResolversTypes['PositionSnapshot']>,
    'positionSnapshot',
    ParentType,
    ContextType,
    RequireFields<SubscriptionPositionSnapshotArgs, 'id' | 'subgraphError'>
  >;
  positionSnapshots?: SubscriptionResolver<
    Array<ResolversTypes['PositionSnapshot']>,
    'positionSnapshots',
    ParentType,
    ContextType,
    RequireFields<SubscriptionPositionSnapshotsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  positions?: SubscriptionResolver<
    Array<ResolversTypes['Position']>,
    'positions',
    ParentType,
    ContextType,
    RequireFields<SubscriptionPositionsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  rateOracle?: SubscriptionResolver<
    Maybe<ResolversTypes['RateOracle']>,
    'rateOracle',
    ParentType,
    ContextType,
    RequireFields<SubscriptionRateOracleArgs, 'id' | 'subgraphError'>
  >;
  rateOracles?: SubscriptionResolver<
    Array<ResolversTypes['RateOracle']>,
    'rateOracles',
    ParentType,
    ContextType,
    RequireFields<SubscriptionRateOraclesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  settlement?: SubscriptionResolver<
    Maybe<ResolversTypes['Settlement']>,
    'settlement',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSettlementArgs, 'id' | 'subgraphError'>
  >;
  settlements?: SubscriptionResolver<
    Array<ResolversTypes['Settlement']>,
    'settlements',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSettlementsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  swap?: SubscriptionResolver<
    Maybe<ResolversTypes['Swap']>,
    'swap',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSwapArgs, 'id' | 'subgraphError'>
  >;
  swaps?: SubscriptionResolver<
    Array<ResolversTypes['Swap']>,
    'swaps',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSwapsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  transaction?: SubscriptionResolver<
    Maybe<ResolversTypes['Transaction']>,
    'transaction',
    ParentType,
    ContextType,
    RequireFields<SubscriptionTransactionArgs, 'id' | 'subgraphError'>
  >;
  transactions?: SubscriptionResolver<
    Array<ResolversTypes['Transaction']>,
    'transactions',
    ParentType,
    ContextType,
    RequireFields<SubscriptionTransactionsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  underlyingToken?: SubscriptionResolver<
    Maybe<ResolversTypes['UnderlyingToken']>,
    'underlyingToken',
    ParentType,
    ContextType,
    RequireFields<SubscriptionUnderlyingTokenArgs, 'id' | 'subgraphError'>
  >;
  underlyingTokens?: SubscriptionResolver<
    Array<ResolversTypes['UnderlyingToken']>,
    'underlyingTokens',
    ParentType,
    ContextType,
    RequireFields<SubscriptionUnderlyingTokensArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  vammpriceChange?: SubscriptionResolver<
    Maybe<ResolversTypes['VAMMPriceChange']>,
    'vammpriceChange',
    ParentType,
    ContextType,
    RequireFields<SubscriptionVammpriceChangeArgs, 'id' | 'subgraphError'>
  >;
  vammpriceChanges?: SubscriptionResolver<
    Array<ResolversTypes['VAMMPriceChange']>,
    'vammpriceChanges',
    ParentType,
    ContextType,
    RequireFields<SubscriptionVammpriceChangesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  wallet?: SubscriptionResolver<
    Maybe<ResolversTypes['Wallet']>,
    'wallet',
    ParentType,
    ContextType,
    RequireFields<SubscriptionWalletArgs, 'id' | 'subgraphError'>
  >;
  wallets?: SubscriptionResolver<
    Array<ResolversTypes['Wallet']>,
    'wallets',
    ParentType,
    ContextType,
    RequireFields<SubscriptionWalletsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
}>;

export type SwapResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Swap'] = ResolversParentTypes['Swap'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  cumulativeFeeIncurred?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  desiredNotional?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fixedTokenDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fixedTokenDeltaUnbalanced?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sqrtPriceLimitX96?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  variableTokenDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  burns?: Resolver<
    Array<ResolversTypes['Burn']>,
    ParentType,
    ContextType,
    RequireFields<TransactionBurnsArgs, 'first' | 'skip'>
  >;
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  liquidations?: Resolver<
    Array<ResolversTypes['Liquidation']>,
    ParentType,
    ContextType,
    RequireFields<TransactionLiquidationsArgs, 'first' | 'skip'>
  >;
  marginUpdates?: Resolver<
    Array<ResolversTypes['MarginUpdate']>,
    ParentType,
    ContextType,
    RequireFields<TransactionMarginUpdatesArgs, 'first' | 'skip'>
  >;
  mints?: Resolver<
    Array<ResolversTypes['Mint']>,
    ParentType,
    ContextType,
    RequireFields<TransactionMintsArgs, 'first' | 'skip'>
  >;
  settlements?: Resolver<
    Array<ResolversTypes['Settlement']>,
    ParentType,
    ContextType,
    RequireFields<TransactionSettlementsArgs, 'first' | 'skip'>
  >;
  swaps?: Resolver<
    Array<ResolversTypes['Swap']>,
    ParentType,
    ContextType,
    RequireFields<TransactionSwapsArgs, 'first' | 'skip'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UnderlyingTokenResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UnderlyingToken'] = ResolversParentTypes['UnderlyingToken'],
> = ResolversObject<{
  decimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VammPriceChangeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VAMMPriceChange'] = ResolversParentTypes['VAMMPriceChange'],
> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tick?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WalletResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet'],
> = ResolversObject<{
  fcmPositionCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fcmPositions?: Resolver<
    Array<ResolversTypes['FCMPosition']>,
    ParentType,
    ContextType,
    RequireFields<WalletFcmPositionsArgs, 'first' | 'skip'>
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  positionCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  positions?: Resolver<
    Array<ResolversTypes['Position']>,
    ParentType,
    ContextType,
    RequireFields<WalletPositionsArgs, 'first' | 'skip'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_'],
> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_'],
> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AMM?: AmmResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Burn?: BurnResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  FCM?: FcmResolvers<ContextType>;
  FCMPosition?: FcmPositionResolvers<ContextType>;
  FCMPositionSnapshot?: FcmPositionSnapshotResolvers<ContextType>;
  FCMSettlement?: FcmSettlementResolvers<ContextType>;
  FCMSwap?: FcmSwapResolvers<ContextType>;
  FCMUnwind?: FcmUnwindResolvers<ContextType>;
  Factory?: FactoryResolvers<ContextType>;
  Liquidation?: LiquidationResolvers<ContextType>;
  MarginEngine?: MarginEngineResolvers<ContextType>;
  MarginUpdate?: MarginUpdateResolvers<ContextType>;
  Mint?: MintResolvers<ContextType>;
  Position?: PositionResolvers<ContextType>;
  PositionSnapshot?: PositionSnapshotResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RateOracle?: RateOracleResolvers<ContextType>;
  Settlement?: SettlementResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Swap?: SwapResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  UnderlyingToken?: UnderlyingTokenResolvers<ContextType>;
  VAMMPriceChange?: VammPriceChangeResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  derivedFrom?: DerivedFromDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  subgraphId?: SubgraphIdDirectiveResolver<any, any, ContextType>;
}>;

export const GetWalletDocument = gql`
  query GetWallet($id: ID!) {
    wallet(id: $id) {
      id
      positionCount
      positions {
        id
        createdTimestamp
        amm {
          id
          fcm {
            id
          }
          marginEngine {
            id
          }
          rateOracle {
            id
            protocolId
            token {
              id
              name
              decimals
            }
          }
          tickSpacing
          termStartTimestamp
          termEndTimestamp
          totalNotionalTraded
          totalLiquidity
          updatedTimestamp
          tick
          txCount
        }
        owner {
          id
        }
        tickLower
        tickUpper
        updatedTimestamp
        liquidity
        margin
        fixedTokenBalance
        variableTokenBalance
        accumulatedFees
        totalNotionalTraded
        sumOfWeightedFixedRate
        positionType
        isSettled
        mints {
          id
          sender
          transaction {
            id
            createdTimestamp
          }
          amount
        }
        burns {
          id
          sender
          transaction {
            id
            createdTimestamp
          }
          amount
        }
        swaps {
          id
          sender
          transaction {
            id
            createdTimestamp
          }
          desiredNotional
          sqrtPriceLimitX96
          cumulativeFeeIncurred
          fixedTokenDelta
          variableTokenDelta
          fixedTokenDeltaUnbalanced
        }
        marginUpdates {
          id
          transaction {
            id
            createdTimestamp
          }
          depositer
          marginDelta
        }
        liquidations {
          id
          transaction {
            id
            createdTimestamp
          }
          liquidator
          reward
          notionalUnwound
        }
        settlements {
          id
          transaction {
            id
            createdTimestamp
          }
          settlementCashflow
        }
      }
    }
  }
`;

/**
 * __useGetWalletQuery__
 *
 * To run a query within a React component, call `useGetWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWalletQuery(
  baseOptions: Apollo.QueryHookOptions<GetWalletQuery, GetWalletQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetWalletQuery, GetWalletQueryVariables>(GetWalletDocument, options);
}
export function useGetWalletLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWalletQuery, GetWalletQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetWalletQuery, GetWalletQueryVariables>(GetWalletDocument, options);
}
export type GetWalletQueryHookResult = ReturnType<typeof useGetWalletQuery>;
export type GetWalletLazyQueryHookResult = ReturnType<typeof useGetWalletLazyQuery>;
export type GetWalletQueryResult = Apollo.QueryResult<GetWalletQuery, GetWalletQueryVariables>;
