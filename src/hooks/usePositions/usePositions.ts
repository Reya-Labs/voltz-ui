import { Position } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';

import { Agents } from '../../contexts/AgentContext/types';
import { actions, selectors } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isBorrowingPosition } from '../../utilities/borrowAmm';
import { useAgent } from '../useAgent';
import { useAMMs } from '../useAMMs';
import { useWallet } from '../useWallet';
import { MEPositionFactory } from './mePositionFactory';

export type usePositionsResult = {
  positionsByAgentGroup: Position[];
  borrowPositions: Position[];
  loading: boolean;
  error: boolean;
};

export const usePositions = (): usePositionsResult => {
  const { agent } = useAgent();
  const { wallet, loading: walletLoading, error: walletError } = useWallet();
  const { amms, loading: ammLoading, error: ammError } = useAMMs();
  const [mePositions, setMePositions] = useState<Position[]>([]);

  useEffect(() => {
    let shouldUpdate = true;
    if (
      wallet &&
      wallet.positions &&
      !walletLoading &&
      !walletError &&
      amms &&
      !ammLoading &&
      !ammError
    ) {
      if (!agent) {
        return;
      }

      const walletPositions = wallet.positions
        .filter(({ positionType }) => {
          const pType = parseInt(positionType as string, 10);
          if (isNaN(pType)) {
            return false;
          }

          if (agent === Agents.LIQUIDITY_PROVIDER) {
            return pType === 3;
          }

          return pType === 1 || pType === 2;
        })
        .map((positionData) => MEPositionFactory(positionData, amms))
        .filter((position) => Boolean(position)) as Position[];
      setMePositions(walletPositions);
      void Promise.all(walletPositions.map((p) => p.refreshInfo())).then(() => {
        if (shouldUpdate) {
          setMePositions([...walletPositions]);
        }
      });

      return () => {
        shouldUpdate = false;
      };
    }
  }, [agent, wallet, walletLoading, walletError, amms, ammLoading, ammError]);

  const positionsByAgentGroup = useMemo(() => {
    return mePositions
      .sort((a, b) => {
        return b.createdTimestamp - a.createdTimestamp; // sort positions by timestamp
      })
      .sort((a, b) => {
        return Number(a.isSettled) - Number(b.isSettled); // sort settled positions to the bottom
      });
  }, [mePositions]);

  const unresolvedTransactions = useAppSelector(selectors.unresolvedTransactionsSelector);
  const shouldTryToCloseTransactions =
    unresolvedTransactions.length > 0 && mePositions && mePositions.length > 0;
  const dispatch = useAppDispatch();

  // [might be broken]
  useEffect(() => {
    if (shouldTryToCloseTransactions) {
      unresolvedTransactions.forEach((unresolvedTransaction) => {
        const matchingPosition = mePositions.find(
          ({ amm: { id: ammId }, fixedRateLower, fixedRateUpper, positionType }) => {
            if (ammId !== unresolvedTransaction.ammId) {
              return false;
            }

            if (positionType === 3 && unresolvedTransaction.agent !== Agents.LIQUIDITY_PROVIDER) {
              return false;
            }

            if (positionType === 1 && unresolvedTransaction.agent !== Agents.FIXED_TRADER) {
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
  }, [shouldTryToCloseTransactions, mePositions, dispatch]);

  return {
    positionsByAgentGroup: positionsByAgentGroup.filter((pos) => !isBorrowingPosition(pos)),
    borrowPositions: positionsByAgentGroup.filter((pos) => isBorrowingPosition(pos)),
    loading: walletLoading || ammLoading,
    error: walletError || ammError,
  };
};
