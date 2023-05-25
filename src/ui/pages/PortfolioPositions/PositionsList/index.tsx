import { AppLink, Typography } from 'brokoli-ui';
import React from 'react';

import { selectPositions, selectPositionsLoading } from '../../../../app/features/portfolio';
import { useAppSelector } from '../../../../app/hooks';
import { routes } from '../../../../routes/paths';
import { PositionEntry } from './PositionEntry';
import { PositionsHeader } from './PositionsHeader';
import {
  NoPositionsFoundBox,
  PositionEntrySkeleton,
  PositionsHeaderAndListBox,
  PositionsListBox,
} from './PositionsList.styled';

export const PositionsList: React.FunctionComponent = () => {
  const loading = useAppSelector(selectPositionsLoading);
  const positions = useAppSelector(selectPositions);

  return (
    <PositionsHeaderAndListBox>
      <PositionsHeader />
      {loading ? (
        <PositionsListBox>
          {Array.from({ length: 10 }, () => ({})).map((ranking, index) => (
            <PositionEntrySkeleton
              key={index}
              colorToken="liberty2"
              data-testid="PositionsList-PositionEntrySkeleton"
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
          {positions.length > 0
            ? positions.map((position, index) => (
                <PositionEntry
                  key={position.id}
                  aMMMaturity={position.aMMMaturity}
                  backgroundColorToken={index % 2 !== 0 ? 'liberty7' : 'lavenderWeb8'}
                  borderColorToken={index % 2 !== 0 ? 'lavenderWeb8' : 'transparent'}
                  chainId={position.chainId}
                  fixedRateFormatted={position.fixedAPRRateFormatted}
                  isAaveV3={position.isAaveV3}
                  isBorrowing={position.isBorrowing}
                  isV2={position.isV2}
                  market={position.market}
                  routeAmmId={position.routeAmmId}
                  routePoolId={position.routePoolId}
                  token={position.token}
                  variableRate24hDelta={position.variableAPYRate24hDelta}
                  variableRateFormatted={position.variableAPYRateFormatted}
                />
              ))
            : null}
          {positions.length === 0 ? (
            <NoPositionsFoundBox>
              <img alt="Gimme" src="/images/no-pools-found.png" />
              <Typography colorToken="lavenderWeb" typographyToken="primaryBodyLargeBold">
                No positions found. Visit our{' '}
                <AppLink
                  colorToken="skyBlueCrayola"
                  data-testid="NoPositions-AppLink"
                  to={`/${routes.POOLS}`}
                  typographyToken="primaryBodyMediumRegular"
                >
                  pool page
                </AppLink>{' '}
                and start trading!
              </Typography>
            </NoPositionsFoundBox>
          ) : null}
        </PositionsListBox>
      ) : null}
    </PositionsHeaderAndListBox>
  );
};
