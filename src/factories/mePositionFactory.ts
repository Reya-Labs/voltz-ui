  /* eslint-disable @typescript-eslint/no-unsafe-assignment */

import JSBI from 'jsbi';
import { GetWalletQuery } from '@graphql'
import { providers } from 'ethers';
import { Position, Token, RateOracle, Mint, Burn, Swap, MarginUpdate, Liquidation, Settlement } from '@voltz-protocol/v1-sdk';
import { AugmentedAMM } from '@utilities';
import { Wallet }  from '@components/context';

type MEPositionQueryData = NonNullable<GetWalletQuery['wallet']>["positions"][number];

/**
 * Takes the data received for an ME position from GetWalletQuery and returns a Position class instance
 * @param positionData - The data for a ME position received from the GetWalletQuery graphql query
 * @param signer - The wallet signer
 */
export const MEPositionFactory = (positionData: MEPositionQueryData, signer: Wallet['signer']): Position => {
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
      txCount
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
    mints,
    burns,
    swaps,
    marginUpdates,
    liquidations,
    settlements
  } = positionData;

  return new Position({
    id: positionId,
    createdTimestamp: positionCreatedTimestamp as JSBI,
    updatedTimestamp: positionUpdatedTimestamp as JSBI,
    tickLower: parseInt(tickLower as string),
    tickUpper: parseInt(tickUpper as string),
    liquidity: liquidity as JSBI,
    margin: margin as JSBI,
    fixedTokenBalance: fixedTokenBalance as JSBI,
    variableTokenBalance: variableTokenBalance as JSBI,
    accumulatedFees: accumulatedFees as JSBI,
    positionType: parseInt(positionType as string),
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
    }),
    mints: mints.map((args) => new Mint({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: args.transaction.createdTimestamp as JSBI,
      ammId,
      positionId: positionId,
      sender: args.sender,
      amount: args.amount as JSBI,
    })),
    burns: burns.map((args) => new Burn({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: args.transaction.createdTimestamp as JSBI,
      ammId,
      positionId: positionId,
      sender: args.sender,
      amount: args.amount as JSBI,
    })),
    swaps: swaps.map((args) => new Swap({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: args.transaction.createdTimestamp as JSBI,
      ammId,
      positionId: positionId,
      sender: args.sender,
      desiredNotional: args.desiredNotional as JSBI,
      sqrtPriceLimitX96: args.sqrtPriceLimitX96 as JSBI,
      cumulativeFeeIncurred: args.cumulativeFeeIncurred as JSBI,
      fixedTokenDelta: args.fixedTokenDelta as JSBI,
      variableTokenDelta: args.variableTokenDelta as JSBI,
      fixedTokenDeltaUnbalanced: args.fixedTokenDeltaUnbalanced as JSBI
    })),
    marginUpdates: marginUpdates.map((args) => new MarginUpdate({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: args.transaction.createdTimestamp as JSBI,
      ammId,
      positionId: positionId,
      depositer: args.depositer ,
      marginDelta: args.marginDelta as JSBI
    })),
    liquidations: liquidations.map((args) => new Liquidation({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: args.transaction.createdTimestamp as JSBI,
      ammId,
      positionId: positionId,
      liquidator: args.liquidator,
      reward: args.reward as JSBI,
      notionalUnwound: args.notionalUnwound as JSBI,
    })),
    settlements: settlements.map((args) => new Settlement({
      id: args.id,
      transactionId: args.transaction.id,
      transactionTimestamp: args.transaction.createdTimestamp as JSBI,
      ammId,
      positionId: positionId,
      settlementCashflow: args.settlementCashflow as JSBI
    })),
    fcmSwaps: [],
    fcmUnwinds: [],
    fcmSettlements: [],
    marginInScaledYieldBearingTokens: JSBI.BigInt(0),
    source: "ME",
  });
}
