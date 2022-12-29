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
    <ActionButton startIcon={<ChevronLeftIcon />} variant={'text'} onClick={onPrevPage}>
      PREVIOUS 01
    </ActionButton>
    <BarBox>
      <AnimatedBarBox width={Math.min(((page + 1) * 100) / maxPages, 100)} />
    </BarBox>
    <ActionButton endIcon={<ChevronRightIcon />} variant={'text'} onClick={onNextPage}>
      {maxPages.toString().padStart(2, '0')} NEXT
    </ActionButton>
  </PaginationBox>
);
