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
  fcmAddress: Scalars['String'];
  id: Scalars['ID'];
  liquidity: Scalars['BigInt'];
  marginEngineAddress: Scalars['String'];
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
  marginEngineAddress?: InputMaybe<Scalars['String']>;
  marginEngineAddress_contains?: InputMaybe<Scalars['String']>;
  marginEngineAddress_ends_with?: InputMaybe<Scalars['String']>;
  marginEngineAddress_gt?: InputMaybe<Scalars['String']>;
  marginEngineAddress_gte?: InputMaybe<Scalars['String']>;
  marginEngineAddress_in?: InputMaybe<Array<Scalars['String']>>;
  marginEngineAddress_lt?: InputMaybe<Scalars['String']>;
  marginEngineAddress_lte?: InputMaybe<Scalars['String']>;
  marginEngineAddress_not?: InputMaybe<Scalars['String']>;
  marginEngineAddress_not_contains?: InputMaybe<Scalars['String']>;
  marginEngineAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  marginEngineAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  marginEngineAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  marginEngineAddress_starts_with?: InputMaybe<Scalars['String']>;
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
  MarginEngineAddress = 'marginEngineAddress',
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
  owner: Wallet;
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
  ProtocolId = 'protocolId',
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

export type Wallet = {
  __typename?: 'Wallet';
  id: Scalars['ID'];
  positionCount: Scalars['BigInt'];
  positions: Array<Position>;
};


export type WalletPositionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Position_Filter>;
};

export type Wallet_Filter = {
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
};

export enum Wallet_OrderBy {
  Id = 'id',
  PositionCount = 'positionCount',
  Positions = 'positions'
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


export type GetAmMsQuery = { __typename?: 'Query', amms: Array<{ __typename?: 'AMM', id: string, createdTimestamp: any, updatedTimestamp: any, fcmAddress: string, marginEngineAddress: string, termStartTimestamp: any, termEndTimestamp: any, tickSpacing: any, sqrtPriceX96: any, liquidity: any, tick: any, txCount: any, rateOracle: { __typename?: 'RateOracle', id: string, protocolId: any, token: { __typename?: 'UnderlyingToken', id: string, name: string } } }> };

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


export type GetPositionSnapshotsQuery = { __typename?: 'Query', positionSnapshots: Array<{ __typename?: 'PositionSnapshot', id: string, createdTimestamp: any, liquidity: any, margin: any, fixedTokenBalance: any, variableTokenBalance: any, isSettled: boolean, isEmpty: boolean, position: { __typename?: 'Position', id: string } }> };

export type GetPositionsQueryVariables = Exact<{
  orderBy: Position_OrderBy;
}>;


export type GetPositionsQuery = { __typename?: 'Query', positions: Array<{ __typename?: 'Position', id: string, createdTimestamp: any, updatedTimestamp: any, liquidity: any, margin: any, fixedTokenBalance: any, variableTokenBalance: any, isLiquidityProvider: boolean, isSettled: boolean, isEmpty: boolean, snapshotCount: any, owner: { __typename?: 'Wallet', id: string }, amm: { __typename?: 'AMM', id: string }, tickLower: { __typename?: 'Tick', id: string, value: any }, tickUpper: { __typename?: 'Tick', id: string, value: any }, burns: Array<{ __typename?: 'Burn', id: string }>, mints: Array<{ __typename?: 'Mint', id: string }>, swaps: Array<{ __typename?: 'Swap', id: string }> }> };

export type GetSwapsQueryVariables = Exact<{
  orderBy: Swap_OrderBy;
}>;


export type GetSwapsQuery = { __typename?: 'Query', swaps: Array<{ __typename?: 'Swap', id: string, sender: string, txIndex: any, sqrtPriceX96: any, liquidity: any, tick: any, transaction: { __typename?: 'Transaction', id: string, blockNumber: any, timestamp: any }, amm: { __typename?: 'AMM', id: string }, position: { __typename?: 'Position', id: string } }> };

export type GetWalletQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetWalletQuery = { __typename?: 'Query', wallet?: { __typename: 'Wallet', id: string, positionCount: any, positions: Array<{ __typename: 'Position', id: string }> } | null };

export type GetWalletsQueryVariables = Exact<{
  orderBy: Wallet_OrderBy;
}>;


export type GetWalletsQuery = { __typename?: 'Query', wallets: Array<{ __typename?: 'Wallet', id: string, positions: Array<{ __typename?: 'Position', id: string }> }> };

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
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

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AMM: ResolverTypeWrapper<Partial<Amm>>;
  AMM_filter: ResolverTypeWrapper<Partial<Amm_Filter>>;
  AMM_orderBy: ResolverTypeWrapper<Partial<Amm_OrderBy>>;
  BigDecimal: ResolverTypeWrapper<Partial<Scalars['BigDecimal']>>;
  BigInt: ResolverTypeWrapper<Partial<Scalars['BigInt']>>;
  Block_height: ResolverTypeWrapper<Partial<Block_Height>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  Burn: ResolverTypeWrapper<Partial<Burn>>;
  Burn_filter: ResolverTypeWrapper<Partial<Burn_Filter>>;
  Burn_orderBy: ResolverTypeWrapper<Partial<Burn_OrderBy>>;
  Bytes: ResolverTypeWrapper<Partial<Scalars['Bytes']>>;
  Factory: ResolverTypeWrapper<Partial<Factory>>;
  Factory_filter: ResolverTypeWrapper<Partial<Factory_Filter>>;
  Factory_orderBy: ResolverTypeWrapper<Partial<Factory_OrderBy>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>;
  MarginEngine: ResolverTypeWrapper<Partial<MarginEngine>>;
  MarginEngine_filter: ResolverTypeWrapper<Partial<MarginEngine_Filter>>;
  MarginEngine_orderBy: ResolverTypeWrapper<Partial<MarginEngine_OrderBy>>;
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
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  Subscription: ResolverTypeWrapper<{}>;
  Swap: ResolverTypeWrapper<Partial<Swap>>;
  Swap_filter: ResolverTypeWrapper<Partial<Swap_Filter>>;
  Swap_orderBy: ResolverTypeWrapper<Partial<Swap_OrderBy>>;
  Tick: ResolverTypeWrapper<Partial<Tick>>;
  Tick_filter: ResolverTypeWrapper<Partial<Tick_Filter>>;
  Tick_orderBy: ResolverTypeWrapper<Partial<Tick_OrderBy>>;
  Transaction: ResolverTypeWrapper<Partial<Transaction>>;
  Transaction_filter: ResolverTypeWrapper<Partial<Transaction_Filter>>;
  Transaction_orderBy: ResolverTypeWrapper<Partial<Transaction_OrderBy>>;
  UnderlyingToken: ResolverTypeWrapper<Partial<UnderlyingToken>>;
  UnderlyingToken_filter: ResolverTypeWrapper<Partial<UnderlyingToken_Filter>>;
  UnderlyingToken_orderBy: ResolverTypeWrapper<Partial<UnderlyingToken_OrderBy>>;
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
  Block_height: Partial<Block_Height>;
  Boolean: Partial<Scalars['Boolean']>;
  Burn: Partial<Burn>;
  Burn_filter: Partial<Burn_Filter>;
  Bytes: Partial<Scalars['Bytes']>;
  Factory: Partial<Factory>;
  Factory_filter: Partial<Factory_Filter>;
  ID: Partial<Scalars['ID']>;
  Int: Partial<Scalars['Int']>;
  MarginEngine: Partial<MarginEngine>;
  MarginEngine_filter: Partial<MarginEngine_Filter>;
  Mint: Partial<Mint>;
  Mint_filter: Partial<Mint_Filter>;
  Position: Partial<Position>;
  PositionSnapshot: Partial<PositionSnapshot>;
  PositionSnapshot_filter: Partial<PositionSnapshot_Filter>;
  Position_filter: Partial<Position_Filter>;
  Query: {};
  RateOracle: Partial<RateOracle>;
  RateOracle_filter: Partial<RateOracle_Filter>;
  String: Partial<Scalars['String']>;
  Subscription: {};
  Swap: Partial<Swap>;
  Swap_filter: Partial<Swap_Filter>;
  Tick: Partial<Tick>;
  Tick_filter: Partial<Tick_Filter>;
  Transaction: Partial<Transaction>;
  Transaction_filter: Partial<Transaction_Filter>;
  UnderlyingToken: Partial<UnderlyingToken>;
  UnderlyingToken_filter: Partial<UnderlyingToken_Filter>;
  Wallet: Partial<Wallet>;
  Wallet_filter: Partial<Wallet_Filter>;
  _Block_: Partial<_Block_>;
  _Meta_: Partial<_Meta_>;
}>;

export type DerivedFromDirectiveArgs = {
  field?: Maybe<Scalars['String']>;
};

export type DerivedFromDirectiveResolver<Result, Parent, ContextType = any, Args = DerivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = { };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SubgraphIdDirectiveArgs = {
  id?: Maybe<Scalars['String']>;
};

export type SubgraphIdDirectiveResolver<Result, Parent, ContextType = any, Args = SubgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AmmResolvers<ContextType = any, ParentType extends ResolversParentTypes['AMM'] = ResolversParentTypes['AMM']> = ResolversObject<{
  burns?: Resolver<Array<ResolversTypes['Burn']>, ParentType, ContextType, RequireFields<AmmBurnsArgs, 'first' | 'skip'>>;
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fcmAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  marginEngineAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mints?: Resolver<Array<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<AmmMintsArgs, 'first' | 'skip'>>;
  rateOracle?: Resolver<ResolversTypes['RateOracle'], ParentType, ContextType>;
  sqrtPriceX96?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  swaps?: Resolver<Array<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<AmmSwapsArgs, 'first' | 'skip'>>;
  termEndTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  termStartTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tick?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tickSpacing?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  updatedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BurnResolvers<ContextType = any, ParentType extends ResolversParentTypes['Burn'] = ResolversParentTypes['Burn']> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tickLower?: Resolver<ResolversTypes['Tick'], ParentType, ContextType>;
  tickUpper?: Resolver<ResolversTypes['Tick'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type FactoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Factory'] = ResolversParentTypes['Factory']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarginEngineResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarginEngine'] = ResolversParentTypes['MarginEngine']> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MintResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mint'] = ResolversParentTypes['Mint']> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tickLower?: Resolver<ResolversTypes['Tick'], ParentType, ContextType>;
  tickUpper?: Resolver<ResolversTypes['Tick'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Position'] = ResolversParentTypes['Position']> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  burns?: Resolver<Array<ResolversTypes['Burn']>, ParentType, ContextType, RequireFields<PositionBurnsArgs, 'first' | 'skip'>>;
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fixedTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmpty?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isLiquidityProvider?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSettled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  margin?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  mints?: Resolver<Array<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<PositionMintsArgs, 'first' | 'skip'>>;
  owner?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  snapshotCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  snapshots?: Resolver<Array<ResolversTypes['PositionSnapshot']>, ParentType, ContextType, RequireFields<PositionSnapshotsArgs, 'first' | 'skip'>>;
  swaps?: Resolver<Array<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<PositionSwapsArgs, 'first' | 'skip'>>;
  tickLower?: Resolver<ResolversTypes['Tick'], ParentType, ContextType>;
  tickUpper?: Resolver<ResolversTypes['Tick'], ParentType, ContextType>;
  updatedTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  variableTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionSnapshotResolvers<ContextType = any, ParentType extends ResolversParentTypes['PositionSnapshot'] = ResolversParentTypes['PositionSnapshot']> = ResolversObject<{
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fixedTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmpty?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSettled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  margin?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  variableTokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_MetaArgs>>;
  amm?: Resolver<Maybe<ResolversTypes['AMM']>, ParentType, ContextType, RequireFields<QueryAmmArgs, 'id' | 'subgraphError'>>;
  amms?: Resolver<Array<ResolversTypes['AMM']>, ParentType, ContextType, RequireFields<QueryAmmsArgs, 'first' | 'skip' | 'subgraphError'>>;
  burn?: Resolver<Maybe<ResolversTypes['Burn']>, ParentType, ContextType, RequireFields<QueryBurnArgs, 'id' | 'subgraphError'>>;
  burns?: Resolver<Array<ResolversTypes['Burn']>, ParentType, ContextType, RequireFields<QueryBurnsArgs, 'first' | 'skip' | 'subgraphError'>>;
  factories?: Resolver<Array<ResolversTypes['Factory']>, ParentType, ContextType, RequireFields<QueryFactoriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  factory?: Resolver<Maybe<ResolversTypes['Factory']>, ParentType, ContextType, RequireFields<QueryFactoryArgs, 'id' | 'subgraphError'>>;
  marginEngine?: Resolver<Maybe<ResolversTypes['MarginEngine']>, ParentType, ContextType, RequireFields<QueryMarginEngineArgs, 'id' | 'subgraphError'>>;
  marginEngines?: Resolver<Array<ResolversTypes['MarginEngine']>, ParentType, ContextType, RequireFields<QueryMarginEnginesArgs, 'first' | 'skip' | 'subgraphError'>>;
  mint?: Resolver<Maybe<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<QueryMintArgs, 'id' | 'subgraphError'>>;
  mints?: Resolver<Array<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<QueryMintsArgs, 'first' | 'skip' | 'subgraphError'>>;
  position?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType, RequireFields<QueryPositionArgs, 'id' | 'subgraphError'>>;
  positionSnapshot?: Resolver<Maybe<ResolversTypes['PositionSnapshot']>, ParentType, ContextType, RequireFields<QueryPositionSnapshotArgs, 'id' | 'subgraphError'>>;
  positionSnapshots?: Resolver<Array<ResolversTypes['PositionSnapshot']>, ParentType, ContextType, RequireFields<QueryPositionSnapshotsArgs, 'first' | 'skip' | 'subgraphError'>>;
  positions?: Resolver<Array<ResolversTypes['Position']>, ParentType, ContextType, RequireFields<QueryPositionsArgs, 'first' | 'skip' | 'subgraphError'>>;
  rateOracle?: Resolver<Maybe<ResolversTypes['RateOracle']>, ParentType, ContextType, RequireFields<QueryRateOracleArgs, 'id' | 'subgraphError'>>;
  rateOracles?: Resolver<Array<ResolversTypes['RateOracle']>, ParentType, ContextType, RequireFields<QueryRateOraclesArgs, 'first' | 'skip' | 'subgraphError'>>;
  swap?: Resolver<Maybe<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<QuerySwapArgs, 'id' | 'subgraphError'>>;
  swaps?: Resolver<Array<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<QuerySwapsArgs, 'first' | 'skip' | 'subgraphError'>>;
  tick?: Resolver<Maybe<ResolversTypes['Tick']>, ParentType, ContextType, RequireFields<QueryTickArgs, 'id' | 'subgraphError'>>;
  ticks?: Resolver<Array<ResolversTypes['Tick']>, ParentType, ContextType, RequireFields<QueryTicksArgs, 'first' | 'skip' | 'subgraphError'>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionsArgs, 'first' | 'skip' | 'subgraphError'>>;
  underlyingToken?: Resolver<Maybe<ResolversTypes['UnderlyingToken']>, ParentType, ContextType, RequireFields<QueryUnderlyingTokenArgs, 'id' | 'subgraphError'>>;
  underlyingTokens?: Resolver<Array<ResolversTypes['UnderlyingToken']>, ParentType, ContextType, RequireFields<QueryUnderlyingTokensArgs, 'first' | 'skip' | 'subgraphError'>>;
  wallet?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType, RequireFields<QueryWalletArgs, 'id' | 'subgraphError'>>;
  wallets?: Resolver<Array<ResolversTypes['Wallet']>, ParentType, ContextType, RequireFields<QueryWalletsArgs, 'first' | 'skip' | 'subgraphError'>>;
}>;

export type RateOracleResolvers<ContextType = any, ParentType extends ResolversParentTypes['RateOracle'] = ResolversParentTypes['RateOracle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  protocolId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['UnderlyingToken'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_MetaArgs>>;
  amm?: SubscriptionResolver<Maybe<ResolversTypes['AMM']>, "amm", ParentType, ContextType, RequireFields<SubscriptionAmmArgs, 'id' | 'subgraphError'>>;
  amms?: SubscriptionResolver<Array<ResolversTypes['AMM']>, "amms", ParentType, ContextType, RequireFields<SubscriptionAmmsArgs, 'first' | 'skip' | 'subgraphError'>>;
  burn?: SubscriptionResolver<Maybe<ResolversTypes['Burn']>, "burn", ParentType, ContextType, RequireFields<SubscriptionBurnArgs, 'id' | 'subgraphError'>>;
  burns?: SubscriptionResolver<Array<ResolversTypes['Burn']>, "burns", ParentType, ContextType, RequireFields<SubscriptionBurnsArgs, 'first' | 'skip' | 'subgraphError'>>;
  factories?: SubscriptionResolver<Array<ResolversTypes['Factory']>, "factories", ParentType, ContextType, RequireFields<SubscriptionFactoriesArgs, 'first' | 'skip' | 'subgraphError'>>;
  factory?: SubscriptionResolver<Maybe<ResolversTypes['Factory']>, "factory", ParentType, ContextType, RequireFields<SubscriptionFactoryArgs, 'id' | 'subgraphError'>>;
  marginEngine?: SubscriptionResolver<Maybe<ResolversTypes['MarginEngine']>, "marginEngine", ParentType, ContextType, RequireFields<SubscriptionMarginEngineArgs, 'id' | 'subgraphError'>>;
  marginEngines?: SubscriptionResolver<Array<ResolversTypes['MarginEngine']>, "marginEngines", ParentType, ContextType, RequireFields<SubscriptionMarginEnginesArgs, 'first' | 'skip' | 'subgraphError'>>;
  mint?: SubscriptionResolver<Maybe<ResolversTypes['Mint']>, "mint", ParentType, ContextType, RequireFields<SubscriptionMintArgs, 'id' | 'subgraphError'>>;
  mints?: SubscriptionResolver<Array<ResolversTypes['Mint']>, "mints", ParentType, ContextType, RequireFields<SubscriptionMintsArgs, 'first' | 'skip' | 'subgraphError'>>;
  position?: SubscriptionResolver<Maybe<ResolversTypes['Position']>, "position", ParentType, ContextType, RequireFields<SubscriptionPositionArgs, 'id' | 'subgraphError'>>;
  positionSnapshot?: SubscriptionResolver<Maybe<ResolversTypes['PositionSnapshot']>, "positionSnapshot", ParentType, ContextType, RequireFields<SubscriptionPositionSnapshotArgs, 'id' | 'subgraphError'>>;
  positionSnapshots?: SubscriptionResolver<Array<ResolversTypes['PositionSnapshot']>, "positionSnapshots", ParentType, ContextType, RequireFields<SubscriptionPositionSnapshotsArgs, 'first' | 'skip' | 'subgraphError'>>;
  positions?: SubscriptionResolver<Array<ResolversTypes['Position']>, "positions", ParentType, ContextType, RequireFields<SubscriptionPositionsArgs, 'first' | 'skip' | 'subgraphError'>>;
  rateOracle?: SubscriptionResolver<Maybe<ResolversTypes['RateOracle']>, "rateOracle", ParentType, ContextType, RequireFields<SubscriptionRateOracleArgs, 'id' | 'subgraphError'>>;
  rateOracles?: SubscriptionResolver<Array<ResolversTypes['RateOracle']>, "rateOracles", ParentType, ContextType, RequireFields<SubscriptionRateOraclesArgs, 'first' | 'skip' | 'subgraphError'>>;
  swap?: SubscriptionResolver<Maybe<ResolversTypes['Swap']>, "swap", ParentType, ContextType, RequireFields<SubscriptionSwapArgs, 'id' | 'subgraphError'>>;
  swaps?: SubscriptionResolver<Array<ResolversTypes['Swap']>, "swaps", ParentType, ContextType, RequireFields<SubscriptionSwapsArgs, 'first' | 'skip' | 'subgraphError'>>;
  tick?: SubscriptionResolver<Maybe<ResolversTypes['Tick']>, "tick", ParentType, ContextType, RequireFields<SubscriptionTickArgs, 'id' | 'subgraphError'>>;
  ticks?: SubscriptionResolver<Array<ResolversTypes['Tick']>, "ticks", ParentType, ContextType, RequireFields<SubscriptionTicksArgs, 'first' | 'skip' | 'subgraphError'>>;
  transaction?: SubscriptionResolver<Maybe<ResolversTypes['Transaction']>, "transaction", ParentType, ContextType, RequireFields<SubscriptionTransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: SubscriptionResolver<Array<ResolversTypes['Transaction']>, "transactions", ParentType, ContextType, RequireFields<SubscriptionTransactionsArgs, 'first' | 'skip' | 'subgraphError'>>;
  underlyingToken?: SubscriptionResolver<Maybe<ResolversTypes['UnderlyingToken']>, "underlyingToken", ParentType, ContextType, RequireFields<SubscriptionUnderlyingTokenArgs, 'id' | 'subgraphError'>>;
  underlyingTokens?: SubscriptionResolver<Array<ResolversTypes['UnderlyingToken']>, "underlyingTokens", ParentType, ContextType, RequireFields<SubscriptionUnderlyingTokensArgs, 'first' | 'skip' | 'subgraphError'>>;
  wallet?: SubscriptionResolver<Maybe<ResolversTypes['Wallet']>, "wallet", ParentType, ContextType, RequireFields<SubscriptionWalletArgs, 'id' | 'subgraphError'>>;
  wallets?: SubscriptionResolver<Array<ResolversTypes['Wallet']>, "wallets", ParentType, ContextType, RequireFields<SubscriptionWalletsArgs, 'first' | 'skip' | 'subgraphError'>>;
}>;

export type SwapResolvers<ContextType = any, ParentType extends ResolversParentTypes['Swap'] = ResolversParentTypes['Swap']> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  liquidity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Position'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sqrtPriceX96?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tick?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  txIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TickResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tick'] = ResolversParentTypes['Tick']> = ResolversObject<{
  amm?: Resolver<ResolversTypes['AMM'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  burns?: Resolver<Array<ResolversTypes['Burn']>, ParentType, ContextType, RequireFields<TransactionBurnsArgs, 'first' | 'skip'>>;
  gasPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mints?: Resolver<Array<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<TransactionMintsArgs, 'first' | 'skip'>>;
  swaps?: Resolver<Array<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<TransactionSwapsArgs, 'first' | 'skip'>>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UnderlyingTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnderlyingToken'] = ResolversParentTypes['UnderlyingToken']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WalletResolvers<ContextType = any, ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  positionCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  positions?: Resolver<Array<ResolversTypes['Position']>, ParentType, ContextType, RequireFields<WalletPositionsArgs, 'first' | 'skip'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = any, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = any, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
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
  Factory?: FactoryResolvers<ContextType>;
  MarginEngine?: MarginEngineResolvers<ContextType>;
  Mint?: MintResolvers<ContextType>;
  Position?: PositionResolvers<ContextType>;
  PositionSnapshot?: PositionSnapshotResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RateOracle?: RateOracleResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Swap?: SwapResolvers<ContextType>;
  Tick?: TickResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  UnderlyingToken?: UnderlyingTokenResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  derivedFrom?: DerivedFromDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  subgraphId?: SubgraphIdDirectiveResolver<any, any, ContextType>;
}>;


export const GetAmMsDocument = gql`
    query GetAMMs($orderBy: AMM_orderBy!) {
  amms(first: 100, orderBy: $orderBy, orderDirection: asc) {
    id
    createdTimestamp
    updatedTimestamp
    fcmAddress
    marginEngineAddress
    rateOracle {
      id
      protocolId
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
    owner {
      id
    }
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
    burns {
      id
    }
    mints {
      id
    }
    swaps {
      id
    }
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
export const GetWalletDocument = gql`
    query GetWallet($id: ID!) {
  wallet(id: $id) {
    __typename
    id
    positionCount
    positions {
      __typename
      id
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
export function useGetWalletQuery(baseOptions: Apollo.QueryHookOptions<GetWalletQuery, GetWalletQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWalletQuery, GetWalletQueryVariables>(GetWalletDocument, options);
      }
export function useGetWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWalletQuery, GetWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWalletQuery, GetWalletQueryVariables>(GetWalletDocument, options);
        }
export type GetWalletQueryHookResult = ReturnType<typeof useGetWalletQuery>;
export type GetWalletLazyQueryHookResult = ReturnType<typeof useGetWalletLazyQuery>;
export type GetWalletQueryResult = Apollo.QueryResult<GetWalletQuery, GetWalletQueryVariables>;
export const GetWalletsDocument = gql`
    query GetWallets($orderBy: Wallet_orderBy!) {
  wallets(first: 100, orderBy: $orderBy, orderDirection: asc) {
    id
    positions {
      id
    }
  }
}
    `;

/**
 * __useGetWalletsQuery__
 *
 * To run a query within a React component, call `useGetWalletsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetWalletsQuery(baseOptions: Apollo.QueryHookOptions<GetWalletsQuery, GetWalletsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWalletsQuery, GetWalletsQueryVariables>(GetWalletsDocument, options);
      }
export function useGetWalletsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWalletsQuery, GetWalletsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWalletsQuery, GetWalletsQueryVariables>(GetWalletsDocument, options);
        }
export type GetWalletsQueryHookResult = ReturnType<typeof useGetWalletsQuery>;
export type GetWalletsLazyQueryHookResult = ReturnType<typeof useGetWalletsLazyQuery>;
export type GetWalletsQueryResult = Apollo.QueryResult<GetWalletsQuery, GetWalletsQueryVariables>;