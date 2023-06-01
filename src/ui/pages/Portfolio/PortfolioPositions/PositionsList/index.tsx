import { AppLink, Typography } from 'brokoli-ui';
import React from 'react';

import { selectPositions, selectPositionsLoading } from '../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../app/hooks';
import { routes } from '../../../../../routes/paths';
import { ActivePositionEntry } from './PositionEntry/Entry/ActivePositionEntry';
import { MaturedPositionEntry } from './PositionEntry/Entry/MaturedPositionEntry';
import { SettledPositionEntry } from './PositionEntry/Entry/SettledPositionEntry';
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

export type PositionsFilterId = 'active' | 'matured' | 'settled';
export const PositionsList: React.FunctionComponent<PositionsListProps> = ({
  positionsFilterId,
}) => {
  const loading = useAppSelector(selectPositionsLoading);
  const positions = useAppSelector(selectPositions).filter(
    (p) => positionsFilterId === p.status.variant,
  );
  return (
    <PositionsHeaderAndListBox>
      <PositionsHeader positionsFilterId={positionsFilterId} />
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
          key={positionsFilterId}
          delay={0}
          duration={300}
          easing="cubic-bezier(0.25,0.1,0.25,1.0)"
          staggerDelayBy={20}
          staggerDurationBy={15}
        >
          {positions.length > 0
            ? positions.map((position, index) => {
                const backgroundColorToken = index % 2 !== 0 ? 'liberty7' : 'lavenderWeb8';

                if (positionsFilterId === 'matured') {
                  return (
                    <MaturedPositionEntry
                      key={position.id}
                      backgroundColorToken={backgroundColorToken}
                      {...position}
                      token={position.token}
                    />
                  );
                }

                if (positionsFilterId === 'settled') {
                  return (
                    <SettledPositionEntry
                      key={position.id}
                      backgroundColorToken={backgroundColorToken}
                      {...position}
                      token={position.token}
                    />
                  );
                }

                return (
                  <ActivePositionEntry
                    key={position.id}
                    backgroundColorToken={backgroundColorToken}
                    {...position}
                    token={position.token}
                  />
                );
              })
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
