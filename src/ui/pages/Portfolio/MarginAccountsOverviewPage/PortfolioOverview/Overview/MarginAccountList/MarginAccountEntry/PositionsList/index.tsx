import { Typography } from 'brokoli-ui';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';

import { routes, useAppDispatch, useAppSelector } from '../../../../../../../../../app';
import {
  fetchMarginAccountPositionsThunk,
  selectMarginAccountPositionsForOverview,
  selectMarginAccountPositionsLoadedState,
  selectMarginAccountPositionsLoading,
} from '../../../../../../../../../app/features/portfolio';
import { MarginAccountUI } from '../../../../../../../../../app/features/portfolio/types';
import { VoltzAppLink } from '../../../../../../../../components/VoltzAppLink';
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
  const positions = useAppSelector(selectMarginAccountPositionsForOverview(marginAccountId));
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
        perPage: 5,
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
                colorToken="black300"
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
                    const backgroundColorToken = index % 2 !== 0 ? 'black800' : 'white900';
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
                  <Typography colorToken="white100" typographyToken="primaryBodyMediumRegular">
                    No positions found. Visit our{' '}
                    <VoltzAppLink
                      colorToken="primary"
                      data-testid="NoPositions-AppLink"
                      to={`/${routes.POOLS}`}
                      typographyToken="primaryBodyMediumRegular"
                    >
                      pool page
                    </VoltzAppLink>{' '}
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
