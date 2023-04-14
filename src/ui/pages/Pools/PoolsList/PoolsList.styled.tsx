import styled from '@emotion/styled';
import { getColorFromToken, Skeleton } from 'brokoli-ui';

export const PoolsListBox = styled('div')`
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
  background: linear-gradient(180deg, rgba(11, 9, 17, 0.81) 41.43%, rgba(30, 25, 51, 0.87) 110.49%);
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
