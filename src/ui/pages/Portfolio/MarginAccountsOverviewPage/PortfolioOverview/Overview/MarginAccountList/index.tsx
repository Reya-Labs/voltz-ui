import { AppLink, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../../../app';
import {
  fetchMarginAccountsThunk,
  MARGIN_ACCOUNTS_PER_PAGE,
  selectMarginAccounts,
  selectMarginAccountsLoading,
  selectMarginAccountsPage,
  selectMarginAccountsSortOptions,
  selectTotalMarginAccounts,
} from '../../../../../../../app/features/portfolio';
import { routes } from '../../../../../../../app/paths';
import { Pagination } from '../../../../../../components/Pagination';
import { useWallet } from '../../../../../../hooks/useWallet';
import { MarginAccountEntry } from './MarginAccountEntry';
import {
  MarginAccountEntrySkeleton,
  MarginAccountsListBox,
  MarginAccountsPaginationAndListBox,
  NoMarginAccountsFoundBox,
  PaginationBox,
} from './MarginAccountList.styled';

export const MarginAccountList: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectMarginAccountsLoading);
  const marginAccounts = useAppSelector(selectMarginAccounts);
  const totalMarginAccounts = useAppSelector(selectTotalMarginAccounts);
  const page = useAppSelector(selectMarginAccountsPage);
  const hasPagination = totalMarginAccounts > MARGIN_ACCOUNTS_PER_PAGE;
  const maxPages = Math.floor(totalMarginAccounts / MARGIN_ACCOUNTS_PER_PAGE) + 1;
  const { account } = useWallet();
  const sortOptions = useAppSelector(selectMarginAccountsSortOptions);
  const activeSort = sortOptions.find((sO) => sO.direction !== 'noSort');

  const fetchMarginAccountsForPage = (nextPage: number) => {
    if (!account || !activeSort) {
      return;
    }

    void dispatch(
      fetchMarginAccountsThunk({
        account,
        sort: {
          id: activeSort.id,
          direction: activeSort.direction,
        },
        page: nextPage,
        perPage: MARGIN_ACCOUNTS_PER_PAGE,
      }),
    );
  };

  const handleOnNextPage = () => fetchMarginAccountsForPage(page + 1);
  const handleOnPrevPage = () => fetchMarginAccountsForPage(page - 1);

  return (
    <MarginAccountsPaginationAndListBox>
      {loading ? (
        <MarginAccountsListBox>
          {Array.from({ length: 10 }, () => ({})).map((_, index) => (
            <MarginAccountEntrySkeleton
              key={index}
              colorToken="liberty2"
              data-testid="MarginAccountsList-MarginAccountEntrySkeleton"
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
              ? marginAccounts.map((marginAccount, index) => {
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
                    data-testid="NoMarginAccounts-AppLink"
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
