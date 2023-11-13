import styled from '@emotion/styled';
import { Skeleton } from 'brokoli-ui';
import FlipMove from 'react-flip-move';

export const PositionsListBox = styled(FlipMove)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PositionsHeaderAndListBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
`;

export const PositionEntrySkeleton = styled(Skeleton)`
  padding: 8px 8px 8px 32px;
  border-radius: 8px;
  font-size: 18px;
  line-height: 24px;
`;

export const NoPositionsFoundBox = styled('div')`
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
