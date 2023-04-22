import React, { useLayoutEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';

import { PoolUI } from '../../../../app/features/aMMs/types';
import { PoolItem } from './PoolItem';

export type PoolListProps = {
  pools: PoolUI[];
  onPoolItemClick: (pool: PoolUI) => void;
};

export const PoolList: React.FunctionComponent<PoolListProps> = ({ onPoolItemClick, pools }) => {
  const [height, setHeight] = useState<'auto' | number>(0);
  const [width, setWidth] = useState<'auto' | number>('auto');

  useLayoutEffect(() => {
    setHeight('auto');
    const elem = document.querySelector('[data-testid="VoltzPage-MainSectionBox"]');
    if (elem) {
      const elemWidth = elem.getBoundingClientRect().width;
      setWidth(elemWidth);
    }
  }, []);

  return (
    <AnimateHeight
      duration={300}
      easing="ease-in"
      height={height}
      id="PoolList"
      style={{
        width: width,
      }}
    >
      {pools.map((pool) => (
        <PoolItem
          key={pool.id}
          aMMMaturity={pool.aMMMaturity}
          fixedRateFormatted={pool.fixedAPRRateFormatted}
          isAaveV3={pool.isAaveV3}
          isBorrowing={pool.isBorrowing}
          isV2={pool.isV2}
          market={pool.market}
          token={pool.token}
          variableRate24hDelta={pool.variableAPYRate24hDelta}
          variableRateFormatted={pool.variableAPYRateFormatted}
          onClick={() => onPoolItemClick(pool)}
        />
      ))}
    </AnimateHeight>
  );
};
