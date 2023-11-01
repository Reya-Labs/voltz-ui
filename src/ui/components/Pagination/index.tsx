import React from 'react';

import { ActionButton, AnimatedBarBox, BarBox, PaginationBox } from './Pagination.styled';

type PaginationProps = {
  onPreviousPageClick: () => void;
  onNextPageClick: () => void;
  maxPages: number;
  page: number;
};
export const Pagination: React.FunctionComponent<PaginationProps> = ({
  onPreviousPageClick,
  onNextPageClick,
  maxPages,
  page,
}) => {
  const nextDisabled = page === maxPages - 1;
  const previousDisabled = page === 0;
  const handleOnNextPageClick = () => {
    if (nextDisabled) {
      return;
    }
    onNextPageClick();
  };
  const handleOnPreviousPageClick = () => {
    if (previousDisabled) {
      return;
    }
    onPreviousPageClick();
  };
  return (
    <PaginationBox data-testid="Pagination-PaginationBox">
      <div onClick={handleOnPreviousPageClick}>
        <ActionButton
          colorToken={previousDisabled ? 'white500' : 'white100'}
          data-testid={`Pagination-PreviousActionButton-${previousDisabled ? 'disabled' : ''}`}
          disabled={previousDisabled}
          typographyToken="secondaryBodyXSmallRegular"
        >
          {previousDisabled
            ? `Current ${(page + 1).toString().padStart(2, '0')}`
            : `< Previous ${page.toString().padStart(2, '0')}`}
        </ActionButton>
      </div>
      <BarBox>
        <AnimatedBarBox width={Math.min(((page + 1) * 100) / maxPages, 100)} />
      </BarBox>
      <div onClick={handleOnNextPageClick}>
        <ActionButton
          colorToken={nextDisabled ? 'white500' : 'white100'}
          data-testid={`Pagination-NextActionButton-${nextDisabled ? 'disabled' : ''}`}
          disabled={nextDisabled}
          typographyToken="secondaryBodyXSmallRegular"
        >
          {nextDisabled
            ? `${maxPages.toString().padStart(2, '0')} Last`
            : `${maxPages.toString().padStart(2, '0')} Next >`}
        </ActionButton>
      </div>
    </PaginationBox>
  );
};
