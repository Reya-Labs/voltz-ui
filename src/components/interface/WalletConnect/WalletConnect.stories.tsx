import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WalletName, Wallet } from '@components/contexts';
import { useStateMemo } from '@hooks';
import WalletConnect from './WalletConnect';

export default {
  title: 'Interface/WalletConnect',
  component: WalletConnect,
  argTypes: {
    status: {
      control: 'radio',
      options: ['initializing', 'unavailable', 'notConnected', 'connecting', 'connected'],
    },
    account: { control: 'text' },
    connect: { action: 'connect' },
    name: { control: 'radio', options: ['metamask', null] },
  },
} as ComponentMeta<typeof WalletConnect>;

type WalletConnectWrapperProps = Wallet;

const WalletConnectWrapper: React.FunctionComponent<WalletConnectWrapperProps> = ({
  status,
  connect,
  account,
  name,
}) => {
  const wallet = { status, connect, account };
  const [updatedStatus, setUpdatedStatus] = useStateMemo(status);
  const [updatedName, setUpdatedName] = useStateMemo(name);
  const handleConnect = async (walletName: WalletName) => {
    connect(walletName).then(
      () => {},
      () => {},
    );
    setUpdatedName(walletName);

    setUpdatedStatus('initializing');

    await new Promise((f) => setTimeout(f, 1));

    setUpdatedStatus('connecting');

    await new Promise((f) => setTimeout(f, 1));

    setUpdatedStatus('connected');

    return null;
  };

  return (
    <WalletConnect
      wallet={{
        ...wallet,
        connect: handleConnect,
        status: updatedStatus,
        name: updatedName,
        ethereum: null,
        signer: null,
        balance: null,
        wallet: null,
        loading: true,
        error: false,
      }}
    />
  );
};

const Template: ComponentStory<typeof WalletConnectWrapper> = (args) => (
  <WalletConnectWrapper {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
