import { AppLink, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import {
  selectMarginAccounts,
  selectMarginAccountsLoading,
  selectTotalMarginAccounts,
} from '../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../app/hooks';
import { routes } from '../../../../../routes/paths';
import { Pagination } from '../../../../components/Pagination';
import { MarginAccountEntry } from './MarginAccountEntry';
import {
  MarginAccountEntrySkeleton,
  MarginAccountsListBox,
  MarginAccountsPaginationAndListBox,
  NoMarginAccountsFoundBox,
  PaginationBox,
} from './MarginAccountList.styled';

const PER_PAGE = 8;

export const MarginAccountList: React.FunctionComponent = () => {
  const [page, setPage] = useState<number>(0);
  const loading = useAppSelector(selectMarginAccountsLoading);
  const marginAccounts = useAppSelector(selectMarginAccounts);
  const totalMarginAccounts = useAppSelector(selectTotalMarginAccounts);
  const hasPagination = totalMarginAccounts > 12;
  const slicedMarginAccounts = hasPagination
    ? marginAccounts.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
    : marginAccounts;
  const maxPages = Math.floor(marginAccounts.length / PER_PAGE) + 1;

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

  return (
    <MarginAccountsPaginationAndListBox>
      {loading ? (
        <MarginAccountsListBox>
          {Array.from({ length: 10 }, () => ({})).map((_, index) => (
            <MarginAccountEntrySkeleton
              key={index}
              colorToken="liberty2"
              data-testid="PositionsList-PositionEntrySkeleton"
              variant="rectangular"
            />
          ))}
        </MarginAccountsListBox>
      ) : null}
      {!loading ? (
        <React.Fragment>
          <MarginAccountsListBox
            delay={0}
            duration={200}
            easing="cubic-bezier(0.25,0.1,0.25,1.0)"
            staggerDelayBy={10}
            staggerDurationBy={7}
          >
            {marginAccounts.length > 0
              ? slicedMarginAccounts.map((marginAccount, index) => {
                  const backgroundColorToken = index % 2 !== 0 ? 'liberty7' : 'lavenderWeb8';

                  return (
                    <MarginAccountEntry
                      key={marginAccount.id}
                      backgroundColorToken={backgroundColorToken}
                      {...marginAccount}
                    />
                  );
                })
              : null}
            {marginAccounts.length === 0 ? (
              <NoMarginAccountsFoundBox>
                <img alt="Gimme" src="/images/no-pools-found.png" />
                <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumRegular">
                  No Margin Accounts found. Visit our{' '}
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
              </NoMarginAccountsFoundBox>
            ) : null}
          </MarginAccountsListBox>
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
    </MarginAccountsPaginationAndListBox>
  );
};
