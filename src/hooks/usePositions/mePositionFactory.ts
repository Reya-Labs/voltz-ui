/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */

import {
  AMM,
  Burn,
  Liquidation,
  MarginUpdate,
  Mint,
  Position,
  RateOracle,
  Settlement,
  Swap,
  Token,
} from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';
import JSBI from 'jsbi';

import { Wallet } from '../../contexts/WalletContext/types';
import { GetWalletQuery } from '../../graphql';

type MEPositionQueryData = NonNullable<GetWalletQuery['wallet']>['positions'][number];

/**
 * Takes the data received for an ME position from GetWalletQuery and returns a Position class instance
 * @param positionData - The data for a ME position received from the GetWalletQuery graphql query
 * @param signer - The wallet signer
 */
export const MEPositionFactory = (
  positionData: MEPositionQueryData,
  signer: Wallet['signer'],
): Position => {
  const {
    id: positionId,
    createdTimestamp: positionCreatedTimestamp,
    amm: {
      id: ammId,
      marginEngine: { id: marginEngineAddress },
      rateOracle: {
        id: rateOracleAddress,
        protocolId,
        token: { id: tokenAddress, name: tokenName, decimals },
      },
      tickSpacing,
      termStartTimestamp,
      termEndTimestamp,
      updatedTimestamp: ammUpdatedTimestamp,
      tick,
      txCount,
      totalNotionalTraded: ammTotalNotionalTraded,
      totalLiquidity,
    },
    owner: { id: ownerAddress },
    tickLower,
    tickUpper,
    updatedTimestamp: positionUpdatedTimestamp,
    liquidity,
    margin,
    fixedTokenBalance,
    variableTokenBalance,
    accumulatedFees,
    positionType,
    isSettled,
    totalNotionalTraded: positionTotalNotionalTraded,
    sumOfWeightedFixedRate,
    mints,
    burns,
    swaps,
    marginUpdates,
    liquidations,
    settlements,
  } = positionData;

  return new Position({
    id: positionId,
    createdTimestamp: JSBI.BigInt(positionCreatedTimestamp),
    updatedTimestamp: JSBI.BigInt(positionUpdatedTimestamp),
    tickLower: parseInt(tickLower as string),
    tickUpper: parseInt(tickUpper as string),
    liquidity: JSBI.BigInt(liquidity),
    margin: JSBI.BigInt(margin),
    fixedTokenBalance: JSBI.BigInt(fixedTokenBalance),
    variableTokenBalance: JSBI.BigInt(variableTokenBalance),
    accumulatedFees: JSBI.BigInt(accumulatedFees),
    positionType: parseInt(positionType as string),
    isSettled,
    owner: ownerAddress,
    amm: new AMM({
      id: ammId,
      signer,
      provider: providers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK),
      rateOracle: new RateOracle({
        id: rateOracleAddress,
        protocolId: parseInt(protocolId as string, 10),
      }),
      underlyingToken: new Token({
        id: tokenAddress,
        name: tokenName,
        decimals: decimals as number,
      }),
      factoryAddress: process.env.REACT_APP_FACTORY_ADDRESS || '0x',
      marginEngineAddress,
      updatedTimestamp: JSBI.BigInt(ammUpdatedTimestamp),
      termStartTimestamp: JSBI.BigInt(termStartTimestamp),
      termEndTimestamp: JSBI.BigInt(termEndTimestamp),
      tick: parseInt(tick as string),
      tickSpacing: parseInt(tickSpacing as string),
      txCount: parseInt(txCount as string),
      totalNotionalTraded: ammTotalNotionalTraded as JSBI,
      totalLiquidity: totalLiquidity as JSBI,
    }),
    mints: mints.map(
      (args) =>
        new Mint({
          id: args.id,
          transactionId: args.transaction.id,
          transactionTimestamp: JSBI.BigInt(args.transaction.createdTimestamp),
          ammId,
          positionId: positionId,
          sender: args.sender,
          amount: JSBI.BigInt(args.amount),
        }),
    ),
    burns: burns.map(
      (args) =>
        new Burn({
          id: args.id,
          transactionId: args.transaction.id,
          transactionTimestamp: JSBI.BigInt(args.transaction.createdTimestamp),
          ammId,
          positionId: positionId,
          sender: args.sender,
          amount: JSBI.BigInt(args.amount),
        }),
    ),
    swaps: swaps.map(
      (args) =>
        new Swap({
          id: args.id,
          transactionId: args.transaction.id,
          transactionTimestamp: JSBI.BigInt(args.transaction.createdTimestamp),
          ammId,
          positionId: positionId,
          sender: args.sender,
          desiredNotional: JSBI.BigInt(args.desiredNotional),
          sqrtPriceLimitX96: JSBI.BigInt(args.sqrtPriceLimitX96),
          cumulativeFeeIncurred: JSBI.BigInt(args.cumulativeFeeIncurred),
          fixedTokenDelta: JSBI.BigInt(args.fixedTokenDelta),
          variableTokenDelta: JSBI.BigInt(args.variableTokenDelta),
          fixedTokenDeltaUnbalanced: JSBI.BigInt(args.fixedTokenDeltaUnbalanced),
        }),
    ),
    marginUpdates: marginUpdates.map(
      (args) =>
        new MarginUpdate({
          id: args.id,
          transactionId: args.transaction.id,
          transactionTimestamp: JSBI.BigInt(args.transaction.createdTimestamp),
          ammId,
          positionId: positionId,
          depositer: args.depositer,
          marginDelta: JSBI.BigInt(args.marginDelta),
        }),
    ),
    liquidations: liquidations.map(
      (args) =>
        new Liquidation({
          id: args.id,
          transactionId: args.transaction.id,
          transactionTimestamp: JSBI.BigInt(args.transaction.createdTimestamp),
          ammId,
          positionId: positionId,
          liquidator: args.liquidator,
          reward: JSBI.BigInt(args.reward),
          notionalUnwound: JSBI.BigInt(args.notionalUnwound),
        }),
    ),
    settlements: settlements.map(
      (args) =>
        new Settlement({
          id: args.id,
          transactionId: args.transaction.id,
          transactionTimestamp: JSBI.BigInt(args.transaction.createdTimestamp),
          ammId,
          positionId: positionId,
          settlementCashflow: JSBI.BigInt(args.settlementCashflow),
        }),
    ),
    totalNotionalTraded: positionTotalNotionalTraded as JSBI,
    sumOfWeightedFixedRate: sumOfWeightedFixedRate as JSBI,
  });
};
