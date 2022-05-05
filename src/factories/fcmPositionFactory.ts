/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import JSBI from 'jsbi';
import { GetWalletQuery } from '@graphql'
import { Position, Token, RateOracle, FCMSwap, FCMUnwind, FCMSettlement } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';
import { AugmentedAMM } from '@utilities';
import { Wallet }  from '@components/context';

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
    createdTimestamp: positionCreatedTimestamp as JSBI,
    updatedTimestamp: positionUpdatedTimestamp as JSBI,
    fixedTokenBalance: fixedTokenBalance as JSBI,
    variableTokenBalance: variableTokenBalance as JSBI,
    isSettled,
    owner: ownerAddress,
    amm: new AugmentedAMM({
      id: ammId,
      signer,
      provider: providers.getDefaultProvider(
        process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK,
      ),
      environment: 'KOVAN',
      rateOracle: new RateOracle({
        id: rateOracleAddress,
        protocolId: protocolId as number,
      }),
      underlyingToken: new Token({
        id: tokenAddress,
        name: tokenName,
        decimals: decimals as number,
      }),
      marginEngineAddress,
      fcmAddress,
      updatedTimestamp: ammUpdatedTimestamp as JSBI,
      termStartTimestamp: termStartTimestamp as JSBI,
      termEndTimestamp: termEndTimestamp as JSBI,
      tick: parseInt(tick as string),
      tickSpacing: parseInt(tickSpacing as string),
      txCount: parseInt(txCount as string),
      totalNotionalTraded: ammTotalNotionalTraded as JSBI,
      totalLiquidity: totalLiquidity as JSBI,
    }),
    marginInScaledYieldBearingTokens: marginInScaledYieldBearingTokens as JSBI,
    fcmSwaps: fcmSwaps.map((args) => new FCMSwap({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: args.transaction.createdTimestamp as JSBI,
      ammId,
      fcmPositionId: positionId,
      desiredNotional: args.desiredNotional as JSBI,
      sqrtPriceLimitX96: args.sqrtPriceLimitX96 as JSBI,
      cumulativeFeeIncurred: args.cumulativeFeeIncurred as JSBI,
      fixedTokenDelta: args.fixedTokenDelta as JSBI,
      variableTokenDelta: args.variableTokenDelta as JSBI,
      fixedTokenDeltaUnbalanced: args.fixedTokenDeltaUnbalanced as JSBI
    })),
    fcmUnwinds: fcmUnwinds.map((args) => new FCMUnwind({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: args.transaction.createdTimestamp as JSBI,
      ammId,
      fcmPositionId: positionId,
      desiredNotional: args.desiredNotional as JSBI,
      sqrtPriceLimitX96: args.sqrtPriceLimitX96 as JSBI,
      cumulativeFeeIncurred: args.cumulativeFeeIncurred as JSBI,
      fixedTokenDelta: args.fixedTokenDelta as JSBI,
      variableTokenDelta: args.variableTokenDelta as JSBI,
      fixedTokenDeltaUnbalanced: args.fixedTokenDeltaUnbalanced as JSBI
    })),
    fcmSettlements: fcmSettlements.map((args) => new FCMSettlement({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: args.transaction.createdTimestamp as JSBI,
      ammId,
      fcmPositionId: positionId,
      settlementCashflow: args.settlementCashflow as JSBI
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