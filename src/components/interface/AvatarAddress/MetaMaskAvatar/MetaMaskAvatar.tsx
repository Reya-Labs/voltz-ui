import { FunctionComponent } from 'react';
import { getMetamaskAvatar } from './get-metamask-avatar';

type Props = {
  address: string;
  size: number;
};

export const MetaMaskAvatar: FunctionComponent<Props> = ({ address, size }) => (
  <div
    style={{
      borderRadius: '50%',
      padding: 0,
      margin: 0,
      width: size,
      height: size,
      display: 'inline-block',
      background: 'rgb(242, 98, 2)',
      overflow: 'hidden',
    }}
  >
    <img
      src={getMetamaskAvatar({
        address,
        size,
      })}
      alt="avatar"
    />
  </div>
);
