import React from 'react';

import { ActionButton, AnimatedBarBox, BarBox, PaginationBox } from './Pagination.styled';

type PaginationProps = {
  onPrevPage: () => void;
  onNextPage: () => void;
  maxPages: number;
  page: number;
};
export const Pagination: React.FunctionComponent<PaginationProps> = ({
  onPrevPage,
  onNextPage,
  maxPages,
  page,
}) => {
  const nextDisabled = page === maxPages - 1;
  const previousDisabled = page === 0;
  return (
    <PaginationBox data-testid="Pagination-PaginationBox">
      <div onClick={onPrevPage}>
        <ActionButton
          colorToken={previousDisabled ? 'lavenderWeb4' : 'lavenderWeb'}
          data-testid={`Pagination-PreviousActionButton-${previousDisabled ? 'disabled' : ''}`}
          disabled={previousDisabled}
          typographyToken="secondaryBodyXSmallRegular"
        >
          {'< Previous 01'}
        </ActionButton>
      </div>
      <BarBox>
        <AnimatedBarBox width={Math.min(((page + 1) * 100) / maxPages, 100)} />
      </BarBox>
      <div onClick={onNextPage}>
        <ActionButton
          colorToken={nextDisabled ? 'lavenderWeb4' : 'lavenderWeb'}
          data-testid={`Pagination-NextActionButton-${nextDisabled ? 'disabled' : ''}`}
          disabled={nextDisabled}
          typographyToken="secondaryBodyXSmallRegular"
        >
          {`${maxPages.toString().padStart(2, '0')} Next >`}
        </ActionButton>
      </div>
    </PaginationBox>
  );
};
