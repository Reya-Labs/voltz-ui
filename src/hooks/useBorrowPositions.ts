import { useMemo } from 'react';
import { Position } from '@voltz-protocol/v1-sdk';

import { useAgent, usePositions } from '@hooks';

export type useBorrowPositionsResult = {
  positions?: Position[];
  loading: boolean;
  error: boolean;
};

const useBorrowPositions = (): useBorrowPositionsResult => {
  const { agent } = useAgent();
  const { positions, loading: loadingPos, error: errorPos } = usePositions();

  const borrowPositions = useMemo(() => {
    const vtPositions = positions?.filter((position) => position.positionType === 2);
    return vtPositions?.filter((position) => {
        return position.tickLower == -68940 && position.tickUpper == 69060 ;
    });
  }, [positions, agent, loadingPos, errorPos]);

  return { positions: borrowPositions, loading: loadingPos, error: errorPos };
};

export default useBorrowPositions;
