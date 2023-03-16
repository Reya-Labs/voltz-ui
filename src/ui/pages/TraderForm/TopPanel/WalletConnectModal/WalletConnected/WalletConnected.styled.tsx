import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const WalletConnectedBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`;

export const TitleBox = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
`;

export const ButtonsBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px;
  width: 100%;
  box-sizing: border-box;
  gap: 24px;
`;

export const AvatarAddressBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 18px 10px 16px;
  gap: 10px;

  background: ${colors.lavenderWeb8};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;
