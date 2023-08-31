import { AppLink, Typography } from 'brokoli-ui';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  selectMarginAccountPositions,
  selectMarginAccountPositionsLoading,
} from '../../../../../app/features/portfolio';
import { PositionsFilterId } from '../../../../../app/features/portfolio/types';
import { useAppSelector } from '../../../../../app/hooks';
import { routes } from '../../../../../routes/paths';
import { Pagination } from '../../../../components/Pagination';
import { ActivePositionEntry } from './PositionEntry/Entry/ActivePositionEntry';
import { MaturedPositionEntry } from './PositionEntry/Entry/MaturedPositionEntry';
import { SettledPositionEntry } from './PositionEntry/Entry/SettledPositionEntry';
import { PositionsHeader } from './PositionsHeader';
import {
  NoPositionsFoundBox,
  PaginationBox,
  PositionEntrySkeleton,
  PositionsHeaderAndListBox,
  PositionsListBox,
} from './PositionsList.styled';

type PositionsListProps = {
  positionsFilterId: PositionsFilterId;
};
const PER_PAGE = 8;

export const PositionsList: React.FunctionComponent<PositionsListProps> = ({
  positionsFilterId,
}) => {
  const { marginAccountId } = useParams();
  const [page, setPage] = useState<number>(0);
  const loading = useAppSelector(selectMarginAccountPositionsLoading(marginAccountId));
  const positions = useAppSelector(selectMarginAccountPositions(marginAccountId)).filter(
    (p) => positionsFilterId === p.status.variant,
  );
  const hasPagination = positions.length > 12;
  const slicedPositions = hasPagination
    ? positions.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
    : positions;
  const maxPages = Math.floor(positions.length / PER_PAGE) + 1;

  const handleOnNextPage = () => {
    if (page + 1 < maxPages) {
      setPage(page + 1);
    }
  };

  const handleOnPrevPage = () => {
    if (page - 1 > -1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [positionsFilterId]);

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
        <React.Fragment>
          <PositionsListBox
            key={positionsFilterId}
            delay={0}
            duration={200}
            easing="cubic-bezier(0.25,0.1,0.25,1.0)"
            staggerDelayBy={10}
            staggerDurationBy={7}
          >
            {positions.length > 0
              ? slicedPositions.map((position, index) => {
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
                <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumRegular">
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
          {hasPagination ? (
            <PaginationBox>
              <Pagination
                maxPages={maxPages}
                page={page}
                onNextPageClick={handleOnNextPage}
                onPreviousPageClick={handleOnPrevPage}
              />
            </PaginationBox>
          ) : null}
        </React.Fragment>
      ) : null}
    </PositionsHeaderAndListBox>
  );
};
