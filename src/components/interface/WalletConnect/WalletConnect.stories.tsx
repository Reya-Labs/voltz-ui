import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Wallet } from '@components/contexts';
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

const WalletConnectWrapper: React.FunctionComponent<WalletConnectWrapperProps> = () => {
  return (
    <WalletConnect/>
  );
};

const Template: ComponentStory<typeof WalletConnectWrapper> = (args) => (
  <WalletConnectWrapper {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
