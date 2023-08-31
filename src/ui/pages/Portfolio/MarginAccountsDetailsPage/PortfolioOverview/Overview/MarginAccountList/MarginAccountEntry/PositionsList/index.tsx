import { AppLink, Typography } from 'brokoli-ui';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';

import {
  fetchMarginAccountPositionsThunk,
  selectMarginAccountPositions,
  selectMarginAccountPositionsLoadedState,
  selectMarginAccountPositionsLoading,
} from '../../../../../../../../../app/features/portfolio';
import { MarginAccountUI } from '../../../../../../../../../app/features/portfolio/types';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../app/hooks';
import { routes } from '../../../../../../../../../routes/paths';
import { PositionEntry } from './PositionEntry';
import { PositionsHeader } from './PositionsHeader';
import {
  NoPositionsFoundBox,
  PositionEntrySkeleton,
  PositionsHeaderAndListBox,
  PositionsListBox,
} from './PositionsList.styled';

export const PositionsList: React.FunctionComponent<{
  isShown: boolean;
  marginAccountId: MarginAccountUI['id'];
}> = ({ marginAccountId, isShown }) => {
  const loading = useAppSelector(selectMarginAccountPositionsLoading(marginAccountId));
  const loadedState = useAppSelector(selectMarginAccountPositionsLoadedState(marginAccountId));
  const positions = useAppSelector(selectMarginAccountPositions(marginAccountId));
  const [height, setHeight] = useState<'auto' | number>(0);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    setHeight(isShown ? 'auto' : 0);
  }, [isShown]);

  useEffect(() => {
    if (!isShown) {
      return;
    }
    if (loadedState === 'succeeded') {
      return;
    }
    void dispatch(
      fetchMarginAccountPositionsThunk({
        id: marginAccountId,
      }),
    );
  }, [dispatch, isShown, loadedState, marginAccountId]);

  return (
    <AnimateHeight duration={300} easing="ease-in" height={height}>
      <PositionsHeaderAndListBox>
        <PositionsHeader />
        {loading ? (
          <PositionsListBox>
            {Array.from({ length: 5 }, () => ({})).map((_, index) => (
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
              delay={0}
              duration={200}
              easing="cubic-bezier(0.25,0.1,0.25,1.0)"
              staggerDelayBy={10}
              staggerDurationBy={7}
            >
              {positions.length > 0
                ? positions.map((position, index) => {
                    const backgroundColorToken = index % 2 !== 0 ? 'liberty7' : 'lavenderWeb8';
                    return (
                      <PositionEntry
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
          </React.Fragment>
        ) : null}
      </PositionsHeaderAndListBox>
    </AnimateHeight>
  );
};
