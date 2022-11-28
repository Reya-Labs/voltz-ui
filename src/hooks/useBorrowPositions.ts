import { useMemo } from 'react';
import { Position } from '@voltz-protocol/v1-sdk';

import { usePositions } from './usePositions/usePositions';
import { useAgent } from './useAgent';

export type useBorrowPositionsResult = {
  positions?: Position[];
  loading: boolean;
  error: boolean;
};

export const useBorrowPositions = (): useBorrowPositionsResult => {
  const { agent } = useAgent();
  const { positions, loading: loadingPos, error: errorPos } = usePositions();

  const borrowPositions = useMemo(() => {
    const vtPositions = positions?.filter((position) => position.positionType === 2);
    if (!vtPositions) {
      return [];
    }
    return vtPositions?.filter((position) => {
      return position.tickLower === -69000 && position.tickUpper === 69060;
    });
  }, [positions, agent, loadingPos, errorPos]);

  return { positions: borrowPositions, loading: loadingPos, error: errorPos };
};
