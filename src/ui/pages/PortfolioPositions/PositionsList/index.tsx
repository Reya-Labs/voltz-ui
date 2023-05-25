import { Typography } from 'brokoli-ui';
import React from 'react';

import { selectPools, selectPoolsLoading } from '../../../../app/features/aMMs';
import { useAppSelector } from '../../../../app/hooks';
import { PositionEntry } from './PositionEntry';
import { PositionsHeader } from './PositionsHeader';
import {
  NoPositionsFoundBox,
  PositionEntrySkeleton,
  PositionsHeaderAndListBox,
  PositionsListBox,
} from './PositionsList.styled';

export const PositionsList: React.FunctionComponent = () => {
  const loading = useAppSelector(selectPoolsLoading);
  const pools = useAppSelector(selectPools);

  return (
    <PositionsHeaderAndListBox>
      <PositionsHeader />
      {loading ? (
        <PositionsListBox>
          {Array.from({ length: 10 }, () => ({})).map((ranking, index) => (
            <PositionEntrySkeleton
              key={index}
              colorToken="liberty2"
              data-testid="PoolsList-PoolEntrySkeleton"
              variant="rectangular"
            />
          ))}
        </PositionsListBox>
      ) : null}
      {!loading ? (
        <PositionsListBox
          delay={0}
          duration={300}
          easing="cubic-bezier(0.25,0.1,0.25,1.0)"
          staggerDelayBy={20}
          staggerDurationBy={15}
        >
          {pools.length > 0
            ? pools.map((pool, index) => (
                <PositionEntry
                  key={pool.id}
                  aMMMaturity={pool.aMMMaturity}
                  backgroundColorToken={index % 2 !== 0 ? 'liberty7' : 'lavenderWeb8'}
                  borderColorToken={index % 2 !== 0 ? 'lavenderWeb8' : 'transparent'}
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
            <NoPositionsFoundBox>
              <img alt="Gimme" src="/images/no-pools-found.png" />
              <Typography colorToken="lavenderWeb" typographyToken="primaryBodyLargeBold">
                No pools match the filter criteria. Try refining them.
              </Typography>
            </NoPositionsFoundBox>
          ) : null}
        </PositionsListBox>
      ) : null}
    </PositionsHeaderAndListBox>
  );
};
