import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  fcmAddress: Scalars['String'];
  id: Scalars['ID'];
  liquidity: Scalars['BigInt'];
  mints: Array<Mint>;
  rateOracle: RateOracle;
  sqrtPriceX96: Scalars['BigInt'];
  swaps: Array<Swap>;
  termEndTimestamp: Scalars['BigInt'];
  termStartTimestamp: Scalars['BigInt'];
  tick: Scalars['BigInt'];
  tickSpacing: Scalars['BigInt'];
  txCount: Scalars['BigInt'];
  updatedTimestamp: Scalars['BigInt'];
};


export type AmmBurnsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Burn_Filter>;
};


export type AmmMintsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
};


export type AmmSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};

export type Amm_Filter = {
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fcmAddress?: InputMaybe<Scalars['String']>;
  fcmAddress_contains?: InputMaybe<Scalars['String']>;
  fcmAddress_ends_with?: InputMaybe<Scalars['String']>;
  fcmAddress_gt?: InputMaybe<Scalars['String']>;
  fcmAddress_gte?: InputMaybe<Scalars['String']>;
  fcmAddress_in?: InputMaybe<Array<Scalars['String']>>;
  fcmAddress_lt?: InputMaybe<Scalars['String']>;
  fcmAddress_lte?: InputMaybe<Scalars['String']>;
  fcmAddress_not?: InputMaybe<Scalars['String']>;
  fcmAddress_not_contains?: InputMaybe<Scalars['String']>;
  fcmAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  fcmAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  fcmAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  fcmAddress_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidity?: InputMaybe<Scalars['BigInt']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rateOracle?: InputMaybe<Scalars['String']>;
  rateOracle_contains?: InputMaybe<Scalars['String']>;
  rateOracle_ends_with?: InputMaybe<Scalars['String']>;
  rateOracle_gt?: InputMaybe<Scalars['String']>;
  rateOracle_gte?: InputMaybe<Scalars['String']>;
  rateOracle_in?: InputMaybe<Array<Scalars['String']>>;
  rateOracle_lt?: InputMaybe<Scalars['String']>;
  rateOracle_lte?: InputMaybe<Scalars['String']>;
  rateOracle_not?: InputMaybe<Scalars['String']>;
  rateOracle_not_contains?: InputMaybe<Scalars['String']>;
  rateOracle_not_ends_with?: InputMaybe<Scalars['String']>;
  rateOracle_not_in?: InputMaybe<Array<Scalars['String']>>;
  rateOracle_not_starts_with?: InputMaybe<Scalars['String']>;
  rateOracle_starts_with?: InputMaybe<Scalars['String']>;
  sqrtPriceX96?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_gt?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_gte?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sqrtPriceX96_lt?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_lte?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_not?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
};

export enum Amm_OrderBy {
  Burns = 'burns',
  CreatedTimestamp = 'createdTimestamp',
  FcmAddress = 'fcmAddress',
  Id = 'id',
  Liquidity = 'liquidity',
  Mints = 'mints',
  RateOracle = 'rateOracle',
  SqrtPriceX96 = 'sqrtPriceX96',
  Swaps = 'swaps',
  TermEndTimestamp = 'termEndTimestamp',
  TermStartTimestamp = 'termStartTimestamp',
  Tick = 'tick',
  TickSpacing = 'tickSpacing',
  TxCount = 'txCount',
  UpdatedTimestamp = 'updatedTimestamp'
}

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
  tickLower: Tick;
  tickUpper: Tick;
  transaction: Transaction;
};

export type Burn_Filter = {
  amm?: InputMaybe<Scalars['String']>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
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
  position_contains?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  tickLower?: InputMaybe<Scalars['String']>;
  tickLower_contains?: InputMaybe<Scalars['String']>;
  tickLower_ends_with?: InputMaybe<Scalars['String']>;
  tickLower_gt?: InputMaybe<Scalars['String']>;
  tickLower_gte?: InputMaybe<Scalars['String']>;
  tickLower_in?: InputMaybe<Array<Scalars['String']>>;
  tickLower_lt?: InputMaybe<Scalars['String']>;
  tickLower_lte?: InputMaybe<Scalars['String']>;
  tickLower_not?: InputMaybe<Scalars['String']>;
  tickLower_not_contains?: InputMaybe<Scalars['String']>;
  tickLower_not_ends_with?: InputMaybe<Scalars['String']>;
  tickLower_not_in?: InputMaybe<Array<Scalars['String']>>;
  tickLower_not_starts_with?: InputMaybe<Scalars['String']>;
  tickLower_starts_with?: InputMaybe<Scalars['String']>;
  tickUpper?: InputMaybe<Scalars['String']>;
  tickUpper_contains?: InputMaybe<Scalars['String']>;
  tickUpper_ends_with?: InputMaybe<Scalars['String']>;
  tickUpper_gt?: InputMaybe<Scalars['String']>;
  tickUpper_gte?: InputMaybe<Scalars['String']>;
  tickUpper_in?: InputMaybe<Array<Scalars['String']>>;
  tickUpper_lt?: InputMaybe<Scalars['String']>;
  tickUpper_lte?: InputMaybe<Scalars['String']>;
  tickUpper_not?: InputMaybe<Scalars['String']>;
  tickUpper_not_contains?: InputMaybe<Scalars['String']>;
  tickUpper_not_ends_with?: InputMaybe<Scalars['String']>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['String']>>;
  tickUpper_not_starts_with?: InputMaybe<Scalars['String']>;
  tickUpper_starts_with?: InputMaybe<Scalars['String']>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Burn_OrderBy {
  Amm = 'amm',
  Amount = 'amount',
  Id = 'id',
  Position = 'position',
  Sender = 'sender',
  TickLower = 'tickLower',
  TickUpper = 'tickUpper',
  Transaction = 'transaction'
}

export type Factory = {
  __typename?: 'Factory';
  id: Scalars['ID'];
  owner: Scalars['ID'];
};

export type Factory_Filter = {
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
  Owner = 'owner'
}

export type MarginEngine = {
  __typename?: 'MarginEngine';
  amm: Amm;
  id: Scalars['ID'];
};

export type MarginEngine_Filter = {
  amm?: InputMaybe<Scalars['String']>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
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
  Id = 'id'
}

export type Mint = {
  __typename?: 'Mint';
  amm: Amm;
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  position: Position;
  sender: Scalars['String'];
  tickLower: Tick;
  tickUpper: Tick;
  transaction: Transaction;
};

export type Mint_Filter = {
  amm?: InputMaybe<Scalars['String']>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
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
  position_contains?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  tickLower?: InputMaybe<Scalars['String']>;
  tickLower_contains?: InputMaybe<Scalars['String']>;
  tickLower_ends_with?: InputMaybe<Scalars['String']>;
  tickLower_gt?: InputMaybe<Scalars['String']>;
  tickLower_gte?: InputMaybe<Scalars['String']>;
  tickLower_in?: InputMaybe<Array<Scalars['String']>>;
  tickLower_lt?: InputMaybe<Scalars['String']>;
  tickLower_lte?: InputMaybe<Scalars['String']>;
  tickLower_not?: InputMaybe<Scalars['String']>;
  tickLower_not_contains?: InputMaybe<Scalars['String']>;
  tickLower_not_ends_with?: InputMaybe<Scalars['String']>;
  tickLower_not_in?: InputMaybe<Array<Scalars['String']>>;
  tickLower_not_starts_with?: InputMaybe<Scalars['String']>;
  tickLower_starts_with?: InputMaybe<Scalars['String']>;
  tickUpper?: InputMaybe<Scalars['String']>;
  tickUpper_contains?: InputMaybe<Scalars['String']>;
  tickUpper_ends_with?: InputMaybe<Scalars['String']>;
  tickUpper_gt?: InputMaybe<Scalars['String']>;
  tickUpper_gte?: InputMaybe<Scalars['String']>;
  tickUpper_in?: InputMaybe<Array<Scalars['String']>>;
  tickUpper_lt?: InputMaybe<Scalars['String']>;
  tickUpper_lte?: InputMaybe<Scalars['String']>;
  tickUpper_not?: InputMaybe<Scalars['String']>;
  tickUpper_not_contains?: InputMaybe<Scalars['String']>;
  tickUpper_not_ends_with?: InputMaybe<Scalars['String']>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['String']>>;
  tickUpper_not_starts_with?: InputMaybe<Scalars['String']>;
  tickUpper_starts_with?: InputMaybe<Scalars['String']>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Mint_OrderBy {
  Amm = 'amm',
  Amount = 'amount',
  Id = 'id',
  Position = 'position',
  Sender = 'sender',
  TickLower = 'tickLower',
  TickUpper = 'tickUpper',
  Transaction = 'transaction'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Position = {
  __typename?: 'Position';
  amm: Amm;
  burns: Array<Burn>;
  createdTimestamp: Scalars['BigInt'];
  fixedTokenBalance: Scalars['BigInt'];
  id: Scalars['ID'];
  isEmpty: Scalars['Boolean'];
  isLiquidityProvider: Scalars['Boolean'];
  isSettled: Scalars['Boolean'];
  liquidity: Scalars['BigInt'];
  margin: Scalars['BigInt'];
  mints: Array<Mint>;
  owner: Scalars['String'];
  snapshotCount: Scalars['BigInt'];
  snapshots: Array<PositionSnapshot>;
  swaps: Array<Swap>;
  tickLower: Tick;
  tickUpper: Tick;
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


export type PositionMintsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
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
  createdTimestamp: Scalars['BigInt'];
  fixedTokenBalance: Scalars['BigInt'];
  id: Scalars['ID'];
  isEmpty: Scalars['Boolean'];
  isSettled: Scalars['Boolean'];
  liquidity: Scalars['BigInt'];
  margin: Scalars['BigInt'];
  owner: Scalars['String'];
  position: Position;
  variableTokenBalance: Scalars['BigInt'];
};

export type PositionSnapshot_Filter = {
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
  isEmpty?: InputMaybe<Scalars['Boolean']>;
  isEmpty_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isEmpty_not?: InputMaybe<Scalars['Boolean']>;
  isEmpty_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  owner?: InputMaybe<Scalars['String']>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  position_contains?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
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
  CreatedTimestamp = 'createdTimestamp',
  FixedTokenBalance = 'fixedTokenBalance',
  Id = 'id',
  IsEmpty = 'isEmpty',
  IsSettled = 'isSettled',
  Liquidity = 'liquidity',
  Margin = 'margin',
  Owner = 'owner',
  Position = 'position',
  VariableTokenBalance = 'variableTokenBalance'
}

export type Position_Filter = {
  amm?: InputMaybe<Scalars['String']>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
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
  isEmpty?: InputMaybe<Scalars['Boolean']>;
  isEmpty_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isEmpty_not?: InputMaybe<Scalars['Boolean']>;
  isEmpty_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isLiquidityProvider?: InputMaybe<Scalars['Boolean']>;
  isLiquidityProvider_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isLiquidityProvider_not?: InputMaybe<Scalars['Boolean']>;
  isLiquidityProvider_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  owner?: InputMaybe<Scalars['String']>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  snapshotCount?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_gt?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_gte?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  snapshotCount_lt?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_lte?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_not?: InputMaybe<Scalars['BigInt']>;
  snapshotCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tickLower?: InputMaybe<Scalars['String']>;
  tickLower_contains?: InputMaybe<Scalars['String']>;
  tickLower_ends_with?: InputMaybe<Scalars['String']>;
  tickLower_gt?: InputMaybe<Scalars['String']>;
  tickLower_gte?: InputMaybe<Scalars['String']>;
  tickLower_in?: InputMaybe<Array<Scalars['String']>>;
  tickLower_lt?: InputMaybe<Scalars['String']>;
  tickLower_lte?: InputMaybe<Scalars['String']>;
  tickLower_not?: InputMaybe<Scalars['String']>;
  tickLower_not_contains?: InputMaybe<Scalars['String']>;
  tickLower_not_ends_with?: InputMaybe<Scalars['String']>;
  tickLower_not_in?: InputMaybe<Array<Scalars['String']>>;
  tickLower_not_starts_with?: InputMaybe<Scalars['String']>;
  tickLower_starts_with?: InputMaybe<Scalars['String']>;
  tickUpper?: InputMaybe<Scalars['String']>;
  tickUpper_contains?: InputMaybe<Scalars['String']>;
  tickUpper_ends_with?: InputMaybe<Scalars['String']>;
  tickUpper_gt?: InputMaybe<Scalars['String']>;
  tickUpper_gte?: InputMaybe<Scalars['String']>;
  tickUpper_in?: InputMaybe<Array<Scalars['String']>>;
  tickUpper_lt?: InputMaybe<Scalars['String']>;
  tickUpper_lte?: InputMaybe<Scalars['String']>;
  tickUpper_not?: InputMaybe<Scalars['String']>;
  tickUpper_not_contains?: InputMaybe<Scalars['String']>;
  tickUpper_not_ends_with?: InputMaybe<Scalars['String']>;
  tickUpper_not_in?: InputMaybe<Array<Scalars['String']>>;
  tickUpper_not_starts_with?: InputMaybe<Scalars['String']>;
  tickUpper_starts_with?: InputMaybe<Scalars['String']>;
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
  Amm = 'amm',
  Burns = 'burns',
  CreatedTimestamp = 'createdTimestamp',
  FixedTokenBalance = 'fixedTokenBalance',
  Id = 'id',
  IsEmpty = 'isEmpty',
  IsLiquidityProvider = 'isLiquidityProvider',
  IsSettled = 'isSettled',
  Liquidity = 'liquidity',
  Margin = 'margin',
  Mints = 'mints',
  Owner = 'owner',
  SnapshotCount = 'snapshotCount',
  Snapshots = 'snapshots',
  Swaps = 'swaps',
  TickLower = 'tickLower',
  TickUpper = 'tickUpper',
  UpdatedTimestamp = 'updatedTimestamp',
  VariableTokenBalance = 'variableTokenBalance'
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
  marginEngine?: Maybe<MarginEngine>;
  marginEngines: Array<MarginEngine>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  position?: Maybe<Position>;
  positionSnapshot?: Maybe<PositionSnapshot>;
  positionSnapshots: Array<PositionSnapshot>;
  positions: Array<Position>;
  rateOracle?: Maybe<RateOracle>;
  rateOracles: Array<RateOracle>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  tick?: Maybe<Tick>;
  ticks: Array<Tick>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  underlyingToken?: Maybe<UnderlyingToken>;
  underlyingTokens: Array<UnderlyingToken>;
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


export type QueryTickArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTicksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Tick_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Tick_Filter>;
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

export type RateOracle = {
  __typename?: 'RateOracle';
  id: Scalars['ID'];
  token: UnderlyingToken;
};

export type RateOracle_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token?: InputMaybe<Scalars['String']>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
};

export enum RateOracle_OrderBy {
  Id = 'id',
  Token = 'token'
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
  marginEngine?: Maybe<MarginEngine>;
  marginEngines: Array<MarginEngine>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  position?: Maybe<Position>;
  positionSnapshot?: Maybe<PositionSnapshot>;
  positionSnapshots: Array<PositionSnapshot>;
  positions: Array<Position>;
  rateOracle?: Maybe<RateOracle>;
  rateOracles: Array<RateOracle>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  tick?: Maybe<Tick>;
  ticks: Array<Tick>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  underlyingToken?: Maybe<UnderlyingToken>;
  underlyingTokens: Array<UnderlyingToken>;
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


export type SubscriptionTickArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTicksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Tick_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Tick_Filter>;
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

export type Swap = {
  __typename?: 'Swap';
  amm: Amm;
  id: Scalars['ID'];
  liquidity: Scalars['BigInt'];
  position: Position;
  sender: Scalars['String'];
  sqrtPriceX96: Scalars['BigInt'];
  tick: Scalars['BigInt'];
  transaction: Transaction;
  txIndex: Scalars['BigInt'];
};

export type Swap_Filter = {
  amm?: InputMaybe<Scalars['String']>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidity?: InputMaybe<Scalars['BigInt']>;
  liquidity_gt?: InputMaybe<Scalars['BigInt']>;
  liquidity_gte?: InputMaybe<Scalars['BigInt']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  liquidity_lt?: InputMaybe<Scalars['BigInt']>;
  liquidity_lte?: InputMaybe<Scalars['BigInt']>;
  liquidity_not?: InputMaybe<Scalars['BigInt']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  position?: InputMaybe<Scalars['String']>;
  position_contains?: InputMaybe<Scalars['String']>;
  position_ends_with?: InputMaybe<Scalars['String']>;
  position_gt?: InputMaybe<Scalars['String']>;
  position_gte?: InputMaybe<Scalars['String']>;
  position_in?: InputMaybe<Array<Scalars['String']>>;
  position_lt?: InputMaybe<Scalars['String']>;
  position_lte?: InputMaybe<Scalars['String']>;
  position_not?: InputMaybe<Scalars['String']>;
  position_not_contains?: InputMaybe<Scalars['String']>;
  position_not_ends_with?: InputMaybe<Scalars['String']>;
  position_not_in?: InputMaybe<Array<Scalars['String']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']>;
  position_starts_with?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  sqrtPriceX96?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_gt?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_gte?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sqrtPriceX96_lt?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_lte?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_not?: InputMaybe<Scalars['BigInt']>;
  sqrtPriceX96_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tick?: InputMaybe<Scalars['BigInt']>;
  tick_gt?: InputMaybe<Scalars['BigInt']>;
  tick_gte?: InputMaybe<Scalars['BigInt']>;
  tick_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tick_lt?: InputMaybe<Scalars['BigInt']>;
  tick_lte?: InputMaybe<Scalars['BigInt']>;
  tick_not?: InputMaybe<Scalars['BigInt']>;
  tick_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  txIndex?: InputMaybe<Scalars['BigInt']>;
  txIndex_gt?: InputMaybe<Scalars['BigInt']>;
  txIndex_gte?: InputMaybe<Scalars['BigInt']>;
  txIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txIndex_lt?: InputMaybe<Scalars['BigInt']>;
  txIndex_lte?: InputMaybe<Scalars['BigInt']>;
  txIndex_not?: InputMaybe<Scalars['BigInt']>;
  txIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Swap_OrderBy {
  Amm = 'amm',
  Id = 'id',
  Liquidity = 'liquidity',
  Position = 'position',
  Sender = 'sender',
  SqrtPriceX96 = 'sqrtPriceX96',
  Tick = 'tick',
  Transaction = 'transaction',
  TxIndex = 'txIndex'
}

export type Tick = {
  __typename?: 'Tick';
  amm: Amm;
  id: Scalars['ID'];
  value: Scalars['BigInt'];
};

export type Tick_Filter = {
  amm?: InputMaybe<Scalars['String']>;
  amm_contains?: InputMaybe<Scalars['String']>;
  amm_ends_with?: InputMaybe<Scalars['String']>;
  amm_gt?: InputMaybe<Scalars['String']>;
  amm_gte?: InputMaybe<Scalars['String']>;
  amm_in?: InputMaybe<Array<Scalars['String']>>;
  amm_lt?: InputMaybe<Scalars['String']>;
  amm_lte?: InputMaybe<Scalars['String']>;
  amm_not?: InputMaybe<Scalars['String']>;
  amm_not_contains?: InputMaybe<Scalars['String']>;
  amm_not_ends_with?: InputMaybe<Scalars['String']>;
  amm_not_in?: InputMaybe<Array<Scalars['String']>>;
  amm_not_starts_with?: InputMaybe<Scalars['String']>;
  amm_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Tick_OrderBy {
  Amm = 'amm',
  Id = 'id',
  Value = 'value'
}

export type Transaction = {
  __typename?: 'Transaction';
  blockNumber: Scalars['BigInt'];
  burns: Array<Burn>;
  gasPrice: Scalars['BigInt'];
  id: Scalars['ID'];
  mints: Array<Mint>;
  swaps: Array<Swap>;
  timestamp: Scalars['BigInt'];
};


export type TransactionBurnsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Burn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Burn_Filter>;
};


export type TransactionMintsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mint_Filter>;
};


export type TransactionSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};

export type Transaction_Filter = {
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Transaction_OrderBy {
  BlockNumber = 'blockNumber',
  Burns = 'burns',
  GasPrice = 'gasPrice',
  Id = 'id',
  Mints = 'mints',
  Swaps = 'swaps',
  Timestamp = 'timestamp'
}

export type UnderlyingToken = {
  __typename?: 'UnderlyingToken';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UnderlyingToken_Filter = {
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
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
};

export enum UnderlyingToken_OrderBy {
  Id = 'id',
  Name = 'name'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
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
  Deny = 'deny'
}

export type GetAmMsQueryVariables = Exact<{
  orderBy: Amm_OrderBy;
}>;


export type GetAmMsQuery = { __typename?: 'Query', amms: Array<{ __typename?: 'AMM', id: string, createdTimestamp: any, updatedTimestamp: any, fcmAddress: string, termStartTimestamp: any, termEndTimestamp: any, tickSpacing: any, sqrtPriceX96: any, liquidity: any, tick: any, txCount: any, rateOracle: { __typename?: 'RateOracle', id: string, token: { __typename?: 'UnderlyingToken', id: string, name: string } } }> };

export type GetBurnsQueryVariables = Exact<{
  orderBy: Burn_OrderBy;
}>;


export type GetBurnsQuery = { __typename?: 'Query', burns: Array<{ __typename?: 'Burn', id: string, sender: string, amount: any, transaction: { __typename?: 'Transaction', id: string, blockNumber: any, timestamp: any }, amm: { __typename?: 'AMM', id: string }, position: { __typename?: 'Position', id: string }, tickLower: { __typename?: 'Tick', id: string, value: any }, tickUpper: { __typename?: 'Tick', id: string, value: any } }> };

export type GetMintsQueryVariables = Exact<{
  orderBy: Mint_OrderBy;
}>;


export type GetMintsQuery = { __typename?: 'Query', mints: Array<{ __typename?: 'Mint', id: string, sender: string, amount: any, transaction: { __typename?: 'Transaction', id: string, blockNumber: any, timestamp: any }, amm: { __typename?: 'AMM', id: string }, position: { __typename?: 'Position', id: string }, tickLower: { __typename?: 'Tick', id: string, value: any }, tickUpper: { __typename?: 'Tick', id: string, value: any } }> };

export type GetPositionSnapshotsQueryVariables = Exact<{
  orderBy: PositionSnapshot_OrderBy;
}>;


export type GetPositionSnapshotsQuery = { __typename?: 'Query', positionSnapshots: Array<{ __typename?: 'PositionSnapshot', id: string, createdTimestamp: any, owner: string, liquidity: any, margin: any, fixedTokenBalance: any, variableTokenBalance: any, isSettled: boolean, isEmpty: boolean, position: { __typename?: 'Position', id: string } }> };

export type GetPositionsQueryVariables = Exact<{
  orderBy: Position_OrderBy;
}>;


export type GetPositionsQuery = { __typename?: 'Query', positions: Array<{ __typename?: 'Position', id: string, createdTimestamp: any, updatedTimestamp: any, owner: string, liquidity: any, margin: any, fixedTokenBalance: any, variableTokenBalance: any, isLiquidityProvider: boolean, isSettled: boolean, isEmpty: boolean, snapshotCount: any, amm: { __typename?: 'AMM', id: string }, tickLower: { __typename?: 'Tick', id: string, value: any }, tickUpper: { __typename?: 'Tick', id: string, value: any } }> };

export type GetSwapsQueryVariables = Exact<{
  orderBy: Swap_OrderBy;
}>;


export type GetSwapsQuery = { __typename?: 'Query', swaps: Array<{ __typename?: 'Swap', id: string, sender: string, txIndex: any, sqrtPriceX96: any, liquidity: any, tick: any, transaction: { __typename?: 'Transaction', id: string, blockNumber: any, timestamp: any }, amm: { __typename?: 'AMM', id: string }, position: { __typename?: 'Position', id: string } }> };


export const GetAmMsDocument = gql`
    query GetAMMs($orderBy: AMM_orderBy!) {
  amms(first: 100, orderBy: $orderBy, orderDirection: asc) {
    id
    createdTimestamp
    updatedTimestamp
    fcmAddress
    rateOracle {
      id
      token {
        id
        name
      }
    }
    termStartTimestamp
    termEndTimestamp
    tickSpacing
    sqrtPriceX96
    liquidity
    tick
    txCount
  }
}
    `;

/**
 * __useGetAmMsQuery__
 *
 * To run a query within a React component, call `useGetAmMsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAmMsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAmMsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetAmMsQuery(baseOptions: Apollo.QueryHookOptions<GetAmMsQuery, GetAmMsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAmMsQuery, GetAmMsQueryVariables>(GetAmMsDocument, options);
      }
export function useGetAmMsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAmMsQuery, GetAmMsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAmMsQuery, GetAmMsQueryVariables>(GetAmMsDocument, options);
        }
export type GetAmMsQueryHookResult = ReturnType<typeof useGetAmMsQuery>;
export type GetAmMsLazyQueryHookResult = ReturnType<typeof useGetAmMsLazyQuery>;
export type GetAmMsQueryResult = Apollo.QueryResult<GetAmMsQuery, GetAmMsQueryVariables>;
export const GetBurnsDocument = gql`
    query GetBurns($orderBy: Burn_orderBy!) {
  burns(first: 100, orderBy: $orderBy, orderDirection: asc) {
    id
    transaction {
      id
      blockNumber
      timestamp
    }
    amm {
      id
    }
    position {
      id
    }
    sender
    tickLower {
      id
      value
    }
    tickUpper {
      id
      value
    }
    amount
  }
}
    `;

/**
 * __useGetBurnsQuery__
 *
 * To run a query within a React component, call `useGetBurnsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBurnsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBurnsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetBurnsQuery(baseOptions: Apollo.QueryHookOptions<GetBurnsQuery, GetBurnsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBurnsQuery, GetBurnsQueryVariables>(GetBurnsDocument, options);
      }
export function useGetBurnsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBurnsQuery, GetBurnsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBurnsQuery, GetBurnsQueryVariables>(GetBurnsDocument, options);
        }
export type GetBurnsQueryHookResult = ReturnType<typeof useGetBurnsQuery>;
export type GetBurnsLazyQueryHookResult = ReturnType<typeof useGetBurnsLazyQuery>;
export type GetBurnsQueryResult = Apollo.QueryResult<GetBurnsQuery, GetBurnsQueryVariables>;
export const GetMintsDocument = gql`
    query GetMints($orderBy: Mint_orderBy!) {
  mints(first: 100, orderBy: $orderBy, orderDirection: asc) {
    id
    transaction {
      id
      blockNumber
      timestamp
    }
    amm {
      id
    }
    position {
      id
    }
    sender
    tickLower {
      id
      value
    }
    tickUpper {
      id
      value
    }
    amount
  }
}
    `;

/**
 * __useGetMintsQuery__
 *
 * To run a query within a React component, call `useGetMintsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMintsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMintsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetMintsQuery(baseOptions: Apollo.QueryHookOptions<GetMintsQuery, GetMintsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMintsQuery, GetMintsQueryVariables>(GetMintsDocument, options);
      }
export function useGetMintsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMintsQuery, GetMintsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMintsQuery, GetMintsQueryVariables>(GetMintsDocument, options);
        }
export type GetMintsQueryHookResult = ReturnType<typeof useGetMintsQuery>;
export type GetMintsLazyQueryHookResult = ReturnType<typeof useGetMintsLazyQuery>;
export type GetMintsQueryResult = Apollo.QueryResult<GetMintsQuery, GetMintsQueryVariables>;
export const GetPositionSnapshotsDocument = gql`
    query GetPositionSnapshots($orderBy: PositionSnapshot_orderBy!) {
  positionSnapshots(first: 100, orderBy: $orderBy, orderDirection: asc) {
    id
    createdTimestamp
    owner
    position {
      id
    }
    liquidity
    margin
    fixedTokenBalance
    variableTokenBalance
    isSettled
    isEmpty
  }
}
    `;

/**
 * __useGetPositionSnapshotsQuery__
 *
 * To run a query within a React component, call `useGetPositionSnapshotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositionSnapshotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositionSnapshotsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetPositionSnapshotsQuery(baseOptions: Apollo.QueryHookOptions<GetPositionSnapshotsQuery, GetPositionSnapshotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPositionSnapshotsQuery, GetPositionSnapshotsQueryVariables>(GetPositionSnapshotsDocument, options);
      }
export function useGetPositionSnapshotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPositionSnapshotsQuery, GetPositionSnapshotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPositionSnapshotsQuery, GetPositionSnapshotsQueryVariables>(GetPositionSnapshotsDocument, options);
        }
export type GetPositionSnapshotsQueryHookResult = ReturnType<typeof useGetPositionSnapshotsQuery>;
export type GetPositionSnapshotsLazyQueryHookResult = ReturnType<typeof useGetPositionSnapshotsLazyQuery>;
export type GetPositionSnapshotsQueryResult = Apollo.QueryResult<GetPositionSnapshotsQuery, GetPositionSnapshotsQueryVariables>;
export const GetPositionsDocument = gql`
    query GetPositions($orderBy: Position_orderBy!) {
  positions(first: 100, orderBy: $orderBy, orderDirection: asc) {
    id
    createdTimestamp
    updatedTimestamp
    owner
    amm {
      id
    }
    tickLower {
      id
      value
    }
    tickUpper {
      id
      value
    }
    liquidity
    margin
    fixedTokenBalance
    variableTokenBalance
    isLiquidityProvider
    isSettled
    isEmpty
    snapshotCount
  }
}
    `;

/**
 * __useGetPositionsQuery__
 *
 * To run a query within a React component, call `useGetPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositionsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetPositionsQuery(baseOptions: Apollo.QueryHookOptions<GetPositionsQuery, GetPositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, options);
      }
export function useGetPositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPositionsQuery, GetPositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, options);
        }
export type GetPositionsQueryHookResult = ReturnType<typeof useGetPositionsQuery>;
export type GetPositionsLazyQueryHookResult = ReturnType<typeof useGetPositionsLazyQuery>;
export type GetPositionsQueryResult = Apollo.QueryResult<GetPositionsQuery, GetPositionsQueryVariables>;
export const GetSwapsDocument = gql`
    query GetSwaps($orderBy: Swap_orderBy!) {
  swaps(first: 100, orderBy: $orderBy, orderDirection: asc) {
    id
    transaction {
      id
      blockNumber
      timestamp
    }
    amm {
      id
    }
    position {
      id
    }
    sender
    txIndex
    sqrtPriceX96
    liquidity
    tick
  }
}
    `;

/**
 * __useGetSwapsQuery__
 *
 * To run a query within a React component, call `useGetSwapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSwapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSwapsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetSwapsQuery(baseOptions: Apollo.QueryHookOptions<GetSwapsQuery, GetSwapsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSwapsQuery, GetSwapsQueryVariables>(GetSwapsDocument, options);
      }
export function useGetSwapsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSwapsQuery, GetSwapsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSwapsQuery, GetSwapsQueryVariables>(GetSwapsDocument, options);
        }
export type GetSwapsQueryHookResult = ReturnType<typeof useGetSwapsQuery>;
export type GetSwapsLazyQueryHookResult = ReturnType<typeof useGetSwapsLazyQuery>;
export type GetSwapsQueryResult = Apollo.QueryResult<GetSwapsQuery, GetSwapsQueryVariables>;