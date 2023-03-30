import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ConnectWallet } from './index';

export default {
  title: 'ui/components/ConnectWallet',
  component: ConnectWallet,
  args: {},
} as ComponentMeta<typeof ConnectWallet>;

const Template: ComponentStory<typeof ConnectWallet> = (args) => <ConnectWallet {...args} />;

export const Default = Template.bind({});
Default.args = {
  heading: '🚫 RESTRICTED',
  subheading: 'Your wallet needs to be connected before proceeding.',
};
