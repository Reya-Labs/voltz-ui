import React from 'react';

import {
  ActionButton,
  AnimatedBarBox,
  BarBox,
  ChevronLeftIcon,
  ChevronRightIcon,
  PaginationBox,
} from './Pagination.styled';

export type PaginationProps = {
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
}) => (
  <PaginationBox>
    <ActionButton
      disabled={page === 0}
      startIcon={<ChevronLeftIcon />}
      variant={'text'}
      onClick={onPrevPage}
    >
      PREVIOUS 01
    </ActionButton>
    <BarBox>
      <AnimatedBarBox width={Math.min(((page + 1) * 100) / maxPages, 100)} />
    </BarBox>
    <ActionButton
      disabled={page === maxPages - 1}
      endIcon={<ChevronRightIcon />}
      variant={'text'}
      onClick={onNextPage}
    >
      {maxPages.toString().padStart(2, '0')} NEXT
    </ActionButton>
  </PaginationBox>
);
