import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { WalletDisplay, WalletDisplayProps } from './WalletDisplay';

describe('<WalletDisplay />', () => {
  let props: WalletDisplayProps;

  beforeEach(() => {
    props = {
      walletName: 'metamask',
      onChangeWallet: jest.fn(),
      onDisconnectWallet: jest.fn(),
      account: '0x123456789abcdef',
    };
  });

  it('renders the connected wallet information', () => {
    render(<WalletDisplay {...props} />);
    const contentBox = screen.getByTestId('WalletDisplay-ContentBox');
    expect(screen.getByText('CONNECTED WITH METAMASK')).toBeInTheDocument();
    expect(screen.getByTestId('WalletDisplay-DescriptionTypography')).toBeInTheDocument();
    expect(screen.getByTestId('WalletDisplay-DescriptionTypography')).toHaveTextContent(
      'Hey 0x123456789abcdef! Start trading with another wallet! Use the options below.',
    );
    expect(contentBox).toHaveTextContent('CHANGE');
    expect(contentBox).toHaveTextContent('DISCONNECT');
  });

  it('calls onChangeWallet when the change button is clicked', () => {
    render(<WalletDisplay {...props} />);
    const changeButton = screen.getByTestId('WalletDisplay-ChangeWalletButton');
    fireEvent.click(changeButton);
    expect(props.onChangeWallet).toHaveBeenCalled();
  });

  it('calls onDisconnectWallet when the disconnect button is clicked', () => {
    render(<WalletDisplay {...props} />);
    const disconnectButton = screen.getByTestId('WalletDisplay-DisconnectButton');
    fireEvent.click(disconnectButton);
    expect(props.onDisconnectWallet).toHaveBeenCalled();
  });

  it('does not render when walletName is not provided', () => {
    props.walletName = null;
    render(<WalletDisplay {...props} />);
    expect(screen.queryByTestId('WalletDisplay-ContentBox')).toBeNull();
  });
});
