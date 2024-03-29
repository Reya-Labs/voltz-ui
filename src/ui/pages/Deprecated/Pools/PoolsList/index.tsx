import { Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../app';
import { selectV1V2Pools, selectV1V2PoolsLoading } from '../../../../../app/features/aMMs';
import { PoolEntry } from './PoolEntry';
import { PoolsHeader } from './PoolsHeader';
import {
  NoPoolsFoundBox,
  PoolEntrySkeleton,
  PoolsHeaderAndListBox,
  PoolsListBox,
} from './PoolsList.styled';

export const PoolsList: React.FunctionComponent = () => {
  const loading = useAppSelector(selectV1V2PoolsLoading);
  const pools = useAppSelector(selectV1V2Pools);

  return (
    <PoolsHeaderAndListBox>
      <PoolsHeader />
      {loading ? (
        <PoolsListBox>
          {Array.from({ length: 10 }, () => ({})).map((ranking, index) => (
            <PoolEntrySkeleton
              key={index}
              colorToken="black300"
              data-testid="PoolsList-PoolEntrySkeleton"
              variant="rectangular"
            />
          ))}
        </PoolsListBox>
      ) : null}
      {!loading ? (
        <PoolsListBox
          delay={0}
          duration={300}
          easing="cubic-bezier(0.25,0.1,0.25,1.0)"
          staggerDelayBy={20}
          staggerDurationBy={15}
        >
          {pools.length > 0
            ? pools.map((pool, index) => (
                <PoolEntry
                  key={pool.id}
                  aMMMaturity={pool.aMMMaturity}
                  backgroundColorToken={index % 2 !== 0 ? 'black800' : 'white900'}
                  borderColorToken={index % 2 !== 0 ? 'white900' : 'transparent'}
                  chainId={pool.chainId}
                  fixedRateFormatted={pool.fixedAPRRateFormatted}
                  isAaveV3={pool.isAaveV3}
                  isBorrowing={pool.isBorrowing}
                  isV2={pool.isV2}
                  market={pool.market}
                  routeAmmId={pool.routeAmmId}
                  routePoolId={pool.routePoolId}
                  token={pool.token}
                  variableRate24hDelta={pool.variableAPYRate24hDelta}
                  variableRateFormatted={pool.variableAPYRateFormatted}
                />
              ))
            : null}
          {pools.length === 0 ? (
            <NoPoolsFoundBox>
              <img alt="Gimme" src="/images/no-pools-found.png" />
              <Typography colorToken="white100" typographyToken="primaryBodyLargeBold">
                No pools match the filter criteria. Try refining them.
              </Typography>
            </NoPoolsFoundBox>
          ) : null}
        </PoolsListBox>
      ) : null}
    </PoolsHeaderAndListBox>
  );
};
