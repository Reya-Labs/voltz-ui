import { Position } from '@voltz-protocol/v1-sdk';
import JSBI from 'jsbi';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';

import { Agents } from '../../contexts/AgentContext/types';
import { actions, selectors } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useAgent } from '../useAgent';
import { useAMMs } from '../useAMMs';
import { useWallet } from '../useWallet';
import { MEPositionFactory } from './mePositionFactory';

export type usePositionsResult = {
  positions?: Position[];
  positionsByAgentGroup?: Position[];
  loading: boolean;
  error: boolean;
};

export const usePositions = (): usePositionsResult => {
  const { agent } = useAgent();
  const { wallet, loading: walletLoading, error: walletError } = useWallet();
  const { amms, loading: ammLoading, error: ammError } = useAMMs();
  const [mePositions, setMePositions] = useState<Position[]>();

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
      const walletPositions = wallet.positions
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
  }, [wallet, walletLoading, walletError, amms, ammLoading, ammError]);

  const positions = useMemo(() => {
    const _positions = mePositions;
    if (_positions) {
      _positions.sort((a, b) => {
        if (JSBI.GT(a.createdTimestamp, b.createdTimestamp)) {
          return 1;
        }
        if (JSBI.GT(b.createdTimestamp, a.createdTimestamp)) {
          return -1;
        }
        return 0;
      });
    }
    return _positions;
  }, [mePositions]);

  const positionsByAgentGroup = useMemo(() => {
    return positions
      ?.filter(({ positionType, tickLower, tickUpper }) => {
        if (agent === Agents.LIQUIDITY_PROVIDER) {
          return positionType === 3;
        } else {
          return (
            positionType === 1 ||
            (positionType === 2 && (tickLower !== -69000 || tickUpper !== 69060))
          );
        }
      })
      .sort((a, b) => {
        return Number(a.isSettled) - Number(b.isSettled); // sort settled positions to the bottom
      });
  }, [positions, agent]);

  const unresolvedTransactions = useAppSelector(selectors.unresolvedTransactionsSelector);
  const shouldTryToCloseTransactions =
    unresolvedTransactions.length > 0 && positions && positions.length > 0;
  const dispatch = useAppDispatch();

  // [might be broken]
  useEffect(() => {
    if (shouldTryToCloseTransactions) {
      unresolvedTransactions.forEach((unresolvedTransaction) => {
        const matchingPosition = positions.find(
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
  }, [shouldTryToCloseTransactions, positions, dispatch]);

  return {
    positions,
    positionsByAgentGroup,
    loading: walletLoading || ammLoading,
    error: walletError || ammError,
  };
};
