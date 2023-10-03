import styled from '@emotion/styled';
import { Button, colors } from 'brokoli-ui';

export const Box = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  width: 100%;
`;

export const DetailsBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
`;

export const DetailBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

export const DepositButtonBox = styled('div')`
  width: 53px;
  height: 32.5px;
`;

export const DepositButton = styled(Button)`
  padding: 4px 8px;
  border: 1px solid ${colors.lavenderWeb7};
  background: ${colors.lavenderWeb7};
  height: 100%;
`;
