import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { useStateMemo, UseWalletResult } from '@hooks';
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
  },
} as ComponentMeta<typeof WalletConnect>;

type WalletConnectWrapperProps = UseWalletResult;

const WalletConnectWrapper: React.FunctionComponent<WalletConnectWrapperProps> = ({
  status,
  connect,
  account,
}) => {
  const wallet = { status, connect, account };
  const [updatedStatus, setUpdatedStatus] = useStateMemo(status);
  const handleConnect = async () => {
    connect();

    setUpdatedStatus('initializing');

    await new Promise((f) => setTimeout(f, 1000));

    setUpdatedStatus('connecting');

    await new Promise((f) => setTimeout(f, 1000));

    setUpdatedStatus('connected');

    return null;
  };

  return <WalletConnect wallet={{ ...wallet, connect: handleConnect, status: updatedStatus }} />;
};

const Template: ComponentStory<typeof WalletConnectWrapper> = (args) => (
  <WalletConnectWrapper {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
