import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ConnectWallet } from './ConnectWallet';

export default {
  title: 'Composite/ConnectWallet',
  component: ConnectWallet,
  args: {},
} as ComponentMeta<typeof ConnectWallet>;

const Template: ComponentStory<typeof ConnectWallet> = (args) => <ConnectWallet {...args} />;

export const Default = Template.bind({});
Default.args = {
  connectWalletText: 'CONNECT YOUR WALLET',
  heading: '🚫 PROHIBITED',
  subheading: 'Your wallet needs to be connected before proceeding.',
};
