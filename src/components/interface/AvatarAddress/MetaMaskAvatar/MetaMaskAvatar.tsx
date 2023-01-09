import { FunctionComponent } from 'react';

import { getMetamaskAvatar } from './get-metamask-avatar';
import { AvatarWrapper } from './MetaMaskAvatar.styled';

type Props = {
  address: string;
  size: number;
};

export const MetaMaskAvatar: FunctionComponent<Props> = ({ address, size }) => (
  <AvatarWrapper data-testid="MetaMaskAvatar-AvatarWrapper" size={size}>
    <img
      alt="avatar"
      data-testid="MetaMaskAvatar-Image"
      src={getMetamaskAvatar({
        address,
        size,
      })}
    />
  </AvatarWrapper>
);
