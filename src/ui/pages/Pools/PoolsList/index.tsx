import React from 'react';

import { selectPools, selectPoolsLoading } from '../../../../app/features/aMMs';
import { useAppSelector } from '../../../../app/hooks';
import { PoolEntry } from './PoolEntry';
import { PoolsHeader } from './PoolsHeader';
import { PoolEntrySkeleton, PoolsHeaderAndListBox, PoolsListBox } from './PoolsList.styled';

export const PoolsList: React.FunctionComponent = () => {
  const loading = useAppSelector(selectPoolsLoading);
  const pools = useAppSelector(selectPools);

  return (
    <PoolsHeaderAndListBox>
      <PoolsHeader />
      <PoolsListBox>
        {loading
          ? Array.from({ length: 10 }, () => ({})).map((ranking, index) => (
              <PoolEntrySkeleton
                key={index}
                colorToken="liberty2"
                data-testid="PoolsList-PoolEntrySkeleton"
                variant="rectangular"
              />
            ))
          : null}
        {!loading
          ? pools.map((pool, index) => (
              <PoolEntry
                key={pool.id}
                aMMMaturity={pool.aMMMaturity}
                backgroundColorToken={index % 2 !== 0 ? 'liberty7' : 'lavenderWeb8'}
                fixedRateFormatted={pool.fixedRateFormatted}
                isAaveV3={pool.isAaveV3}
                isBorrowing={pool.isBorrowing}
                market={pool.market}
                routeAmmId={pool.routeAmmId}
                routePoolId={pool.routePoolId}
                token={pool.token}
                variableRate24hDelta={pool.variableRate24hDelta}
                variableRateFormatted={pool.variableRateFormatted}
              />
            ))
          : null}
      </PoolsListBox>
    </PoolsHeaderAndListBox>
  );
};
