import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const TransactionDetailsBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  align-items: flex-start;
  padding: 16px 40px 132px 40px;
  width: 100%;

  border-bottom: 1px solid ${colors.lavenderWeb8};
`;

export const TransactionDetailBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const IconTextWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
`;
