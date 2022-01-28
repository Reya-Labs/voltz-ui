import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { useStateMemo } from '@hooks';
import WalletConnect, { WalletConnectProps } from './WalletConnect';

export default {
  title: 'Interface/WalletConnect',
  component: WalletConnect,
} as ComponentMeta<typeof WalletConnect>;

type WalletConnectWrapperProps = WalletConnectProps;

const WalletConnectWrapper: React.FunctionComponent<WalletConnectWrapperProps> = ({ ...props }) => {
  return <WalletConnect {...props} />;
};

const Template: ComponentStory<typeof WalletConnect> = (args) => <WalletConnectWrapper {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
