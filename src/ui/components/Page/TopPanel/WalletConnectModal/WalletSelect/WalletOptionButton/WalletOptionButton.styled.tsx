import styled from '@emotion/styled';

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

  background: ${({ theme }) => theme.colors.white900};
  & p {
    color: ${({ theme }) => theme.colors.white100};
  }
  border-radius: 8px;
  transition:
    background,
    color 200ms ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.white800};
  }

  &:active {
    background: ${({ theme }) => theme.colors.white900};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.white900};
    cursor: not-allowed;
  }
  &:disabled p {
    color: ${({ theme }) => theme.colors.white700};
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
