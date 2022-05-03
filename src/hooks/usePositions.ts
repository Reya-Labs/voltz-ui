import JSBI from 'jsbi';
import { useMemo, useEffect } from 'react';
import isNull from 'lodash/isNull';
import { Position, Token, RateOracle, Mint, Burn, Swap, MarginUpdate, Liquidation, Settlement, FCMSwap, FCMUnwind, FCMSettlement } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';
import { DateTime } from 'luxon';

import { AugmentedAMM } from '@utilities';
import { actions, selectors } from '@store';
import { useAgent, useWallet, useSelector, useDispatch } from '@hooks';
import { Agents } from '@components/contexts';

export type usePositionsResult = {
  positions?: Position[];
  positionsByAgent?: Position[];
  loading: boolean;
  error: boolean;
};

const usePositions = (): usePositionsResult => {
  const { agent } = useAgent();
  const { signer, wallet, loading, error } = useWallet();
  const isSignerAvailable = !isNull(signer);
  const positionCount = wallet?.positions.length;
  const fcmPositionCount = wallet?.fcmPositions.length;

  const fcmPositions = useMemo(() => {
    if (wallet && wallet.fcmPositions && !loading && !error) {
      return wallet.fcmPositions.map(
        ({
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
          updatedTimestamp: positionUpdatedTimestamp,
          fixedTokenBalance,
          variableTokenBalance,
          isSettled,
          marginInScaledYieldBearingTokens,
          fcmSwaps,
          fcmUnwinds,
          fcmSettlements
        }) =>
          new Position({
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
          }),
      );
    }
  }, [fcmPositionCount, loading, error, isSignerAvailable]);

  const mePositions = useMemo(() => {
    if (wallet && wallet.positions && !loading && !error) {
      return wallet.positions.map(
        ({
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
        }) =>
          new Position({
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
          }),
      );
    }
  }, [positionCount, loading, error, isSignerAvailable]);
  const positions = (mePositions) ? ((fcmPositions) ? mePositions.concat(fcmPositions) : mePositions) : fcmPositions;
  if (positions) {
    positions.sort((a, b) => {
      if (JSBI.GT(a.createdTimestamp, b.createdTimestamp)) {
        return 1;
      }
      if (JSBI.GT(b.createdTimestamp, a.createdTimestamp)) {
        return -1;
      }
      return 0;
    })
  }

  const positionsByAgent = useMemo(() => {
    return positions?.filter(({ positionType }) => {
      switch (agent) {
        case Agents.LIQUIDITY_PROVIDER:
          return positionType === 3;

        case Agents.FIXED_TRADER:
          return positionType === 1;

        case Agents.VARIABLE_TRADER:
          return positionType === 2;
      }
    });
  }, [positions, agent]);

  const unresolvedTransactions = useSelector(selectors.unresolvedTransactionsSelector);
  const shouldTryToCloseTransactions =
    unresolvedTransactions.length > 0 && positions && positions.length > 0;
  const dispatch = useDispatch();

  // [might be broken]
  useEffect(() => {
    if (shouldTryToCloseTransactions) {
      unresolvedTransactions.forEach((unresolvedTransaction) => {
        const matchingPosition = positions.find(
          ({
            amm: { id: ammId },
            fixedRateLower,
            fixedRateUpper,
            effectiveFixedTokenBalance,
            positionType,
          }) => {
            if (ammId !== unresolvedTransaction.ammId) {
              return false;
            }

            if (positionType === 3 && unresolvedTransaction.agent !== Agents.LIQUIDITY_PROVIDER) {
              return false;
            }

            if (
              effectiveFixedTokenBalance > 0 &&
              unresolvedTransaction.agent !== Agents.FIXED_TRADER
            ) {
              return false;
            }

            if (fixedRateLower.toNumber() !== unresolvedTransaction.fixedLow) {
              return false;
            }

            if (fixedRateUpper.toNumber() !== unresolvedTransaction.fixedHigh) {
              return false;
            }

            return true;
          },
        );

        if (matchingPosition) {
          dispatch(
            actions.updateTransaction({
              id: unresolvedTransaction.id,
              resolvedAt: DateTime.now().toISO(),
            }),
          );
        }
      });
    }
  }, [shouldTryToCloseTransactions, positions, dispatch]);

  return { positions, positionsByAgent, loading, error };
};

export default usePositions;
