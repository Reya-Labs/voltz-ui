import styled from '@emotion/styled';
import { Skeleton } from 'brokoli-ui';
import FlipMove from 'react-flip-move';

export const MarginAccountsListBox = styled(FlipMove)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MarginAccountsPaginationAndListBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
`;

export const MarginAccountEntrySkeleton = styled(Skeleton)`
  border-radius: 8px;
  height: 38px;
`;

export const NoMarginAccountsFoundBox = styled('div')`
  padding: 8px 10px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.black800};
`;

export const PaginationBox = styled('div')`
  margin-top: 16px;
`;
