/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */

import JSBI from 'jsbi';
import { GetWalletQuery } from '@graphql'
import { Position, Token, RateOracle, FCMSwap, FCMUnwind, FCMSettlement } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';
import { AugmentedAMM } from '@utilities';
import { Wallet } from '@contexts';

type FCMPositionQueryData = NonNullable<GetWalletQuery['wallet']>["fcmPositions"][number];

/**
 * Takes the data received for an FCM position from GetWalletQuery and returns a Position class instance
 * @param positionData - The data for an FCM position received from the GetWalletQuery graphql query
 * @param signer - The wallet signer
 */
export const FCMPositionFactory = (positionData: FCMPositionQueryData, signer: Wallet['signer']): Position => {
  const {
    id: positionId,
    createdTimestamp: positionCreatedTimestamp,
    amm: {
      id: ammId,
      fcm: {
        id: fcmAddress
      },
      marginEngine: {
        id: marginEngineAddress
      },
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
    updatedTimestamp: positionUpdatedTimestamp,
    fixedTokenBalance,
    variableTokenBalance,
    isSettled,
    totalNotionalTraded: positionTotalNotionalTraded,
    sumOfWeightedFixedRate,
    marginInScaledYieldBearingTokens,
    fcmSwaps,
    fcmUnwinds,
    fcmSettlements
  } = positionData;

  return new Position({
    id: positionId,
    createdTimestamp: JSBI.BigInt(positionCreatedTimestamp),
    updatedTimestamp: JSBI.BigInt(positionUpdatedTimestamp),
    fixedTokenBalance: JSBI.BigInt(fixedTokenBalance),
    variableTokenBalance: JSBI.BigInt(variableTokenBalance),
    isSettled,
    owner: ownerAddress,
    amm: new AugmentedAMM({
      id: ammId,
      signer,
      provider: providers.getDefaultProvider(
        process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK,
      ),
      environment: process.env.REACT_APP_DECODING_TAG || 'KOVAN',
      rateOracle: new RateOracle({
        id: rateOracleAddress,
        protocolId: parseInt(protocolId as string, 10),
      }),
      underlyingToken: new Token({
        id: tokenAddress,
        name: tokenName,
        decimals: decimals as number,
      }),
      factoryAddress: process.env.REACT_APP_FACTORY_ADDRESS || "0x",
      marginEngineAddress,
      fcmAddress,
      updatedTimestamp: JSBI.BigInt(ammUpdatedTimestamp),
      termStartTimestamp: JSBI.BigInt(termStartTimestamp),
      termEndTimestamp: JSBI.BigInt(termEndTimestamp),
      tick: parseInt(tick as string),
      tickSpacing: parseInt(tickSpacing as string),
      txCount: parseInt(txCount as string),
      totalNotionalTraded: ammTotalNotionalTraded as JSBI,
      totalLiquidity: totalLiquidity as JSBI,
    }),
    marginInScaledYieldBearingTokens: JSBI.BigInt(marginInScaledYieldBearingTokens),
    fcmSwaps: fcmSwaps.map((args) => new FCMSwap({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: JSBI.BigInt(args.transaction.createdTimestamp),
      ammId,
      fcmPositionId: positionId,
      desiredNotional: JSBI.BigInt(args.desiredNotional),
      sqrtPriceLimitX96: JSBI.BigInt(args.sqrtPriceLimitX96),
      cumulativeFeeIncurred: JSBI.BigInt(args.cumulativeFeeIncurred),
      fixedTokenDelta: JSBI.BigInt(args.fixedTokenDelta),
      variableTokenDelta: JSBI.BigInt(args.variableTokenDelta),
      fixedTokenDeltaUnbalanced: JSBI.BigInt(args.fixedTokenDeltaUnbalanced)
    })),
    fcmUnwinds: fcmUnwinds.map((args) => new FCMUnwind({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: JSBI.BigInt(args.transaction.createdTimestamp),
      ammId,
      fcmPositionId: positionId,
      desiredNotional: JSBI.BigInt(args.desiredNotional),
      sqrtPriceLimitX96: JSBI.BigInt(args.sqrtPriceLimitX96),
      cumulativeFeeIncurred: JSBI.BigInt(args.cumulativeFeeIncurred),
      fixedTokenDelta: JSBI.BigInt(args.fixedTokenDelta),
      variableTokenDelta: JSBI.BigInt(args.variableTokenDelta),
      fixedTokenDeltaUnbalanced: JSBI.BigInt(args.fixedTokenDeltaUnbalanced)
    })),
    fcmSettlements: fcmSettlements.map((args) => new FCMSettlement({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: JSBI.BigInt(args.transaction.createdTimestamp),
      ammId,
      fcmPositionId: positionId,
      settlementCashflow: JSBI.BigInt(args.settlementCashflow)
    })),
    swaps: [],
    mints: [],
    burns: [],
    marginUpdates: [],
    settlements: [],
    liquidations: [],
    liquidity: JSBI.BigInt(0),
    accumulatedFees: JSBI.BigInt(0),
    positionType: 1,
    tickLower: 0,
    tickUpper: 0,
    margin: JSBI.BigInt(0),
    source: "FCM",
    totalNotionalTraded: positionTotalNotionalTraded as JSBI,
    sumOfWeightedFixedRate: sumOfWeightedFixedRate as JSBI,
  });
};