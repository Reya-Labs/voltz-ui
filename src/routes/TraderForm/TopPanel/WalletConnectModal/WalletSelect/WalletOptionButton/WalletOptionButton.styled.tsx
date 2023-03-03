import { styled } from '@mui/material/styles';
import { colors } from 'brokoli-ui';

import { ReactComponent as Metamask } from './metamask.svg';
import { ReactComponent as WalletConnect } from './walletconnect.svg';

export const OptionButton = styled('button')`
  border: none;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 18px 10px 16px;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;

  background: ${colors.lavenderWeb8};
  & p {
    color: ${colors.lavenderWeb};
  }
  border-radius: 8px;
  transition: background, color 200ms ease-in;

  &:hover {
    background: ${colors.lavenderWeb7};
  }

  &:active {
    background: ${colors.lavenderWeb8};
  }

  &:disabled {
    background: ${colors.lavenderWeb8};
    cursor: not-allowed;
  }
  &:disabled p {
    color: ${colors.lavenderWeb6};
  }
`;

export const MetamaskIcon = styled(Metamask)`
  width: 15px;
  height: 15px;
`;
export const WalletConnectIcon = styled(WalletConnect)`
  width: 15px;
  height: 15px;
`;
