import styled from '@emotion/styled';
import { getColorFromToken, Skeleton } from 'brokoli-ui';
import FlipMove from 'react-flip-move';

export const PoolsListBox = styled(FlipMove)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PoolsHeaderAndListBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
`;

export const PoolEntrySkeleton = styled(Skeleton)`
  padding: 8px 8px 8px 32px;
  border-radius: 8px;
  font-size: 18px;
  line-height: 24px;
`;

export const NoPoolsFoundBox = styled('div')`
  padding: 8px 10px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  border-radius: 8px;
  background-color: ${getColorFromToken('liberty7')};
`;
