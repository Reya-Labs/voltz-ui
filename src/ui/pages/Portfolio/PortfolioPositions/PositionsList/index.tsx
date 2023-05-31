import { AppLink, Typography } from 'brokoli-ui';
import React from 'react';

import { selectPositions, selectPositionsLoading } from '../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../app/hooks';
import { routes } from '../../../../../routes/paths';
import { PositionEntry } from './PositionEntry';
import { PositionsHeader } from './PositionsHeader';
import {
  NoPositionsFoundBox,
  PositionEntrySkeleton,
  PositionsHeaderAndListBox,
  PositionsListBox,
} from './PositionsList.styled';

type PositionsListProps = {
  positionsFilterId: PositionsFilterId;
};

export type PositionsFilterId = 'active' | 'settled';
export const PositionsList: React.FunctionComponent<PositionsListProps> = ({
  positionsFilterId,
}) => {
  const loading = useAppSelector(selectPositionsLoading);
  const positions = useAppSelector(selectPositions).filter((p) =>
    positionsFilterId === 'active'
      ? p.status.variant === 'matured' || p.status.variant === 'active'
      : p.status.variant === 'settled',
  );
  return (
    <PositionsHeaderAndListBox>
      <PositionsHeader />
      {loading ? (
        <PositionsListBox>
          {Array.from({ length: 10 }, () => ({})).map((_, index) => (
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
                  backgroundColorToken={index % 2 !== 0 ? 'liberty7' : 'lavenderWeb8'}
                  borderColorToken={index % 2 !== 0 ? 'lavenderWeb8' : 'transparent'}
                  canEdit={position.canEdit}
                  canRollover={position.canRollover}
                  canSettle={position.canSettle}
                  chainId={position.chainId}
                  health={position.status.health}
                  isAaveV3={position.isAaveV3}
                  isBorrowing={position.isBorrowing}
                  isV2={position.isV2}
                  marginCompactFormat={position.marginCompactFormat}
                  market={position.market}
                  maturityEndTimestampInMS={position.maturityEndTimestampInMS}
                  maturityFormatted={position.maturityFormatted}
                  maturityStartTimestampInMS={position.maturityStartTimestampInMS}
                  notionalCompactFormat={position.notionalCompactFormat}
                  realizedPNLCashflowUSD={position.realizedPNLCashflowUSD}
                  realizedPNLFeesUSD={position.realizedPNLFeesUSD}
                  realizedPNLTotalUSD={position.realizedPNLTotalUSD}
                  realizedPNLTotalUSDCompactFormat={position.realizedPNLTotalUSDCompactFormat}
                  routeAmmId={position.routeAmmId}
                  routePoolId={position.routePoolId}
                  routePositionId={position.routePositionId}
                  status={position.status}
                  token={position.token}
                  type={position.type}
                  unrealizedPNLUSDCompactFormat={position.unrealizedPNLUSDCompactFormat}
                />
              ))
            : null}
          {positions.length === 0 ? (
            <NoPositionsFoundBox>
              <img alt="Gimme" src="/images/no-pools-found.png" />
              <Typography colorToken="lavenderWeb" typographyToken="primaryBodyLargeBold">
                No {positionsFilterId === 'settled' ? 'settled' : 'active'} positions found. Visit
                our{' '}
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
